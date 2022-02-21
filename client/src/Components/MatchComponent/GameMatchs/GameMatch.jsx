import React, { useEffect, useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { FontAwesomeIcon as IconSetter } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

import empty from '../../../assets/images/img-empty.jpg';

import { CharmSwords } from '../../GeneralComponents/SvgComponents/SvgComponent';
import BadgeComponent from '../../GeneralComponents/Badges/BadgeComponent';

function GameMatch({ match }) {
    const [score, setScore] = useState('en cours');
    const [status, setStatus] = useState('non commencé');
    const [more, setMore] = useState(false);

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
                <BadgeComponent className="font-small text-dark border-dark bg-light mx-2" position="end"
                                onClick={() => setMore(!more)}><IconSetter icon={faEllipsisH}/></BadgeComponent>
                <BadgeComponent className={`font-small`}>{status}</BadgeComponent>
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
            <Collapse in={more}>
            <div>test..</div>
            </Collapse>
        </div>
    );
}

export default GameMatch;
