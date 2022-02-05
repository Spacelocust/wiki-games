import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';

import AnimatedRoutes from "./Route/AnimatedRoutes";

function App() {
    axios.defaults.baseURL = 'http://localhost:5000/api';
    return (
        <Router>
            <AnimatedRoutes />
        </Router>
    );
}

export default App;
