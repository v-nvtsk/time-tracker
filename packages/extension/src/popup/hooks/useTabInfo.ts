import {
  useEffect, useState
} from 'react';
import {
  GetTabInfoResponse,
  MessageTypes,
  TabInfo
} from '../../common/types';
import {logError} from '../../common/utils';

export const useTabInfo = () => {
  const [tabInfo, setTabInfo] = useState<Partial<TabInfo>>({});

  useEffect(() => {

    chrome.runtime.sendMessage(
      {type: MessageTypes.getTabInfo},
      (response:GetTabInfoResponse) => {
        if (chrome.runtime.lastError) {
          logError(`Failed request tab data ${chrome.runtime.lastError.message}`);

          return;
        }
        setTabInfo(response.payload || {});
      });
  }, []);

  return [tabInfo] as const;
};
