const { OAuth2Client } = require('google-auth-library');
const http = require('http');
const url = require('url');
const opn = require('opn');
const destroyer = require('server-destroy');
const path = require("path")
const { MongoClient, ObjectId } = require('mongodb');
const DbClient = require("./login-db-client")

const keys = require(path.resolve(__dirname, './gmail/keys.json'));

function getClient() {
    const oAuth2Client = new OAuth2Client(
        keys.web.client_id,
        keys.web.client_secret,
        keys.web.redirect_uris[2]
    );

    return oAuth2Client;
}
module.exports = {
    getLoginUrl: function () {
        const oAuth2Client = getClient();

        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/plus.me', 'profile', 'email'],
            //prompt: 'consent'
        });

        return authorizeUrl;
    },

    saveTokens: async function (tokens) {
        console.log(tokens);
        //TODO: save to mongo
    },

    getTokens: async function (userId) {
        //TODO: get from mongo
    },

    getTokensByCode: async function (returnUrl) {
        const dbClient = new DbClient();
        const oAuth2Client = getClient();

        const qs = new url.URL(returnUrl, 'http://localhost:9000')
            .searchParams;
        const code = qs.get('code');
        const r = await oAuth2Client.getToken(code);

        const ticket = await oAuth2Client.verifyIdToken({ idToken: r.tokens.id_token })

        const payload = ticket.getPayload();
        dbClient.insertUserInfo(payload);

        const userId = ticket.getUserId();
        const attr = ticket.getAttributes();
        const info = await oAuth2Client.getTokenInfo(r.tokens.access_token)
        return r.tokens;
    }
}