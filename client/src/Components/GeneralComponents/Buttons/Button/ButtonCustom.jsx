import React from 'react';
import { createUseStyles } from 'react-jss';

function ButtonCustom({ className, callback, children, active = false }) {
    const classes = (createUseStyles({
        btn: {
            background: 'none',
            border: '1px solid #b39c42',
            color: '#b39c42',
            padding: '0.5rem 1rem',
            borderRadius: '0.2rem',
        },
        active: {
            background: '#b39c42!important',
            border: '1px solid #b39c42',
            color: '#fff!important',
        }
    }))();
    return <button className={`${className} ${classes.btn} ${active && classes.active} font-secular mx-1`} onClick={() => callback()}>{ children }</button>;
}

export default ButtonCustom;
