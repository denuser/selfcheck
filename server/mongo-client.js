const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'selfcheck';

class DatabaseClient {
    insertTask({ question, answer }) {
        return new Promise(async (resolve, reject) => {
            try {
                const client = await MongoClient.connect(url, { useNewUrlParser: true });
                const db = client.db(dbName);
                const result = await db.collection('tasks').insertOne({ question, answer });
                client.close();
                resolve(result.ops[0]);
            }
            catch (ex) {
                reject(ex)
            }
        })
    }

    getTask(taskId) {
        return new Promise(async (resolve, reject) => {
            try {
                const client = await MongoClient.connect(url, { useNewUrlParser: true });
                const db = client.db(dbName);

                const docs = await db.collection('tasks').find({ _id: taskId });
                client.close();
                resolve(result.ops[0]);
            }
            catch (ex) {
                reject(ex)
            }
        })
    }

    getTasks() {
        return new Promise(async (resolve, reject) => {
            try {
                const client = await MongoClient.connect(url, { useNewUrlParser: true });
                const db = client.db(dbName);

                const docs = await db.collection('tasks').find({});
                resolve(docs.toArray());
                client.close();
            }
            catch (ex) {
                reject(ex)
            }
        })
    }

    removeTask(taskId) {
        MongoClient.connect(url, function (err, client) {
            const db = client.db(dbName);
            db.collection('tasks').deleteOne({ _id: taskId }, function (err, r) {
                client.close();
            });
        });
    }
}

module.exports = DatabaseClient