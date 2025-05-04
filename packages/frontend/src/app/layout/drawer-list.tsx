import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {ListSubheader,} from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import {useTheme} from '@mui/material/styles';
import {DrawerHeader} from './drawer-header';
import {DrawerListItem} from './drawer-list-item';

export const DrawerList = ({
  openHandler, open, drawerWidth
}: {
  openHandler: (value:boolean) => void,
  open: boolean,
  drawerWidth: number
}) => {
  const theme = useTheme();
  const handleDrawerClose = () => {
    openHandler(false);
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>

      <Divider />

      <List>
        <ListSubheader>Отчёт</ListSubheader>

        <DrawerListItem text="Все" link="/report"/>
        <DrawerListItem text="Сегодня" link="/report?period=today"/>
        <DrawerListItem text="Неделя" link="/report?period=week"/>
        <DrawerListItem text="Месяц" link="/report?period=month"/>
        <DrawerListItem text="Год" link="/report?period=year"/>

        <ListSubheader>Активности</ListSubheader>
        <DrawerListItem text="Все" link="/activity"/>
        <DrawerListItem text="Сегодня" link="/activity?period=today"/>
        <DrawerListItem text="Неделя" link="/activity?period=week"/>
        <DrawerListItem text="Месяц" link="/activity?period=month"/>
        <DrawerListItem text="Год" link="/activity?period=year"/>
      </List>

      <Divider/>
      <DrawerListItem text="Ресурсы" link="/resource"/>

      <Divider />
      <DrawerListItem text="Категории" link="/category"/>
      <Box flexGrow={1}/>
      <Divider/>
      {/* <FormControlLabel sx={{padding: 2}}
        control={
          <Switch checked={darkTheme} onChange={handleThemeChange} name="theme" />
        }
        label={darkTheme ? "Темная тема" : "Светлая тема"}
      /> */}
    </Drawer>
  );
};
