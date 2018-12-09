import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import {Paper} from "@material-ui/core"

const styles = theme => ({
    backgroundPaper: {
        width: "100%",
        display: "flex",
        flexWrap: "wrap",        
        height: '100vh',
        backgroundImage: "url(/img/loginBackground.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: "#cccccc",
        borderRadius: "0px",
        //filter: "blur(8px)",    
    }
})

class LandingPage extends Component {
    render(){
        const {classes, children}=this.props
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