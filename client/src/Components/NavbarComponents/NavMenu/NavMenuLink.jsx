import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUseStyles } from "react-jss";
import { Collapse } from "react-bootstrap";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as IconSetter } from "@fortawesome/react-fontawesome";

function NavMenuLink({ children, colorHover, text, img, to }) {
    const [open, setOpen] = useState(false);

    const classes = (createUseStyles({
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #373636',
            padding: '0.5rem 0',
        },
        link: {
            display: 'flex',
            alignItems: 'center',
            cursor: to ? 'pointer' : 'default',
            color: '#fff',
            '&:hover': {
                color: colorHover,
                transition: 'color 0.2s linear',
            }
        },
        linkChildren: {
            marginLeft: '0.7rem',
            fontSize: '0.9em',
        },
        icon: {
            fontSize: '0.7rem',
            cursor: 'pointer',
            color: '#fff',
            '&:hover': {
                color: colorHover,
                transition: 'color 0.5s linear',
            }
        },
        img: {
            width: '1rem',
            marginRight: '0.5rem',
        }
    }))();

    return (
        <>
            <div className={classes.container}>
                {to ? <Link to={to}>
                    <LinkElement className={classes.link} img={img} text={text}/>
                </Link> : <LinkElement className={classes.link} img={img} text={text}/>}
                {children && <IconSetter icon={open ? faMinus : faPlus} className={classes.icon} onClick={() => setOpen(!open)}/>}
            </div>

            {children && <Collapse in={open}>
                <div className={classes.linkChildren}>
                    <ul>
                        { children }
                    </ul>
                </div>
            </Collapse>}
        </>
    );
}

const LinkElement = ({ className, img, text }) => (
    <li className={`font-secular-uppercase ${className}`}>{img && <img src={img} alt="" style={{ width: '1rem', marginRight: '0.5rem' }}/>}{text}</li>
)

export default NavMenuLink;
