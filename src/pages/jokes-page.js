import React, { useContext, useEffect, useRef, useState } from "react";
import apiService from "../services/http-services";
import { Footer, JokeList, Wrapper } from "../components";
import { JokesContext } from "../App";
import { useNavigate } from "react-router-dom";

const JokesPage = () => {
  const timerId = useRef();
  const navigate = useNavigate();
  const {
    appData: { selectedIndex, jokes },
    setAppData,
  } = useContext(JokesContext);
  const [timerRunning, setTimerRunning] = useState(false);

  const generateRandomColor = () => {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++)
      color += letters[Math.floor(Math.random() * 16)];
    setAppData((state) => ({
      ...state,
      headerBackgroundColor: color,
    }));
  };

  const getData = async () => {
    const joke = await apiService.getRandomJoke();
    setAppData((state) => {
      return {
        ...state,
        jokes: [...state.jokes, joke],
      };
    });
  };

  useEffect(() => {
    if (timerRunning && selectedIndex === -1) {
      timerId.current = setInterval(() => {
        getData();
      }, [10000]);
    }
    return () => {
      clearInterval(timerId.current);
    };
  }, [timerRunning, selectedIndex]);

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
    setAppData((state) => ({
      ...state,
      selectedIndex: index,
    }));
    navigate("/details");
  };

  const MainFooter = () => {
    return (
      <Footer>
        <button onClick={handleTimer}>
          {timerRunning ? "Pause Loading" : "Start loading"}
        </button>
        <button onClick={generateRandomColor}>Change header color</button>
      </Footer>
    );
  };

  return (
    <>
      <Wrapper footer={MainFooter()}>
        <JokeList jokes={jokes} handleJokeClick={handleJokeClick} />
      </Wrapper>
    </>
  );
};

export default JokesPage;
