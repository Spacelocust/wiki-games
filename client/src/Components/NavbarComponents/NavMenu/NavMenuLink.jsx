import React, { useState } from 'react';
import { createUseStyles } from "react-jss";
import { Collapse } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as IconSetter } from "@fortawesome/react-fontawesome";

function NavMenuLink({ children, colorHover, text, to = '/' }) {
    const [open, setOpen] = useState(false);

    const useStyles = createUseStyles({
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #373636',
            padding: '0.5rem 0',
        },
        link: {
            cursor: 'pointer',
            color: '#fff',
            '&:hover': {
                color: colorHover,
                transition: 'color 0.5s linear',
            }
        },
        linkChildren: {
            marginLeft: '0.7rem',
        },
        icon: {
            fontSize: '0.7rem',
            cursor: 'pointer',
            color: '#fff',
            '&:hover': {
                color: colorHover,
                transition: 'color 0.5s linear',
            }
        }
    });

    const classes = useStyles();

    return (
        <>
            <div className={classes.container}>
                <LinkContainer to={to}>
                    <li className={`font-secular-uppercase ${classes.link}`}>{text}</li>
                </LinkContainer>
                {children && <IconSetter icon={open ? faMinus : faPlus} className={classes.icon}
                                         onClick={() => setOpen(!open)}/>}
            </div>

            {children && <Collapse in={open}>
                <div className={classes.linkChildren}>
                    <ul>
                        {children}
                    </ul>
                </div>
            </Collapse>}
        </>
    );
}

export default NavMenuLink;