import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <span className="logo-icon">💪</span>
        <h1>
          Workout<span className="highlight">Tracker</span>
        </h1>
      </div>
      <p className="tagline">Твой персональный тренажёрный зал</p>
    </header>
  );
};

export default Header;
