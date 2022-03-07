import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import API from '../../../api/axiosBase';

import ContainerComponent from '../../GeneralComponents/Containers/ContainerComponent/ContainerComponent';
import Header from '../../GeneralComponents/Containers/Header/Header';
import BodyComponent from '../../GeneralComponents/Containers/Body/BodyComponent';
import overwatch from '../../../assets/images/gif/overwatch.gif';
import LoaderGif from '../../LoaderComponents/LoaderGif';
import BackButtonComponent from '../../GeneralComponents/Buttons/BackButton/BackButtonComponent';
import Leagues from '../../LeaguesComponents/GameLeagues/Leagues';
import Matchs from '../../MatchComponent/GameMatchs/Matchs';

function Game() {
    const params = useParams();
    const [game, setGame] = useState({});
    const [leagues, setLeagues] = useState([]);

    let search = '';
    const searchLeagues = (value) => {
        search = value;
        let defaultLeagues = game.leagues;
        setLeagues(defaultLeagues.filter((league) => league.name.toLowerCase().includes(search)));
    };

    useEffect(() => {
        (async () => {
            try {
                const { data } = await API.get(`/games/${params.id}`);
                setGame(data);
                setLeagues(data.leagues);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    return (
        <ContainerComponent>
            <BackButtonComponent />
            <div className="mt-5">
                <Header img={game.img_url} title={game.name}/>
                <BodyComponent className='bg-dark text-light rounded p-1'>
                    <h2 className="font-secular m-2">Matchs</h2>
                    <Matchs />
                </BodyComponent>
                <BodyComponent className='bg-white rounded'>
                    { !isEmpty(game) ?
                        <Leagues leagues={leagues} searchCallback={searchLeagues}/>
                        : <LoaderGif img={overwatch} text="unset"/>}
                </BodyComponent>
            </div>
        </ContainerComponent>
    );
}

export default Game;
