import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AuthStack from "./Navigation/AuthStack";
import AppStack from "./Navigation/AppStack";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<AuthStack />} />
          <Route path="/appStack/*" element={<AppStack />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
