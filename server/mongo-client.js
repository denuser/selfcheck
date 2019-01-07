const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'selfcheck';

class TasksClient {
    insertTask(task) {
        return createPromiseForInsert(task, 'tasks');
    }

    getTask(taskId) {
        return createPromise(async (resolve, db) => {
            const doc = await db.collection('tasks').findOne({ '_id': new ObjectId(taskId) });
            resolve(doc);
        });
    }

    getTasks() {
        return createPromise(async (resolve, db) => {
            const docs = await db.collection('tasks').find({});
            resolve(docs.toArray());
        });
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

module.exports = TasksClient