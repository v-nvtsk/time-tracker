import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import {styled,} from '@mui/material/styles';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {DRAWER_WIDTH} from '../../types/constants';
import {useAppDispatch} from '../store/hooks/use-app-dispatch';
import {selectAuth} from '../store/selectors';
import {authLogout} from '../store/slices/auth-slice';
import {LayoutBar} from './app-bar';
import {DrawerHeader} from './drawer-header';
import {DrawerList} from './drawer-list';

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{open?: boolean;}>(({theme}) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${DRAWER_WIDTH}px`,
  width: `calc(100% - ${DRAWER_WIDTH}px)`,
  variants: [
    {
      props: ({open}) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

export function Layout(props:React.PropsWithChildren) {
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const {isAuthenticated} = useSelector(selectAuth);
  const handleLoginClick = () => {
    navigate('/auth');
  };
  const handleLogoutClick = () => {
    appDispatch(authLogout());
    navigate('/');
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (

    <Box sx={{
      display: 'flex',
      flexGrow: 1
    }}>
      <CssBaseline />
      <LayoutBar
        handleLoginClick={handleLoginClick}
        handleDrawerOpen={handleDrawerOpen}
        open={open}
        handleLogoutClick={handleLogoutClick}
        isAuthenticated={isAuthenticated} />

      <DrawerList openHandler={setOpen} open={open} drawerWidth={DRAWER_WIDTH}/>

      <Main open={open}>
        <DrawerHeader />
        {props.children}
      </Main>
    </Box>

  );
}
