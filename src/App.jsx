// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import StatsCard from "./components/StatsCard";
import CategorySection from "./components/CategorySection";
import AddCategoryForm from "./components/AddCategoryForm";
import WorkoutCalendar from "./components/WorkoutCalendar";
import UserSelector from "./components/UserSelector";
import HomeWorkoutCard from "./components/HomeWorkoutCard";
import CategoryPage from "./pages/CategoryPage";
import ExercisePage from "./pages/ExercisePage";
import HomeWorkoutPage from "./pages/HomeWorkoutPage";
import HomeCategoryPage from "./pages/HomeCategoryPage";
import HomeExercisePage from "./pages/HomeExercisePage";
import { workoutHelpers } from "./data/workoutData";
import UserProvider from "./context/UserContext";
import { useUser } from "./context/UserContext";

// Компонент главной страницы с выбором пользователя
const HomePageContent = () => {
  const { currentUser, currentWorkoutData, selectUser, updateWorkoutData } =
    useUser();
  const [categories, setCategories] = useState(null);
  const [calendarRefresh, setCalendarRefresh] = useState(0);

  useEffect(() => {
    if (currentWorkoutData) {
      setCategories(currentWorkoutData);
    }
  }, [currentWorkoutData]);

  // Если пользователь не выбран - показываем карточку домашней тренировки и выбор пользователя
  if (!currentUser || !categories) {
    return (
      <>
        <HomeWorkoutCard />
        <UserSelector onSelectUser={selectUser} selectedUser={currentUser} />
        <div className="welcome-message">
          <h2>Добро пожаловать в FitFlow! 💪</h2>
          <p>Выберите пользователя, чтобы начать индивидуальную тренировку</p>
        </div>
      </>
    );
  }

  const totalExercises = workoutHelpers.getTotalExercises(categories);
  const totalCompleted = workoutHelpers.getCompletedExercises(categories);
  const totalSets = workoutHelpers.getTotalSets(categories);
  const completedSets = workoutHelpers.getCompletedSets(categories);
  const totalProgress = totalExercises
    ? (totalCompleted / totalExercises) * 100
    : 0;
  const setsProgress = totalSets ? (completedSets / totalSets) * 100 : 0;

  const addCategory = (categoryName, icon, color) => {
    const newCategory = {
      id: Date.now().toString(),
      name: categoryName,
      icon: icon,
      color: color,
      exercises: [],
    };
    const newCategories = [...categories, newCategory];
    setCategories(newCategories);
    updateWorkoutData(newCategories);
  };

  const deleteCategory = (categoryId) => {
    if (window.confirm("Удалить эту группу мышц со всеми упражнениями?")) {
      const newCategories = categories.filter((cat) => cat.id !== categoryId);
      setCategories(newCategories);
      updateWorkoutData(newCategories);
    }
  };

  const updateCategory = (categoryId, updatedCategory) => {
    const newCategories = categories.map((cat) =>
      cat.id === categoryId ? updatedCategory : cat,
    );
    setCategories(newCategories);
    updateWorkoutData(newCategories);
  };

  const resetAllWorkouts = () => {
    if (window.confirm(`Сбросить все тренировки для ${currentUser.name}?`)) {
      const { getUserWorkoutData } = require("./data/workoutData");
      const resetData = JSON.parse(
        JSON.stringify(getUserWorkoutData(currentUser.id)),
      );
      setCategories(resetData);
      updateWorkoutData(resetData);
    }
  };

  const refreshCalendar = () => {
    setCalendarRefresh((prev) => prev + 1);
  };

  return (
    <>
      <div className="user-info-header">
        <div className="user-greeting">
          <span className="user-greeting-icon">{currentUser.icon}</span>
          <span className="user-greeting-name">
            Привет, {currentUser.name}!
          </span>
        </div>
        <button
          className="switch-user-btn"
          onClick={() => window.location.reload()}
        >
          🔄 Сменить пользователя
        </button>
      </div>

      <div className="categories-container">
        {categories.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">💪</div>
            <h3>Создай свою первую группу мышц!</h3>
            <p>Нажми кнопку ниже "➕ Создать группу" чтобы начать</p>
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

      <div className="add-category-wrapper">
        <button className="btn-add-category" onClick={addCategory}>
          ➕ Создать группу мышц
        </button>
      </div>

      {categories.length > 0 && (
        <div className="reset-all-section">
          <button className="btn-reset-all" onClick={resetAllWorkouts}>
            🔄 Сбросить все тренировки
          </button>
        </div>
      )}
    </>
  );
};

// Основной компонент App
const App = () => {
  return (
    <UserProvider>
      <Router>
        <div className="app">
          <div className="bg-gradient"></div>
          <div className="container">
            {/* <Header /> */}
            <Routes>
              <Route path="/" element={<HomePageContent />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route
                path="/exercise/:categoryId/:exerciseId"
                element={<ExercisePage />}
              />
              <Route path="/home-workout" element={<HomeWorkoutPage />} />
              <Route
                path="/home-category/:categoryId"
                element={<HomeCategoryPage />}
              />
              <Route
                path="/home-exercise/:categoryId/:exerciseId"
                element={<HomeExercisePage />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
