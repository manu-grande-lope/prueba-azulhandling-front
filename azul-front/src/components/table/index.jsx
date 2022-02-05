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

    <div>
      <ul>
      {flights.departures?.map(data => <li>{data.departure.gate}</li>)}
      </ul>
    </div>
  )

};



// function createData(name, ATP, FlightNumber, Reg, Type) {
//   return { name, ATP, FlightNumber, Reg, Type };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// export default function TableFlights() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>INFO</TableCell>
//             <TableCell>ARRIVALS</TableCell>
//             <TableCell>DEPARTURES</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell>FLIGHTS</TableCell>
//             <TableCell align="right">ATP</TableCell>
//             <TableCell align="right">FlightNumber</TableCell>
//             <TableCell align="right">Reg</TableCell>
//             <TableCell align="right">Type</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow
//               key={row.name}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.name}
//               </TableCell>
//               <TableCell align="right">{row.ATP}</TableCell>
//               <TableCell align="right">{row.FlightNumber}</TableCell>
//               <TableCell align="right">{row.Reg}</TableCell>
//               <TableCell align="right">{row.Type}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
