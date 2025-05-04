import {
  MessageResponses, Messages,
} from "../common/types";
import {logError} from "../common/utils";
import {messageListener} from "./messaging";
import {refreshSessionHandler} from "./messaging/auth-handler";

export async function initBackground(){

  chrome.runtime.onMessage.addListener(
    (
      message: Messages,
      _sender: chrome.runtime.MessageSender,
      sendResponse: (response: MessageResponses) => void
    ) => {
      messageListener(message, _sender, sendResponse);

      return true;
    });
  try{
    await refreshSessionHandler();
  }catch{
    logError('Failed to refresh session');
  }
}
