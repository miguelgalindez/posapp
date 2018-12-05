import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import { Paper, Hidden, Grid, Typography } from "@material-ui/core"

const styles = theme => ({
    backgroundPaper: {
        height: '100vh',
        backgroundImage: "url(/img/loginBackground.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: "#cccccc",
        //filter: "blur(8px)",    
    },
    loginPaper: {
        backgroundColor: "transparent",
        boxShadow: "none",
    }
})

class LoginPage extends Component {
    render() {
        const { classes } = this.props
        return (
            <Fragment>
                <Paper className={classes.backgroundPaper}>
                    <Grid container>
                        <Hidden only="xs">
                            <Grid item sm={4} md={8}>
                                <Paper className={classes.loginPaper}>
                                    <Typography variant="h5">
                                        Some text
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Hidden>
                        <Grid item xs={12} sm={8} md={4}>
                            <Paper className={classes.loginPaper}>
                                <Typography variant="h5">
                                    Another text
                                </Typography>

                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>
            </Fragment>
        )
    }
}

export default withStyles(styles)(LoginPage);