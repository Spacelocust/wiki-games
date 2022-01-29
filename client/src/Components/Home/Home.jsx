import React from 'react';
import { Outlet } from 'react-router-dom'
import NavBar from "../Navbar/Navbar/NavBar";

function Home() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
}

export default Home;