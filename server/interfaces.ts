import { ObjectId } from "mongodb";
import { Credentials } from "google-auth-library";
import { TokenPayload } from "google-auth-library/build/src/auth/loginticket";

export interface TaskRow {
    readonly _id?: ObjectId
    question: string
    answer: string
    lastTouched?: Date
}

export interface SessionInfo {
    sessionId: string,
    userId: string
}

export interface UserTokenRow extends Credentials {
    userId: string
    _id?: ObjectId
}

export interface TokenPayloadRow extends TokenPayload {
    _id?: ObjectId
}