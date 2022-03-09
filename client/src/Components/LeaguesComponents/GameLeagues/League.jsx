import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import empty from '../../../assets/images/empty/img-empty.jpg';

function League({ league }) {
    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        },
        exit: {
            opacity: 0
        }
    };
    return <motion.img
        variants={item}
        initial="hidden"
        animate="visible"
        exit="exit"
        whileHover={{ scale: 1.2 }}
        className="bg-white rounded p-1 m-1 border"
        style={{ height: '50px', width: 'auto', cursor: 'pointer' }}
        src={league.image_url || empty}
        title={league.name}
    />
}

export default League;
