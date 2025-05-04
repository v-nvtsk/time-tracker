import {INACTIVITY_TIMEOUT} from '../common/constants';
import {
  ActivityUpdateResponse, MessageTypes
} from '../common/types';
import {logError} from '../common/utils';

class ContentScript {
  private events = ['mousemove', 'keydown', 'click', 'mousedown', 'touchstart', 'pointerdown', 'focus', 'blur', 'scroll', 'wheel', 'resize'];

  private port = chrome.runtime.connect();

  private timerId: NodeJS.Timeout | null = null;

  private isActive: boolean = false;

  private debouncedSendActivityUpdate: (isActive: boolean) => void;

  constructor() {
    this.debouncedSendActivityUpdate = this.debounce(this.sendActivityUpdateMessage.bind(this), 1000);
    this.port.onDisconnect.addListener(this.onPortDisconnect.bind(this));
    this.addListeners();
  }

  private onPortDisconnect() {
    setTimeout(() => {
      if (!chrome.runtime?.id) {
        this.removeListeners();
      }
    }, 1000);
  }

  private sendActivityUpdateMessage(isActive: boolean) {
    chrome.runtime.sendMessage(
      {
        type: MessageTypes.activityUpdate,
        payload: {isActive},
      },
      (response: ActivityUpdateResponse) => {
        if (!response.success || chrome.runtime.lastError) {
          this.removeListeners();
          logError(`Failed to send ACTIVITY_UPDATE: ${chrome.runtime.lastError}`);
        } else {
          this.isActive = isActive;
        }
      }
    );
  }

  private resetInactivityTimer() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(() => {
      if (this.isActive) {
        this.debouncedSendActivityUpdate(false);
      }
      this.timerId = null;
    }, INACTIVITY_TIMEOUT);
  }

  private handleActivity() {
    if (!this.isActive) {
      this.debouncedSendActivityUpdate(true);
    }
    this.resetInactivityTimer();
  }

  private debounce(func: (isActive: boolean) => void, wait: number) {
    let timeout: ReturnType<typeof setTimeout> | null;

    return (isActive: boolean) => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        func(isActive);
      }, wait);
    };
  }

  private addListeners() {
    this.events.forEach((event) => {
      document.addEventListener(event, this.handleActivity.bind(this));
    });
  }

  private removeListeners() {
    this.events.forEach((event) => {
      document.removeEventListener(event, this.handleActivity.bind(this));
    });
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
}

export function initContentScript() {
  if (!chrome || !chrome.runtime || !chrome.runtime.sendMessage) {
    console.error('Chrome runtime API is not available');
  } else {
    new ContentScript();
  }
}