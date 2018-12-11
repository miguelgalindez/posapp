import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import { Paper } from "@material-ui/core"

const styles = theme => ({
    '@global': {
        'html': {
            background: "url(/img/loginBackground.jpg) no-repeat center center fixed",
            backgroundSize: "cover",
            backgroundColor: "#cccccc",
            height: "100vh",
        },

        'body, #root': {
            backgroundColor: "transparent",
            minHeight: "100vh",
        },
    },

    backgroundPaper: {
        minHeight: "100vh",
        display: "flex",
        flexWrap: "wrap",
        backgroundColor: "transparent",
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    }
})

class LandingPage extends Component {
    render() {
        const { classes, children } = this.props
        return (
            <Fragment>
                {/* Here goes de app bar */}
                <Paper className={classes.backgroundPaper}>
                    {children}
                </Paper>
            </Fragment>
        )
    }
}

export default withStyles(styles)(LandingPage)