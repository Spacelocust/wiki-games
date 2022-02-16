import React from 'react';
import NavMenuLink from '../NavbarComponents/NavMenu/NavMenuLink';
import { useRecoilState } from 'recoil';

import { signin } from '../AuthComponents/Selector/AuthSelector';

function Profil() {
    const [user,_] = useRecoilState(signin(false));
    return (
        <div>
            <h2 className="text-white">{user.username}</h2>
            <ul>
                <NavMenuLink colorHover="#23a6d5" text="Profil"/>
                <NavMenuLink colorHover="#23a6d5" text="Logout" to="/logout"/>
            </ul>
        </div>
    );
}

export default Profil;
