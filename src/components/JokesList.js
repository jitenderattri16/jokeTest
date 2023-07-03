import React from "react";

const JokeList = ({ jokesData, showDetailsIndex, handleJokeClick }) => {
  return (
    <ul>
      {showDetailsIndex === -1 ? (
        jokesData.map((joke, i) => (
          <li key={joke} onClick={() => handleJokeClick(i)}>
            {joke}
          </li>
        ))
      ) : (
        <p onClick={() => handleJokeClick(-1)}>{jokesData[showDetailsIndex]}</p>
      )}
    </ul>
  );
};

export default JokeList;
