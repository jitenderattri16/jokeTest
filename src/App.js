import { Details, JokesPage } from "./pages";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";

export const JokesContext = createContext(null);

function App() {
  const [appData, setAppData] = useState({
    jokes: [],
    headerBackgroundColor: "#d0e2f3ff",
    selectedIndex: -1,
  });

  return (
    <JokesContext.Provider value={{ appData, setAppData }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<JokesPage />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </div>
    </JokesContext.Provider>
  );
}

export default App;
