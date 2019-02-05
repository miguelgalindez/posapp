import React, { Fragment, Component } from "react"
import { Link } from "react-router-dom";
import {
    Avatar,
    Typography,
    Button
} from "@material-ui/core";
import {
    LockOutlined
} from "@material-ui/icons";

import { withStyles } from "@material-ui/core/styles";
import LoginStyles from "./styles"
import { Divider, Input, Validators } from "../utils";
const { CommonValidators } = Validators

const styles = theme => LoginStyles(theme)



class PasswordReset extends Component {
    state = {
        usernameOrEmail: ""
    }

    handleInputChange = usernameOrEmail => {
        this.setState({ usernameOrEmail })
    }

    render() {
        const { classes } = this.props
        return (
            <Fragment>
                <div className={`${classes.centeredFlex} ${classes.columnDirection}`}>
                    <div className={`${classes.centeredFlex} ${classes.form} ${classes.columnDirection}`}>
                        <Avatar className={classes.avatar}>
                            <LockOutlined className={classes.avatarIcon} />
                        </Avatar>
                        <br />
                        <Typography variant="h5" gutterBottom>
                            Trouble logging in?
                    </Typography>
                        <Typography variant="subtitle2" align="center" gutterBottom>
                            Enter your username or email and we'll send you a link to get back into your account.
                    </Typography>
                    </div>
                    <form className={`${classes.centeredFlex} ${classes.form}`}>
                        <Input
                            name="usernameOrEmail"
                            label="Username or email"
                            type="text"
                            value={this.state.usernameOrEmail}
                            onChange={this.handleInputChange}
                            validate={CommonValidators.validateRequired()}
                            className={classes.formField}
                        />
                        <Button
                            className={classes.formButton}
                            variant="contained"
                            color="secondary"
                        >
                            Send login link
                    </Button>
                    </form>

                    <Divider text="OR" marginBottom={2} />

                    <Typography
                        component={Link}
                        to="/signUp"
                        className={`${classes.formLink} ${classes.paddingBottom}`}
                        gutterBottom
                    >
                        Create a new account
                </Typography>
                    <Typography
                        component={Link} to="/signIn"
                        className={classes.formLink}
                    >
                        Back to Login
                </Typography>
                </div>
            </Fragment>

        )
    }
}

export default withStyles(styles)(PasswordReset)