import {Timer} from "@mui/icons-material";
import {
  AppBar, Box, Button, Toolbar, Typography
} from "@mui/material";
import {useSelector} from "react-redux";
import {
  Link, useNavigate
} from "react-router";
import {useAppDispatch} from "../../../store/hooks/use-app-dispatch";
import {selectAuth} from "../../../store/selectors";
import {authLogout} from "../../../store/slices/auth-slice";

export function Header() {
  const {isAuthenticated} = useSelector(selectAuth);
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate('/auth');
  };
  const handleLogoutClick = () => {
    appDispatch(authLogout());
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Link
          to="/" style={{
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            alignItems: 'center'
          }}>
          <Timer sx={{
            color: 'red',
            transform: 'scale(1.5)',
            marginRight: '8px'
          }} />

          <Typography variant="h6" component="div">
            Time Tracker
          </Typography>
        </Link>

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
                to="/resources" style={{
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
}