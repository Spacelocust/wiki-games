import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AnimatedRoutes from './Route/AnimatedRoutes';
import { CheckUserExists } from './Helpers/customHooks';
import HotKeys from './Components/HotKeysComponent/HotKeys';

function App() {
    const { execute } = CheckUserExists();
    useEffect(() => {
        execute();
    }, []);

    return <Router>
        <HotKeys />
        <ToastContainer/>
        <AnimatedRoutes/>
    </Router>;
}

export default App;
