import React, { useContext } from "react";
import Header from "./header";
import { JokesContext } from "../App";

const Wrapper = ({ children, footer }) => {
  const { appData } = useContext(JokesContext);

  return (
    <>
      <Header headerColor={appData?.headerBackgroundColor} />
      <section>{children}</section>
      {footer}
    </>
  );
};

export default Wrapper;
