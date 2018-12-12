import React from "react"
import { Grid } from "@material-ui/core"
import { 
    FacebookButton,
    GoogleButton,
    TwitterButton
    } from ".";
export default ({gridContainerClassName, gridItemsClassName}) => (
    <Grid
        container
        className={gridContainerClassName}
        justify="space-between"
        alignItems="center"
        spacing={8}
    >
        <Grid item xs>
            <FacebookButton className={gridItemsClassName} />
        </Grid>
        <Grid item xs>
            <GoogleButton className={gridItemsClassName} />
        </Grid>
        <Grid item xs>
            <TwitterButton className={gridItemsClassName} />
        </Grid>
    </Grid>
)