import React from "react"
import { mdiInstagram } from "@mdi/js";
import SocialButtonsTemplate from "./socialButtonsTemplate"

const color={
    backgroundColor: '#125688',
    borderColor: '#125688',
    backgroundColorOnHover: '#3363cc',
    borderColorOnHover: '#3363cc',
    backgroundColorOnActive: '#5987ea',
    borderColorOnActive: '#5987ea',
}

const InstagramButton = props => {        
    return (
        <SocialButtonsTemplate        
            iconPath={mdiInstagram}            
            color={color}
            {...props}
        />
    )
}
export default InstagramButton