import {useEffect} from 'react';
import {APP_NAME} from '../common/constants';
import {Auth} from './auth';
import {useAuth} from './hooks/useAuth';
import {useTabInfo} from './hooks/useTabInfo';
import {formatTime} from './utils/format-time';

export const Popup: React.FC = () => {
  const[isAuthenticated, refreshAuth, login, logout] = useAuth();
  const [tabInfo] = useTabInfo();

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
      }}
    >
      <h1>{APP_NAME}</h1>

      {isAuthenticated ?
        <>
          <button onClick={logout}>Logout</button>
          <p>Заголовок: {tabInfo.title || 'Загрузка...'}</p>
          <p>Сайт: {tabInfo.host || 'Загрузка...'}</p>
          <p>Сегодня на сайте {tabInfo.host || 'Загрузка...'}</p>
          <p>проведено : {formatTime(tabInfo.totalTime) || 'Загрузка...'}</p>
        </>
        : <Auth onLogin={login} />}

    </div>
  );
};