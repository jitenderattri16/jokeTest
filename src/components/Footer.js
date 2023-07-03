import React from "react";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";

const Footer = ({
  showDetailsIndex,
  jokesData,
  handlePrev,
  handleNext,
  handleTimer,
  timerRunning,
  generateRandomColor,
}) => {
  return (
    <footer>
      {showDetailsIndex === -1 ? (
        <>
          <button onClick={handleTimer}>
            {timerRunning ? "Pause Loading" : "Start loading"}
          </button>
          <button onClick={generateRandomColor}>Change header color</button>
        </>
      ) : (
        <>
          <button onClick={handlePrev}>
            <GrLinkPrevious />
          </button>
          {showDetailsIndex + 1} of {jokesData.length}
          <button onClick={handleNext}>
            <GrLinkNext />
          </button>
        </>
      )}
    </footer>
  );
};

export default Footer;
