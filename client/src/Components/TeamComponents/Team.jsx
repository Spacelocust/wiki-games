import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import ListGroup from 'react-bootstrap/ListGroup';

import { getTeam } from '../../api/axiosBase';

import ContainerComponent from '../GeneralComponents/Containers/ContainerComponent/ContainerComponent';
import BackButtonComponent from '../GeneralComponents/Buttons/BackButton/BackButtonComponent';
import BodyComponent from '../GeneralComponents/Containers/Body/BodyComponent';
import Header from '../GeneralComponents/Containers/Header/Header';
import Match from '../MatchComponent/GameMatchs/Match';
import Player from './Player/Player';
import LoaderGif from '../LoaderComponents/LoaderGif';
import caytlin from '../../assets/images/gif/caitlyn.gif';

function Team() {
    const params = useParams();
    const [loader, setLoader] = useState(true);
    const [team, setTeam] = useState({});
    const [match, setMatch] = useState({});

    useEffect(() => {
        setLoader(true);
        (async () => {
           try {
               const { data } = await getTeam(params.id);
               setTeam(data.team);
               setMatch(data.match[0])
               setLoader(false);
               console.log(data.team);
           } catch (e) {
               console.error(e);
           }
        })()
    }, [])
    return (
        <ContainerComponent>
            <BackButtonComponent previousOn />
            {!isEmpty(team) && !loader ? <>
                <Header img={team.image_url} title={team.name}/>
                {!isEmpty(team.players) && <BodyComponent className="bg-dark text-light rounded p-1">
                    <div className="d-flex flex-wrap justify-content-center">
                        {team.players.map((player) => (
                            <Player player={player} game={team.current_videogame} key={player.id}/>
                        ))}
                    </div>
                </BodyComponent>}
                <BodyComponent className="bg-dark text-light rounded p-1">
                    <h2 className="font-secular m-2">Dernier matche</h2>
                    <div className="container">
                        <ListGroup>
                            <ListGroup.Item>{!isEmpty(match) ? <Match match={match}/> : 'Aucun match en cours..'}</ListGroup.Item>
                        </ListGroup>
                    </div>
                </BodyComponent>
            </> : <LoaderGif img={caytlin} text={'Caytlin attends son équipe..'}/>}

        </ContainerComponent>
    );
}

export default Team;
