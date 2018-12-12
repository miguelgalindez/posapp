import React from "react"
import { mdiGoogle } from "@mdi/js";
import SocialButtonsTemplate from "./socialButtonsTemplate";
import GenerateStyles from "./generateStyles"

const styles=GenerateStyles({
    backgroundColor: '#E9544F',
    borderColor: '#E9544F',
    backgroundColorOnHover: '#e20000',
    borderColorOnHover: '#e20000',
    backgroundColorOnActive: '#ff7f7c',
    borderColorOnActive: '#ff7f7c',
})

const GoogleButton = props => {
    return (
        <SocialButtonsTemplate        
            iconPath={mdiGoogle}
            {...props}
            styles={styles}
        />
    )
}

export default GoogleButton