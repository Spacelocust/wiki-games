import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import _, { isEmpty, isNull } from 'lodash';

import { STATUS_MATCH } from '../../../Constants/Matchs';
import ACTION from '../../AuthComponents/Selector/UserAction';
import AuthReducer from '../../AuthComponents/Selector/UserSelector';
import BadgeComponent from '../../GeneralComponents/Badges/BadgeComponent';
import { CharmSwords, LucideCoins } from '../../GeneralComponents/SvgComponent/SvgComponent';
import empty from '../../../assets/images/img-empty.jpg';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

function Match({ match, callback, stream }) {
    const [user] = AuthReducer(ACTION.getUser);
    const [status, setStatus] = useState(STATUS_MATCH.not_started);
    const matchBet = !isEmpty(user) && user.bet.find((bet) => bet.match === match.id);
    const onLive = !isNull(match.streams.english.raw_url);
    useEffect(() => {
        setStatus(STATUS_MATCH[match.status]);
    }, [match]);

    return (
        <div>
            <div className="d-flex justify-content-between">
                <div className="d-flex">
                    <BadgeComponent className={`font-small`} variants={status.color}>{status.label}</BadgeComponent>
                    {(status === STATUS_MATCH.finished && matchBet) && <BadgeComponent
                        className={`font-small bg-${match.winner_id === matchBet.choice ? 'success' : 'danger'}`}>{match.winner_id === matchBet.choice ? 'Gagné' : 'Perdu'}</BadgeComponent>}
                    {(status === STATUS_MATCH.running && onLive) && <BadgeComponent className={`font-small`} variants={'#d3455b'} onClick={() => stream(match)}>live&#9679;</BadgeComponent>}
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-evenly">
                <CardTeam opponent={match.opponents[0].opponent} status={status} match={match} bet={matchBet}/>
                <div className="d-flex flex-column">
                    { STATUS_MATCH[match.status] !== STATUS_MATCH.canceled &&
                        <p className="m-0" style={{ width: 'max-content' }}>
                        {`${dayjs(match.begin_at).format('DD/MM/YYYY HH:mm')}${!isNull(match.end_at) ? ' - ' + dayjs(match.end_at).format('DD/MM/YYYY HH:mm') : ''}`}
                        </p>
                    }
                    <CharmSwords height={'48px'} className="mx-auto"/>
                    <p className="text-center my-1">{`${match.results[0].score} - ${match.results[1].score}`}</p>
                </div>
                <CardTeam opponent={match.opponents[1].opponent} status={status} match={match} bet={matchBet}/>
            </div>
            {!isEmpty(user) && <div className="d-flex justify-content-end">
                {(!matchBet && ((STATUS_MATCH[match.status] !== STATUS_MATCH.finished) && (STATUS_MATCH[match.status] !== STATUS_MATCH.canceled))) &&
                    <Button variant="success" title="Paris" onClick={() => callback(match)}>Parié <LucideCoins height="18px"/></Button>
                }
            </div>}
        </div>
    );
}


const CardTeam = ({ opponent, status, match, bet }) => (
    <div className='d-flex align-items-center flex-column w-50'>
        <Link to={`/teams/${opponent.id}`}><img src={opponent.image_url || empty} alt="" className={`${(bet && (opponent.id === bet.choice)) && 'border-gold-double rounded'}`} style={{ height: '3rem', width: '3rem' }}/></Link>
        <p className="text-center m-0">{opponent.name}</p>
        <IsWinner opponent={opponent.id} status={status} match={match}/>
    </div>
);

const IsWinner = ({ opponent, status, match }) => (
    status === STATUS_MATCH.finished && <p
        className={`text-center m-0 font-large font-contrail ${!match.draw ? match.winner_id === opponent ? 'text-success' : 'text-danger' : 'text-secondary'}`}>
        {!match.draw ? match.winner_id === opponent ? 'Winner' : 'Looser' : 'Equality'}
    </p>
);


export default Match;
