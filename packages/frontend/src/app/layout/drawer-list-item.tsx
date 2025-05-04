import {
  ListItem,
  ListItemButton, ListItemText
} from "@mui/material";
import {Link} from "react-router";

export const DrawerListItem = ({
  text, link
}:{
  text: string,
  link: string
}) => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <Link
          to={link} style={{
            textDecoration: 'none',
            color: 'inherit',
            width: '100%'
          
          }}>
          <ListItemText primary={text}/>
        </Link>
      </ListItemButton>
    </ListItem>
  );
};
