import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Navbar from 'react-bootstrap/Navbar';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as IconSetter } from '@fortawesome/react-fontawesome';
import { LucideCoins } from '../../GeneralComponents/SvgComponents/SvgComponent';

import { signin } from '../../AuthComponents/Selector/AuthSelector';
import Login from '../../AuthComponents/Auth/Login';

import NavMenu from '../NavMenu/NavMenu';
import NavMenuAuth from '../NavMenu/NavMenuAuth';
import OffcanvasMenu from '../../GeneralComponents/OffcanvasMenuComponent/OffcanvasMenu';
import NavButton from '../../GeneralComponents/Buttons/NavButtonComponent/NavButton';
import NavButtonLabel from '../../GeneralComponents/Buttons/NavButtonComponent/NavButtonLabel';
import Profil from '../../ProfilComponents/Profil';

function NavBar() {
    const [user,_] = useRecoilState(signin(false));

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
                    {!user ? <>
                        <NavButtonLabel label="s'inscrire" link="/register"/>
                        <NavButtonLabel label="connexion" onClick={onShowLogin}/>
                    </> : <NavMenuAuth showState={showLogin} onClick={onShowLogin} user={user}><LucideCoins height='24px' style={{ paddingLeft: '1.5rem'}}/></NavMenuAuth>}
                </div>
            </Navbar>
            <OffcanvasMenu show={showLogin} closeCallback={onCloseLogin} position="end">
                {!user ? <Login/> : <Profil />}
            </OffcanvasMenu>
            <OffcanvasMenu show={showMenu} closeCallback={onCloseMenu}>
                <NavMenu/>
            </OffcanvasMenu>
        </>
    );
}

export default NavBar;
