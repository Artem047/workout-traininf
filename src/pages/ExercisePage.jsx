// src/pages/ExercisePage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "./ExercisePage.css";

const ExercisePage = () => {
  const { categoryId, exerciseId } = useParams();
  const navigate = useNavigate();
  const { currentWorkoutData, updateWorkoutData } = useUser();

  const [showMedia, setShowMedia] = useState(true);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [category, setCategory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [totalExercisesCount, setTotalExercisesCount] = useState(0);
  const [completedExercisesCount, setCompletedExercisesCount] = useState(0);
  const [groupProgress, setGroupProgress] = useState(0);

  useEffect(() => {
    if (!currentWorkoutData) {
      navigate("/");
      return;
    }

    const foundCategory = currentWorkoutData.find(
      (cat) => cat.id === categoryId,
    );

    if (!foundCategory) {
      navigate("/");
      return;
    }

    const index = foundCategory.exercises.findIndex(
      (ex) => ex.id === parseInt(exerciseId),
    );

    if (index === -1) {
      navigate("/");
      return;
    }

    setCategory(foundCategory);
    setCurrentExercise(foundCategory.exercises[index]);
    setCurrentIndex(index);
    setHasPrev(index > 0);
    setHasNext(index < foundCategory.exercises.length - 1);

    const completed = foundCategory.exercises.filter(
      (ex) => ex.completed,
    ).length;
    setCompletedExercisesCount(completed);
    setTotalExercisesCount(foundCategory.exercises.length);
    setGroupProgress((completed / foundCategory.exercises.length) * 100);
  }, [categoryId, exerciseId, navigate, currentWorkoutData]);

  const updateExerciseInGlobalState = (updatedExercise) => {
    if (!currentWorkoutData) return;

    const updatedCategories = currentWorkoutData.map((cat) => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          exercises: cat.exercises.map((ex) =>
            ex.id === updatedExercise.id ? updatedExercise : ex,
          ),
        };
      }
      return cat;
    });

    updateWorkoutData(updatedCategories);
    setCurrentExercise(updatedExercise);

    const updatedCategory = updatedCategories.find(
      (cat) => cat.id === categoryId,
    );
    if (updatedCategory) {
      const completed = updatedCategory.exercises.filter(
        (ex) => ex.completed,
      ).length;
      setCompletedExercisesCount(completed);
      setGroupProgress((completed / updatedCategory.exercises.length) * 100);
    }
  };

  const handleCompleteSet = () => {
    if (!currentExercise) return;
    if (currentExercise.completedSets >= currentExercise.sets) return;

    const updatedExercise = {
      ...currentExercise,
      completedSets: currentExercise.completedSets + 1,
      completed: currentExercise.completedSets + 1 === currentExercise.sets,
    };
    updateExerciseInGlobalState(updatedExercise);
  };

  const handleResetSet = (setIndex) => {
    if (!currentExercise) return;

    const updatedExercise = {
      ...currentExercise,
      completedSets: setIndex,
      completed: setIndex === currentExercise.sets,
    };
    updateExerciseInGlobalState(updatedExercise);
  };

  const goToPrevExercise = () => {
    if (hasPrev && category) {
      const prevExercise = category.exercises[currentIndex - 1];
      navigate(`/exercise/${categoryId}/${prevExercise.id}`);
    }
  };

  const goToNextExercise = () => {
    if (hasNext && category) {
      const nextExercise = category.exercises[currentIndex + 1];
      navigate(`/exercise/${categoryId}/${nextExercise.id}`);
    }
  };

  if (!category || !currentExercise) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="exercise-page">
      <div className="exercise-nav">
        <Link to={`/category/${categoryId}`} className="back-link">
          ← Назад к {category.name}
        </Link>
        <div className="breadcrumb">
          {category.icon} {category.name}
        </div>
        <div className="exercise-counter">
          {currentIndex + 1} / {totalExercisesCount}
        </div>
      </div>

      <div className="group-progress">
        <div className="group-progress-bar">
          <div
            className="group-progress-fill"
            style={{ width: `${groupProgress}%` }}
          ></div>
        </div>
        <div className="group-progress-text">
          {completedExercisesCount} из {totalExercisesCount} упражнений
          выполнено
        </div>
      </div>

      <div className="exercise-title-section">
        <h2 className="exercise-title">{currentExercise.name}</h2>
      </div>

      <div className="exercise-content">
        {currentExercise.media && currentExercise.mediaType === "image" && (
          <div className="exercise-media-section">
            <button
              className="media-toggle"
              onClick={() => setShowMedia(!showMedia)}
            >
              {showMedia ? "▼ Скрыть фото" : "▶ Показать фото"}
            </button>
            {showMedia && (
              <div className="media-content">
                <img
                  src={currentExercise.media}
                  alt={currentExercise.name}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x300?text=Image+Not+Found";
                  }}
                />
              </div>
            )}
          </div>
        )}

        <div className="exercise-stats-section">
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-icon">🔄</span>
              <span className="stat-value">{currentExercise.sets}</span>
              <span className="stat-label">подходов</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🎯</span>
              <span className="stat-value">{currentExercise.reps}</span>
              <span className="stat-label">
                {currentExercise.repsUnit || "повторений"}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">📊</span>
              <span className="stat-value">
                {currentExercise.completedSets}
              </span>
              <span className="stat-label">из {currentExercise.sets}</span>
            </div>
          </div>

          <div className="progress-section">
            <div className="progress-bar-container">
              <div
                className="progress-fill"
                style={{
                  width: `${(currentExercise.completedSets / currentExercise.sets) * 100}%`,
                }}
              ></div>
            </div>
            <div className="progress-text">
              {Math.round(
                (currentExercise.completedSets / currentExercise.sets) * 100,
              )}
              %
            </div>
          </div>

          <div className="sets-section">
            <div className="sets-grid">
              {[...Array(currentExercise.sets)].map((_, idx) => {
                const isCompleted = idx < currentExercise.completedSets;
                return (
                  <button
                    key={idx}
                    className={`set-button ${isCompleted ? "completed" : ""} ${
                      idx === currentExercise.completedSets ? "current" : ""
                    }`}
                    onClick={() =>
                      isCompleted ? handleResetSet(idx) : handleCompleteSet()
                    }
                  >
                    <span className="set-number">{idx + 1}</span>
                    <span className="set-status">
                      {isCompleted
                        ? "✓"
                        : idx === currentExercise.completedSets
                          ? "▶"
                          : ""}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="navigation-buttons">
        <button
          className={`nav-prev ${!hasPrev ? "disabled" : ""}`}
          onClick={goToPrevExercise}
          disabled={!hasPrev}
        >
          ← Предыдущее
        </button>

        {!currentExercise.completed ? (
          <button className="reset-button" onClick={() => handleResetSet(0)}>
            🔄 Сбросить все подходы
          </button>
        ) : (
          <div className="exercise-completed-badge">
            ✅ Упражнение выполнено!
          </div>
        )}

        <button
          className={`nav-next ${!hasNext ? "disabled" : ""}`}
          onClick={goToNextExercise}
          disabled={!hasNext}
        >
          Следующее →
        </button>
      </div>

      {groupProgress === 100 && (
        <div className="group-complete-message">
          <span>🏆</span> Поздравляю! Все упражнения в группе "{category.name}"
          выполнены!
          <Link to="/" className="home-link">
            🏠 На главную
          </Link>
        </div>
      )}
    </div>
  );
};

export default ExercisePage;
