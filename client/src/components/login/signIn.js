import React, { Component } from "react"
import { Link } from "react-router-dom";
import { InputAdornment, Button, TextField, Typography } from "@material-ui/core"
import { AccountCircle, Lock } from "@material-ui/icons"
import { withStyles } from "@material-ui/core/styles"
import LoginStyles from "./styles"

const styles = theme => LoginStyles(theme)

class SignIn extends Component {

    render() {
        const { classes } = this.props
        return (
            <form className={classes.form} autoComplete="off">
                <TextField
                    label="Username"
                    variant="outlined"
                    className={classes.formField}

                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end"><AccountCircle /></InputAdornment>
                        )
                    }}
                />

                <TextField
                    label="Password"
                    variant="outlined"
                    className={classes.formField}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end"><Lock /></InputAdornment>
                        )
                    }}
                />

                <Link to="/passwordReset" className={classes.formLink}>
                    <Typography>Forgot password?</Typography>
                </Link>

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
                <Link to="/signUp" className={classes.formLink}>
                    <Typography>Sign up</Typography>
                </Link>

            </form>
        )
    }
}

export default withStyles(styles)(SignIn);