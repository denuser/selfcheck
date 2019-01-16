import DatabaseClient from "./DatabaseClient"
import { TaskRow } from "../interfaces"

const dbClient = new DatabaseClient();

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

export default TasksClient