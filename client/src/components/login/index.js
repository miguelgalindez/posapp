import React, { Component } from "react"
import { Switch, Route } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles"
import { Paper, Hidden, Grid, Typography } from "@material-ui/core"
import SignIn from "./signIn"
import SignUp from "./signUp"
import PasswordReset from "./passwordReset"
import { LandingPage } from "../layouts";
import LoginStyles from "./styles";
import { NotFound } from "../errors";

const styles = theme => LoginStyles(theme)

class LoginPage extends Component {
    render() {
        const { classes } = this.props
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
                                <Route exact path="/" component={SignIn} />
                                <Route exact path="/signIn" component={SignIn} />
                                <Route exact path="/signUp" component={SignUp} />
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