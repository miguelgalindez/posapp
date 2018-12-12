import React from "react"
import { CommunityIconButton } from "../utils";
import { withStyles } from "@material-ui/core/styles";

const styles=(theme, props)=>props.styles

const SocialButtonsTemplate = props => {
    const {classes, className, iconPath}=props
    return (
        <CommunityIconButton
            iconPath={iconPath}
            iconSize={1.3}
            iconColor="white"
            className={`${classes.button} ${className}`}
            {...props}
        />
    )
}

const withStylesProps = styles => component => props => {
    const Comp = withStyles(theme => styles(theme, props))(component)
    return <Comp {...props} />
}

export default withStylesProps(styles)(SocialButtonsTemplate)
