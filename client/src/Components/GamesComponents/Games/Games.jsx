import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { motion } from 'framer-motion';
import axios from 'axios';

import { listGames } from '../Selector/GamesSelector';
import ContainerComponent from '../../GeneralComponents/ContainerComponent/ContainerComponent';
import Card from '../../GeneralComponents/Cards/Card';
import LoaderGif from '../../LoaderComponents/LoaderGif';

function Games() {
    const [currentListGames, setCurrentListGames] = useRecoilState(listGames);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const source = axios.CancelToken.source();
        (async () => {
            try {
                const { data } = await axios.get('/games',{
                    cancelToken: source.token,
                });
                setLoader(false);
                setCurrentListGames(data);
            } catch (e) {
                if (axios.isCancel(e)) {
                } else {
                    throw e
                }
            }
        })();

        return () => source.cancel();
    }, []);

    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        },
        exit: {
            transition: {
                delayChildren: 0.1,
                staggerChildren: 0.1
            }
        }
    };

    return (
        <ContainerComponent>
            {!loader ? <motion.div
                className="container mt-5 d-flex flex-wrap justify-content-center"
                variants={container}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {currentListGames && [...currentListGames].reverse().map((game) => (
                    <Card key={game.id} url={game.img_url} name={game.name} id={game.id}/>
                ))}
            </motion.div> : <LoaderGif/>}
        </ContainerComponent>
    );
}

export default Games;
