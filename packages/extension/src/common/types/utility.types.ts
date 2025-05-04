import {
  MessageResponses, SuccessResponse
} from "./messaging.types";

export type XOR<T1, T2> =
(T1 & {[k in Exclude<keyof T2, keyof T1>]?:never}) |
(T2 & {[k in Exclude<keyof T1, keyof T2>]?:never});
export type PayloadOf<R extends MessageResponses> = R extends SuccessResponse<infer P> ? P : never;