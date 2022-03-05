import React from 'react';

import ContainerComponent from '../../GeneralComponents/Containers/ContainerComponent/ContainerComponent';
import BackButtonComponent from '../../GeneralComponents/Buttons/BackButton/BackButtonComponent';
import BodyComponent from '../../GeneralComponents/Containers/Body/BodyComponent';
import UserBet from './UserBet';

function UserBets() {
    return (
        <ContainerComponent>
            <BackButtonComponent/>
            <BodyComponent className='bg-dark text-light rounded p-1'>
                <h2 className="font-secular m-2">Mes paris</h2>
                <UserBet/>
            </BodyComponent>
        </ContainerComponent>
    );
}

export default UserBets;
