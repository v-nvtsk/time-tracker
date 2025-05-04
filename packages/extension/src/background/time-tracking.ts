import {
  MINIMUM_ACTIVITY_PERIOD, UNKNOWN_HOST
} from "../common/constants";
import {Store} from "../common/types";
import {
  getHostFromUrl, logError
} from "../common/utils";
import {activityApi} from "./api";

type HostTime = number;

export class TimeTracking {
  private isTimerEnabled: boolean = false;

  // private hosts: {[host: string]: HostTime} = {};

  private activeHost: {
    hostname: string,
    uri?: string,
    totalTime: HostTime
    activityStartTime: number
    isActive: boolean
  } | null = null;

  constructor(){
    this.initialize();
  }

  private async initialize(){
    const result = await chrome.storage.local.get<Store>('token');
    const isAuthenticated = result?.token || false;

    if (isAuthenticated){
      this.enable();
    }
  }

  public async enable(){
    if (this.isTimerEnabled){
      return;
    }
    try {
      chrome.tabs.onActivated.addListener(this.onTabActivated.bind(this));
      chrome.tabs.onUpdated.addListener(this.onTabUpdated.bind(this));
      chrome.tabs.onRemoved.addListener(this.onTabRemoved.bind(this));
      this.isTimerEnabled = true;
      await this.updateActivityStatus(true);
    } catch (error) {
      logError('Failed to load saved data:', error);
    }
  }

  public async disable(){
    this.isTimerEnabled = false;
    this.activeHost = null;
    await this.updateActivityStatus(false);
    chrome.tabs.onActivated.removeListener(this.onTabActivated);
    chrome.tabs.onUpdated.removeListener(this.onTabUpdated);
    chrome.tabs.onRemoved.removeListener(this.onTabRemoved);
  }

  private async onTabActivated(_activeInfo: chrome.tabs.TabActiveInfo) {
    try {
      await this.updateActivityStatus(true);
    } catch (e: unknown) {
      logError('Failed to activate tab tracking:', e);
    }
  }

  private async onTabUpdated(_tabId: number, _changeInfo: object, _tab: chrome.tabs.Tab) {
    try {
      await this.updateActivityStatus(true);
    } catch (e) {
      logError('Failed to update tab tracking:', e);
    }

    return null;
  }

  private async onTabRemoved() {
    try {
      if (this.activeHost !== null) {
        await this.updateActivityStatus(false);
      }
    } catch (e) {
      logError('Failed to remove tab tracking:', e);
    }
  }

  public async updateActivityStatus(active: boolean) {
    if (!this.isTimerEnabled) {
      return;
    }

    const queryOptions = {
      active: true,
      lastFocusedWindow: true
    };
    const [activeTab] = await chrome.tabs.query(queryOptions);
    const hostname = activeTab
      ? getHostFromUrl(activeTab.url)
      : (this.activeHost?.hostname || UNKNOWN_HOST);
    const wasActive = this.activeHost?.isActive || false;
    //
    const APP_STARTING = !this.activeHost;
    const HOST_CHANGED = this.activeHost && hostname !== this.activeHost.hostname;
    const NO_ACTIVITY = wasActive && !active;
    const NEW_ACTIVITY = !wasActive && active;

    if (APP_STARTING) {
      this.restartTimer(hostname, activeTab.url);
    } else if (HOST_CHANGED){
      if (wasActive){
        await this.save();
      }
      this.restartTimer(hostname, activeTab.url);
    } else if (NO_ACTIVITY){
      await this.save();
    } else if (NEW_ACTIVITY){
      this.restartTimer(hostname, activeTab.url);
    }
  }

  private restartTimer(hostname:string, uri?:string) {
    this.activeHost = {
      hostname,
      uri,
      isActive: true,
      activityStartTime: Date.now(),
      totalTime: 0,
    };
  }

  public getTimeForHost(): number {

    if (!this.isTimerEnabled || !this.activeHost) {
      return 0;
    }

    const activeTime = this.activeHost.isActive ? Date.now() - this.activeHost.activityStartTime : 0;

    return activeTime;
  }

  private async save(): Promise<void> {
    if (this.activeHost === null){
      return;
    }
    try {
      const host = this.activeHost.hostname;

      if (this.activeHost.isActive){
        this.activeHost.totalTime += (Date.now() - this.activeHost.activityStartTime);
        this.activeHost.isActive = false;
      }
      if (this.activeHost.totalTime > MINIMUM_ACTIVITY_PERIOD){
        await activityApi.createActivity({
          description: `Time tracking for ${this.activeHost.uri}`,
          timeSpent: this.activeHost.totalTime,
          resourceIdentifier: host,
          resourceType: 'web'
        });
      }
    } catch (e) {
      logError('Failed to save data:', e);
    }
  }
}
export const timeTracking = new TimeTracking();
