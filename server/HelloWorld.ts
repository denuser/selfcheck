import DbClient from "./database/DatabaseClient"


export const main = (): string => {
    const clinet = new DbClient("test1")
    clinet.insert("haha", { test1: 123123123 }).then(() => console.log("!!!!"))
    console.log('Hello World');
    return 'hello world';
}