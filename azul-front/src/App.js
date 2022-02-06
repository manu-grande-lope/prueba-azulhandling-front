import './App.css';
import Header from './components/header/index.jsx';
import {Grid }from "@mui/material";
import InputFlights from './components/inputFlight';
import DataGrab from './components/table/index.jsx';


function App() {
  return (
    <Grid xl={12}>
      <Header/>
      <DataGrab/>
    </Grid>
  );
}

export default App;
