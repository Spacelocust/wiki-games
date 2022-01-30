import React from 'react';
import { createUseStyles } from "react-jss";
import { Divide as Hamburger } from 'hamburger-react';

function NavButton({ onClick, showState }) {
    const classes = useStyles();

    return (
        <a
            className={classes.NavButton}
            onClick={() => onClick()}>
            <Hamburger rounded size={20} toggled={showState}/>
        </a>
    );
}

const useStyles = createUseStyles({
    NavButton: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        backgroundColor: '#212529',
        color: '#fff!important',
    },
})

export default NavButton;