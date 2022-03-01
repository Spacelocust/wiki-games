import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import isEmpty from 'lodash/isEmpty';
import API from '../../../api/axiosBase';

import ContainerComponent from '../../GeneralComponents/Containers/ContainerComponent/ContainerComponent';
import Header from '../../GeneralComponents/Containers/Header/Header';
import BodyComponent from '../../GeneralComponents/Containers/Body/BodyComponent';
import overwatch from '../../../assets/images/overwatch.gif';
import LoaderGif from '../../LoaderComponents/LoaderGif';
import BackButtonComponent from '../../GeneralComponents/Buttons/BackButton/BackButtonComponent';
import Leagues from '../../LeaguesComponents/GameLeagues/Leagues';
import Matchs from '../../MatchComponent/GameMatchs/Matchs';

function Game() {
    const params = useParams();
    const [game, setGame] = useState({});
    const [leagues, setLeagues] = useState([]);

    const getGame = async () => {
        try {
            const { data } = await API.get(`/games/${params.id}`);
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
                <Header img={game.img_url}/>
                <BodyComponent>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="bg-dark text-light rounded p-1"
                    >
                        <h2 className="font-secular m-2">Matchs</h2>
                        <Matchs />
                    </motion.div>
                </BodyComponent>
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
            </div>
        </ContainerComponent>
    );
}

export default Game;
