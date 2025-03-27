import {selectAuth} from "@app/store/selectors";
import {
  authLogin, authRegister
} from "@app/store/slices/auth-slice";
import {
  Button,
  FormControl, InputLabel, Link, MenuItem, Paper, Select, TextField, Typography
} from "@mui/material";
import {
  Box, styled,
  useTheme
} from '@mui/system';
import {
  FormEvent,
  MouseEvent,
  useEffect,
  useRef, useState
} from "react";
import {useSelector} from "react-redux";
import {
  useNavigate, useSearchParams
} from "react-router";
import {useAppDispatch} from "../../store/hooks/use-app-dispatch";

const AuthContainer = styled(Paper)(({theme}) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: '400px',
}));

interface AuthFormProps {
  isLogin: boolean;
  errorMessage?: string;
  toggleAuth: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  form: {
    username: React.RefObject<HTMLInputElement>;
    password: React.RefObject<HTMLInputElement>;
    role?: React.RefObject<HTMLSelectElement>;
  };
}

export const AuthPage = () => {
  const theme = useTheme();

  theme.applyStyles('light', {palette: {mode: 'light',},});

  const dispatch = useAppDispatch();
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();
  const [searchparams] = useSearchParams();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState('');
  const form = {
    username: useRef<HTMLInputElement>(null),
    password: useRef < HTMLInputElement>(null),
    role: useRef<HTMLSelectElement>(null)
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(searchparams.get("redirect") || '/');
    }
    if (auth.errorState.isError){
      setErrorMessage(auth.errorState.errorMessage);
    }
  }, [auth.errorState.isError, auth.errorState.errorMessage, auth.isAuthenticated, searchparams, navigate]);

  function signin() {
    if (form.username.current?.value && form.password.current?.value)
    {
      dispatch(authLogin({
        username: form.username.current.value,
        password: form.password.current.value
      }));
    }
  }

  function signup() {
    if (form.username.current?.value && form.password.current?.value && form.role.current?.value) {
      dispatch(authRegister({
        username: form.username.current?.value,
        password: form.password.current?.value,
      }));
    } }

  function toggleAuth(event:MouseEvent) {
    event.preventDefault();
    setIsLogin(!isLogin);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isLogin) {
      signin();
    } else {
      signup();
    }
  }

  return (
    <Paper elevation={3} sx={{
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Box
        width={'100%'}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          bgcolor: 'text.secondary',
        }}
      >
        <AuthContainer elevation={3}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            {isLogin ? 'Вход' : 'Регистрация'}
          </Typography>

          <form onSubmit={handleSubmit}>
            {errorMessage && (
              <Typography color="error" align="center">
                {errorMessage}
              </Typography>
            )}

            <FormControl fullWidth margin="normal">
              <TextField
                id="username"
                inputRef={form.username}
                label="Имя пользователя"
                variant="outlined"
                required
                fullWidth
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                id="password"
                inputRef={form.password}
                label="Пароль"
                type="password"
                variant="outlined"
                required
                fullWidth
              />
            </FormControl>
          
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{mt: 2}}
            >
              {isLogin ? 'Вход' : 'Регистрация'}
            </Button>
          </form>

          <Typography align="center" sx={{mt: 3}}>
            {isLogin ? 'Ещё нет аккаунта? ' : 'Уже есть аккаунт? '}
            <Link
              component="button"
              onClick={toggleAuth}
              underline="hover"
            >
              {isLogin ? 'Регистрация' : 'Вход'}
            </Link>
          </Typography>
        </AuthContainer>
      </Box>
    </Paper>
  );
};
