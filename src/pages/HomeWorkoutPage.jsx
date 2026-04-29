// src/pages/HomeWorkoutPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { homeWorkoutData } from "../data/workoutDataHome";
import { workoutHelpers } from "../data/workoutData";
import "./HomeWorkoutPage.css";

const HomeWorkoutPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(homeWorkoutData);
  const [calendarRefresh, setCalendarRefresh] = useState(0);

  // Сохраняем прогресс в localStorage
  useEffect(() => {
    localStorage.setItem("home-workout-data", JSON.stringify(categories));
  }, [categories]);

  // Загружаем сохранённый прогресс
  useEffect(() => {
    const saved = localStorage.getItem("home-workout-data");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Объединяем начальные данные с сохранённым прогрессом
      const mergedData = homeWorkoutData.map((category) => {
        const savedCategory = parsed.find((c) => c.id === category.id);
        if (savedCategory) {
          return {
            ...category,
            exercises: category.exercises.map((exercise) => {
              const savedExercise = savedCategory.exercises.find(
                (e) => e.id === exercise.id,
              );
              return savedExercise
                ? { ...exercise, ...savedExercise }
                : exercise;
            }),
          };
        }
        return category;
      });
      setCategories(mergedData);
    }
  }, []);

  const updateCategoryExercises = (categoryId, exercises) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === categoryId ? { ...cat, exercises } : cat)),
    );
  };

  const handleCompleteSet = (categoryId, exerciseId) => {
    setCategories((prev) =>
      prev.map((category) => {
        if (category.id === categoryId) {
          const updatedExercises = category.exercises.map((exercise) => {
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
          });
          return { ...category, exercises: updatedExercises };
        }
        return category;
      }),
    );
  };

  const handleResetSet = (categoryId, exerciseId, setIndexToReset) => {
    setCategories((prev) =>
      prev.map((category) => {
        if (category.id === categoryId) {
          const updatedExercises = category.exercises.map((exercise) => {
            if (exercise.id === exerciseId) {
              const newCompletedSets = setIndexToReset;
              return {
                ...exercise,
                completedSets: newCompletedSets,
                completed: newCompletedSets === exercise.sets,
              };
            }
            return exercise;
          });
          return { ...category, exercises: updatedExercises };
        }
        return category;
      }),
    );
  };

  const totalExercises = workoutHelpers.getTotalExercises(categories);
  const totalCompleted = workoutHelpers.getCompletedExercises(categories);
  const totalSets = workoutHelpers.getTotalSets(categories);
  const completedSets = workoutHelpers.getCompletedSets(categories);
  const totalProgress = totalExercises
    ? (totalCompleted / totalExercises) * 100
    : 0;

  const resetAllWorkouts = () => {
    if (window.confirm("Сбросить все тренировки в домашней программе?")) {
      const resetData = JSON.parse(JSON.stringify(homeWorkoutData));
      setCategories(resetData);
    }
  };

  const goToCategory = (categoryId) => {
    navigate(`/home-category/${categoryId}`);
  };

  return (
    <div className="home-workout-page">
      <div className="home-workout-header">
        <Link to="/" className="back-link">
          ← На главную
        </Link>
        <h1>🏠 Тренировка дома</h1>
        <div className="home-stats">
          {/* <span>📊 {Math.round(totalProgress)}%</span> */}
        </div>
      </div>

      {/* <div className="home-stats-grid">
        <div className="home-stat-card">
          <div className="home-stat-icon">🏋️</div>
          <div className="home-stat-value">{totalExercises}</div>
          <div className="home-stat-label">упражнений</div>
        </div>
        <div className="home-stat-card">
          <div className="home-stat-icon">✅</div>
          <div className="home-stat-value">{totalCompleted}</div>
          <div className="home-stat-label">выполнено</div>
        </div>
        <div className="home-stat-card">
          <div className="home-stat-icon">🎯</div>
          <div className="home-stat-value">
            {completedSets}/{totalSets}
          </div>
          <div className="home-stat-label">подходов</div>
        </div>
      </div> */}

      <div className="home-categories-container">
        {categories.map((category) => {
          const categoryProgress = workoutHelpers.getCategoryProgress(category);
          return (
            <div
              key={category.id}
              className="home-category-card"
              onClick={() => goToCategory(category.id)}
              style={{ borderLeftColor: category.color }}
            >
              <div className="home-category-left">
                <span className="home-category-icon">{category.icon}</span>
                <div className="home-category-info">
                  <h3>{category.name}</h3>
                  <div className="home-category-stats">
                    <span>📋 {category.exercises.length} упр.</span>
                    <span>
                      🎯{" "}
                      {category.exercises.reduce(
                        (s, ex) => s + ex.completedSets,
                        0,
                      )}
                      /{category.exercises.reduce((s, ex) => s + ex.sets, 0)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="home-category-right">
                <div className="home-category-progress">
                  <div className="home-progress-bar">
                    <div
                      className="home-progress-fill"
                      style={{ width: `${categoryProgress}%` }}
                    ></div>
                  </div>
                  <span className="home-progress-percent">
                    {Math.round(categoryProgress)}%
                  </span>
                </div>
                <span className="home-category-arrow">→</span>
              </div>
            </div>
          );
        })}
      </div>

      {categories.length > 0 && (
        <div className="home-reset-section">
          <button className="home-reset-btn" onClick={resetAllWorkouts}>
            🔄 Сбросить все тренировки
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeWorkoutPage;
