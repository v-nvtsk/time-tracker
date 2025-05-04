import {XOR} from "./utility.types";

const trackerMessages = {
  enableTracking: 'ENABLE_TRACKING',
  disableTracking: 'DISABLE_TRACKING',
} as const;
const contentMessages = {activityUpdate: 'ACTIVITY_UPDATE'} as const;
const popupMessages = {
  login: 'LOGIN',
  logout: 'LOGOUT',
  refreshAuth: 'REFRESH_AUTH',
  updateCategory: 'UPDATE_CATEGORY',
  getTabInfo: 'GET_TAB_INFO',
} as const;

export const MessageTypes = {
  ...contentMessages,
  ...popupMessages,
  ...trackerMessages,
} as const;
export type MessageTypes = typeof MessageTypes[keyof typeof MessageTypes];
export interface Message<MessageType extends MessageTypes = MessageTypes, Payload = unknown> {
  type: MessageType;
  payload: Payload;
}
/**
 * Generic response type.
 */
export interface MessageResponse<
  Status extends boolean = boolean,
  Payload = Status extends false ? never : unknown,
  ErrorMessage = Status extends false ? string : never
> {
  success: Status;
  payload: Status extends true ? Payload : never;
  error: ErrorMessage;
}
export interface SuccessResponse<Payload = unknown> {
  success: true;
  payload: Payload;
}
export interface FailedResponse {
  success: false;
  error: string;
}
/**
 * Specific response types with success and failure cases.
 */
export type ActivityUpdateResponseSuccess = SuccessResponse<{isActive: boolean}>;
export type LoginResponseSuccess = SuccessResponse<{
  username: string;
  token: string
}>;
export type LogoutResponseSuccess = SuccessResponse<void>;
export type RefreshAuthResponseSuccess = SuccessResponse<{
  username: string;
  token: string
}>;
export type UpdateCategoryResponseSuccess = SuccessResponse<void>;
export type GetTabInfoResponseSuccess = SuccessResponse<{
  totalTime: number;
  url: string;
  title: string;
  host: string;
  category?: string;
  categoryId?: number;
}>;
export type ActivityUpdateResponse = XOR<ActivityUpdateResponseSuccess, FailedResponse>;
export type LoginResponse = XOR<LoginResponseSuccess, FailedResponse>;
export type LogoutResponse = XOR<LogoutResponseSuccess, FailedResponse>;
export type RefreshAuthResponse = XOR<RefreshAuthResponseSuccess, FailedResponse>;
export type UpdateCategoryResponse = XOR<UpdateCategoryResponseSuccess, FailedResponse>;
export type GetTabInfoResponse = XOR<GetTabInfoResponseSuccess, FailedResponse>;
/**
 * Union type for all message responses.
 */
export type MessageResponses =
  | ActivityUpdateResponse
  | LoginResponse
  | LogoutResponse
  | RefreshAuthResponse
  | UpdateCategoryResponse
  | GetTabInfoResponse;
/**
 * Message definitions
 */
export interface ActivityUpdateMessage extends Message {
  type: typeof MessageTypes.activityUpdate,
  payload: {isActive: boolean};
}
export interface LoginMessage extends Message {
  type: typeof MessageTypes.login,
  payload: {
    username: string;
    password: string
  };
}
export interface LogoutMessage extends Message {
  type: typeof MessageTypes.logout,
  payload: void;
}
export interface RefreshAuthMessage extends Message {
  type: typeof MessageTypes.refreshAuth,
  payload: void;
}
export interface UpdateCategoryMessage extends Message {
  type: typeof MessageTypes.updateCategory,
  payload: {
    categoryId: number;
    newName: string
  };
}
export interface GetTabInfoMessage extends Message {
  type: typeof MessageTypes.getTabInfo,
  payload: void;
}
export interface EnableTrackingMessage extends Message {
  type: typeof MessageTypes.enableTracking,
  payload: void;
}
export interface DisableTrackingMessage extends Message {
  type: typeof MessageTypes.disableTracking,
  payload: void;
}
//
export type Messages =
| EnableTrackingMessage
| DisableTrackingMessage
| ActivityUpdateMessage
| LoginMessage
| LogoutMessage
| RefreshAuthMessage
| UpdateCategoryMessage
| GetTabInfoMessage;
//