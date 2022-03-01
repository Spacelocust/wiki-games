import React, { useEffect, useState } from 'react';
import { isEmpty, isNull } from 'lodash';
import ListGroup from 'react-bootstrap/ListGroup';

import { getMatchByBet } from '../../../api/axiosBase';
import AuthReducer from '../../AuthComponents/Selector/UserSelector';
import ACTION from '../../AuthComponents/Selector/UserAction';

import Match from '../GameMatchs/Match';
import LoaderGif from '../../LoaderComponents/LoaderGif';
import gun from '../../../assets/images/gun-valorant.gif';

function UserBet() {
    const [user] = AuthReducer(ACTION.getUser);
    const [loader, setLoader] = useState(true);
    const [matchs, setMatchs] = useState(false);

    useEffect(() => {
        !isEmpty(user) && (async () => {
            setLoader(true);
            try {
                const { data } = await getMatchByBet({ bets: user.bet.map((bet) => bet.match) })
                setMatchs(data);
                setLoader(false);
            } catch (e) {
                console.log(e)
            }
        })();
    }, [user]);

    return (
        <div className='container'>
            <ListGroup className="m-2">
                {!loader ?
                    (!isEmpty(matchs) ? matchs.map((match) => <ListGroup.Item key={match.id}>
                            <Match match={match} />
                        </ListGroup.Item>)
                        : <ListGroup.Item><p className="m-0 text-center">Aucun matches..</p></ListGroup.Item>)
                    : <ListGroup.Item><LoaderGif img={gun} text="unset"/></ListGroup.Item>
                }
            </ListGroup>
        </div>
    );
}

export default UserBet;
