import React from "react"
import { CommunityIconButton } from "../utils";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme, props) => {
    const {
        backgroundColor,
        borderColor,
        backgroundColorOnHover,
        borderColorOnHover,
        backgroundColorOnActive,
        borderColorOnActive
    } = props.color

    return {
        button: {
            boxShadow: 'none',
            backgroundColor,
            borderColor,

            '&:hover': {
                backgroundColor: backgroundColorOnHover,
                borderColor: borderColorOnHover,
            },
            '&:active': {
                boxShadow: 'none',
                backgroundColor: backgroundColorOnActive,
                borderColor: borderColorOnActive,
            },
            '&:focus': {
                boxShadow: '0 0 0 0.2rem rgba(255,255,255,.5)',
            },
        }
    }
}

const SocialButtonsTemplate = props => {
    const { classes, iconPath } = props
    return (
        <CommunityIconButton
            iconPath={iconPath}
            iconSize={1.3}
            iconColor="white"
            className={`${classes.button}`}
            {...props}
        />
    )
}

const withStylesProps = styles => component => props => {
    const Comp = withStyles(theme => styles(theme, props))(component)
    return <Comp {...props} />
}

export default withStylesProps(styles)(SocialButtonsTemplate)
