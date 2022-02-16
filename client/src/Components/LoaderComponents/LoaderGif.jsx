import React from 'react';
import { motion } from 'framer-motion';

import teemo from '../../assets/images/teemo.gif';

function LoaderGif({ img = teemo, text = `Teemo attend dans l'ombre..` }) {

    const container = {
        hidden: { opacity: 0, scale: 0 },
        visible: {
            opacity: 1,
            scale: 0.9,
            transition: {
                delayChildren: 1
            }
        }
    };
    return (
        <motion.div
            className="container d-flex justify-content-center align-items-center h-100"
            variants={container}
            initial="hidden"
            animate={'visible'}
        >
            <img src={img} alt="loading..." style={{ height: '10rem' }}/>
            {text !== 'unset' && <p className="text-light font-medium font-secular">{text}</p>}
        </motion.div>
    );
}

export default LoaderGif;
