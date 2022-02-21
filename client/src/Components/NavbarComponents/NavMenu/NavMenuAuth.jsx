import React from 'react';
import { createUseStyles } from 'react-jss';
import { Divide as Hamburger } from 'hamburger-react';

function NavMenuAuth({ onClick, showState, user, children }) {
    const classes = (createUseStyles({
        NavButton: {
            height: '100%',
            display: 'flex',
            justifyContent:'space-between',
            width: '18.7rem',
            alignItems: 'center',
            fontWeight: 'bold',
            backgroundColor: '#212529',
            color: '#fff!important'
        },
    }))();

    return (
        <a
            className={classes.NavButton}
            onClick={() => onClick()}>
            <span className='d-flex align-items-center ms-1 p-3'>
               <p className="m-0 pe-4">{user.username}</p>
                | { children }  <p className='m-0 pl-1 font-secular'>{ user.coins }</p>
            </span>
            <Hamburger rounded size={20} toggled={showState}/>
        </a>
    );
}

export default NavMenuAuth;
