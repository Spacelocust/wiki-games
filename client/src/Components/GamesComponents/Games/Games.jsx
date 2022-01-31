import React, { useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { motion } from "framer-motion";

import { listGames } from "../Selector/GamesSelector";
import Card from "../../GeneralComponents/Cards/Card";
import ContainerComponent from "../../GeneralComponents/ContainerComponent/ContainerComponent";

function Games() {
    const [currentListGames, setCurrentListGames] = useRecoilState(listGames);
    const games = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/games');
            setCurrentListGames(data);
        } catch (e) {
            console.log(e)
        }
    }

    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            }
        },
        exit: {
            transition: {
                delayChildren: 0.1,
                staggerChildren: 0.1,
            }
        }
    };


    useEffect(() => {
        games()
    }, []);

    return (
        <ContainerComponent>
            <motion.div
                className="container mt-5 d-flex flex-wrap justify-content-center"
                variants={container}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {currentListGames && [...currentListGames].reverse().map((game) => (
                    <Card key={game.id} url={game.img_url} name={game.name} id={game.id}/>
                ))}
            </motion.div>
        </ContainerComponent>
    );
}

export default Games;