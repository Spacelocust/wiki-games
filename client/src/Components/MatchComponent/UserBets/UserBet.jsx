import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon as IconSetter } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

import { getMatchByBet } from '../../../api/axiosBase';
import AuthReducer from '../../AuthComponents/Selector/UserSelector';
import ACTION from '../../AuthComponents/Selector/UserAction';

import Match from '../GameMatchs/Match';
import PaginationComponent from '../../GeneralComponents/Pagination/PaginationComponent';
import TwitchComponent from '../../TwitchComponent/TwitchComponent';
import BetModalResult from '../Bet/BetModalResult';
import { TokenHandler } from '../../../Helpers/errorsHandler';

import LoaderGif from '../../LoaderComponents/LoaderGif';
import gun from '../../../assets/images/gif/gun-valorant.gif';

function UserBet() {
    const [user, setUser] = AuthReducer(ACTION.user);
    const [modalExecute] = BetModalResult();
    const { execute } = TokenHandler();

    const [pagination, setPagination] = useState({ page: 1, maxPage: 0 });
    const [loader, setLoader] = useState(true);
    const [reload, setReload] = useState(false);
    const [matchs, setMatchs] = useState(false);
    const [matchSelected, setMatchSelected] = useState(false)

    useEffect(() => {
        !isEmpty(user) && (async () => {
            setLoader(true);
            try {
                const { data } = await getMatchByBet({ bets: user.bet, pagination })
                setMatchs(data.matchs);
                setLoader(false);
                data.bets.done && modalExecute(data.coinsReceived);
                data.coinsUser !== user.coins && setUser({ ...user, coins: data.coinsUser, bet: data.bets.betsUpdated });
                setPagination({ ...pagination, maxPage: data.pagination.maxPage });
            } catch ({ response }) {
                await execute(response);
            }
        })();
    }, [user, reload, pagination.page]);

    const pageChange = ({ selected }) => setPagination({ ...pagination, page: selected + 1 });

    const changeMatchSelected = (match) => setMatchSelected(match);

    return (
        <div className='container'>
            <button className='btn btn-secondary' onClick={() => setReload(!reload)}><IconSetter icon={faRedo} /></button>
            <ListGroup className="m-2">
                {!loader ?
                    (!isEmpty(matchs) ? matchs.map((match) => <ListGroup.Item key={match.id}>
                            <Match match={match} stream={changeMatchSelected}/>
                        </ListGroup.Item>)
                        : <ListGroup.Item><p className="m-0 text-center">Aucun matches..</p></ListGroup.Item>)
                    : <ListGroup.Item><LoaderGif img={gun} text="unset"/></ListGroup.Item>
                }
                {(!isEmpty(matchs) && pagination.maxPage > 0) &&
                    <PaginationComponent className="justify-content-center mt-2 mb-0" onPageChange={pageChange}
                                         pageCount={pagination.maxPage} forcePage={(pagination.page - 1)}/>}
                {matchSelected && <TwitchComponent match={matchSelected} show={matchSelected} onHide={() => setMatchSelected(false)}/>}
            </ListGroup>
        </div>
    );
}

export default UserBet;
