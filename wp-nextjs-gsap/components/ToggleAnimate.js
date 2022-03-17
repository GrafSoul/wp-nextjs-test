/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

function Box({ children }) {
  return <div className="box">{children}</div>;
}

function CircleToggle({ children }) {
  return <div className="circle-toggle">{children}</div>;
}

function ToggleAnimate() {
  const [reversed, setReversed] = useState(false);
  const el = useRef();
  const q = gsap.utils.selector(el);

  // store the timeline in a ref.
  const tl = useRef();

  useEffect(() => {
    // add a box and circle animation to our timeline and play on first render
    tl.current = gsap
      .timeline()
      .to(q(".box"), {
        rotate: 360,
      })
      .to(q(".circle-toggle"), {
        x: 100,
      });
  }, []);

  useEffect(() => {
    // toggle the direction of our timeline
    tl.current.reversed(reversed);
  }, [reversed]);

  return (
    <div className="app toggle" ref={el}>
      <div>
        <button onClick={() => setReversed(!reversed)}>Toggle</button>
      </div>
      <Box>box</Box>
      <CircleToggle>circle</CircleToggle>
    </div>
  );
}

export default ToggleAnimate;
