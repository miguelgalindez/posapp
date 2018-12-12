export default ({
        backgroundColor, 
        borderColor, 
        backgroundColorOnHover,
        borderColorOnHover,
        backgroundColorOnActive,
        borderColorOnActive})=>({
            
    button: {
        boxShadow: 'none',        
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        '&:hover': {
            backgroundColor: backgroundColorOnHover,
            borderColor: borderColorOnHover,
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: backgroundColorOnActive,
            borderColor: borderColorOnActive,
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(255,255,255,.5)',
        },
    }
})