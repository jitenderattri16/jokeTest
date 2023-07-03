import React from "react";
import JokeDetails from "../components/joke-details";
import { Wrapper } from "../components";
import DetailFooter from "../components/detail-footer";

const Details = () => {
  return (
    <>
      <Wrapper footer={<DetailFooter />}>
        <JokeDetails />
      </Wrapper>
    </>
  );
};

export default Details;
