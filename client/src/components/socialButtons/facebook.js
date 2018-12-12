import React from "react"
import { mdiFacebook } from "@mdi/js";
import SocialButtonsTemplate from "./socialButtonsTemplate"
import GenerateStyles from "./generateStyles"

const styles=GenerateStyles({
    backgroundColor: '#3A589A',
    borderColor: '#3A589A',
    backgroundColorOnHover: '#3363cc',
    borderColorOnHover: '#3363cc',
    backgroundColorOnActive: '#5987ea',
    borderColorOnActive: '#5987ea',
})

const FacebookButton = props => {    
    return (
        <SocialButtonsTemplate        
            iconPath={mdiFacebook}                                    
            {...props}
            styles={styles}
        />
    )
}
export default FacebookButton