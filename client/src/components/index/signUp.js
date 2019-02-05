import React, { Component } from "react"
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import LoginStyles from "./styles"
import {
    Button,
    Typography,
    Avatar
} from "@material-ui/core";

import {
    PersonAdd,
    PermIdentity,
    Face,
    MailOutline,
    Lock
} from "@material-ui/icons";

import { Input, Validators } from "../utils";
const { UserValidator } = Validators

const styles = theme => LoginStyles(theme)

class SignUp extends Component {
    state = {
        paths: {
            username: "",
            email: "",
            name: "",
            password: ""
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
        const { classes } = this.props

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

                <form
                    className={classes.form}
                    autoComplete="off"
                >
                    <Input
                        name="name"
                        label="Full name"
                        type="text"
                        value={this.state.paths.name}
                        validate={UserValidator.validateName}
                        onChange={this.handleChange}
                        className={classes.formField}
                        icon={<Face className={classes.formFieldIcon} />}
                    />

                    <Input
                        name="email"
                        label="Email"
                        type="text"
                        value={this.state.paths.email}
                        validate={UserValidator.validateEmail(this.state.paths.username)}
                        onChange={this.handleChange}
                        className={classes.formField}
                        icon={<MailOutline className={classes.formFieldIcon} />}
                    />

                    <Input
                        name="username"
                        label="Username"
                        type="text"
                        value={this.state.paths.username}
                        validate={UserValidator.validateUsername(this.state.paths.email)}
                        onChange={this.handleChange}
                        className={classes.formField}
                        icon={<PermIdentity className={classes.formFieldIcon} />}
                    />

                    <Input
                        name="password"
                        label="Password"
                        type="password"
                        value={this.state.paths.password}
                        validate={UserValidator.validatePassword(this.state.paths.username, this.state.paths.email)}
                        onChange={this.handleChange}
                        className={classes.formField}
                        icon={<Lock className={classes.formFieldIcon} />}

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