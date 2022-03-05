import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getTeam } from '../../api/axiosBase';

import ContainerComponent from '../GeneralComponents/Containers/ContainerComponent/ContainerComponent';
import BackButtonComponent from '../GeneralComponents/Buttons/BackButton/BackButtonComponent';
import BodyComponent from '../GeneralComponents/Containers/Body/BodyComponent';
import Header from '../GeneralComponents/Containers/Header/Header';
import { isEmpty } from 'lodash';
import Match from '../MatchComponent/GameMatchs/Match';
import { ListGroup } from 'react-bootstrap';

function Team() {
    const params = useParams();
    const [team, setTeam] = useState({});
    const [match, setMatch] = useState({});

    useEffect(() => {
        (async () => {
           try {
               const { data } = await getTeam(params.id);
               setTeam(data.team);
               setMatch(data.match[0])
               console.log(data.team)
           } catch (e) {
               console.error(e);
           }
        })()
    }, [])
    return (
        <ContainerComponent>
            <BackButtonComponent previousOn />
            {!isEmpty(team) && <Header img={team.image_url} title={team.name}/>}
            {!isEmpty(team) && <BodyComponent className="bg-dark text-light rounded p-1">
                <div className="d-flex flex-wrap justify-content-center">
                    {team.players.map((player) => (
                        <div key={player.id} className="border border-light">
                            <img src={player.image_url} alt="" style={{ width: '100%', height: '7rem' }}/>
                            <p className="text-center">{`(${player.name})`}</p>
                        </div>
                    ))}
                </div>
            </BodyComponent>}
            {!isEmpty(match) && <BodyComponent className="bg-dark text-light rounded p-1">
                <h2 className="font-secular m-2">Dernier matche</h2>
                <div className="container">
                    <ListGroup>
                        <ListGroup.Item><Match match={match} /></ListGroup.Item>
                    </ListGroup>
                </div>
            </BodyComponent>}
        </ContainerComponent>
    );
}

export default Team;
