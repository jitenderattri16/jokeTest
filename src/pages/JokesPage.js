import React, { useEffect, useRef, useState } from "react";
import apiService from "../services";
import { Footer, Header, JokeList } from "../components";

const JokesPage = () => {
  const timerId = useRef();
  const [jokesData, setJokesData] = useState([]);
  const [timerRunning, setTimerRunning] = useState(false);
  const [headerColor, setHeaderColor] = useState("#d0e2f3ff");
  const [showDetailsIndex, setDetailsIndex] = useState(-1);

  const generateRandomColor = () => {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++)
      color += letters[Math.floor(Math.random() * 16)];
    setHeaderColor(color);
  };

  const getData = async () => {
    const joke = await apiService.getRandomJoke();
    setJokesData((state) => [...state, joke]);
  };

  useEffect(() => {
    if (timerRunning && showDetailsIndex === -1) {
      timerId.current = setInterval(() => {
        getData();
      }, [10000]);
    }
    return () => {
      clearInterval(timerId.current);
    };
  }, [timerRunning, showDetailsIndex]);

  const handleTimer = () => {
    if (timerRunning) {
      setTimerRunning(false);
      clearInterval(timerId.current);
    } else {
      getData();
      setTimerRunning(true);
    }
  };

  const handleJokeClick = (index) => {
    if (index === -1) {
      setDetailsIndex(index);
      clearInterval(timerId.current);
      setTimerRunning(false);
    } else {
      setDetailsIndex(index);
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
    <>
      <Header headerColor={headerColor} />
      <section>
        <JokeList
          jokesData={jokesData}
          showDetailsIndex={showDetailsIndex}
          handleJokeClick={handleJokeClick}
        />
      </section>
      <Footer
        showDetailsIndex={showDetailsIndex}
        jokesData={jokesData}
        handlePrev={handlePrev}
        handleNext={handleNext}
        handleTimer={handleTimer}
        timerRunning={timerRunning}
        generateRandomColor={generateRandomColor}
      />
    </>
  );
};

export default JokesPage;
