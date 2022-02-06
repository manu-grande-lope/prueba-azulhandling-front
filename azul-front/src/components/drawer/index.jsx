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

        const [flightNumberReg, setflightNumberReg] = useState("")
        const [regReg, setRegReg] = useState("")
        const [airportReg, setAirportReg] = useState("")
        const [ailineReg, setAirlineReg] = useState("")
        const [statusReg, setStatusReg] = useState("")

        return (
            <div>
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

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 100 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List sx={{ mt: 3 }}>
                <ListItem disablePadding>
                    <ListItemButton >
                        <ListItemIcon>
                            < AddCircleOutlineIcon sx={{ ml: 2.5 }} />
                        </ListItemIcon>
                        <FormDialog />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            < LinkIcon sx={{ ml: 2.5 }} />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            < LockIcon sx={{ ml: 2.5 }} />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            < ListAltIcon sx={{ ml: 2.5 }} />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div className='drawer_style'>
            {[""].map((anchor) => (
                <Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
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
