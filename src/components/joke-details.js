import React, { useContext } from "react";
import { JokesContext } from "../App";
import { useNavigate } from "react-router-dom";

const JokeDetails = () => {
  const navigate = useNavigate();

  const {
    appData: { jokes, selectedIndex },
    setAppData,
  } = useContext(JokesContext);

  const handleBack = () => {
    setAppData((state) => ({ ...state, selectedIndex: -1 }));
    navigate("/");
  };

  return (
    <div>
      <p onClick={handleBack}>{jokes[selectedIndex]}</p>
    </div>
  );
};

export default JokeDetails;
