import React from 'react';
import { createUseStyles } from "react-jss";
import { Divide as Hamburger } from 'hamburger-react';

function NavButton({ onClick, showState, label }) {
    const classes = (createUseStyles({
        NavButton: {
            height: '100%',
            display: 'flex',
            justifyContent: label ? 'space-between' : 'center',
            width: label ? '18.7rem' : 'unset',
            alignItems: 'center',
            fontWeight: 'bold',
            backgroundColor: label ? '#dcdcdc' : '#212529',
            color: '#fff!important',
        },
    }))();

    return (
        <a
            className={classes.NavButton}
            onClick={() => onClick()}>
            {label && <p className="m-0 px-4">{label}</p>}
            <Hamburger rounded size={20} toggled={showState}/>
        </a>
    );
}

export default NavButton;
