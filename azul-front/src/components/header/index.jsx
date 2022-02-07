import { useState } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import MenuDrawer from "../drawer";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import './styles.css'
import { Stack, Typography, Button } from "@mui/material";

export default function Header() {

  function InputWithIcon() {
    return (
        <Box sx={{ display: 'flex'}} >
          <TextField 
          variant="standard" 
          color="input"
          sx={{width:"200px"}}
          focused/>
          <Button>
          <SearchIcon sx={{ my: 2 }} color="input" />
          </Button>
        </Box>
    );
  }
  
  function BasicDatePicker() {
    const [value, setValue] = useState(null);
  
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          color="input"
          renderInput={(params) => <TextField {...params} variant="standard" color="input"  focused className="date"/>}
        />
      </LocalizationProvider>
    );
  }
  
  
  
  
  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    alignItems: "flex-start",
    "@media all": {
      minHeight: 128
    }
  }));

  return (
    <div >
      <AppBar position="static">
        <StyledToolbar sx={{justifyContent:'space-between', gap:'30px', alignItems:'flex-end'}}>
          <Stack direction="row" gap="50px" ml={8} alignItems="baseline" mb={3}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ }}
          >
            <MenuDrawer/>
          </IconButton>
          <BasicDatePicker/>
          <InputWithIcon sx={{}}/>
          </Stack>
          <Typography variant="h1" color="input" component="h1" fontSize={60} sx={{color:'white', marginRight:"40px"}}>
            ARRIVALS
          </Typography>
          </StyledToolbar>
      </AppBar>
    </div>
  );
}









 
