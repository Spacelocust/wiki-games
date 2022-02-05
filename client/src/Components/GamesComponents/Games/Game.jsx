import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import isEmpty from 'lodash/isEmpty';
import axios from 'axios';

import ContainerComponent from '../../GeneralComponents/ContainerComponent/ContainerComponent';
import HeaderComponent from '../../GeneralComponents/HeaderComponent/HeaderComponent';
import BodyComponent from '../../GeneralComponents/BodyComponent/BodyComponent';
import overwatch from '../../../assets/images/overwatch.gif';
import LoaderGif from '../../LoaderComponents/LoaderGif';
import BackButtonComponent from '../../GeneralComponents/Buttons/BackButtonComponent/BackButtonComponent';
import Leagues from '../../LeaguesComponents/GameLeagues/Leagues';

function Game() {
    const params = useParams();
    const [game, setGame] = useState({});
    const [leagues, setLeagues] = useState([]);

    const getGame = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/games/${params.id}`);
            setTimeout(() => {
                setGame(data);
                setLeagues(data.leagues);
            }, 1000);
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
                        { !isEmpty(game) ?
                            <Leagues leagues={leagues} searchCallback={searchLeagues}/>
                            : <LoaderGif img={overwatch} text="unset"/>}
                    </motion.div>
                </BodyComponent>
                <BodyComponent>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="bg-dark text-light rounded"
                    >
                        <h2 className="font-secular m-2">Matchs</h2>
                    </motion.div>
                </BodyComponent>
            </div>
        </ContainerComponent>
    );
}

export default Game;
