export default theme=>({
    container: {
        backgroundColor: "transparent",
        boxShadow: "none",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        
        [theme.breakpoints.up("sm")]: {
            alignItems: "center",
        },
        [theme.breakpoints.only("xs")]: {
            alignItems: "flex-end"
        }
    },

    columnDirection:{                
        flexDirection: "column",        
    },    

    form: {
        display: 'flex',
        flexWrap: 'wrap',
        width: "100%",
        paddingLeft: theme.spacing.unit * 5,
        paddingRight: theme.spacing.unit * 5,        
        paddingBottom: theme.spacing.unit * 2,
        alignItems: "center",
        justifyContent: "center",
    },    
    formField: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        width: "100%"
    },

    formLink: {
        margin: 0,        
        textDecoration: "none",        
    },
    formButton: {
        marginTop: theme.spacing.unit*3,
        marginBottom: theme.spacing.unit*3,
        width: "100%"
    },
    iconAvatar:{
        width: "auto",
        height: "auto",
        padding: theme.spacing.unit*2,
        backgroundColor: "transparent",
        borderColor: "white",
        borderStyle: "solid",

    },

    icon: {
        color: "white",
        fontSize: "40px"
    },
})