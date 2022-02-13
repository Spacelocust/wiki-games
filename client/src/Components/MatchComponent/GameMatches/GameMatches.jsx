import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

function GameMatches() {
    const params = useParams();
    const [paganination, setPaganination] = useState({ page: 1, perPage: 10 });

    useEffect(() => {
        const source = axios.CancelToken.source();
        const getGameMatches = async () => {
            try {
                const { data } = await axios.get(`/games/${params.id}/matches/upcoming/${paganination.page}/${paganination.perPage}`, {
                    cancelToken: source.token
                });
                console.log(data)
            } catch (e) {
                if (axios.isCancel(e)) {
                } else {
                    throw e;
                }
            }
        };
        //getGameMatches();

        return () => {
            source.cancel();
        };
    }, []);
    return (
        <div className="container">
            <ListGroup>
                <ListGroup.Item>Test</ListGroup.Item>
            </ListGroup>
        </div>
    );
}

export default GameMatches;
