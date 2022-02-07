import { createTheme } from '@mui/material/styles';

export const myTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#0C46BA'
        },
        secondary: {
            main: '#004ba0'
        },
        input: {
            main: '#ffffff'
        },
        alert: {
            main: '#fbc02d',
            delete: '#d84315'
        },
        icons:{
            main:'#546e7a'
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },

    spacing: (factor) => {

        return `${0.25 * factor}rem`
    }
});


myTheme.typography.h1 = {
    [myTheme.breakpoints.down('md')]: {
        fontSize: '4.5rem',
    },
};


myTheme.typography.h3 = {
    [myTheme.breakpoints.up('md')]: {
        fontSize: '2.4rem',
    },
};


myTheme.typography.h4 = {
    [myTheme.breakpoints.down('md')]: {
        fontSize: '1.5rem',
    },
};


export const myDarkTheme = createTheme({
    palette: {
        mode: 'dark'

    }
});



















