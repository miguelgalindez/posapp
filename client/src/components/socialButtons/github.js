import React from "react"
import { mdiGithubCircle } from "@mdi/js";
import SocialButtonsTemplate from "./socialButtonsTemplate"

const color={
    backgroundColor: '#212121',
    borderColor: '#212121',
    backgroundColorOnHover: '#000000',
    borderColorOnHover: '#000000',
    backgroundColorOnActive: '#000000',
    borderColorOnActive: '#000000',
}

const GithubButton = props => {        
    return (
        <SocialButtonsTemplate        
            iconPath={mdiGithubCircle}
            color={color}
            {...props}
        />
    )
}
export default GithubButton