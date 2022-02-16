import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

import GameMatche from './GameMatche';
import ButtonCustom from '../../GeneralComponents/Buttons/Button/ButtonCustom';
import LoaderGif from '../../LoaderComponents/LoaderGif';
import gun from '../../../assets/images/gun-valorant.gif';
import { isEmpty } from 'lodash';

function GameMatches() {
    const params = useParams();
    const [pagination, setPagination] = useState({ state: 'upcoming', page: 1, perPage: 5 });
    const [matches, setMatches] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const source = axios.CancelToken.source();
        setLoader(true);
        (async () => {
            try {
                const { data } = await axios.get(`/games/${params.id}/matches/${pagination.state}/${pagination.page}/${pagination.perPage}`, {
                    cancelToken: source.token
                });
                console.log(data);
                setMatches(data);
                setLoader(false);
            } catch (e) {
                if (axios.isCancel(e)) {
                } else {
                    throw e;
                }
            }
        })();

        return () => source.cancel();
    }, [pagination]);
    return (
        <div className="container">
            <ButtonCustom callback={() => setPagination({ state: 'past', page: 1, perPage: 5 })}
                          active={pagination.state === 'past'}>Derniers matches</ButtonCustom>
            <ButtonCustom callback={() => setPagination({ state: 'running', page: 1, perPage: 5 })}
                          active={pagination.state === 'running'}>Matches en cours</ButtonCustom>
            <ButtonCustom callback={() => setPagination({ state: 'upcoming', page: 1, perPage: 5 })}
                          active={pagination.state === 'upcoming'}>Prochains matches</ButtonCustom>
            <ListGroup className="m-2">
                {(matches && !loader) ?
                    (!isEmpty(matches) ? matches.map((matche) => <ListGroup.Item><GameMatche matche={matche}/></ListGroup.Item>)
                        : <ListGroup.Item><p className="m-0 text-center">Aucun matches..</p></ListGroup.Item>)
                    : <ListGroup.Item><LoaderGif img={gun} text="unset"/></ListGroup.Item>
                }
            </ListGroup>
        </div>
    );
}

export default GameMatches;
