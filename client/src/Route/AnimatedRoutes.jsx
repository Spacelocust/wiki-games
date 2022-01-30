import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";


import Home from "../Components/Home/Home";
import Games from "../Components/GamesComponents/Games/Games";
import Game from "../Components/GamesComponents/Games/Game/Game";
import Auth from "../Components/AuthComponents/Auth/Auth";

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home/>}>
                    <Route path="/register" element={<div>register</div>}/>
                    <Route path="/home/games" element={<Games/>}/>
                    <Route path="/home/games/:id" element={<Game/>}/>
                </Route>
                <Route path="/auth" element={<Auth/>}/>
            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes;