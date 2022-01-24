import React, { useEffect, useState } from 'react';
import axios from "axios";
import { createUseStyles } from "react-jss";
import { motion } from "framer-motion";

import { FontAwesomeIcon as IconSetter } from '@fortawesome/react-fontawesome'
import { faDiceD20 } from "@fortawesome/free-solid-svg-icons";

function ComingLoader() {
    const [loader, setLoader] = useState(true);

    const classes = useStyles();
    const countDown = () => {
        setTimeout(() => setLoader(false), 3000);
    }

    useEffect(() => {
        //countDown();
        const games = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/games');
                console.log(data);
            } catch (e) {
                console.log(e)
            }
        }
        //games();
    }, []);

    return (
        <>
            {
                !loader ? <div className={classes.backgroundTheme}>
                        <div className={classes.container}>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ rotate: 360, scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 50,
                                    duration: 1.5,
                                }}
                            >
                                <IconSetter icon={faDiceD20} className={classes.icon}/>
                            </motion.div>
                            <p className={classes.title}>Wiki Games</p>
                        </div>
                    </div>
                    : <div>Home</div>
            }
        </>

    );
}

const useStyles = createUseStyles({
    backgroundTheme: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgb(236,60,230)',
        width: '100%',
        height: '100vh',
    },
    container: {
        border: '2px solid #fff',
        color: 'white',
        width: '150px',
        height: '150px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '30px',
        boxShadow: '5px 5px 9px 0px rgba(58,58,58,0.51)',
    },
    icon: {
        fontSize: '5rem',
    },
    title: {
        margin: '0.5rem',
        fontSize: '1.2rem',
        fontWeight: 'bold',
    }
})
export default ComingLoader;