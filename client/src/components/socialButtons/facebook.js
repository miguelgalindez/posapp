import React from "react"
import { mdiFacebook } from "@mdi/js";
import SocialButtonsTemplate from "./socialButtonsTemplate"

const color = {
    backgroundColor: '#3A589A',
    borderColor: '#3A589A',
    backgroundColorOnHover: '#3363cc',
    borderColorOnHover: '#3363cc',
    backgroundColorOnActive: '#5987ea',
    borderColorOnActive: '#5987ea',
}

const FacebookButton = props => {    
    return (
        <SocialButtonsTemplate
            iconPath={mdiFacebook}
            color={color}
            {...props}
        />
    )
}
export default FacebookButton