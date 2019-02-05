import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import { Warning, } from "@material-ui/icons";

export default ({ type, text }) => {
    if (text) {
        let icon = null
        if (type && type.toLowerCase() === "error") {
            icon = <Warning />
        }
        return <Fragment>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                spacing={0}
            >
                <Grid item xs={2}>
                    {icon}
                </Grid>
                <Grid item xs={10}>
                    {text}
                </Grid>
            </Grid>
        </Fragment>
    }
    return null
}