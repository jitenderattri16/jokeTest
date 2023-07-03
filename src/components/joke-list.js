import React from "react";

const JokeList = ({ jokes, handleJokeClick }) => {
  return (
    <ul>
      {jokes?.map((joke, i) => (
        <li key={joke} onClick={() => handleJokeClick(i)}>
          {joke}
        </li>
      ))}
    </ul>
  );
};

export default JokeList;
