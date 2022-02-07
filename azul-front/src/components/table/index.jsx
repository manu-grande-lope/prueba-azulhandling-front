import * as React from 'react';
import { useEffect } from 'react';
import { useState, Fragment } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import './styles.css'
import './stylesHeader.css'
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
import { Stack, Typography, Button } from "@mui/material";

let flightsArray;

const columns = [
  { id: 'number', label: 'Flight Number', minWidth: 70 },
  { id: 'reg', label: 'REG', minWidth: 70 },
  {
    id: 'airport',
    label: 'Airport',
    minWidth: 70,
    align: 'right',
  },
  {
    id: 'name',
    label: 'Airline',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'scheduledTimeLocal',
    label: 'LLEGADA',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'right',
  },
];

export default function DataGrab() {



function Header() {

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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const [flights, getNewFlights] = useState({});
  let counter = 0;

  useEffect(() => {

//     fetch("https://aerodatabox.p.rapidapi.com/flights/airports/icao/EHAM/2021-10-04T20:00/2021-10-05T08:00?withLeg=true&withCodeshared=true&withLocation=true", {
//   "method": "GET",
//   "headers": {
//     "x-rapidapi-host": "aerodatabox.p.rapidapi.com",
// 		"x-rapidapi-key": "4f5232af4fmsh9937a0de3c3ff18p15717djsn4ebda98056fa"
//   }
// })
//   .then(response => {
//     console.log(response);
//     return response.json()
//   })
//   .then(data => {
    
//     console.log(data)
//     console.log("Consigo data")
//     getNewFlights({ ...data })
//   })
//   .catch(err => {
//     console.error(err);
//   });

 


const interval = setInterval(()=>{
  
  fetch("https://aerodatabox.p.rapidapi.com/flights/airports/icao/EHAM/2021-10-04T20:00/2021-10-05T08:00?withLeg=true&withCodeshared=true&withLocation=true", {
  "method": "GET",
  "headers": {
    "x-rapidapi-host": "aerodatabox.p.rapidapi.com",
	"x-rapidapi-key": "4f5232af4fmsh9937a0de3c3ff18p15717djsn4ebda98056fa"
  }
})
  .then(response => {
    return response.json()
  })
  .then(data => {
    console.log(flightsArray)
    const filtered = data.arrivals.filter(e => flightsArray?.indexOf(e) === -1)
      console.log(filtered)
    getNewFlights({ ...data })
    flightsArray = data.arrivals;
  })
  .catch(err => {
    console.error(err);
  });

  
}, 5000)
  }, []);

  return (
    <Fragment>
    <Header/>
    <div className='div_flex'>
    <Paper sx={{ width: '95%', overflow: 'hidden', mt:"20px"}} elevation={2}>
      <TableContainer sx={{ maxHeight: '80vh' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className='tableRow_styles'>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{backgroundColor:"#EBC431", color:"#ffffff", fontSize:"20px"}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {flights.arrivals
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, index) => {
                if (index > counter){
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.number} >
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.label === 'Airline') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {row.airline.name}
                            </TableCell>
                          );
                        }
                        if (column.label === 'Airport') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {row.departure.airport?.iata}
                            </TableCell>
                          );
                        }
                        if (column.label === 'REG') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {row.aircraft.reg}
                            </TableCell>
                          );
                        }
                        if (column.label === 'LLEGADA') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {row.arrival.scheduledTimeLocal}
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  );
                }else{
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.number}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        console.log(column.id)
                        if (column.label === 'Airline') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {row.airline.name}
                            </TableCell>
                          );
                        }
                        if (column.label === 'Airport') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {row.departure.airport?.iata}
                            </TableCell>
                          );
                        }
                        if (column.label === 'REG') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {row.aircraft.reg}
                            </TableCell>
                          );
                        }
                        if (column.label === 'LLEGADA') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {row.arrival.scheduledTimeLocal}
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  );
                }
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={flights.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
    </Fragment>
  );
};
