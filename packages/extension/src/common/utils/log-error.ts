import {isError} from "../types";

export const logError = (message:string, e?:unknown) => {
  console.error(message, isError(e) ? e.message : String(e) || '');
};
