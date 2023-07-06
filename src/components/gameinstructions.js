import { useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export function HowToPlay() {
  const instrRef = useRef();
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>
      {isVisible && (
        <div className="instr-container">
          <h1> How to play</h1>
          <button className="close-btn" onClick={toggleVisibility}>
            <FaTimes />
          </button>
          <h2>Guess the Pokemon in 5 tries. </h2>
          <ul>
            <li> Each guess should match the lenght of the pokemon name</li>
            <li>
              {" "}
              The color of the tiles will change to show how close your guess
              was to the pokemon name
            </li>
          </ul>
          <div className="instr-example">
            <p>
              <strong>Examples</strong>
            </p>
            <div className="inst-correct">
              <div className="example-box green-example-box">P</div>
              <div className="example-box ">I</div>
              <div className="example-box ">K</div>
              <div className="example-box ">A</div>
              <div className="example-box ">C</div>
              <div className="example-box ">H</div>
              <div className="example-box ">U</div>
              <p>
                <strong>P</strong> is in the word and in the correct spot.
              </p>
            </div>
            <div className="instr-is-present">
              <div className="example-box yellow-example-box">I</div>
              <div className="example-box ">P</div>
              <div className="example-box ">K</div>
              <div className="example-box ">A</div>
              <div className="example-box ">C</div>
              <div className="example-box ">H</div>
              <div className="example-box ">U</div>
              <p>
                <strong>I</strong> is in the word but in the wrong spot.
              </p>
            </div>
            <div className="instr-wrong">
              <div className="example-box ">P</div>
              <div className="example-box grey-example-box ">A</div>
              <div className="example-box ">K</div>
              <div className="example-box ">A</div>
              <div className="example-box ">C</div>
              <div className="example-box ">H</div>
              <div className="example-box ">U</div>
              <p>
                <strong>A</strong> not in the word in any spot.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
