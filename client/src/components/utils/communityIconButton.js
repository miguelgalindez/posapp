import React from "react"
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@mdi/react"

const styles = (theme, props) => {
    const buttonWithChildrenStyle={
        button: {
            justifyContent: "left",
            textTransform: "none"
        },
        icon: {
            marginRight: theme.spacing.unit * 2,
        }
    }
    const buttonWithOutChildrenStyle={
        button: {
            justifyContent: "center",
            textTransform: "none"
        },
        icon: {
            width: "auto"
        },
    }
    return props.children ? buttonWithChildrenStyle : buttonWithOutChildrenStyle
}

const CommunityIconButton = ({ component, to, onClick, className, classes, iconPath, iconSize, iconColor, children }) => (
    <Button
        component={component}
        to={to}
        onClick={onClick}
        variant="contained"        
        className={`${className} ${classes.button}`}
        disableRipple
    >
        <Icon
            path={iconPath}
            size={iconSize}
            color={iconColor}
            className={classes.icon}
        />

        {children}

    </Button>
)

const withStylesProps = styles => component => props => {
    const Comp = withStyles(theme => styles(theme, props))(component)
    return <Comp {...props} />
}

export default withStylesProps(styles)(CommunityIconButton)