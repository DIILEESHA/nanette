import React from "react";
import BackgroundVideo from "./components/BackgroundVideo"; // or correct path
import "./App.css";
import Header from "./components/header/Header";
import Gallery from "./components/gallery/Gallery";
import TeamMembers from "./components/gallery/TeamMembers";

const App = () => {
  return (
    <div className="app__container">
      <BackgroundVideo />

      <div className="overlay"></div>

      <div className="content">
        <Header />
        <Gallery />
        <TeamMembers />
      </div>

      <footer>{/* her */}</footer>
    </div>
  );
};

export default App;
