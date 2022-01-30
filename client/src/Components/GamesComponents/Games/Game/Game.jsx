import React from 'react';
import { useParams } from 'react-router-dom';

function Game() {
    const params = useParams();

    return (
        <div>id: {params.id}</div>
    );
}

export default Game;