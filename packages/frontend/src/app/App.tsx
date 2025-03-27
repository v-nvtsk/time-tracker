import {
  Drawer, Grid2,
  ThemeProvider,
} from '@mui/material';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {AppRouter} from './app-router';
import {darkTheme} from './layout/themes';
import {useAppDispatch} from './store/hooks/use-app-dispatch';
import {selectAuth} from './store/selectors';
import {updateSession} from './store/slices/auth-slice';

export function App() {
  const appDispatch = useAppDispatch();
  const{
    isAuthenticated, isLoading, isInitialized
  } = useSelector(selectAuth);

  useEffect(() => {
    appDispatch(updateSession());
  }, []);

  return <>
    <ThemeProvider theme={darkTheme}>
      <Grid2 container typography={{fontFamily: 'Roboto'}} height={'100vh'} padding={0} margin={0}>
        <Drawer
          variant="temporary"
          ModalProps={{keepMounted: true,}} />
        {isInitialized &&
        <AppRouter
          isLoading={isLoading}
          isAuthenticated={isAuthenticated}
        />}
      </Grid2>
    </ThemeProvider>

  </>;
}
