import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";


import Home from "../Components/Home/Home";
import Games from "../Components/GamesComponents/Games/Games";
import Game from "../Components/GamesComponents/Games/Game/Game";
import Register from "../Components/AuthComponents/Auth/Register";

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home/>}>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/games" element={<Games/>}/>
                    <Route path="/games/:id" element={<Game/>}/>
                </Route>
            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes;