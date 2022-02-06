import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MenuDrawer from "../drawer";
import TextField from '@mui/material/TextField';
import './styles.css'


function InputWithIcon() {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <SearchIcon sx={{ color: 'white', mr: 1, my: 0.1 }} />
        <TextField id="input-with-sx" label="Search flights" variant="standard" sx={{color:'white'}} />
      </Box>
    </Box>
  );
}


const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  "@media all": {
    minHeight: 128
  }
}));

export default function Header() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <StyledToolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 12 }}
          >
            <MenuIcon />
            <MenuDrawer/>
          </IconButton>
          <InputWithIcon/>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}