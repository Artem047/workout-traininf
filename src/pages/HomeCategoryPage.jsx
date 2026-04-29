// src/pages/HomeCategoryPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { homeWorkoutData } from "../data/workoutDataHome";
import "./HomeCategoryPage.css";

const HomeCategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const foundCategory = homeWorkoutData.find((cat) => cat.id === categoryId);
    if (!foundCategory) {
      navigate("/home-workout");
      return;
    }

    // Загружаем сохранённый прогресс
    const saved = localStorage.getItem("home-workout-data");
    let savedExercises = null;
    if (saved) {
      const savedData = JSON.parse(saved);
      const savedCategory = savedData.find((cat) => cat.id === categoryId);
      if (savedCategory) {
        savedExercises = savedCategory.exercises;
      }
    }

    const exercisesWithProgress = foundCategory.exercises.map((exercise) => {
      const savedExercise = savedExercises?.find((ex) => ex.id === exercise.id);
      return savedExercise ? { ...exercise, ...savedExercise } : exercise;
    });

    setCategory(foundCategory);
    setExercises(exercisesWithProgress);
  }, [categoryId, navigate]);

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

  // Сохраняем прогресс
  useEffect(() => {
    if (exercises.length > 0) {
      const saved = localStorage.getItem("home-workout-data");
      let allCategories = saved ? JSON.parse(saved) : homeWorkoutData;
      const updatedCategories = allCategories.map((cat) =>
        cat.id === categoryId ? { ...cat, exercises } : cat,
      );
      localStorage.setItem(
        "home-workout-data",
        JSON.stringify(updatedCategories),
      );
    }
  }, [exercises, categoryId]);

  const goToExercise = (exerciseId) => {
    navigate(`/home-exercise/${categoryId}/${exerciseId}`);
  };

  if (!category) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="home-category-page">
      <div className="home-category-nav">
        <Link to="/home-workout" className="back-link">
          ← Назад
        </Link>
        <h1>
          {category.icon} {category.name}
        </h1>
      </div>

      <div className="home-exercises-list">
        {exercises.map((exercise, index) => (
          <div
            key={exercise.id}
            className={`home-exercise-card ${exercise.completed ? "completed" : ""}`}
            onClick={() => goToExercise(exercise.id)}
          >
            <div className="home-exercise-header">
              <div className="home-exercise-number">{index + 1}</div>
              <div className="home-exercise-info">
                <h3>{exercise.name}</h3>
                <div className="home-exercise-badges">
                  <span>🔄 {exercise.sets} подходов</span>
                  <span>🎯 {exercise.reps} повторений</span>
                </div>
              </div>
              <div className="home-exercise-status">
                {exercise.completed
                  ? "✅"
                  : `${exercise.completedSets}/${exercise.sets}`}
              </div>
            </div>
            <div className="home-exercise-sets">
              {[...Array(exercise.sets)].map((_, idx) => (
                <button
                  key={idx}
                  className={`home-set-btn ${idx < exercise.completedSets ? "completed" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (idx < exercise.completedSets) {
                      handleResetSet(exercise.id, idx);
                    } else if (idx === exercise.completedSets) {
                      handleCompleteSet(exercise.id);
                    }
                  }}
                >
                  {idx < exercise.completedSets ? "✓" : idx + 1}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategoryPage;
