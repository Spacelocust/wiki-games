import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import { isEmpty, isNull } from 'lodash';

import GameMatch from './GameMatch';
import PaginationComponent from '../../GeneralComponents/PaginationComponent/PaginationComponent';
import ButtonCustom from '../../GeneralComponents/Buttons/Button/ButtonCustom';
import LoaderGif from '../../LoaderComponents/LoaderGif';
import gun from '../../../assets/images/gun-valorant.gif';

function GameMatchs() {
    const params = useParams();
    const [pagination, setPagination] = useState({ state: 'upcoming', page: 1, perPage: 5, maxPage: 0 });
    const [matchs, setMatchs] = useState([]);
    const [loader, setLoader] = useState(true);

    const changeState = (state) => setPagination({ ...pagination, state, page: 1 });

    const pageChange = ({ selected }) => setPagination({ ...pagination, page: selected + 1 });

    useEffect(() => {
        const source = axios.CancelToken.source();
        (async () => {
            setLoader(true);
            try {
                const { data } = await axios.get(`/games/${params.id}/matchs/${pagination.state}/${pagination.page}/${pagination.perPage}`, {
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
                    (!isEmpty(matchs) ? matchs.map((match) => <ListGroup.Item key={match.id}><GameMatch
                            match={match}/></ListGroup.Item>)
                        : <ListGroup.Item><p className="m-0 text-center">Aucun matches..</p></ListGroup.Item>)
                    : <ListGroup.Item><LoaderGif img={gun} text="unset"/></ListGroup.Item>
                }
            </ListGroup>
            {(!isEmpty(matchs) && pagination.maxPage > 0) &&
                <PaginationComponent className="justify-content-center" onPageChange={pageChange}
                                     pageCount={pagination.maxPage} forcePage={(pagination.page - 1)}/>}
        </div>
    );
}

export default GameMatchs;
