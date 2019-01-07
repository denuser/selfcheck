const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'selfcheck';

class LoginClient {
    insertUserInfo(info) {
        // findOneAndUpdate should be used. need to check what it will return if the record exists/not exists
        // if not exists insert should be used

        return createPromiseForInsert(info, 'users');
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

module.exports = LoginClient