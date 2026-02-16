import React, { useState } from "react";
import Countdown from "./components/Countdown";
import Fireworks from "./components/Fireworks";

function App() {
  const [active, setActive] = useState(false);
  const targetDate = new Date("2026-02-17T00:00:00+07:00");

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        inset: 0,
        background: "radial-gradient(circle at bottom, #111 0%, #000 70%)",
        overflow: "hidden",
        color: "white",
      }}
    >
      <Countdown targetDate={targetDate} onComplete={() => setActive(true)} />
      <Fireworks active={active} />
    </div>
  );
}


export default App;
