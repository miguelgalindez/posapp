import React from "react";
import { Redirect } from "react-router-dom";

export default ({ user }) => {
    if (user) {        
        const properties=Object.keys(user).map(key=>(
            <li key={key}>{key}: {user[key]}</li>
        ))
        return <ul>{properties}</ul>
    } else{
        return <Redirect to="/" />
    }
    
}