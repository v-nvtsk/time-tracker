import {getServerName} from "./get-server-base-url";
import {toURLSearchParams} from "./to-url-searchparams";

export const createURL = (options?: {
  host?: string,
  path?: string
  params?: Record<string, unknown>
}) => {

  const {
    host = getServerName(), path = '', params
  } = options || {};
  const searchParams = params ? `?${ toURLSearchParams(params).toString()}` : '';

  return new URL(`${path}${searchParams}`, host).href;
};
