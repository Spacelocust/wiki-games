import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Landing from "./Components/Landing/Landing";
import Auth from "./Components/Auth/Auth/Auth";

function App() {
  return (
      <Router>
          <Routes>
              <Route index element={<Landing />} />
              <Route path="/auth" element={<Auth />} />
          </Routes>
      </Router>
  );
}

export default App;
