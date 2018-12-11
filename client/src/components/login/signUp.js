import React, { Component } from "react"
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import LoginStyles from "./styles"
import {
    TextField,
    Button,
    Typography,
    InputAdornment,
    IconButton,
    Avatar
} from "@material-ui/core";

import {
    Visibility,
    VisibilityOff,
    PersonAdd,
    PermIdentity,
    Face,
    MailOutline,
    Lock
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
        const { passwordVisibility } = this.state
        return (
            <div className={classes.centeredFlex}>
                <div className={`${classes.centeredFlex} ${classes.form} ${classes.columnDirection}`}>
                    <Avatar className={classes.avatar}>
                        <PersonAdd className={classes.avatarIcon} />
                    </Avatar>
                    <br />                    
                    <Typography variant="subtitle1" align="center" gutterBottom>
                            Sign up and get instant access to this amazing application
                    </Typography>
                </div>

                <form className={classes.form}>
                    <TextField
                        label="Full name"
                        variant="outlined"
                        className={classes.formField}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment positio="end">
                                    <Face className={classes.formFieldIcon} />
                                </InputAdornment>
                            )
                        }}
                    />

                    <TextField
                        label="Email"
                        variant="outlined"
                        className={classes.formField}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <MailOutline className={classes.formFieldIcon} />
                                </InputAdornment>
                            )
                        }}
                    />

                    <TextField
                        label="Username"
                        variant="outlined"
                        className={classes.formField}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <PermIdentity className={classes.formFieldIcon} />
                                </InputAdornment>
                            )
                        }}
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
                                    <Lock className={classes.formFieldIcon} />
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
                </form>

                <Typography>
                    Have an account? &nbsp;
                </Typography>
                <Link to="/signIn" className={classes.formLink}>
                    <Typography>Sign in</Typography>
                </Link>
            </div>
        )
    }
}

export default withStyles(styles)(SignUp)