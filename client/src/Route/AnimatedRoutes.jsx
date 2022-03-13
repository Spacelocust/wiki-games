import React, { Suspense } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "../Components/HomeComponent/Home";
const Games = React.lazy(() => import('../Components/GamesComponents/Games/Games'));
const Game = React.lazy(() => import('../Components/GamesComponents/Games/Game'));
const Register = React.lazy(() => import('../Components/AuthComponents/Auth/Register'));
const Logout = React.lazy(() => import('../Components/AuthComponents/Auth/Logout'));
const UserBets = React.lazy(() => import('../Components/MatchComponent/UserBets/UserBets'));
const Team = React.lazy(() => import('../Components/TeamComponents/Team'));
const TeamsFavorite = React.lazy(() => import('../Components/TeamComponents/TeamsFavorite'));

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home/>}>
                    <Route path="/register" element={<Loading><Register /></Loading>}/>
                    <Route path="/my-match-bet" element={<Loading><UserBets /></Loading>}/>
                    <Route path="/games" element={<Loading><Games/></Loading>}/>
                    <Route path="/games/:id" element={<Loading><Game/></Loading>}/>
                    <Route path="/teams" element={<Loading><TeamsFavorite/></Loading>}/>
                    <Route path="/teams/:id" element={<Loading><Team/></Loading>}/>
                    <Route path="/logout" element={<Loading><Logout/></Loading>}/>
                </Route>
            </Routes>
        </AnimatePresence>
    );
}

const Loading = ({ children }) => (
    <Suspense fallback={<div>loading...</div>}>
        { children }
    </Suspense>
)

export default AnimatedRoutes;
