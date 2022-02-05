import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MatchScore() {
    const params = useParams();

    useEffect(() => {
        const source = axios.CancelToken.source()
        const getGameMatches = async () => {
            try {
                const { data } = await axios.get(`/games/${params.id}/matches`,{
                    cancelToken: source.token,
                });
               console.log(data);
            } catch (e) {
                if (axios.isCancel(e)) {
                } else {
                    throw e
                }
            }
        };
        getGameMatches()

        return () => {
            source.cancel()
        }
    }, []);
    return (
        <div>test</div>
    );
}

export default MatchScore;
