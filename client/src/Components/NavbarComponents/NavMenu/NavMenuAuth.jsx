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
            backgroundColor: '#dcdcdc',
            color: '#373636!important',
        },
    }))();

    return (
        <a
            className={classes.NavButton}
            onClick={() => onClick()}>
            <span className='d-flex align-items-center'>
               <p className="m-0 px-4">{user.username}</p>
                | { children }  <p className='m-0 pl-1 font-secular'>{ user.coins }</p>
            </span>
            <Hamburger rounded size={20} toggled={showState}/>
        </a>
    );
}

export default NavMenuAuth;
