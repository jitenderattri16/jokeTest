/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { JokesContext } from "../App";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";

const DetailFooter = () => {
  const navigate = useNavigate();
  const {
    appData: { selectedIndex, jokes },
    setAppData,
  } = useContext(JokesContext);

  const handlePrev = () => {
    if (selectedIndex !== 0) {
      setAppData((state) => ({
        ...state,
        selectedIndex: state?.selectedIndex - 1,
      }));
    }
  };

  const handleNext = () => {
    if (selectedIndex !== jokes.length - 1) {
      setAppData((state) => ({
        ...state,
        selectedIndex: state?.selectedIndex + 1,
      }));
    }
  };

  useEffect(() => {
    if (!jokes.length || selectedIndex === -1) navigate("/");
  }, []);

  return (
    <Footer>
      <button onClick={handlePrev}>
        <GrLinkPrevious />
      </button>
      {selectedIndex + 1} of {jokes.length}
      <button onClick={handleNext}>
        <GrLinkNext />
      </button>
    </Footer>
  );
};

export default DetailFooter;
