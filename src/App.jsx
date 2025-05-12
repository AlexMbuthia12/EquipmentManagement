import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-red-950 w-full h-full"><p className="text-3xl">Hello world</p></div>
    </>
  );
}

export default App;
