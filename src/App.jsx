import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Ragistration from "./pages/Ragistration";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Ragistration />
    </>
  );
}

export default App;
