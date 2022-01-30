import React from 'react';
import { Outlet } from 'react-router-dom'
import NavBar from "../NavbarComponents/Navbar/NavBar";

function Home() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
}

export default Home;