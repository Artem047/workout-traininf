// src/data/workouts/backWorkout.js

// Импорт изображений для упражнений на спину
import exercise1 from "../../assets/images/back/exercise1.png";
import exercise2 from "../../assets/images/back/exercise2.png";
import exercise3 from "../../assets/images/back/exercise3.png";
import exercise4 from "../../assets/images/back/exercise4.png";
import exercise5 from "../../assets/images/back/exercise5.png";
import exercise6 from "../../assets/images/back/exercise6.png";

export const backWorkout = {
  id: "back",
  name: "Спина",
  icon: "🔙",
  color: "#3b82f6",
  exercises: [
    {
      id: 2001,
      name: "Тяга гантели в наклоне (одной рукой, упор)",
      sets: 4,
      reps: 11, // среднее между 10-12
      completedSets: 0,
      completed: false,
      media: exercise1,
      mediaType: "image",
    },
    {
      id: 2002,
      name: "Тяга двух гантелей в наклоне",
      sets: 4,
      reps: 9, // среднее между 8-10
      completedSets: 0,
      completed: false,
      media: exercise2,
      mediaType: "image",
    },
    {
      id: 2003,
      name: "Тяга резины к поясу сидя (имитация тяги блока)",
      sets: 3,
      reps: 13, // среднее между 12-15
      completedSets: 0,
      completed: false,
      media: exercise3,
      mediaType: "image",
    },
    {
      id: 2004,
      name: "Разведение рук с гантелями в наклоне (задняя дельта)",
      sets: 4,
      reps: 13, // среднее между 12-15
      completedSets: 0,
      completed: false,
      media: exercise4,
      mediaType: "image",
    },
    {
      id: 2005,
      name: "Разведение рук в стороны стоя (средняя дельта)",
      sets: 3,
      reps: 13, // среднее между 12-15
      completedSets: 0,
      completed: false,
      media: exercise5,
      mediaType: "image",
    },
    {
      id: 2006,
      name: "Шраги с гантелями (трапеции)",
      sets: 3,
      reps: 13, // среднее между 12-15
      completedSets: 0,
      completed: false,
      media: exercise6,
      mediaType: "image",
    },
  ],
};
