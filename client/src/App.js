import React, { Component, Fragment } from 'react';
import { BrowserRouter } from "react-router-dom";
import Login from "./components/login"
import { CssBaseline } from "@material-ui/core";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <CssBaseline />
          <Login />
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
