import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "../Components/HomeComponent/Home";
import Games from "../Components/GamesComponents/Games/Games";
import Game from "../Components/GamesComponents/Games/Game";
import Register from "../Components/AuthComponents/Auth/Register";
import Logout from '../Components/AuthComponents/Auth/Logout';
import UserBets from '../Components/MatchComponent/UserBets/UserBets';
import Team from '../Components/TeamComponents/Team';

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home/>}>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/my-match-bet" element={<UserBets />}/>
                    <Route path="/games" element={<Games/>}/>
                    <Route path="/games/:id" element={<Game/>}/>
                    <Route path="/teams/:id" element={<Team/>}/>
                    <Route path="/leagues/:id" element={<Team/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                </Route>
            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes;
