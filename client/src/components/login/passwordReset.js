import React, { Fragment } from "react"
import {
    Avatar,
    Typography,
    TextField,
    Button
} from "@material-ui/core";
import {
    LockOutlined
} from "@material-ui/icons";

import { withStyles } from "@material-ui/core/styles";
import LoginStyles from "./styles"
import { Divider } from "../layouts";

const styles = theme => LoginStyles(theme)

const PasswordReset = ({ classes }) => {
    return (
        <Fragment>
            <div className={`${classes.form} ${classes.columnDirection} `}>
                <Avatar className={classes.iconAvatar}>
                    <LockOutlined className={classes.icon} />
                </Avatar>
                <br />
                <Typography variant="h5" gutterBottom>
                    Trouble logging in?
                </Typography>
                <Typography variant="subtitle2" align="center" gutterBottom>
                    Enter your username or email and we'll send you a link to get back into your account.
                </Typography>
                
                <form>
                    <TextField
                        label="Username or email"
                        className={classes.formField}
                        variant="outlined"                        
                    />
                    <Button 
                        className={classes.formButton} 
                        variant="contained" 
                        color="secondary"
                    >
                        Send login link
                    </Button>
                    <Divider />
                </form>
            </div>            
        </Fragment>

    )
}

export default withStyles(styles)(PasswordReset)