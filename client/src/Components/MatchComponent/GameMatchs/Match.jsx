import React, { useEffect, useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import _, { isEmpty } from 'lodash';

import { STATUS_MATCH } from '../../../Constants/Matchs';
import ACTION from '../../AuthComponents/Selector/UserAction';
import AuthReducer from '../../AuthComponents/Selector/UserSelector';
import BadgeComponent from '../../GeneralComponents/Badges/BadgeComponent';
import { CharmSwords, LucideCoins } from '../../GeneralComponents/SvgComponent/SvgComponent';
import empty from '../../../assets/images/img-empty.jpg';

function Match({ match, callback }) {
    const [user] = AuthReducer(ACTION.getUser);
    const [status, setStatus] = useState(STATUS_MATCH.not_started);
    const [more, setMore] = useState(false);
    const matchBet = !isEmpty(user) && user.bet.find((bet) => bet.match === match.id);

    useEffect(() => {
        setStatus(STATUS_MATCH[match.status]);
    }, [match]);

    const IsWinner = ({ opponent }) => (
        status === STATUS_MATCH.finished && <p
            className={`text-center m-0 font-large font-contrail ${match.winner_id === opponent ? 'text-success' : 'text-danger'}`}>
            {match.winner_id === opponent ? 'Winner' : 'Looser'}
        </p>
    );

    const CardTeam = ({ opponent }) => (
        <div className="d-flex align-items-center flex-column w-50">
            <img src={opponent.image_url || empty} alt="" style={{ height: '3rem', width: '3rem' }}/>
            <p className="text-center m-0">{opponent.name}</p>
            <IsWinner opponent={opponent.id}/>
        </div>
    );

    return (
        <div>
            <div className="d-flex justify-content-between">
                <div className="d-flex">
                    <BadgeComponent className={`font-small`} variants={status.color}>{status.label}</BadgeComponent>
                    {status === STATUS_MATCH.finished && <BadgeComponent
                        className={`font-small bg-${match.winner_id === matchBet.choice ? 'success' : 'danger'}`}>{match.winner_id === matchBet.choice ? 'Gagné' : 'Perdu'}</BadgeComponent>}
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-evenly">
                <CardTeam opponent={match.opponents[0].opponent}/>
                <div>
                    <CharmSwords height={'48px'}/>
                    <p className="text-center my-1">{`${match.results[0].score} - ${match.results[1].score}`}</p>
                </div>
                <CardTeam opponent={match.opponents[1].opponent}/>
            </div>
            {!isEmpty(user) && <div className="d-flex justify-content-end">
                {!matchBet && <Button variant="success" title="Paris" onClick={() => callback(match)}>Parié <LucideCoins
                        height="18px"/></Button>}
            </div>}
            {matchBet && <Collapse in={more}>
                <div>Vous avez parié: {matchBet.coins} coins
                    sur {match.opponents.find(({ opponent }) => opponent.id === matchBet.choice).opponent.name}</div>
            </Collapse>}
        </div>
    );
}

export default Match;
