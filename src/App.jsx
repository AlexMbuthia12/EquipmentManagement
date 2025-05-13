import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/user/Dashboard/index";
import MyBookings from "./pages/user/Orders/MyBookings";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/account/mybookings" element={<MyBookings />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;