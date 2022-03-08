import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTeamsByGame } from '../../../api/axiosBase';
import ContainerComponent from '../../GeneralComponents/Containers/ContainerComponent/ContainerComponent';
import BodyComponent from '../../GeneralComponents/Containers/Body/BodyComponent';
import empty from '../../../assets/images/empty/img-empty.jpg';

function Teams() {
    const params = useParams();
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await getTeamsByGame(params.id);
                setTeams(data);
                console.log(data);
            } catch (e) {
                console.log(e)
            }
        })();
    }, []);
    return (
        <ContainerComponent>
            <BodyComponent className='bg-dark d-flex flex-wrap'>
                {teams && teams.map(({ id, name, image_url }) => (<div key={id} className="d-flex align-items-center flex-column">
                    <img src={image_url || empty} alt="" style={{ height: '5rem' }}/>
                </div>))}
            </BodyComponent>
        </ContainerComponent>
    );
}

export default Teams;
