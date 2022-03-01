import React from 'react';
import { motion } from 'framer-motion';

import ContainerComponent from '../../GeneralComponents/Containers/ContainerComponent/ContainerComponent';
import BackButtonComponent from '../../GeneralComponents/Buttons/BackButton/BackButtonComponent';
import BodyComponent from '../../GeneralComponents/Containers/Body/BodyComponent';
import UserBet from './UserBet';

function UserBets(props) {
    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 5,
                staggerChildren: 5
            }
        },
        exit: {
            transition: {
                delayChildren: 5,
                staggerChildren: 5
            }
        }
    };

    return (
        <ContainerComponent>
            <BackButtonComponent />
            <BodyComponent>
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="bg-dark text-light rounded p-1"
                >
                    <h2 className="font-secular m-2">Mes paris</h2>
                    <UserBet />
                </motion.div>
            </BodyComponent>
        </ContainerComponent>
    );
}

export default UserBets;
