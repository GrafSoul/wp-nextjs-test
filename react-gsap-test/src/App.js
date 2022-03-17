import { useRef, useEffect } from "react";
import { gsap, Power3 } from "gsap";

import logo from "./logo.svg";
import "./App.css";
import ToggleAnimate from "./ToggleAnimate";
import RepeateAnimate from "./RepeateAnimate";
import CircleAnimate from "./CircleAnimate";
import BoxAnimate from "./BoxAnimate";

function App() {
  const logoItem = useRef();
  const textItem = useRef();
  const boxRef = useRef();

  useEffect(() => {
    gsap.to(boxRef.current, { rotation: "+=360" });

    gsap.to(logoItem.current, 3.8, {
      rotation: "+=360",
      opacity: 1,
      y: -20,
      ease: Power3.ease,
    });

    gsap.to(".app-text", 3.8, {
      rotation: "+=360",
      opacity: 1,
      y: -20,
      ease: Power3.ease,
      delay: 1.5,
    });
  });

  return (
    <div className="app">
      <header className="app-header">
        <div className="box" ref={boxRef}>
          Hello
        </div>
        <img src={logo} ref={logoItem} className="app-logo" alt="logo" />
        <p ref={textItem} className="app-text">
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="app-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ToggleAnimate />
        <RepeateAnimate />
        <CircleAnimate />
        <BoxAnimate />
      </header>
    </div>
  );
}

export default App;
