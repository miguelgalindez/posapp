import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core"
import { teal, red } from "@material-ui/core/colors"

const theme = createMuiTheme({
    palette: {
        primary: teal,
        secondary: red,
        type: "dark"
    },
    typography: {
        useNextVariants: true,
    }
})

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>, document.getElementById('root'));
