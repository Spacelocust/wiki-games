import React from 'react';

import { CharmSwords } from '../../GeneralComponents/SvgComponents/SvgComponent';

function GameMatche({ matche }) {

    return (
        <div className='d-flex align-items-center justify-content-evenly'>
            <div className="d-flex align-items-center flex-column">
                <img src={matche.opponents[0].opponent.image_url} alt="" style={{ height: '3rem', width: '3rem' }}/>
                <p className="text-center m-0">{matche.opponents[0].opponent.name}</p>
            </div>
            <CharmSwords height={'48px'} />
            <div className="d-flex align-items-center flex-column">
                <img src={matche.opponents[0].opponent.image_url} alt="" style={{ height: '3rem', width: '3rem' }}/>
                <p className="text-center m-0">{matche.opponents[0].opponent.name}</p>
            </div>
        </div>
    );
}

export default GameMatche;
