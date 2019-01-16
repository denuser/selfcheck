import { OAuth2Client, Credentials } from 'google-auth-library'
import * as url from 'url'
import * as path from "path"
import DbClient from "./database/LoginClient"
import * as I from "./interfaces"

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
            scope: ['profile', 'email'],
            //prompt: 'consent'
        });

        return authorizeUrl;
    },

    saveTokens: async function (tokens: I.UserTokenRow) {
        const dbClient = new DbClient();

        await dbClient.insertTokensInfo({ ...tokens });
    },

    saveSession: async function (userId: string, sessionId: string): Promise<void> {
        const dbClient = new DbClient();

        await dbClient.insertSessionInfo({ userId, sessionId });
    },

    tryGetSession: async function (sessionId: string): Promise<I.SessionInfo> {
        const dbClient = new DbClient();

        return await dbClient.getSessionInfo(sessionId);
    },

    tryGetTokens: async function (userId: string): Promise<I.UserTokenRow> {
        const dbClient = new DbClient();

        return await dbClient.getUserTokens(userId);
    },

    logout: async function(tokens: I.UserTokenRow){
        const oAuth2Client = getClient();
        oAuth2Client.setCredentials(tokens)
        await oAuth2Client.revokeCredentials()
        const info = await oAuth2Client.getTokenInfo(tokens.access_token)
        console.log(info)
    },

    checkTokens: async function (tokens: I.UserTokenRow): Promise<boolean> {
        const dbClient = new DbClient();
        const oAuth2Client = getClient();
        oAuth2Client.setCredentials(tokens)
        const headers = await oAuth2Client.getRequestHeaders()
        const newCredentailsRow = Object.assign(tokens, oAuth2Client.credentials);

        await dbClient.insertTokensInfo(newCredentailsRow);
        return true;
    },

    getTokensByCode: async function (returnUrl: string): Promise<I.UserTokenRow> {
        const dbClient = new DbClient();
        const oAuth2Client = getClient();

        const qs = new url.URL(returnUrl, 'http://localhost:9000').searchParams;
        const code = qs.get('code');
        const r = await oAuth2Client.getToken(code);

        const ticket = await oAuth2Client.verifyIdToken({ idToken: r.tokens.id_token, audience: keys.web.client_id })

        const payload = ticket.getPayload();
        await dbClient.insertUserInfo(payload);

        // const userId = ticket.getUserId();
        // const attr = ticket.getAttributes();
        // const info = await oAuth2Client.getTokenInfo(r.tokens.access_token)
        return { ...r.tokens, userId: payload.sub };
    }
}