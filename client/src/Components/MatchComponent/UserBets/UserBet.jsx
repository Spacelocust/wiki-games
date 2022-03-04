import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import ListGroup from 'react-bootstrap/ListGroup';

import { getMatchByBet } from '../../../api/axiosBase';
import AuthReducer from '../../AuthComponents/Selector/UserSelector';
import ACTION from '../../AuthComponents/Selector/UserAction';

import Match from '../GameMatchs/Match';
import BetModalResult from '../Bet/BetModalResult';
import LoaderGif from '../../LoaderComponents/LoaderGif';
import gun from '../../../assets/images/gun-valorant.gif';

function UserBet() {
    const [user, setUser] = AuthReducer(ACTION.user);
    const [loader, setLoader] = useState(true);
    const [matchs, setMatchs] = useState(false);
    const [modalExecute] = BetModalResult();

    useEffect(() => {
        !isEmpty(user) && (async () => {
            setLoader(true);
            try {
                const { data } = await getMatchByBet({ bets: user.bet })
                setMatchs(data.matchs);
                setLoader(false);

                data.bets.done && modalExecute(data.coinsReceived);
                data.coinsUser !== user.coins && setUser({ ...user, coins: data.coinsUser, bet: data.bets.betsUpdated });
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
