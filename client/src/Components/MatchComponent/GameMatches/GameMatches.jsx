import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function GameMatches() {
    const params = useParams();
    const [pagination, setPagination] = useState({ state: 'upcoming', page: 1, perPage: 10 });

    useEffect(() => {
        const source = axios.CancelToken.source();
        (async () => {
            try {
                const { data } = await axios.get(`/games/${params.id}/matches/${pagination.state}/${pagination.page}/${pagination.perPage}`, {
                    cancelToken: source.token
                });
                console.log(data, pagination.state)
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
            <Button variant='danger' onClick={() => setPagination({ state: 'past', page: 1, perPage: 10 })}>Passé</Button>
            <Button onClick={() => setPagination({ state: 'running', page: 1, perPage: 10 })}>En cours</Button>
            <Button variant='success' onClick={() => setPagination({ state: 'upcoming', page: 1, perPage: 10 })}>A venir</Button>
            <ListGroup>
                <ListGroup.Item>Test</ListGroup.Item>
            </ListGroup>
        </div>
    );
}

export default GameMatches;
