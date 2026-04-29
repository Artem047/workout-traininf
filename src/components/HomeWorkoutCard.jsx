// src/components/HomeWorkoutCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomeWorkoutCard.css";

const HomeWorkoutCard = () => {
  const navigate = useNavigate();

  const handleStartHomeWorkout = () => {
    navigate("/home-workout");
  };

  return (
    <div className="home-workout-card" onClick={handleStartHomeWorkout}>
      <div className="home-workout-icon">🏠</div>
      <div className="home-workout-content">
        <h3 className="home-workout-title">Тренировка в домашних условиях</h3>
        <p className="home-workout-description">
          Только резинки и собственный вес. Без специального оборудования!
        </p>
        <div className="home-workout-features">
          <span>🏋️ Грудные</span>
          <span>🔙 Спина</span>
          <span>🦵 Ноги</span>
          <span>🏋️‍♂️ Плечи</span>
          <span>💪 Руки</span>
        </div>
      </div>
      <div className="home-workout-arrow">→</div>
    </div>
  );
};

export default HomeWorkoutCard;
