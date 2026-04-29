// src/data/workoutData.js
import { artemWorkoutData } from "./workoutDataArtem";
import { angelinaWorkoutData } from "./workoutDataAngelina";

// Экспортируем данные для разных пользователей
export const getUserWorkoutData = (userId) => {
  switch (userId) {
    case "artem":
      return artemWorkoutData;
    case "angelina":
      return angelinaWorkoutData;
    default:
      return artemWorkoutData;
  }
};

// Вспомогательные функции для работы с данными
export const workoutHelpers = {
  // Получить общее количество упражнений
  getTotalExercises: (data) => {
    return data.reduce((sum, cat) => sum + cat.exercises.length, 0);
  },

  // Получить количество выполненных упражнений
  getCompletedExercises: (data) => {
    return data.reduce(
      (sum, cat) => sum + cat.exercises.filter((ex) => ex.completed).length,
      0,
    );
  },

  // Получить общее количество подходов
  getTotalSets: (data) => {
    return data.reduce(
      (sum, cat) => sum + cat.exercises.reduce((s, ex) => s + ex.sets, 0),
      0,
    );
  },

  // Получить количество выполненных подходов
  getCompletedSets: (data) => {
    return data.reduce(
      (sum, cat) =>
        sum + cat.exercises.reduce((s, ex) => s + ex.completedSets, 0),
      0,
    );
  },

  // Получить прогресс категории (группы мышц)
  getCategoryProgress: (category) => {
    const totalSets = category.exercises.reduce((sum, ex) => sum + ex.sets, 0);
    const completedSets = category.exercises.reduce(
      (sum, ex) => sum + ex.completedSets,
      0,
    );
    return totalSets === 0 ? 0 : (completedSets / totalSets) * 100;
  },
};
