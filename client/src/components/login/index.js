import React, { Component } from "react"
import io from "socket.io-client"
import { Switch, Route } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles"
import { Paper, Hidden, Grid, Typography } from "@material-ui/core"
import SignIn from "./signIn"
import SignUp from "./signUp"
import PasswordReset from "./passwordReset"
import { LandingPage } from "../layouts";
import LoginStyles from "./styles";
import { NotFound } from "../errors";
import { EnvironmentVariables } from "../../config/";
const styles = theme => LoginStyles(theme)
const socketEvents=["connect", "connect_error", "connect_timeout", "error", "disconnect", "reconnect", "reconnect_attempt", "reconnecting", "reconnect_error", "reconnect_failed"]

class LoginPage extends Component {
    state = {
        socket: null
    }

    async componentDidMount() {
        const socketsManager = await  new io.Manager(EnvironmentVariables.apiUrl, { path: '/socket.io' })
        const authSocket = await socketsManager.socket(EnvironmentVariables.authIoNamespace)
        await socketEvents.forEach(event => {
            authSocket.on(event, this.updateSocket(authSocket))
        })        
    }
    
    async componentWillUnmount(){
        await socketEvents.forEach(event => {
            this.state.socket.removeAllListeners(event)
        })
    }

    updateSocket = socket => () => {
        this.setState({ socket })
    }

    render() {
        const { classes } = this.props
        const { socket } = this.state
        return (
            <LandingPage>
                <Grid container direction="row" className={classes.container}>
                    <Hidden only="xs">
                        <Grid item sm={4} md={8}>
                            <Paper className={classes.container}>
                                <Typography variant="h5">
                                    Some text
                                    </Typography>
                            </Paper>
                        </Grid>
                    </Hidden>
                    <Grid item xs={12} sm={8} md={4} className={classes.container}>
                        <Paper className={classes.container}>
                            <Switch>
                                <Route exact path="/" render={() => <SignIn socket={socket} EnvironmentVariables={EnvironmentVariables} />} />
                                <Route exact path="/signIn" render={() => <SignIn socket={socket} EnvironmentVariables={EnvironmentVariables} />} />
                                <Route exact path="/signUp" render={() => <SignUp socket={socket} EnvironmentVariables={EnvironmentVariables} />} />
                                <Route exact path="/passwordReset" component={PasswordReset} />
                                <Route component={NotFound} />
                            </Switch>
                        </Paper>
                    </Grid>
                </Grid>
            </LandingPage>
        )
    }
}

export default withStyles(styles)(LoginPage);