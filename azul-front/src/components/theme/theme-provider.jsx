import { useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeContext } from './theme-context';
import { myTheme, myDarkTheme } from './theme';


export default function ThemeProvider({ children }) {
    const [isDark, changeTheme] = useState(false);

    return (
        <ThemeContext.Provider value={[isDark, changeTheme]}>
            <MuiThemeProvider theme={isDark ? myDarkTheme : myTheme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    )
}