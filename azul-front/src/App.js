import './App.css';
import DataGrab from "./components/table/index.jsx";
import {Grid }from "@mui/material";
import ThemeProvider from './components/theme/theme-provider';


function App() {
  return (
    <ThemeProvider>
    <Grid xl={12}>
      <DataGrab/>
    </Grid>
    </ThemeProvider>
  );
}

export default App;
