import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { Fragment } from 'react';
import { useState } from 'react';
import TablePagination from '@mui/material/TablePagination';

export default function DataGrab() {

  const [flights, getNewFlights] = useState({});

useEffect(()=>{

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
      getNewFlights({ ...data })})
    .catch(err => {
      console.error(err);
    });
  console.log("UseE funciona")

},[]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>INFO</TableCell>
            <TableCell>ARRIVALS</TableCell>
            <TableCell>DEPARTURES</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>FLIGHTS</TableCell>
            <TableCell align="right">ATP</TableCell>
            <TableCell align="right">FlightNumber</TableCell>
            <TableCell align="right">Reg</TableCell>
            <TableCell align="right">Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flights.departures?.map((data, index) => (
            <TableRow
            key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {data.number}
              </TableCell>
              <TableCell align="right">{data.airport}</TableCell>
              <TableCell align="right">{data.callsign}</TableCell>
              <TableCell align="right">{data.status}</TableCell>
              <TableCell align="right">{data.airline}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
