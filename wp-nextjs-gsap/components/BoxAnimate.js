/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import Flip from "gsap/dist/Flip";

let count = 0;

gsap.registerPlugin(Flip);
gsap.config({ trialWarn: false });

const wrapColor = gsap.utils.wrap(["blue", "red", "purple", "orange"]);

function createItem() {
  return { id: ++count, color: wrapColor(count), status: "entered" };
}

function BoxAnimate() {
  const el = useRef();
  const q = gsap.utils.selector(el);

  const [layout, setLayout] = useState(() => {
    return {
      items: [createItem(), createItem(), createItem(), createItem()].reverse(),
    };
  });

  useLayoutEffect(() => {
    if (!layout.state) return;

    // get the items that are exiting in this batch
    const exiting = layout.items.filter((item) => item.status === "exiting");

    // Flip.from returns a timeline
    const timeline = Flip.from(layout.state, {
      absolute: true,
      ease: "power1.inOut",
      targets: q(".box-2, .button-2"),
      scale: true,
      simple: true,
      onEnter: (elements) => {
        return gsap.fromTo(
          elements,
          {
            opacity: 0,
            scale: 0,
          },
          {
            opacity: 1,
            scale: 1,
            delay: 0.2,
            duration: 0.3,
          }
        );
      },
      onLeave: (elements) => {
        return gsap.to(elements, {
          opacity: 0,
          scale: 0,
        });
      },
    });

    // remove the exiting items from the DOM after the animation is done
    timeline.add(() => removeItems(exiting));
  }, [layout]);

  const removeItems = (exitingItems) => {
    if (!exitingItems.length) return;

    setLayout((prev) => ({
      state: Flip.getState(q(".box-2, .button-2")),
      items: prev.items.filter((item) => !exitingItems.includes(item)),
    }));
  };

  const addItem = () => {
    setLayout({
      state: Flip.getState(q(".box-2, .button-2")),
      items: [createItem(), ...layout.items],
    });
  };

  const shuffle = () => {
    setLayout({
      state: Flip.getState(q(".box-2, .button-2")),
      items: [...gsap.utils.shuffle(layout.items)],
    });
  };

  const remove = (item) => {
    // set the item as exiting which will add a CSS class for display: none;
    item.status = "exiting";

    setLayout({
      ...layout,
      state: Flip.getState(q(".box-2, .button-2")),
    });
  };

  return (
    <div className="app text-center" ref={el}>
      <div className="buttons">
        <button className="button-2" onClick={addItem}>
          Add Box
        </button>
        <button className="button-2" onClick={shuffle}>
          Shuffle
        </button>
      </div>
      <div className="boxes-2">
        {layout.items.map((item) => (
          <div
            id={`box-${item.id}-2`}
            key={item.id}
            className={`box-2 ${item.color} ${item.status}`}
            onClick={() => remove(item)}
          >
            Click Me
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoxAnimate;
