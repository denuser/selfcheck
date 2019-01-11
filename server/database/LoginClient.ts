import { TokenPayload } from "google-auth-library/build/src/auth/loginticket";
import { Credentials } from "google-auth-library";
import DatabaseClient from "./DatabaseClient"
import { ObjectID } from "mongodb";

const dbClient = new DatabaseClient();
const uniqid = require('uniqid');

interface SessionInfo {
    sessionId: string,
    userid: string
}

interface UserTokenRow extends Credentials {
    userId: string
    _id?: ObjectID
}

interface TokenPayloadRow extends TokenPayload {
    _id?: ObjectID
}

class LoginClient {

    insertUserInfo(document: TokenPayload): Promise<TokenPayloadRow> {
        const collection = 'users'
        const criteria = { sub: document.sub };

        return dbClient.updateOrInsertNew(collection, criteria, document)
    }
}

export default LoginClient