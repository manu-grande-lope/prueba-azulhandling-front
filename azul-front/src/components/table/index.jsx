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
import { Grid } from '@mui/material';
import { Stack, Typography, Button } from "@mui/material";


const columns = [
  { id: 'number', label: 'Flight Number', minWidth: 60 },
  { id: 'reg', label: 'REG', minWidth: 100 },
  {
    id: 'airport',
    label: 'Airport/IATA',
    minWidth: 60,
    align: 'center',
  },
  {
    id: 'name',
    label: 'Airline',
    minWidth: 60,
    align: 'center',
  },
  {
    id: 'scheduledTimeLocal',
    label: 'Expected time',
    minWidth: 60,
    align: 'right',
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 60,
    align: 'right',
  },
];

export default function DataGrab() {



  function Header() {

    function InputWithIcon() {
      return (
        <Box sx={{ display: 'flex', alignItems: "center" }} >
          <TextField
            variant="standard"
            color="input"
            sx={{ width: "200px" }}
            focused />
          <Button color="input" disableRipple={false} disableFocusRipple={true} variant="text" size='small'>
            <Typography ml={3} >Search flight</Typography>
            <SearchIcon sx={{ my: 2, ml: 3 }} color="input" />
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
            renderInput={(params) => <TextField {...params} variant="standard" color="input" focused className="date" sx={{ paddingLeft: "15px", paddingRight: "15px" }} />}
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
      <div className="appBar_style">
        <AppBar position="static" >
          <StyledToolbar sx={{ justifyContent: 'space-between', gap: '30px', alignItems: 'flex-end' }}>
            <Stack direction="row" gap="50px" ml={8} alignItems="baseline" mb={3}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{}}
              >
                <MenuDrawer />
              </IconButton>
              <BasicDatePicker />
              <InputWithIcon sx={{}} />
            </Stack>
            <Typography variant="h1" color="input" component="h1" fontSize={60} sx={{ color: 'primary', marginRight: "40px" }}>
              OPERATIONS
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

  const fetchFlights = async () => {
    try {
      const flightsData = await
        fetch("https://aerodatabox.p.rapidapi.com/flights/airports/icao/EHAM/2021-10-04T20:00/2021-10-05T08:00?withLeg=true&withCodeshared=true&withLocation=true", {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "aerodatabox.p.rapidapi.com",
            "x-rapidapi-key": "c27b645d30msh8c47d4c0bab782ep11153fjsndc1574745ef3"
          }
        })
          .then(response => {
            return response.json()
          })
          .then(data => {
            getNewFlights({ ...data })
            console.log(flights)
          })
    } catch (err) {
      console.error(err.message)
    }
  };

  useEffect(() => {

    fetchFlights()

    const interval = setInterval(() => {
      fetchFlights()
    }, 10000000)
    return () => interval

  }, []);

  return (
    <Fragment>
      <Header />
      <Grid item container className='tables_style'>
        <div className='div_table'>
          <Paper sx={{ width: '95%', overflow: 'hidden', mt: "20px" }} elevation={2}>
            <TableContainer sx={{ maxHeight: '75vh' }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: "#EBC431" }} >
                      <Typography variant="h6" color="input" fontSize={19} sx={{ marginRight: "40px" }}>
                        ARRIVALS
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ backgroundColor: "#EBC431" }} >
                    </TableCell>
                    <TableCell sx={{ backgroundColor: "#EBC431" }} >
                    </TableCell>
                    <TableCell sx={{ backgroundColor: "#EBC431" }} >
                    </TableCell>
                    <TableCell sx={{ backgroundColor: "#EBC431" }} >
                    </TableCell>
                    <TableCell sx={{ backgroundColor: "#EBC431" }} >
                    </TableCell>
                  </TableRow>
                  <TableRow className='tableRow_styles'>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        sx={{ backgroundColor: "#EBC431", color: "#ffffff", fontSize: "20px" }}
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
                      if (index > counter) {
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
                              if (column.label === 'Airport/IATA') {
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
                              if (column.label === 'Expected time') {
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
                      } else {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.number}>
                            {columns.map((column) => {
                              const value = row[column.id];
                              if (column.label === 'Airline') {
                                return (
                                  <TableCell key={column.id} align={column.align}>
                                    {row.airline.name}
                                  </TableCell>
                                );
                              }
                              if (column.label === 'Airport/IATA') {
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
                              if (column.label === 'Expected time') {
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
        <div className='div_table'>
          <Paper sx={{ width: '95%', overflow: 'hidden', mt: "20px" }} elevation={2}>
            <TableContainer sx={{ maxHeight: '75vh' }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: "#EBC431" }} >
                      <Typography variant="h6" color="input" fontSize={19} sx={{ marginRight: "40px" }}>
                        DEPARTURES
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ backgroundColor: "#EBC431" }} >
                    </TableCell>
                    <TableCell sx={{ backgroundColor: "#EBC431" }} >
                    </TableCell>
                    <TableCell sx={{ backgroundColor: "#EBC431" }} >
                    </TableCell>
                    <TableCell sx={{ backgroundColor: "#EBC431" }} >
                    </TableCell>
                    <TableCell sx={{ backgroundColor: "#EBC431" }} >
                    </TableCell>
                  </TableRow>
                  <TableRow className='tableRow_styles'>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        sx={{ backgroundColor: "#EBC431", color: "#ffffff", fontSize: "20px" }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {flights.departures
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    ?.map((row, index) => {
                      if (index > counter) {
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
                              if (column.label === 'Airport/IATA') {
                                return (
                                  <TableCell key={column.id} align={column.align}>
                                    {row.arrival.airport?.iata}
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
                              if (column.label === 'Expected time') {
                                return (
                                  <TableCell key={column.id} align={column.align}>
                                    {row.departure.scheduledTimeLocal}
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
                      } else {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.number}>
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
                              if (column.label === 'Expected time') {
                                return (
                                  <TableCell key={column.id} align={column.align}>
                                    {row.departure.scheduledTimeLocal}
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
      </Grid>
    </Fragment>
  );
};
