import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import { isEmpty, isNull } from 'lodash';

import GameMatche from './GameMatche';
import PaginationComponent from '../../GeneralComponents/PaginationComponent/PaginationComponent';
import ButtonCustom from '../../GeneralComponents/Buttons/Button/ButtonCustom';
import LoaderGif from '../../LoaderComponents/LoaderGif';
import gun from '../../../assets/images/gun-valorant.gif';

function GameMatches() {
    const params = useParams();
    const [pagination, setPagination] = useState({ state: 'upcoming', page: 1, perPage: 5, maxPage: 0 });
    const [matches, setMatches] = useState([]);
    const [loader, setLoader] = useState(true);

    const changeState = (state) => setPagination({ ...pagination, state, page: 1 });

    const pageChange = ({ selected }) => setPagination({ ...pagination, page: selected + 1 });

    useEffect(() => {
        const source = axios.CancelToken.source();
        (async () => {
            setLoader(true);
            console.log(`/games/${params.id}/matches/${pagination.state}/${pagination.page}/${pagination.perPage}`)
            try {
                const { data } = await axios.get(`/games/${params.id}/matches/${pagination.state}/${pagination.page}/${pagination.perPage}`, {
                    cancelToken: source.token
                });
                const { list, link } = data;

                setPagination({ ...pagination, maxPage: (!isNull(link) ? parseInt(link.last.page) : 0) });
                setMatches(list);
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
                {(matches && !loader) ?
                    (!isEmpty(matches) ? matches.map((matche) => <ListGroup.Item key={matche.id}><GameMatche
                            matche={matche}/></ListGroup.Item>)
                        : <ListGroup.Item><p className="m-0 text-center">Aucun matches..</p></ListGroup.Item>)
                    : <ListGroup.Item><LoaderGif img={gun} text="unset"/></ListGroup.Item>
                }
            </ListGroup>
            {(!isEmpty(matches) && pagination.maxPage > 0) &&
                <PaginationComponent className="justify-content-center" onPageChange={pageChange}
                                     pageCount={pagination.maxPage} forcePage={(pagination.page - 1)}/>}
        </div>
    );
}

export default GameMatches;
