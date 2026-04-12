// src/pages/CategoryPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { initialWorkoutData } from "../data/workoutData";
import "./CategoryPage.css";

const CategoryPage = ({ refreshCalendar }) => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [exercises, setExercises] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundCategory = initialWorkoutData.find(
      (cat) => cat.id === categoryId,
    );

    if (!foundCategory) {
      navigate("/");
      return;
    }

    const saved = localStorage.getItem("workout-categories");
    let savedCategory = null;

    if (saved) {
      const allSaved = JSON.parse(saved);
      savedCategory = allSaved.find((cat) => cat.id === categoryId);
    }

    const exercisesWithProgress = foundCategory.exercises.map((exercise) => {
      const savedExercise = savedCategory?.exercises.find(
        (ex) => ex.id === exercise.id,
      );
      return savedExercise ? { ...exercise, ...savedExercise } : exercise;
    });

    setCategory(foundCategory);
    setExercises(exercisesWithProgress);
    setLoading(false);
  }, [categoryId, navigate]);

  const saveProgressToLocalStorage = (updatedExercises) => {
    const saved = localStorage.getItem("workout-categories");
    let allCategories = saved ? JSON.parse(saved) : [];

    if (allCategories.length === 0) {
      allCategories = JSON.parse(JSON.stringify(initialWorkoutData));
    }

    const updatedCategories = allCategories.map((cat) => {
      if (cat.id === categoryId) {
        return { ...cat, exercises: updatedExercises };
      }
      return cat;
    });

    localStorage.setItem(
      "workout-categories",
      JSON.stringify(updatedCategories),
    );
  };

  const updateExercise = (updatedExercise) => {
    const updatedExercises = exercises.map((ex) =>
      ex.id === updatedExercise.id ? updatedExercise : ex,
    );
    setExercises(updatedExercises);
    saveProgressToLocalStorage(updatedExercises);
  };

  const handleCompleteSet = (exerciseId) => {
    setExercises((prev) =>
      prev.map((exercise) => {
        if (
          exercise.id === exerciseId &&
          exercise.completedSets < exercise.sets
        ) {
          const newCompletedSets = exercise.completedSets + 1;
          return {
            ...exercise,
            completedSets: newCompletedSets,
            completed: newCompletedSets === exercise.sets,
          };
        }
        return exercise;
      }),
    );
  };

  const handleResetSet = (exerciseId, setIndex) => {
    setExercises((prev) =>
      prev.map((exercise) => {
        if (exercise.id === exerciseId) {
          return {
            ...exercise,
            completedSets: setIndex,
            completed: setIndex === exercise.sets,
          };
        }
        return exercise;
      }),
    );
  };

  useEffect(() => {
    if (!loading && exercises.length > 0) {
      saveProgressToLocalStorage(exercises);
    }
  }, [exercises, loading]);

  const goToExercise = (exerciseId) => {
    navigate(`/exercise/${categoryId}/${exerciseId}`);
  };

  const resetAllExercises = () => {
    if (window.confirm("Сбросить все упражнения в этой группе?")) {
      const resetExercises = exercises.map((ex) => ({
        ...ex,
        completedSets: 0,
        completed: false,
      }));
      setExercises(resetExercises);
    }
  };

  const totalSets = exercises.reduce((sum, ex) => sum + ex.sets, 0);
  const completedSets = exercises.reduce(
    (sum, ex) => sum + ex.completedSets,
    0,
  );
  const categoryProgress = totalSets ? (completedSets / totalSets) * 100 : 0;
  const completedExercises = exercises.filter((ex) => ex.completed).length;

  if (loading || !category) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="category-page">
      <div className="category-nav">
        <Link to="/" className="back-link">
          ← Назад
        </Link>
        <div className="category-title-header">
          <span className="category-icon">{category.icon}</span>
          <h1>{category.name}</h1>
        </div>
      </div>

      <div className="category-progress-section">
        <div className="progress-info">
          <span>🔥 Прогресс группы</span>
          <span>{Math.round(categoryProgress)}%</span>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${categoryProgress}%` }}
          ></div>
        </div>
        <div className="progress-details">
          <span>✅ Выполнено упражнений: {completedExercises}</span>
          <span>
            🎯 Выполнено подходов: {completedSets}/{totalSets}
          </span>
        </div>
      </div>

      <div className="exercises-list">
        {exercises.map((exercise, index) => {
          const exerciseProgress =
            (exercise.completedSets / exercise.sets) * 100;

          return (
            <div
              key={exercise.id}
              className={`exercise-item ${exercise.completed ? "completed" : ""}`}
              onClick={() => goToExercise(exercise.id)}
            >
              <div className="exercise-header">
                <div className="exercise-number">{index + 1}</div>
                <div className="exercise-info">
                  <h3 className="exercise-name">{exercise.name}</h3>
                  <div className="exercise-badges">
                    <span className="badge">🔄 {exercise.sets} подходов</span>
                    <span className="badge">
                      🎯 {exercise.reps} {exercise.repsUnit || "повторений"}
                    </span>
                  </div>
                </div>
                <div className="exercise-status">
                  {exercise.completed ? (
                    <span className="status-completed">✅ Выполнено</span>
                  ) : (
                    <span className="status-progress">
                      {exercise.completedSets}/{exercise.sets}
                    </span>
                  )}
                </div>
              </div>

              <div className="exercise-progress-bar">
                <div
                  className="exercise-progress-fill"
                  style={{ width: `${exerciseProgress}%` }}
                ></div>
              </div>

              <div className="quick-sets">
                {[...Array(exercise.sets)].map((_, idx) => {
                  const isCompleted = idx < exercise.completedSets;
                  return (
                    <button
                      key={idx}
                      className={`quick-set-btn ${isCompleted ? "completed" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isCompleted) {
                          handleResetSet(exercise.id, idx);
                        } else if (idx === exercise.completedSets) {
                          handleCompleteSet(exercise.id);
                        }
                      }}
                    >
                      {isCompleted ? "✓" : idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {exercises.length > 0 && (
        <div className="reset-category-section">
          <button className="btn-reset-category" onClick={resetAllExercises}>
            🔄 Сбросить все упражнения в группе
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
