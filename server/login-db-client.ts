const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'selfcheck';
const uniqid = require('uniqid');

class LoginClient {
    insertUserInfo(info: any) {
        const collection = 'users'

        return createPromise(async (resolve, db) => {
            const updateResult = await db.collection(collection).findOneAndUpdate({ sub: info.sub }, { $set: info })
            if (updateResult.value) {
                resolve(updateResult.value);
            }
            else {
                const result = await db.collection(collection).insertOne(info);
                resolve(result.ops[0]);
            }
        });
    }

    insertTokenInfo(info) {
        const collection = 'tokens'

        return createPromise(async (resolve, db) => {
            const updateResult = await db.collection(collection).findOneAndUpdate({ sub: info.sub }, { $set: info })
            if (updateResult.value) {
                resolve(updateResult.value);
            }
            else {
                const result = await db.collection(collection).insertOne(info);
                resolve(result.ops[0]);
            }
        });
    }

    insertSessionInfo(info) {
        const collection = 'sessions'

        return createPromise(async (resolve, db) => {
            const updateResult = await db.collection(collection).findOneAndUpdate({ sub: info.sub }, { $set: info })
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

function createPromise(action) {
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