import React, { useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as IconSetter } from '@fortawesome/react-fontawesome';
import { createUseStyles } from 'react-jss';
import { motion } from 'framer-motion';

import League from './League';

function Leagues({ leagues, searchCallback }) {
    const [close, setClose] = useState(false);
    const [inputSearch, setInputSearch] = useState('');
    const classes = useStyles();
    const box = {
        open: {
            height: 'fit-content',
            transition: {
                duration: 0.5
            }
        },
        close: {
            height: 0,
            transition: {
                duration: 0.5
            }
        }
    }

    const onCloseList = () => {
        setClose(!close);
        onClear();
    }
    const onClear = () => {
        setInputSearch('')
        searchCallback('');
    }

    return <>
        <div className="d-flex justify-content-between align-items-center shadow-sm">
            <h2 className="font-secular m-2 d-flex align-items-center">Leagues <IconSetter icon={!close ? faMinus : faPlus} className={classes.icon} onClick={() => onCloseList()}/></h2>
            <div className="col-md-2 p-1">
                <div className="input-group ">
                    {!close && <>
                        <input type="text" value={inputSearch} className={`form-control rounded ${classes.field}`} placeholder="rechercher..."
                               onKeyUp={(e) => searchCallback(e.target.value)} onChange={(e) => setInputSearch(e.target.value)}/>
                        {inputSearch && <button type="button" className={`btn bg-transparent text-light ${classes.btnClear}`} onClick={() => onClear()}>x</button>}
                    </>}
                </div>
            </div>
        </div>
        <motion.div
            className="d-flex justify-content-center align-content-center flex-wrap"
            variants={box}
            animate={close ? 'close' : 'open'}
            style={!close ? (leagues.length >= 70 ? { overflow: 'scroll', height: '20rem' } : {}) : { overflow: 'hidden', height: 0 } }
        >
            {!isEmpty(leagues) ? leagues.map((league) => <League key={league.id} league={league}/>) :
                <div>vide...</div>}
        </motion.div>
    </>;
}

const useStyles = createUseStyles({
    field: {
        color: '#fff',
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
    btnClear: {
        marginLeft: '-40px!important',
        zIndex: '100!important',
        marginRight: '0.5rem!important'
    },
    icon: {
        fontSize: '1.1rem',
        cursor: 'pointer',
        marginLeft: '0.5rem'
    },
})

export default Leagues;
