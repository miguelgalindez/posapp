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

    centeredFlex: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: "center",
        justifyContent: "center",
    },

    columnDirection: {        
        flexDirection: "column",        
    },

    rowDirection: {        
        flexDirection: "row",        
    },    

    form: {        
        width: "100%",
        paddingLeft: theme.spacing.unit * 5,
        paddingRight: theme.spacing.unit * 5,        
    },

    formField: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        width: "100%"
    },

    formFieldIcon: {
        marginRight: "11px"
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

    avatar:{
        width: "auto",
        height: "auto",
        padding: theme.spacing.unit*2,
        backgroundColor: "transparent",
        borderColor: "white",
        borderStyle: "solid",

    },

    avatarIcon: {
        color: "white",
        fontSize: "40px"
    },

    paddingBottom: {
        paddingBottom: theme.spacing.unit/2
    }
})