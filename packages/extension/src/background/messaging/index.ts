import {
  ActivityUpdateResponse,
  isError,
  MessageResponses,
  Messages,
  MessageTypes,
  PayloadOf,
} from '../../common/types';
import {logError} from '../../common/utils';
import {
  failedResponse, successResponse
} from '../response';
import {timeTracking} from '../time-tracking';
import {
  loginHandler,
  logoutHandler,
  refreshSessionHandler,
} from './auth-handler';
import {getTabInfoHandler} from './get-tabInfo-handler';

export async function messageListener(
  message: Messages,
  _sender: chrome.runtime.MessageSender,
  sendResponse: (response: MessageResponses) => void
) {

  const {
    type, payload
  } = message;

  if (type === MessageTypes.refreshAuth) {
    try{
      const result = await refreshSessionHandler();

      if (result.success){
        timeTracking.enable();
      }else {
        timeTracking.disable();
      }
      sendResponse(result);
    }
    catch(error) {
      if (isError(error)) {
        logError(`Error in refreshAuth at:${ new Date().toISOString()}`, error);
        sendResponse(failedResponse(error.message));
      }
    }
  } else if (message.type === MessageTypes.login) {
    const {
      username, password
    } = message.payload;
    const result = await loginHandler(username, password);
    
    if (result.success) {
      timeTracking.enable();
    }
    sendResponse(result);
    
  } else if (type === MessageTypes.logout) {
    try{
      const result = await logoutHandler();

      if (result.success) {
        timeTracking.disable();
      }
      sendResponse(result);
    }catch(error) {
      if (isError(error)) {
        logError(`Error in logout at:${ new Date().toISOString()}`, error);
        sendResponse(failedResponse(error.message));
      }
    }

  }
  else if (type === MessageTypes.getTabInfo) {
    try {
      const result = await getTabInfoHandler();

      sendResponse(result);
    }catch(error) {
      if (isError(error)) {
        logError(`Error in getTabInfo at:${ new Date().toISOString()}`, error);
        sendResponse(failedResponse(error.message));
      }
    }

  } else if (type === MessageTypes.activityUpdate) {
    await timeTracking.updateActivityStatus(payload.isActive);
    sendResponse(successResponse<PayloadOf<ActivityUpdateResponse>>({isActive: payload.isActive}));
  }
}
