import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom";
import { InputAdornment, Button, TextField, Typography } from "@material-ui/core"
import OAuth from "./oAuth";
import { AccountCircle, Lock } from "@material-ui/icons"
import { withStyles } from "@material-ui/core/styles"
import LoginStyles from "./styles"
import { Divider } from "../utils";

const styles = theme => LoginStyles(theme)

class SignIn extends Component {    
    render() {
        const { classes, socket } = this.props        
        return (
            <Fragment>
                {socket && socket.connected 
                    ? <Fragment>
                        <Typography 
                            variant="h6" 
                            gutterBottom                    
                            >
                            Connect with
                        </Typography>                
                        <OAuth
                            gridContainerClassName={classes.form} 
                            gridItemsClassName={classes.socialButton}
                            socket={socket} />
                        
                        <Divider 
                            text="Or be classical" 
                            marginTop={2} 
                            marginBottom={2} 
                        />
                    </Fragment>
                    : null
                }
                <form 
                    className={`${classes.centeredFlex} ${classes.form}`} autoComplete="off">
                    <TextField
                        label="Username"
                        variant="outlined"
                        className={classes.formField}

                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <AccountCircle className={classes.formFieldIcon} />
                                </InputAdornment>
                            )
                        }}
                    />

                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        className={classes.formField}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Lock className={classes.formFieldIcon} />
                                </InputAdornment>
                            )
                        }}
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