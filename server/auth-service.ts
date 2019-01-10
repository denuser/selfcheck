import { OAuth2Client, Credentials } from 'google-auth-library'
import * as url from 'url'
import * as path from "path"
import DbClient from "./login-db-client"

const keys = require(path.resolve(__dirname, './gmail/keys.json'));

function getClient() {
    const oAuth2Client = new OAuth2Client(
        keys.web.client_id,
        keys.web.client_secret,
        keys.web.redirect_uris[2]
    );

    return oAuth2Client;
}

export default {
    getLoginUrl: function (): string {
        const oAuth2Client = getClient();

        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/plus.me', 'profile', 'email'],
            //prompt: 'consent'
        });

        return authorizeUrl;
    },

    saveTokens: async function (tokens: Credentials) {
        console.log(tokens);
        //TODO: save to mongo
    },

    getTokens: async function (userId: string) {
        //TODO: get from mongo
    },

    getTokensByCode: async function (returnUrl: string) {
        const dbClient = new DbClient();
        const oAuth2Client = getClient();

        const qs = new url.URL(returnUrl, 'http://localhost:9000')
            .searchParams;
        const code = qs.get('code');
        const r = await oAuth2Client.getToken(code);

        const ticket = await oAuth2Client.verifyIdToken({ idToken: r.tokens.id_token, audience: keys.web.client_id })

        const payload = ticket.getPayload();
        await dbClient.insertUserInfo(payload);

        const userId = ticket.getUserId();
        const attr = ticket.getAttributes();
        const info = await oAuth2Client.getTokenInfo(r.tokens.access_token)
        return r.tokens;
    }
}