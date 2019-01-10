import { TokenPayload } from "google-auth-library/build/src/auth/loginticket";
import { Credentials } from "google-auth-library";

const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'selfcheck';
const uniqid = require('uniqid');

interface SessionInfo {
    sessionId: string,
    userid: string
}

interface UsersTokens extends Credentials {
    userId: string
}

class LoginClient {
    insertUserInfo(info: TokenPayload) {
        const collection = 'users'
        const criteria = { sub: info.sub };

        return createPromise(async (resolve, db) => {
            const updateResult = await db.collection(collection).findOneAndUpdate(criteria, { $set: info })
            if (updateResult.value) {
                resolve(updateResult.value);
            }
            else {
                const result = await db.collection(collection).insertOne(info);
                resolve(result.ops[0]);
            }
        });
    }

    insertTokenInfo(info: UsersTokens): Promise<UsersTokens> {
        const collection = 'tokens'

        return createPromise(async (resolve, db) => {
            const updateResult = await db.collection(collection).findOneAndUpdate({ sub: info.userId }, { $set: info })
            if (updateResult.value) {
                resolve(updateResult.value as UsersTokens);
            }
            else {
                const result = await db.collection(collection).insertOne(info);
                resolve(result.ops[0] as UsersTokens);
            }
        });
    }

    insertSessionInfo(info: SessionInfo) {
        const collection = 'sessions'

        return createPromise(async (resolve, db) => {
            const updateResult = await db.collection(collection).findOneAndUpdate({ userid: info.userid }, { $set: info })
            if (updateResult.value) {
                resolve(updateResult.value);
            }
            else {
                const result = await db.collection(collection).insertOne(info);
                resolve(result.ops[0]);
            }
        });
    }
}

function createPromiseForInsert(document, collection) {
    return createPromise(async (resolve, db) => {
        const result = await db.collection(collection).insertOne(document);
        resolve(result.ops[0]);
    });
}

function createPromise(action: (resolve: any, db: any) => Promise<any>): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await MongoClient.connect(url, { useNewUrlParser: true });
            const db = client.db(dbName);

            await action(resolve, db);
            client.close();
        }
        catch (ex) {
            reject(ex)
        }
    })
}

export default LoginClient