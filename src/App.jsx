import React from "react";
import BackgroundVideo from "./components/BackgroundVideo"; // or correct path
import "./App.css";
import Header from "./components/header/Header";
import Gallery from "./components/gallery/Gallery";

const App = () => {
  return (
    <div className="app__container">
      <BackgroundVideo />

      <div className="overlay"></div>

      <div className="content">
        <Header />
        <Gallery />
      </div>

      <footer>
        {/* her */}
      </footer>
    </div>
  );
};

export default App;
