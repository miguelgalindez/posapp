import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core"
import { red, white } from "@material-ui/core/colors"

const theme = createMuiTheme({
    palette: {
        primary: white,
        secondary: red,
        type: "dark"
    },
    typography: {
        useNextVariants: true,
    }
})

console.log("[src/index.js]: theme", theme)

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>, document.getElementById('root'));
