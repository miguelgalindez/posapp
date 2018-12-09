import React from "react"
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    headerContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
    },
    horizontalLine: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: "white",
        height: "1px",               
    },
    headerText: {
        marginLeft: theme.spacing.unit*2,
        marginRight: theme.spacing.unit*2  
    }
})

const Divider = ({classes}) => (
    <div className={classes.headerContainer}>
        <span className={classes.horizontalLine} />
        <Typography 
            variant="button"
            className={classes.headerText}
        >
            OR
        </Typography>
        <span className={classes.horizontalLine} />
    </div>
)

export default withStyles(styles)(Divider)