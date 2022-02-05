import React, { useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as IconSetter } from '@fortawesome/react-fontawesome';
import { createUseStyles } from 'react-jss';
import { motion } from 'framer-motion';

import League from './League';

function Leagues({ leagues, searchCallback }) {
    const [close, setClose] = useState(false);
    const classes = useStyles();
    const box = {
        open: {
            height: '20rem',
            transition: {
                delayChildren: 5,
                staggerChildren: 5
            }
        },
        close: {
            height: 0,
            transition: {
                delayChildren: 5,
                staggerChildren: 5
            }
        }

    }
    return <>
        <div className="d-flex justify-content-between align-items-center">
            <h2 className="font-secular m-2 d-flex align-items-center">Leagues <IconSetter icon={!close ? faMinus : faPlus} className={classes.icon} onClick={() => setClose(!close)}/></h2>
            <div className="form-group col-md-2 p-1">
                <input type="text" className={`form-control ${classes.field}`} placeholder="rechercher..."
                       onKeyUp={(e) => searchCallback(e.target.value)}/>
            </div>
        </div>
        <motion.div
            className="d-flex justify-content-center flex-wrap"
            style={!close ? (leagues.length >= 70 ? { overflow: 'scroll', height: '20rem' } : {}) : { overflow: 'hidden', height: 0 } }
        >
            {!isEmpty(leagues) ? leagues.map((league) => <League key={league.id} league={league}/>) :
                <div>vide...</div>}
        </motion.div>
    </>;
}

const useStyles = createUseStyles({
    field: {
        color: '#fff!',
        backgroundColor: '#373636',
        border: 'unset',
        '&:focus': {
            color: '#fff',
            outline: '0px!important',
            boxShadow: 'none!important',
            backgroundColor: '#414040',
            transition: 'backgroundcolor 2s ease-in-out'
        }
    },
    icon: {
        fontSize: '1.1rem',
        cursor: 'pointer',
        marginLeft: '0.5rem'
    },
})

export default Leagues;
