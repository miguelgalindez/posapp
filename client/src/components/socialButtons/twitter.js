import React from "react"
import { mdiTwitter } from "@mdi/js";
import SocialButtonsTemplate from "./socialButtonsTemplate"
import GenerateStyles from "./generateStyles"

const styles=GenerateStyles({
    backgroundColor: '#4099FF',
    borderColor: '#4099FF',
    backgroundColorOnHover: '#0077ff',
    borderColorOnHover: '#0077ff',
    backgroundColorOnActive: '#5fa8fc',
    borderColorOnActive: '#5fa8fc',
})

const TwitterButton = props => {    
    return (
        <SocialButtonsTemplate        
            iconPath={mdiTwitter}                                    
            {...props}
            styles={styles}
        />
    )
}

export default TwitterButton