import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LinkIcon from '@mui/icons-material/Link';
import LockIcon from '@mui/icons-material/Lock';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useState, Fragment } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import './style.css';



export default function MenuDrawer() {
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function FormDialog() {


        const setNewFlight = (event) => {
            event.preventDefault();
            console.log(event.target.number.value)
            const options = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        FlightNumber: event.target.number.value === "" ? 0 : event.target.number.value,
                        REG: event.target.reg.value === "" ? 0 : event.target.number.value,
                        IATA:  event.target.iata.value === "" ? 0 : event.target.iata.value,
                        Airline: 123,
                        Arrival: 123,
                    }
                )
            }
            fetch('http://localhost:3050/createflight', options)
                .then(r => {
                    console.log(r)
                    return r.json
                })
            handleClose();
        }


        // const [flightNumberReg, setflightNumberReg] = useState("")
        // const [regReg, setRegReg] = useState("")
        // const [airportReg, setAirportReg] = useState("")
        // const [airlineReg, setAirlineReg] = useState("")
        // const [arrivalReg, setArrivalReg] = useState("")

        return (
            <div>
                
                    <Dialog open={open} onClose={handleClose}>
                    <form onSubmit={setNewFlight}>
                        <DialogTitle>Add new flights to data base</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="number"
                                name='number'
                                label="Flight number"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="reg"
                                name='reg'
                                label="REG"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="airtport"
                                name="iata"
                                label="Airport / IATA code"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="airline"
                                label="Airline"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="status"
                                label="Status"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type='submit' >SEND</Button>
                        </DialogActions>
                        </form>
                    </Dialog>
            </div>
        );
    }

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 100, backgroundColor: "#EBC431", height: '100vh' }}
            role="presentation"
            color="main"
        >
            <List sx={{ mt: 20 }}>
                <ListItem disablePadding>
                    <ListItemButton >
                        <ListItemIcon>
                            < AddCircleOutlineIcon sx={{ ml: 2.5, mb: 5 }} fontSize="large" color="input" onClick={handleClickOpen} />
                        </ListItemIcon>
                        <FormDialog />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            < LinkIcon sx={{ ml: 2.5, mb: 5 }} fontSize="large" color="icons" />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            < LockIcon sx={{ ml: 2.5, mb: 5 }} fontSize="large" color="icons" />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            < ListAltIcon sx={{ ml: 2.5, mb: 5 }} fontSize="large" color="icons" />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            {["MENÚ"].map((anchor) => (
                <Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)} color="input" variant="outlined" color="input">{anchor}</Button>
                    <Drawer
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </Fragment>
            ))}
        </div>
    );
}
