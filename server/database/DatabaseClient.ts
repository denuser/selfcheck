import { MongoClient, ObjectId } from 'mongodb'

const url = 'mongodb://localhost:27017';


class DatabaseClient {
    constructor(dbName = 'selfcheck') {
        this.dbName = dbName
    }

    dbName: string;

    execute(action: (resolve: any, db: any) => Promise<any>): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const client = await MongoClient.connect(url, { useNewUrlParser: true });
                const db = client.db(this.dbName);

                await action(resolve, db);
                client.close();
            }
            catch (ex) {
                reject(ex)
            }
        })
    }

    dropDatabase(): Promise<void> {
        return this.execute(async (resolve, db) => {
            db.dropDatabase()
            resolve();
        })
    }

    updateOrInsertNew(collection: string, criteria: Object, document: Object): Promise<any> {
        return this.execute(async (resolve, db) => {
            const updateResult = await db.collection(collection).findOneAndUpdate(criteria, { $set: document })
            if (updateResult.value) {
                resolve(updateResult.value);
            }
            else {
                const result = await db.collection(collection).insertOne(document);
                resolve(result.ops[0]);
            }
        });
    }

    insert(collection: string, document: Object): Promise<any> {
        return this.execute(async (resolve, db) => {
            const result = await db.collection(collection).insertOne(document);
            resolve(result.ops[0]);
        });
    }

    getById(collection: string, id: string): Promise<any> {
        return this.execute(async (resolve, db) => {
            const doc = await db.collection(collection).findOne({ '_id': new ObjectId(id) });
            resolve(doc);
        });
    }

    getAll(collection: string): Promise<Array<any>> {
        return this.execute(async (resolve, db) => {
            const docs = await db.collection(collection).find({});
            resolve(docs.toArray());
        });
    }

    deleteById(collection: string, id: string): Promise<boolean> {
        return this.execute(async (resolve, db) => {
            await db.collection(collection).deleteOne({ '_id': new ObjectId(id) })
            resolve(true);
        });
    }
}

export default DatabaseClient