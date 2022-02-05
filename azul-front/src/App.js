import './App.css';
import Header from './components/header/index.jsx';
import TableFlights from './components/table/index.jsx'
import {Grid }from "@mui/material";

function App() {
  return (
    <Grid xl={12}>
      <Header/>
      <TableFlights/>
    </Grid>
  );
}

export default App;
