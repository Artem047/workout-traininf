// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import StatsCard from "./components/StatsCard";
import CategorySection from "./components/CategorySection";
import AddCategoryForm from "./components/AddCategoryForm";
import WorkoutCalendar from "./components/WorkoutCalendar";
import CategoryPage from "./pages/CategoryPage";
import ExercisePage from "./pages/ExercisePage";
import { initialWorkoutData, workoutHelpers } from "./data/workoutData";

const HomePage = ({
  categories,
  totalExercises,
  totalCompleted,
  completedSets,
  totalSets,
  totalProgress,
  setsProgress,
  addCategory,
  deleteCategory,
  updateCategory,
  resetAllWorkouts,
  calendarRefresh,
}) => (
  <>
    {/* Компактная статистика */}
    <div className="stats-grid">
      <StatsCard icon="📁" value={categories.length} label="Групп" />
      <StatsCard icon="🏋️" value={totalExercises} label="Упр." />
      <StatsCard
        icon="✅"
        value={`${totalCompleted}/${totalExercises}`}
        label="Выполнено"
      />
      <StatsCard
        icon="🎯"
        value={`${completedSets}/${totalSets}`}
        label="Подходов"
      />
    </div>

    {/* Календарь тренировок */}
    <WorkoutCalendar categories={categories} refreshTrigger={calendarRefresh} />

    {/* Общий прогресс */}
    {totalExercises > 0 && (
      <div className="global-progress">
        <div className="progress-header">
          <span>🔥 Общий прогресс тренировки</span>
          <span>{Math.round(totalProgress)}%</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${totalProgress}%` }}>
            <div className="progress-glow"></div>
          </div>
        </div>
        <div className="progress-stats">
          <span>✅ Выполнено упражнений: {totalCompleted}</span>
          <span>📊 Прогресс подходов: {Math.round(setsProgress)}%</span>
        </div>
      </div>
    )}

    {/* Форма добавления категории */}
    <AddCategoryForm onAddCategory={addCategory} />

    {/* Список категорий (компактный) */}
    <div className="categories-container">
      {categories.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">💪</div>
          <h3>Создай свою первую группу мышц!</h3>
          <p>Нажми кнопку выше "➕ Создать группу мышц" чтобы начать</p>
        </div>
      )}

      {categories.map((category) => (
        <CategorySection
          key={category.id}
          category={category}
          onDeleteCategory={deleteCategory}
          onUpdateCategory={updateCategory}
        />
      ))}
    </div>

    {/* Кнопка полного сброса */}
    {categories.length > 0 && (
      <div className="reset-all-section">
        <button className="btn-reset-all" onClick={resetAllWorkouts}>
          🔄 Сбросить все тренировки
        </button>
      </div>
    )}
  </>
);

const App = () => {
  const [categories, setCategories] = useState(initialWorkoutData);
  const [calendarRefresh, setCalendarRefresh] = useState(0);

  const addCategory = (categoryName, icon, color) => {
    const newCategory = {
      id: Date.now().toString(),
      name: categoryName,
      icon: icon,
      color: color,
      exercises: [],
    };
    setCategories([...categories, newCategory]);
  };

  const deleteCategory = (categoryId) => {
    if (window.confirm("Удалить эту группу мышц со всеми упражнениями?")) {
      setCategories(categories.filter((cat) => cat.id !== categoryId));
    }
  };

  const updateCategory = (categoryId, updatedCategory) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat.id === categoryId ? updatedCategory : cat,
      ),
    );
  };

  const totalExercises = workoutHelpers.getTotalExercises(categories);
  const totalCompleted = workoutHelpers.getCompletedExercises(categories);
  const totalSets = workoutHelpers.getTotalSets(categories);
  const completedSets = workoutHelpers.getCompletedSets(categories);

  const totalProgress = totalExercises
    ? (totalCompleted / totalExercises) * 100
    : 0;
  const setsProgress = totalSets ? (completedSets / totalSets) * 100 : 0;

  const resetAllWorkouts = () => {
    if (
      window.confirm("Сбросить все тренировки? Весь прогресс будет потерян!")
    ) {
      const resetData = JSON.parse(JSON.stringify(initialWorkoutData));
      setCategories(resetData);
    }
  };

  // Функция для обновления календаря
  const refreshCalendar = () => {
    setCalendarRefresh((prev) => prev + 1);
  };

  return (
    <Router>
      <div className="app">
        <div className="bg-gradient"></div>
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  categories={categories}
                  totalExercises={totalExercises}
                  totalCompleted={totalCompleted}
                  completedSets={completedSets}
                  totalSets={totalSets}
                  totalProgress={totalProgress}
                  setsProgress={setsProgress}
                  addCategory={addCategory}
                  deleteCategory={deleteCategory}
                  updateCategory={updateCategory}
                  resetAllWorkouts={resetAllWorkouts}
                  calendarRefresh={calendarRefresh}
                />
              }
            />
            <Route
              path="/category/:categoryId"
              element={<CategoryPage refreshCalendar={refreshCalendar} />}
            />
            <Route
              path="/exercise/:categoryId/:exerciseId"
              element={<ExercisePage refreshCalendar={refreshCalendar} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
