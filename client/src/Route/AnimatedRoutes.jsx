import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Landing from "../Components/Landing/Landing";
import Guard from "../Components/Auth/Guard/Guard";
import Home from "../Components/Home/Home";
import Games from "../Components/Games/Games/Games";
import Game from "../Components/Games/Games/Game/Game";
import Auth from "../Components/Auth/Auth/Auth";

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
                <Route index element={<Landing/>}/>
                <Route path="/home" element={<Guard><Home/></Guard>}>
                    <Route path="/home/games" element={<Games/>}/>
                    <Route path="/home/games/:id" element={<Game/>}/>
                </Route>
                <Route path="/auth" element={<Auth/>}/>
            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes;