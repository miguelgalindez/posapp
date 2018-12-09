import React, { Component } from "react"
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import LoginStyles from "./styles"
import {
    TextField,
    Button,
    Typography,
    InputAdornment,
    IconButton
} from "@material-ui/core";

import {
    Visibility,
    VisibilityOff
} from "@material-ui/icons";

const styles = theme => LoginStyles(theme)

class SignUp extends Component {
    state = {
        passwordVisibility: false
    }

    handleTogglePasswordVisibility = () => {
        this.setState(prevState => ({
            passwordVisibility: !prevState.passwordVisibility
        }))
    }

    render() {
        const { classes } = this.props
        const { passwordVisibility }=this.state
        return (

            <form className={classes.form}>
                <TextField
                    label="Full name"
                    variant="outlined"
                    className={classes.formField}
                />
                
                <TextField
                    label="Email"
                    variant="outlined"
                    className={classes.formField}
                />

                <TextField
                    label="Username"
                    variant="outlined"
                    className={classes.formField}
                />

                <TextField
                    label="Password"
                    variant="outlined"
                    type={passwordVisibility ? "text" : "password"}
                    className={classes.formField}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={this.handleTogglePasswordVisibility}>
                                    {passwordVisibility
                                        ? <VisibilityOff />
                                        : <Visibility />
                                    }
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.formButton}
                >
                    Sign up
                </Button>

                <Typography>
                    Have an account? &nbsp;
                </Typography>
                <Link to="/signIn" className={classes.formLink}>
                    <Typography>Sign in</Typography>
                </Link>

            </form>
        )
    }
}

export default withStyles(styles)(SignUp)