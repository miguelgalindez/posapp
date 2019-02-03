import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core"
import OAuth from "./oAuth";
import { AccountCircle, Lock } from "@material-ui/icons"
import { withStyles } from "@material-ui/core/styles"
import LoginStyles from "./styles"
import { Divider, Input } from "../utils";

const styles = theme => LoginStyles(theme)

class SignIn extends Component {

    state = {
        paths: {
            usernameOrEmail: undefined,
            password: undefined
        }
    }

    handleChange = (path, value) => {
        const paths = {
            ...this.state.paths,
            [path]: value
        }

        this.setState({ paths })
    }

    render() {
        const { classes, socket } = this.props
        const oAuthHeader = <Typography variant="h6" gutterBottom>Connect with</Typography>
        const oAuthFooter = <Divider text="Or be classical" marginTop={2} marginBottom={2} />
        return (
            <Fragment>
                {socket
                    ? <OAuth
                        gridContainerClassName={classes.form}
                        socket={socket}
                        header={oAuthHeader}
                        footer={oAuthFooter}
                    />
                    : null
                }
                <form
                    className={`${classes.centeredFlex} ${classes.form}`} autoComplete="off">
                    <Input
                        name="usernameEmail"
                        label="Username or Email"
                        type="text"
                        //value={this.state.paths.usernameOrEmail}                        
                        onChange={this.handleChange}
                        className={classes.formField}
                        icon={<AccountCircle className={classes.formFieldIcon} />}
                    />

                    <Input
                        name="password"
                        label="Password"
                        type="password"
                        //value={this.state.paths.password}                        
                        onChange={this.handleChange}
                        className={classes.formField}
                        icon={<Lock className={classes.formFieldIcon} />}
                    />


                    <Typography
                        component={Link}
                        to="/passwordReset"
                        className={classes.formLink}
                    >
                        Forgot password?
                    </Typography>


                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.formButton}
                    >
                        Sign in
                    </Button>

                    <Typography>
                        Don't have an account? &nbsp;
                    </Typography>
                    <Typography
                        component={Link}
                        to="/signUp"
                        className={classes.formLink}
                    >
                        Sign up
                    </Typography>
                </form>
            </Fragment>
        )
    }
}

export default withStyles(styles)(SignIn);