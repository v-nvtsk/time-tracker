import {
  Box, Button, Paper, styled, Typography
} from '@mui/material';
import {useNavigate} from 'react-router';

const MainContent = styled(Box)(({theme}) => ({
  padding: theme.spacing(4),
  maxWidth: '50%',
  minWidth: '300px',
  margin: '0 auto',
  textAlign: 'center',
}));
const TextBlock = styled(Box)(({theme}) => ({
  margin: theme.spacing(4, 0),
  textAlign: 'left',
}));
const HighlightText = styled('span')(({theme}) => ({
  color: theme.palette.primary.main,
  fontWeight: 500,
}));
const CtaBlock = styled(Box)(({theme}) => ({marginTop: theme.spacing(4),}));

export const Promo = () => {
  const navigate = useNavigate();
  const openRegistration = () => {
    navigate('/auth');
  };

  return (
    <Paper elevation={3} sx={{
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <MainContent>
        <Typography variant="h3" component="h1" gutterBottom sx={{fontWeight: 700}}>
          Site Time Tracker — твой проводник во времени
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" >
          Следи за своими минутами, управляй своей жизнью
        </Typography>

        <TextBlock>
          <Typography padding={2}>
            Время — наш самый ценный ресурс, но как часто оно ускользает незаметно?
            Часы на бесконечный скроллинг в соцсетях, отвлечения, пустые дела — и вот уже день прошёл,
            а ты не успел того, что действительно важно. Знакомо?
          </Typography>

          <Typography padding={2}>
            <HighlightText>Site Time Tracker</HighlightText> меняет правила игры.
            Это не просто трекер — это твой личный помощник, который показывает, куда уходят твои часы.
            С ним ты поймёшь, сколько времени уходит на работу, сколько на отдых,
            а сколько просто растворяется в рутине.
          </Typography>

          <Typography padding={2}>
            Представь: ты видишь, что тратишь 3 часа в день на прокрастинацию, и решаешь сократить это до часа.
            А освободившееся время отдаёшь проекту, о котором давно мечтал, или просто прогулке на свежем воздухе.
            Делу — время, потехе — час. С <HighlightText> Site Time Tracker </HighlightText>
            ты находишь баланс и возвращаешь себе контроль.
          </Typography>

          <Typography padding={2}>
            Начни сегодня — узнай, как твои привычки формируют твою жизнь.
            Один клик, и ты уже на пути к тому, чтобы стать хозяином своего времени. Попробуй прямо сейчас!
          </Typography>
        </TextBlock>

        <CtaBlock>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={openRegistration}
            sx={{
              padding: '12px 32px',
              fontSize: '1.1rem',
              borderRadius: '8px'
            }}
          >
            Попробовать бесплатно
          </Button>
        </CtaBlock>
      </MainContent>
    </Paper>
  );
};