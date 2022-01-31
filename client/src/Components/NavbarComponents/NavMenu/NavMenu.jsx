import React from 'react';
import NavMenuLink from "./NavMenuLink";
import WrapperSize from "../../GeneralComponents/Wrapper/WrapperSize";

function NavMenu() {
    return (
        <div>
            <ul>
                <NavMenuLink colorHover='#ee7752' text='Accueil' to='/'/>
                <NavMenuLink colorHover='#e73c7e' text='Jeux' to='/games'/>
                <NavMenuLink colorHover='#23a6d5' text='Matchs'>
                    <WrapperSize>
                        <NavMenuLink colorHover='#23a6d5' text='skti'>
                            <WrapperSize>
                                <NavMenuLink colorHover='#23a6d5' text='skti'/>
                                <NavMenuLink colorHover='#23a6d5' text='skti'/>
                                <NavMenuLink colorHover='#23a6d5' text='skti'/>
                                <NavMenuLink colorHover='#23a6d5' text='skti'/>
                            </WrapperSize>
                        </NavMenuLink>
                        <NavMenuLink colorHover='#23a6d5' text='mvp'/>
                        <NavMenuLink colorHover='#23a6d5' text='omega'/>
                    </WrapperSize>
                </NavMenuLink>
                <NavMenuLink colorHover='#23d5ab' text='Paris en cours'>Paris en cours</NavMenuLink>
            </ul>
        </div>
);
}

export default NavMenu;