import {UNKNOWN_HOST} from "../constants";
import {logError} from "./log-error";

export function getHostFromUrl(url: string | undefined): string {

  if (!url) {return UNKNOWN_HOST;}
  try {
    return new URL(url).hostname;
  } catch (e) {
    logError('Failed to parse URL:', e);
  }

  return UNKNOWN_HOST;
}