import React from 'react';
import { motion } from "framer-motion";
import { createUseStyles } from "react-jss";
import { Link, useLocation } from "react-router-dom";

function Card({ url, name, id = null }) {
    const classes = useStyles();
    const { pathname } = useLocation();

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
        exit: {
            y: 20,
            opacity: 0,
        }
    };

    return (
        <Link to={`${pathname}/${id}`} className={classes.link}>
            <motion.div className={`${classes.card} card m-1`} style={{ width: '15rem' }} variants={item}
                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 1 }}>
                <img className="card-img-top mx-auto" src={url} alt={`${name}`} style={{ width: '10rem', height: '10rem' }} />
                <div className="card-body">
                    <h5 className="card-title text-center">{name}</h5>
                </div>
            </motion.div>
        </Link>
    );
}

const useStyles = createUseStyles({
    card: {
        color: '#000',
        zIndex: 1,
        '&:hover': {
            zIndex: 999,
        }
    },
    link: {
        textDecoration: 'none',
    }

});

export default Card;