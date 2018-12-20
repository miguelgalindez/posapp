import React, { Component, Fragment } from "react"
import { Grid } from "@material-ui/core"
import {
    FacebookButton,
    GoogleButton,
    InstagramButton,
    GithubButton
} from "../socialButtons";
import { EnvironmentVariables } from "../../config/";

class OAuth extends Component {

    componentDidMount() {
        if(this.props.socket){
            this.props.socket.on('userAuthenticated', user => {
                if (this.popup) {
                    this.popup.close()
                }
                console.log(user)
            })
        }
    }

    componentWillUnmount() {
        if(this.props.socket){
            this.props.socket.removeAllListeners('userAuthenticated')
        }
    }

    openPopup = (url) => {
        const width = 600, height = 600
        const left = (window.innerWidth / 2) - (width / 2)
        const top = (window.innerHeight / 2) - (height / 2)

        return window.open(url, '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no, 
            scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
            height=${height}, top=${top}, left=${left}`
        )
    }

    startAuth = network => event => {
        event.preventDefault()
        if (this.popup) {
            this.popup.close()
        }
        const socketId = this.props.socket.id.replace(`${this.props.socket.nsp}#`, '')
        const authUrl = `${EnvironmentVariables.apiUrl}/auth/${network}?socketId=${socketId}`

        this.popup = this.openPopup(authUrl)
    }

    render() {
        const { gridContainerClassName, socket, header, footer } = this.props
        if (socket && socket.connected) {
            return (
                <Fragment>
                    {header}

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
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs>
                            <GoogleButton
                                onClick={this.startAuth('google')}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs>
                            <InstagramButton
                                onClick={this.startAuth('instagram')}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs>
                            <GithubButton
                                onClick={this.startAuth('github')}
                                fullWidth
                            />
                        </Grid>
                    </Grid>

                    {footer}
                </Fragment>                
            )
        } else {
            return null
        }
    }
}

export default OAuth