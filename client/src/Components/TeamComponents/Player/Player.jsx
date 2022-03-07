import React from 'react';
import userEmpty from '../../../assets/images/empty/user-empty.jpg';

function Player({ player }) {
    return (
        <div className="bg-white text-dark border border-light rounded m-1 p-2 d-flex">
            <div className='d-flex align-items-end'>
                <img src={player.image_url || userEmpty} alt="" style={{ width: '100%', height: '7rem' }}/>
                <p className="text-center font-contrail font-large">{player.name}</p>
            </div>
            <img src={getRoleImg(player.role)} alt="" style={{ width: '3rem', height: '3rem' }}/>
        </div>
    );
}

const getRoleImg = (role) => require(`../../../assets/images/role-moba/${role}.png`);

export default Player;
