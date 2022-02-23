import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import AnimatedRoutes from "./Route/AnimatedRoutes";

function App() {
    return (
        <Router>
            <AnimatedRoutes />
        </Router>
    );
}

export default App;
