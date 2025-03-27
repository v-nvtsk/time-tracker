import MenuIcon from '@mui/icons-material/Menu';
import {
  Box, Button, IconButton, styled, Toolbar, Typography
} from "@mui/material";
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import {Link} from "react-router";
import {DRAWER_WIDTH} from '../../types/constants';

interface AppBarProps extends MuiAppBarProps {open?: boolean;}
    
const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open',})<AppBarProps>(({theme}) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({open}) => open,
      style: {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: `${DRAWER_WIDTH}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

export const LayoutBar = ({
  handleDrawerOpen,
  handleLoginClick,
  handleLogoutClick,
  isAuthenticated,
  open,
}:{
  handleDrawerOpen: () => void,
  handleLoginClick: () => void,
  handleLogoutClick: () => void,
  isAuthenticated: boolean,
  open: boolean,
}) => {
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[
            {mr: 2,},
            open && {display: 'none'},
          ]}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap component="div">
          Site Time Tracker
        </Typography>
        <Box sx={{flexGrow: 1}} />
      
        <Box>
          {isAuthenticated ? (
            <>
              <Link
                to="/category" style={{
                  textDecoration: 'none',
                  color: 'inherit'
                }}>
                <Button color="inherit">Categories</Button>
              </Link>
      
              <Link
                to="/activity" style={{
                  textDecoration: 'none',
                  color: 'inherit'
                }}>
                <Button color="inherit">Activities</Button>
              </Link>
      
              <Link
                to="/resource" style={{
                  textDecoration: 'none',
                  color: 'inherit'
                }}>
                <Button color="inherit">Resources</Button>
              </Link>
      
              <Button color="inherit" onClick={handleLogoutClick}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={handleLoginClick}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
