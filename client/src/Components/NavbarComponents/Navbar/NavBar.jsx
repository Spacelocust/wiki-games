import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as IconSetter } from "@fortawesome/react-fontawesome";
import LinkContainer from 'react-router-bootstrap/LinkContainer';

import OffcanvasMenu from "../../GeneralComponents/OffcanvasMenuComponent/OffcanvasMenu";
import NavButton from "../../GeneralComponents/Buttons/NavButtonComponent/NavButton";
import NavMenu from "../NavMenu/NavMenu";
import NavButtonLabel from "../../GeneralComponents/Buttons/NavButtonComponent/NavButtonLabel";
import Login from "../../AuthComponents/Auth/Login";

function NavBar() {
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

    return (
        <>
            <Navbar bg="light" variant="light" fixed="top">
                <NavButton showState={showMenu} onClick={onShowMenu}/>
                <LinkContainer to='/'>
                    <Navbar.Brand className='font-lemon'>
                        <IconSetter icon={faTrophy} className='mx-2'/>
                        WikiGames
                    </Navbar.Brand>
                </LinkContainer>
                <div className='d-flex justify-content-end w-100 h-100'>
                    <NavButtonLabel label="s'inscrire" link='/register'/>
                    <NavButtonLabel label="connexion" onClick={onShowLogin}/>
                </div>
            </Navbar>
            <OffcanvasMenu show={showLogin} closeCallback={onCloseLogin} position='end'>
                <Login />
            </OffcanvasMenu>
            <OffcanvasMenu show={showMenu} closeCallback={onCloseMenu}>
                <NavMenu />
            </OffcanvasMenu>
        </>
    );
}

export default NavBar;
