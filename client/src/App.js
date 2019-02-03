import React, { Component, Fragment } from 'react';
import { BrowserRouter } from "react-router-dom";
import Index from "./components/index"
import Home from "./components/home"
import { CssBaseline } from "@material-ui/core";

class App extends Component {

  state = {
    user: null
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <CssBaseline />
          { this.state.user 
            ? <Home user={this.state.user} /> 
            : <Index />
          }
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
