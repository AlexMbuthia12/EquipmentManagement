import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/user/Dashboard/index";
import NotFound from "../NotFound.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
