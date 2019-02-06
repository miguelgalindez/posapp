import React, { Component, Fragment } from 'react';
import { BrowserRouter } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Index from "./components/index"
import Home from "./components/home"
import { CssBaseline } from "@material-ui/core";
/**
 * TODO: Put environmentvariables into the context and remove 
 * all the additional imports for the config file
 * 
 * TODO: move config folder outside src directory. Files inside
 * src folder will no longer need import these files
 */
import { EnvironmentVariables } from "../src/config";

const apolloClientForIndexQueries = new ApolloClient({
  uri: EnvironmentVariables.apiUrl+"/"+EnvironmentVariables.graphql.indexQueriesPath
})

class App extends Component {

  state = {
    user: null
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <CssBaseline />
          {this.state.user
            ? <Home user={this.state.user} />
            : (
              <ApolloProvider client={apolloClientForIndexQueries}>
                <Index />
              </ApolloProvider>
            )
          }
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
