import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog() {
    const [open, setOpen] = useState(false);
    const [flightNumberReg, setflightNumberReg] = useState("")
    const [regReg, setRegReg] = useState("")
    const [airportReg, setAirportReg] = useState("")
    const [airlineReg, setAirlineReg] = useState("")
    const [statusReg, setStatusReg] = useState("")


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new flights to data base</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="number"
                        label="Flight number"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setflightNumberReg(e.target.value);
                        }}
                        
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="reg"
                        label="REG"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setRegReg(e.target.value);
                        }} 
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="airtport"
                        label="Airport / IATA code"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setAirportReg(e.target.value);
                        }}
                        
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="airline"
                        label="Airline"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setAirlineReg(e.target.value);
                        }} 
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="status"
                        label="Status"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setStatusReg(e.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>SEND</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
