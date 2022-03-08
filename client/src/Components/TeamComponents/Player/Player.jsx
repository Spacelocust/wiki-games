import React from 'react';
import { isNull } from 'lodash';

import userEmpty from '../../../assets/images/empty/user-empty.jpg';
import empty from '../../../assets/images/empty/img-empty.jpg';
import { DOTA } from '../../../Constants/Games';

function Player({ player, game }) {
    return (
        <div className="bg-white text-dark border border-light rounded m-1 p-2 d-flex">
            <div className='d-flex align-items-end'>
                <img src={player.image_url || userEmpty} alt="" style={{ width: '100%', height: '7rem' }}/>
                <p className="text-center font-contrail font-large">{player.name}</p>
            </div>
            {(game.slug === 'league-of-legends' || game.slug === 'ow') && <img src={getRoleImg(player, game) || empty} alt="" style={{ width: '3rem', height: '3rem' }}
                  title={player.role}/>}
            {game.slug === 'dota-2' && <p>{ DOTA[player.role] }</p>}
        </div>
    );
}

const getRoleImg = ({ role }, { name }) => !isNull(role) && require(`../../../assets/images/roles/${name}/${role}.png`);

export default Player;
