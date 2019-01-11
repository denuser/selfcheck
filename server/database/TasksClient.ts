import DatabaseClient from "./DatabaseClient"
import { ObjectId } from "mongodb";
const dbClient = new DatabaseClient();

interface TaskRow {
    readonly _id?: ObjectId
    question: string
    answer: string
    lastTouched?: Date
}

class TasksClient {
    insertTask(document: TaskRow): Promise<TaskRow> {
        return dbClient.insert('tasks', document);
    }

    getTask(taskId): Promise<TaskRow> {
        return dbClient.getById('tasks', taskId);
    }

    getTasks(): Promise<Array<TaskRow>> {
        return dbClient.getAll('tasks');
    }

    removeTask(taskId): Promise<boolean> {
        return dbClient.deleteById('tasks', taskId);
    }
}

module.exports = TasksClient