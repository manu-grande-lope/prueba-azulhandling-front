import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import './styles.css'



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
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'right',
  },
];

export default function DataGrab() {
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


  useEffect(() => {

    fetch("https://aerodatabox.p.rapidapi.com/flights/airports/icao/EHAM/2021-10-04T20:00/2021-10-05T08:00?withLeg=true&withCodeshared=true&withLocation=true", {
  "method": "GET",
  "headers": {
    "x-rapidapi-host": "aerodatabox.p.rapidapi.com",
    "x-rapidapi-key": "d63cd9227bmsh7f6ad6d7a23b766p177e0bjsn48cdec68e4da"
  }
})
  .then(response => {
    console.log(response);
    return response.json()
  })
  .then(data => {
    console.log(data)
    console.log("Consigo data")
    getNewFlights({ ...data })
  })
  .catch(err => {
    console.error(err);
  });



//     const interval = setInterval(()=>{
  
//       fetch("https://aerodatabox.p.rapidapi.com/flights/airports/icao/EHAM/2021-10-04T20:00/2021-10-05T08:00?withLeg=true&withCodeshared=true&withLocation=true", {
//   "method": "GET",
//   "headers": {
//     "x-rapidapi-host": "aerodatabox.p.rapidapi.com",
//     "x-rapidapi-key": "d63cd9227bmsh7f6ad6d7a23b766p177e0bjsn48cdec68e4da"
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

  
// }, 1000) 
// console.log(interval+1)




  }, []);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={2}>
      <TableContainer sx={{ maxHeight: '80vh' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow className='tableRow_styles'>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {flights.arrivals
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row) => {
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
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                );
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
  );
  // <div>
  //   <ul>
  //   {flights.arrivals?.map(data  => <li>{data.number} - {data.aircraft.reg} - {data.departure.airport.iata} - {data.arrival.scheduledTimeLocal} - {data.status}</li>)}
  //   </ul>
  // </div>
  // )
};
