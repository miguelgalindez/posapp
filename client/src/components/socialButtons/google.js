import React from "react"
import { mdiGoogle } from "@mdi/js";
import SocialButtonsTemplate from "./socialButtonsTemplate";

const color={
    backgroundColor: '#E9544F',
    borderColor: '#E9544F',
    backgroundColorOnHover: '#e20000',
    borderColorOnHover: '#e20000',
    backgroundColorOnActive: '#ff7f7c',
    borderColorOnActive: '#ff7f7c',
}

const GoogleButton = props => {
    return (
        <SocialButtonsTemplate        
            iconPath={mdiGoogle}
            color={color}
            {...props}
        />
    )
}

export default GoogleButton