import React from "react"
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme, props) => ({
    headerContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        marginTop: theme.spacing.unit * props.marginTop,
        marginBottom: theme.spacing.unit * props.marginBottom
    },
    horizontalLine: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: "white",
        height: "1vh",
    },
    headerText: {
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        textTransform: "none"
    }
})

const Divider = ({ classes, text }) => (
    <div className={classes.headerContainer}>
        <span className={classes.horizontalLine} />
        <Typography
            variant="button"
            className={classes.headerText}
        >
            {text}
        </Typography>
        <span className={classes.horizontalLine} />
    </div>
)

const withStylesProps = styles => component => props => {
    const Comp = withStyles(theme => styles(theme, props))(component)
    return <Comp {...props} />
}

export default withStylesProps(styles)(Divider)