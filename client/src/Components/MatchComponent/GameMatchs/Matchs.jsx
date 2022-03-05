import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import { useParams } from 'react-router-dom';
import { isEmpty, isNull } from 'lodash';

import API from '../../../api/axiosBase';
import Match from './Match';
import Bet from '../Bet/Bet';
import OffcanvasMenu from '../../GeneralComponents/SlideMenu/OffcanvasMenu';
import PaginationComponent from '../../GeneralComponents/Pagination/PaginationComponent';
import ButtonCustom from '../../GeneralComponents/Buttons/Button/ButtonCustom';
import LoaderGif from '../../LoaderComponents/LoaderGif';
import gun from '../../../assets/images/gun-valorant.gif';
import TwitchComponent from '../../TwitchComponent/TwitchComponent';

function Matchs() {
    const params = useParams();
    const [loader, setLoader] = useState(true);
    const [pagination, setPagination] = useState({ state: 'upcoming', page: 1, perPage: 5, maxPage: 0 });

    const [matchs, setMatchs] = useState([]);
    const [matchSelected, setMatchSelected] = useState({});

    const [bet, setBet] = useState(false);
    const [live, setLive] = useState(false);

    const changeState = (state) => setPagination({ ...pagination, state, page: 1 });
    const pageChange = ({ selected }) => setPagination({ ...pagination, page: selected + 1 });

    useEffect(() => {
        const source = axios.CancelToken.source();
        (async () => {
            setLoader(true);
            try {
                const { data } = await API.get(`/games/${params.id}/matchs/${pagination.state}/${pagination.page}/${pagination.perPage}`, {
                    cancelToken: source.token
                });
                const { list, link } = data;

                setPagination({
                    ...pagination,
                    maxPage: (!isNull(link) ? parseInt(link.last !== undefined ? parseInt(link.last.page) : parseInt(link.prev.page) + 1) : 0)
                });
                setMatchs(list);
                setLoader(false);
            } catch (e) {
                if (axios.isCancel(e)) {
                } else {
                    throw e;
                }
            }
        })();
        return () => source.cancel();
    }, [pagination.page, pagination.state]);

    const changeMatchSelected = (match) => {
        setLive(false);
        setBet(true);
        setMatchSelected(match);
    };

    const onSelectLive = (match) => {
        setLive(true);
        setMatchSelected(match);
    }

    return (
        <div className="container">
            <div>
                <ButtonCustom callback={() => changeState('past')}
                              active={pagination.state === 'past'}>Derniers matches</ButtonCustom>
                <ButtonCustom callback={() => changeState('running')}
                              active={pagination.state === 'running'}>Matches en cours</ButtonCustom>
                <ButtonCustom callback={() => changeState('upcoming')}
                              active={pagination.state === 'upcoming'}>Prochains matches</ButtonCustom>
            </div>
            <ListGroup className="m-2">
                {(matchs && !loader) ?
                    (!isEmpty(matchs) ? matchs.map((match) => !isEmpty(match.opponents) && <ListGroup.Item key={match.id}>
                            <Match match={match} callback={changeMatchSelected} stream={onSelectLive}/>
                        </ListGroup.Item>)
                        : <ListGroup.Item><p className="m-0 text-center">Aucun matches..</p></ListGroup.Item>)
                    : <ListGroup.Item><LoaderGif img={gun} text="unset"/></ListGroup.Item>
                }
            </ListGroup>
            {(!isEmpty(matchs) && pagination.maxPage > 0) &&
                <PaginationComponent className="justify-content-center" onPageChange={pageChange}
                                     pageCount={pagination.maxPage} forcePage={(pagination.page - 1)}/>}
            {live && <TwitchComponent match={matchSelected} show={live} onHide={() => setLive(false)}/>}
            <OffcanvasMenu variants="#fff" closeCallback={() => setBet(!bet)} position={'end'} show={bet}>
                {matchSelected && <div>
                    <p>{matchSelected.name}</p>
                    <Bet match={matchSelected} callback={() => setBet(false)}/>
                </div>}
            </OffcanvasMenu>
        </div>
    );
}

export default Matchs;
