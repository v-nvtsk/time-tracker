import {AxiosError} from "axios";
import {GetTabInfoResponse} from "../../common/types";
import {getHostFromUrl} from "../../common/utils/get-host-from-url";
import {activityApi} from "../api";
import {
  failedResponse, successResponse
} from "../response";

export async function getTabInfoHandler():Promise<GetTabInfoResponse> {
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });
  const activeTab = tabs[0];
  const host = getHostFromUrl(activeTab.url);

  try{
    const result = await activityApi.findActivities('today');

    if (!result.status){
      return failedResponse('Activities not found');
    }

    const spentToday = result.data.reduce((acc, el) => {
      return el.resource.uri === host ? acc + el.timeSpent : acc;
    }, 0);
  
    if (!activeTab || !activeTab.url || ! activeTab.title) {
      return failedResponse('No active tab');
    }

    return successResponse({
      url: activeTab.url!,
      title: activeTab.title!,
      host,
      totalTime: spentToday,
    });
  }catch(e: unknown){
    if (e instanceof AxiosError){
      if (e.status === 401){
        return failedResponse('Not authenticated');
      }}
      
    return failedResponse('Failed to get tab info');
  }
}