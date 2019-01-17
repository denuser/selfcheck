import DatabaseClient from "./DatabaseClient"
import * as I from "../interfaces"
import { ObjectId } from "mongodb";

const dbClient = new DatabaseClient();
const uniqid = require('uniqid');

class LoginClient {
    async cleanSessionData(session_id: ObjectId, token_id: ObjectId): Promise<void> {
        await dbClient.deleteById("sessions", session_id)
        await dbClient.deleteById("tokens", token_id)
    }

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

    getSessionInfo(sessionId: string): Promise<I.SessionInfo> {
        const collection = 'sessions'
        const criteria = { sessionId };

        return dbClient.getOneByCondition(collection, criteria)
    }

    getUserInfo(userId: string): Promise<I.TokenPayloadRow> {
        const collection = 'users'
        const criteria = { sub: userId };

        return dbClient.getOneByCondition(collection, criteria)
    }

    getUserTokens(userId: string): Promise<I.UserTokenRow> {
        const collection = 'tokens'
        const criteria = { userId };

        return dbClient.getOneByCondition(collection, criteria)
    }
}

export default LoginClient
