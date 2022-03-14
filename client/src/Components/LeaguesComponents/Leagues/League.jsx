import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getLeague } from '../../../api/axiosBase';

function League() {
    const params = useParams();
    const [league, setLeague] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const { data } = await getLeague(params.id);
                setLeague(data);
            } catch (e) {
                console.log(e)
            }
        })();
    }, []);
    return (
        <div>{league && league.name}</div>
    );
}

export default League;
