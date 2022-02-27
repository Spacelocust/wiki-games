import React, { useEffect, useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon as IconSetter } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import _, { isEmpty } from 'lodash';

import ACTION from '../../AuthComponents/Selector/UserAction';
import AuthReducer from '../../AuthComponents/Selector/UserSelector';
import BadgeComponent from '../../GeneralComponents/Badges/BadgeComponent';
import { CharmSwords, LucideCoins } from '../../GeneralComponents/SvgComponent/SvgComponent';
import empty from '../../../assets/images/img-empty.jpg';

function GameMatch({ match, callback }) {
    const [user] = AuthReducer(ACTION.getUser);
    const [status, setStatus] = useState('non commencé');
    const [more, setMore] = useState(false);
    const matchBet = user.bet.find((bet) => bet.match === match.id);
    useEffect(() => {
        setStatus(({
            canceled: 'annulé',
            finished: 'terminé',
            ['not_started']: 'non commencé',
            postponed: 'reporté',
            running: 'en cours'
        }[match.status]));
    }, []);

    return (
        <div>
            <div className="d-flex justify-content-between">
                <div className="d-flex">
                    <BadgeComponent className={`font-small`}>{status}</BadgeComponent>
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-evenly">
                <div className="d-flex align-items-center flex-column w-50">
                    <img src={match.opponents[0].opponent.image_url || empty } alt="" style={{ height: '3rem', width: '3rem' }}/>
                    <p className="text-center m-0">{match.opponents[0].opponent.name}</p>
                </div>
                <div>
                    <CharmSwords height={'48px'}/>
                    <p className="text-center my-1">{`${match.results[0].score} - ${match.results[1].score}`}</p>
                </div>
                <div className="d-flex align-items-center flex-column w-50">
                    <img src={match.opponents[1].opponent.image_url || empty} alt="" style={{ height: '3rem', width: '3rem' }}/>
                    <p className="text-center m-0">{match.opponents[1].opponent.name}</p>
                </div>
            </div>
            {!(isEmpty(user) || status === 'terminé' || status === 'annulé') && <div className="d-flex justify-content-end">
                {!matchBet ? <Button variant="success" title="Paris" onClick={() => callback(match)}>Parié <LucideCoins
                    height="18px"/></Button> : <Button variant="warning" title="voir résumé" onClick={() => setMore(!more)}>Déja parié <LucideCoins
                    height="18px"/></Button>}
            </div>}
            {matchBet && <Collapse in={more}>
                <div>Vous avez parié: {matchBet.coins} coins
                    sur {match.opponents.find(({ opponent }) => opponent.id === matchBet.choice).opponent.name }</div>
            </Collapse>}
        </div>
    );
}

export default GameMatch;
