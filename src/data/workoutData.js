// src/data/workoutData.js
import { allWorkouts } from "./workouts/index";

// Для обратной совместимости
export const initialWorkoutData = allWorkouts;

// Вспомогательные функции
export const workoutHelpers = {
  getTotalExercises: (data) => {
    return data.reduce((sum, cat) => sum + cat.exercises.length, 0);
  },
  getCompletedExercises: (data) => {
    return data.reduce(
      (sum, cat) => sum + cat.exercises.filter((ex) => ex.completed).length,
      0,
    );
  },
  getTotalSets: (data) => {
    return data.reduce(
      (sum, cat) => sum + cat.exercises.reduce((s, ex) => s + ex.sets, 0),
      0,
    );
  },
  getCompletedSets: (data) => {
    return data.reduce(
      (sum, cat) =>
        sum + cat.exercises.reduce((s, ex) => s + ex.completedSets, 0),
      0,
    );
  },
  getCategoryProgress: (category) => {
    const totalSets = category.exercises.reduce((s, ex) => s + ex.sets, 0);
    const completedSets = category.exercises.reduce(
      (s, ex) => s + ex.completedSets,
      0,
    );
    return totalSets ? (completedSets / totalSets) * 100 : 0;
  },
};
