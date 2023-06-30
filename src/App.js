import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";

function App() {
  // storing timer id
  const timerId = useRef();

  // local states
  const [jokesData, setJokesData] = useState([]);
  const [timerRunning, setTimerRunning] = useState(false);
  const [headerColor, setHeaderColor] = useState("#d0e2f3ff");
  const [showDetailsIndex, setDetailsIndex] = useState(-1);

  // random color generator
  const generateRandomColor = () => {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++)
      color += letters[Math.floor(Math.random() * 16)];
    console.log(color);
    setHeaderColor(color);
  };

  // getting data from api
  const getData = async () => {
    const data = await axios.get("https://api.chucknorris.io/jokes/random");
    setJokesData((state) => [...state, data?.data?.value]);
  };

  // handle timer
  useEffect(() => {
    if (timerRunning && showDetailsIndex === -1) {
      timerId.current = setInterval(() => {
        getData();
      }, [10000]);
    }
    // clear interval subscription when component unmount
    return () => {
      clearInterval(timerId.current);
    };
  }, [timerRunning, showDetailsIndex]);

  // toggle start or stop timer
  const handleTimer = () => {
    if (timerRunning) {
      setTimerRunning(false);
      clearInterval(timerId.current);
    } else {
      getData();
      setTimerRunning(true);
    }
  };

  const handlePrev = () => {
    if (showDetailsIndex !== 0) {
      setDetailsIndex(showDetailsIndex - 1);
    }
  };

  const handleNext = () => {
    if (showDetailsIndex !== jokesData.length - 1) {
      setDetailsIndex(showDetailsIndex + 1);
    }
  };

  return (
    <div className="App">
      <header style={{ backgroundColor: headerColor }}>
        <p>Welcome</p>
      </header>
      <section>
        <ul>
          {showDetailsIndex === -1 ? (
            jokesData.map((joke, i) => (
              <li
                key={joke}
                onClick={() => {
                  setDetailsIndex(i);
                  clearInterval(timerId.current);
                  setTimerRunning(false);
                }}
              >
                {joke}
              </li>
            ))
          ) : (
            <p onClick={() => setDetailsIndex(-1)}>
              {jokesData[showDetailsIndex]}
            </p>
          )}
        </ul>
      </section>
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
            {showDetailsIndex + 1} {" of "} {jokesData.length}
            <button onClick={handleNext}>
              <GrLinkNext />
            </button>
          </>
        )}
      </footer>
    </div>
  );
}

export default App;
