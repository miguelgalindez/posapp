import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { InputAdornment, TextField, IconButton } from "@material-ui/core"
import {
    Visibility,
    VisibilityOff
} from "@material-ui/icons";

class Input extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        value: PropTypes.string,
        validate: PropTypes.func,
        onChange: PropTypes.func.isRequired,
        className: PropTypes.string,
        icon: PropTypes.element
    }

    constructor(props) {
        super(props)
        this.ref = React.createRef()
        this.state = {
            value: "",
            error: "",
            passwordVisibility: false
        }
    }

    componentDidMount() {
        this.setState({ value: this.props.value })
    }

    handleInputChange = evt => {
        const { name, value } = evt.target
        const { validate, onChange } = this.props
        const error = validate ? validate(value) : null
        this.setState({ value })
        onChange(name, value)
        this.setState({ error })
    }

    handleTogglePasswordVisibility = () => {
        this.setState(prevState => ({
            passwordVisibility: !prevState.passwordVisibility
        }))
        this.ref.current.focus()
    }

    render() {
        const { name, label, type, children, className, icon } = this.props
        const { passwordVisibility } = this.state
        return (
            <Fragment>
                <TextField
                    inputRef={this.ref}
                    name={name}
                    id={name}
                    value={this.state.value}
                    onChange={this.handleInputChange}
                    label={label}
                    error={Boolean(this.state.error)}
                    helperText={this.state.error}
                    type={type === 'password' ? (passwordVisibility ? 'text' : 'password') : type}
                    variant="outlined"
                    className={className}
                    InputProps={icon || type === 'password'
                        ? {
                            endAdornment: (
                                <InputAdornment position="end">
                                    {type === 'password'
                                        ? <IconButton onClick={this.handleTogglePasswordVisibility}>
                                            {passwordVisibility ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                        : undefined
                                    }
                                    {icon}
                                </InputAdornment>
                            )
                        }
                        : undefined
                    }
                >
                    {children}
                </TextField>
            </Fragment>
        )
    }
}

export default Input