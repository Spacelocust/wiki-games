import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import Navbar from 'react-bootstrap/Navbar';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import { FontAwesomeIcon as IconSetter } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';


import { AuthReducer } from '../../AuthComponents/Selector/AuthSelector';
import ACTION from '../../AuthComponents/Selector/AuthAction';

import Profil from '../../ProfilComponents/Profil';
import Login from '../../AuthComponents/Auth/Login';
import NavMenu from '../NavMenu/NavMenu';
import NavMenuAuth from '../NavMenu/NavMenuAuth';
import OffcanvasMenu from '../../GeneralComponents/SlideMenu/OffcanvasMenu';
import NavButton from '../NavButtons/NavButton';
import NavButtonLabel from '../NavButtons/NavButtonLabel';
import { LucideCoins } from '../../GeneralComponents/SvgComponent/SvgComponent';

function NavBar() {
    const [user] = AuthReducer(ACTION.user);

    const [showMenu, setShowMenu] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const onCloseMenu = () => setShowMenu(false);
    const onCloseLogin = () => setShowLogin(false);

    const onShowMenu = () => {
        setShowMenu(!showMenu);
        onCloseLogin();
    };

    const onShowLogin = () => {
        setShowLogin(!showLogin);
        onCloseMenu();
    };

    useEffect(() => {
        user && onCloseLogin();
    }, [user]);

    return (
        <>
            <Navbar bg="light" variant="light" fixed="top">
                <NavButton showState={showMenu} onClick={onShowMenu}/>
                <LinkContainer to="/">
                    <Navbar.Brand className="font-lemon">
                        <IconSetter icon={faTrophy} className="mx-2"/>
                        WikiGames
                    </Navbar.Brand>
                </LinkContainer>
                <div className="d-flex justify-content-end w-100 h-100">
                    {isEmpty(user) ? <>
                            <NavButtonLabel label="s'inscrire" link="/register"/>
                            <NavButtonLabel label="connexion" onClick={onShowLogin}/>
                        </> :
                        <NavMenuAuth showState={showLogin} onClick={onShowLogin} user={user}>
                            <LucideCoins height="24px" style={{ paddingLeft: '1.5rem' }}/>
                        </NavMenuAuth>}
                </div>
            </Navbar>
            <OffcanvasMenu show={showLogin} closeCallback={onCloseLogin} position="end">
                {isEmpty(user) ? <Login/> : <Profil/>}
            </OffcanvasMenu>
            <OffcanvasMenu show={showMenu} closeCallback={onCloseMenu}>
                <NavMenu/>
            </OffcanvasMenu>
        </>
    );
}

export default NavBar;
