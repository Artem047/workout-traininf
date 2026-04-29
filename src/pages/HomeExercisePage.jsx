// src/pages/HomeExercisePage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { homeWorkoutData } from "../data/workoutDataHome";
import "./HomeExercisePage.css";

const HomeExercisePage = () => {
  const { categoryId, exerciseId } = useParams();
  const navigate = useNavigate();

  const [exercise, setExercise] = useState(null);
  const [category, setCategory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [totalExercisesCount, setTotalExercisesCount] = useState(0);
  const [showMedia, setShowMedia] = useState(true);

  useEffect(() => {
    const foundCategory = homeWorkoutData.find((cat) => cat.id === categoryId);
    if (!foundCategory) {
      navigate("/home-workout");
      return;
    }

    const index = foundCategory.exercises.findIndex(
      (ex) => ex.id === parseInt(exerciseId),
    );

    if (index === -1) {
      navigate("/home-workout");
      return;
    }

    setCategory(foundCategory);
    setExercise(foundCategory.exercises[index]);
    setCurrentIndex(index);
    setHasPrev(index > 0);
    setHasNext(index < foundCategory.exercises.length - 1);
    setTotalExercisesCount(foundCategory.exercises.length);
  }, [categoryId, exerciseId, navigate]);

  const handleCompleteSet = () => {
    if (!exercise || exercise.completedSets >= exercise.sets) return;

    setExercise({
      ...exercise,
      completedSets: exercise.completedSets + 1,
      completed: exercise.completedSets + 1 === exercise.sets,
    });
  };

  const handleResetSet = (setIndex) => {
    if (!exercise) return;

    setExercise({
      ...exercise,
      completedSets: setIndex,
      completed: setIndex === exercise.sets,
    });
  };

  const goToPrevExercise = () => {
    if (hasPrev && category) {
      const prevExercise = category.exercises[currentIndex - 1];
      navigate(`/home-exercise/${categoryId}/${prevExercise.id}`);
    }
  };

  const goToNextExercise = () => {
    if (hasNext && category) {
      const nextExercise = category.exercises[currentIndex + 1];
      navigate(`/home-exercise/${categoryId}/${nextExercise.id}`);
    }
  };

  if (!exercise || !category) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="home-exercise-page">
      {/* Навигация */}
      <div className="home-exercise-nav">
        <Link to={`/home-category/${categoryId}`} className="back-link">
          ← Назад
        </Link>
        <div className="home-exercise-title">
          <span className="exercise-icon">{category.icon}</span>
          <h2>{exercise.name}</h2>
        </div>
        <div className="home-exercise-counter">
          {currentIndex + 1} / {totalExercisesCount}
        </div>
      </div>

      {/* Медиа контент */}
      {exercise.media && (
        <div className="home-exercise-media">
          <button
            className="media-toggle"
            onClick={() => setShowMedia(!showMedia)}
          >
            {showMedia ? "▼ Скрыть" : "▶ Показать"}
          </button>
          {showMedia && <img src={exercise.media} alt={exercise.name} />}
        </div>
      )}

      {/* Статистика */}
      <div className="home-exercise-stats">
        <div className="home-stat">
          <span>🔄</span> {exercise.sets} подходов
        </div>
        <div className="home-stat">
          <span>🎯</span> {exercise.reps} повторений
        </div>
        <div className="home-stat">
          <span>📊</span> {exercise.completedSets}/{exercise.sets}
        </div>
      </div>

      {/* Прогресс бар */}
      <div className="home-exercise-progress">
        <div className="home-progress-bar big">
          <div
            className="home-progress-fill"
            style={{
              width: `${(exercise.completedSets / exercise.sets) * 100}%`,
            }}
          ></div>
        </div>
        <div className="home-progress-text">
          {Math.round((exercise.completedSets / exercise.sets) * 100)}%
        </div>
      </div>

      {/* Сетка подходов */}
      <div className="home-exercise-sets-grid">
        {[...Array(exercise.sets)].map((_, idx) => (
          <button
            key={idx}
            className={`home-exercise-set-btn ${idx < exercise.completedSets ? "completed" : ""} ${idx === exercise.completedSets ? "current" : ""}`}
            onClick={() =>
              idx < exercise.completedSets
                ? handleResetSet(idx)
                : handleCompleteSet()
            }
          >
            <span className="set-number">{idx + 1}</span>
            <span className="set-status">
              {idx < exercise.completedSets
                ? "✓"
                : idx === exercise.completedSets
                  ? "▶"
                  : ""}
            </span>
          </button>
        ))}
      </div>

      {/* Кнопки навигации между упражнениями */}
      <div className="home-exercise-navigation">
        <button
          className={`home-nav-prev ${!hasPrev ? "disabled" : ""}`}
          onClick={goToPrevExercise}
          disabled={!hasPrev}
        >
          ← Предыдущее
        </button>

        {!exercise.completed ? (
          <button className="home-reset-btn" onClick={() => handleResetSet(0)}>
            🔄 Сбросить все подходы
          </button>
        ) : (
          <div className="home-exercise-completed">
            ✅ Упражнение выполнено!
          </div>
        )}

        <button
          className={`home-nav-next ${!hasNext ? "disabled" : ""}`}
          onClick={goToNextExercise}
          disabled={!hasNext}
        >
          Следующее →
        </button>
      </div>
    </div>
  );
};

export default HomeExercisePage;
