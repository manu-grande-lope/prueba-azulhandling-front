

import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MenuDrawer from "../drawer";

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
            sx={{ mr: 10 }}
          >
            <MenuDrawer sx={{color: 'alert'}}/>
            <MenuIcon />
          </IconButton>
          <IconButton size="large" aria-label="search" color="inherit">
            <SearchIcon />
          </IconButton>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}