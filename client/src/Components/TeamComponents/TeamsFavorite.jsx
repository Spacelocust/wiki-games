import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';

import { getFavorite } from '../../api/axiosBase';
import AuthReducer from '../AuthComponents/Selector/UserSelector';
import ACTION from '../AuthComponents/Selector/UserAction';

import ContainerComponent from '../GeneralComponents/Containers/ContainerComponent/ContainerComponent';
import BodyComponent from '../GeneralComponents/Containers/Body/BodyComponent';
import empty from '../../assets/images/empty/img-empty.jpg';
import BackButtonComponent from '../GeneralComponents/Buttons/BackButton/BackButtonComponent';

function TeamsFavorite() {
    const navigate = useNavigate();
    const [user] = AuthReducer(ACTION.getUser);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        if(isEmpty(user)) {
            return navigate('/');
        }

        (async () => {
            try {
                const { data } = await getFavorite();
                setTeams(data);
            } catch (e) {
                console.log(e)
            }
        })();
    }, []);
    return (
        <ContainerComponent>
            <BackButtonComponent />
            <BodyComponent className='bg-dark text-white'>
                <h2 className="font-secular m-2">Equipes favorites</h2>
                <div className='d-flex flex-wrap p-2'>
                    {teams && teams.map(({ id, name, image_url }) => (<div key={id} className="bg-white rounded mx-2 p-1 d-flex align-items-center flex-column">
                        <Link to={`${id}`}><img src={image_url || empty} alt="" style={{ height: '5rem' }}/></Link>
                    </div>))}
                </div>
            </BodyComponent>
        </ContainerComponent>
    );
}

export default TeamsFavorite;
