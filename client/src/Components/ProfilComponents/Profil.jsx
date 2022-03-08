import React from 'react';
import NavMenuLink from '../NavbarComponents/NavMenu/NavMenuLink';

import AuthReducer from '../AuthComponents/Selector/UserSelector';
import ACTION from '../AuthComponents/Selector/UserAction';

function Profil() {
    const [user] = AuthReducer(ACTION.getUser);
    return (
        <div>
            <h2 className="text-white">{user.username}</h2>
            <ul>
                <NavMenuLink colorHover="#23a6d5" text="Profil"/>
                <NavMenuLink colorHover="#23a6d5" text="Mes paris" to="/my-match-bet"/>
                <NavMenuLink colorHover="#23a6d5" text="Favoris" to="/my-match-bet">
                    <NavMenuLink text="Equipes" to={'/teams'}/>
                </NavMenuLink>
                <NavMenuLink colorHover="#23a6d5" text="Déconnexion" to="/logout"/>
            </ul>
        </div>
    );
}

export default Profil;
