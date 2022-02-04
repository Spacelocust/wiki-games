import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { motion } from 'framer-motion';
import { isEmpty } from 'lodash';
import axios from 'axios';

import ContainerComponent from '../../GeneralComponents/ContainerComponent/ContainerComponent';
import HeaderComponent from '../../GeneralComponents/HeaderComponent/HeaderComponent';
import BodyComponent from '../../GeneralComponents/BodyComponent/BodyComponent';
import empty from '../../../assets/images/img-empty.jpg';
import overwatch from '../../../assets/images/overwatch.gif';
import LoaderGif from '../../LoaderComponents/LoaderGif';
import BackButtonComponent from '../../GeneralComponents/Buttons/BackButtonComponent/BackButtonComponent';

function Game() {
    const params = useParams();
    const [game, setGame] = useState({});
    const [leagues, setLeagues] = useState([]);

    const getGame = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/games/${params.id}`);
            setTimeout(() =>  setGame(data), 1000);
            setLeagues(data.leagues);
        } catch (e) {
            console.log(e);
        }
    };


    let search = '';
    const searchLeagues = (value) => {
        search = value;
        let defaultLeagues = game.leagues;
        setLeagues(defaultLeagues.filter((league) => league.name.toLowerCase().includes(search)));
    };

    const classes = useStyles();

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

    useEffect(() => {
        getGame();
    }, []);

    return (
        <ContainerComponent>
            <BackButtonComponent />
            <div className="mt-5">
                <HeaderComponent img={game.img_url}/>
                <BodyComponent>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="bg-white rounded"
                    >
                        { !isEmpty(game) ? <>
                            <div className="d-flex justify-content-between align-items-center">
                                <h2 className="font-secular p-1">Leagues</h2>
                                <div className="form-group col-md-2 p-1">
                                    <input type="text" className="form-control" placeholder="rechercher..."
                                           onKeyUp={(e) => searchLeagues(e.target.value)}/>
                                </div>
                            </div>
                            <div
                                className="d-flex justify-content-center flex-wrap"
                                style={leagues.length >= 70 ? { overflow: 'scroll', height: '20rem' } : {}}
                            >
                                {!isEmpty(leagues) ? leagues.map((league) => (<motion.img
                                    variants={item}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    whileHover={{ scale: 1.2 }}
                                    key={league.id}
                                    className="bg-white rounded p-1 m-1 border"
                                    style={{ height: '50px', width: 'auto', cursor: 'pointer' }}
                                    src={league.image_url || empty}
                                    title={league.name}
                                />)) : <div>vide...</div>}
                            </div>
                        </> : <LoaderGif img={overwatch} text="unset"/>}

                    </motion.div>
                </BodyComponent>
            </div>
        </ContainerComponent>
    );
}

const useStyles = createUseStyles({
    wrapper: {}
});

export default Game;
