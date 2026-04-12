// src/data/workouts/index.js
import { chestWorkout } from "./chestWorkout";
import { backWorkout } from "./backWorkout";
import { legsWorkout } from "./legsWorkout";
import { armsWorkout } from "./armsWorkout";

// Объединяем все тренировки в один массив
export const allWorkouts = [
  chestWorkout,
  backWorkout,
  legsWorkout,
  armsWorkout,
];

// Экспортируем каждую тренировку отдельно (для удобства)
export { chestWorkout, backWorkout, legsWorkout, armsWorkout };

// Вспомогательная функция для получения тренировки по ID
export const getWorkoutById = (id) => {
  return allWorkouts.find((workout) => workout.id === id);
};

// Вспомогательная функция для получения упражнения по ID
export const getExerciseById = (workoutId, exerciseId) => {
  const workout = getWorkoutById(workoutId);
  return workout?.exercises.find((ex) => ex.id === exerciseId);
};
