import React, { Component } from "react"
import { Grid } from "@material-ui/core"
import {
    FacebookButton,
    GoogleButton,
    TwitterButton
} from "../socialButtons";
import { EnvironmentVariables } from "../../config/";

class OAuth extends Component {
    state = {
        ongoingAuthentication: false,

    }

    componentDidMount(){
        this.props.socket.on('authenticatedUser', user=>{
            console.log(user)
        })
    }

    openPopup = (network) => {        
        const width = 600, height = 600
        const left = (window.innerWidth / 2) - (width / 2)
        const top = (window.innerHeight / 2) - (height / 2)
        
        const authUrl = `${EnvironmentVariables.apiUrl}/auth/${network}?socketId=${this.props.socket.id}`
        console.log(authUrl)

        return window.open(authUrl, '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no, 
            scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
            height=${height}, top=${top}, left=${left}`
        )
    }

    startAuth = network => event => {
        event.preventDefault()
        if(this.popup){
            this.popup.close()
        }
        this.popup=this.openPopup(network)                    
    }

    render() {
        const { gridContainerClassName, gridItemsClassName } = this.props
        return (
            <Grid
                container
                className={gridContainerClassName}
                justify="space-between"
                alignItems="center"
                spacing={8}
            >
                <Grid item xs>
                    <FacebookButton 
                        onClick={this.startAuth('facebook')}
                        className={gridItemsClassName} 
                        />
                </Grid>
                <Grid item xs>
                    <GoogleButton 
                        onClick={this.startAuth('google')}
                        className={gridItemsClassName} 
                        />
                </Grid>                
            </Grid>
        )
    }
}

export default OAuth