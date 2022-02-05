import './App.css';
import Header from './components/header/index.jsx';
import TableFlights from './components/table/index.jsx'
import {Grid }from "@mui/material";
import InputFlights from './components/inputFlight';

function App() {
  return (
    <Grid xl={12}>
      <Header/>
      <InputFlights/>
      <TableFlights/>
    </Grid>
  );
}

export default App;
