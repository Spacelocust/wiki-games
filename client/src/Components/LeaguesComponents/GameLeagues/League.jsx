import React from 'react';
import empty from '../../../assets/images/empty/img-empty.jpg';
import { motion } from 'framer-motion';

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
