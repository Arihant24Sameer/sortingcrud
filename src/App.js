  import React from "react";
  import "./App.css";
  import Details from "./page/details";
  import "bootstrap/dist/css/bootstrap.min.css";
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

  function App() {
    return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Details />} />
          </Routes>
        </div>
      </Router>
    );
  }

  export default App;
