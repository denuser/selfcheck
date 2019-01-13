import DatabaseClient from "./DatabaseClient"
import * as I from "../interfaces"

const dbClient = new DatabaseClient();
const uniqid = require('uniqid');

class LoginClient {

    insertUserInfo(document: I.TokenPayloadRow): Promise<I.TokenPayloadRow> {
        const collection = 'users'
        const criteria = { sub: document.sub };

        return dbClient.updateOrInsertNew(collection, criteria, document)
    }

    insertTokensInfo(document: I.UserTokenRow): Promise<I.UserTokenRow> {
        const collection = 'tokens'
        const criteria = { userId: document.userId };

        return dbClient.updateOrInsertNew(collection, criteria, document)
    }

    insertSessionInfo(document: I.SessionInfo): Promise<I.SessionInfo> {
        const collection = 'sessions'
        const criteria = { userId: document.userId };

        return dbClient.updateOrInsertNew(collection, criteria, document)
    }
}

export default LoginClient
