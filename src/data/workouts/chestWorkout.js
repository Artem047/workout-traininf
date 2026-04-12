// src/data/workouts/chestWorkout.js

// Импорт изображений для грудных упражнений
import exercise1 from "../../assets/images/chest/exercise1.png";
import exercise2 from "../../assets/images/chest/exercise2.png";
import exercise3 from "../../assets/images/chest/exercise3.png";
import exercise4 from "../../assets/images/chest/exercise4.png";
import exercise5 from "../../assets/images/chest/exercise5.png";
import exercise6 from "../../assets/images/chest/exercise6.png";

export const chestWorkout = {
  id: "chest",
  name: "Грудные",
  icon: "🏋️",
  color: "#ef4444",
  exercises: [
    {
      id: 1001,
      name: "Жим гантелей лёжа на полу (или на стульях)",
      sets: 4,
      reps: 10,
      completedSets: 0,
      completed: false,
      media: exercise1,
      mediaType: "image",
    },
    {
      id: 1002,
      name: "Отжимания с резиной (руки шире плеч) + ноги на возвышении",
      sets: 4,
      reps: 10,
      completedSets: 0,
      completed: false,
      media: exercise2,
      mediaType: "image",
    },
    {
      id: 1003,
      name: "Жим гантелей сидя (плечи — передняя дельта)",
      sets: 3,
      reps: 11,
      completedSets: 0,
      completed: false,
      media: exercise3,
      mediaType: "image",
    },
    {
      id: 1004,
      name: "Пуловер с одной гантелью лёжа (растяжка груди)",
      sets: 3,
      reps: 11,
      completedSets: 0,
      completed: false,
      media: exercise4,
      mediaType: "image",
    },
    {
      id: 1005,
      name: "Разгибание гантели из-за головы (трицепс)",
      sets: 3,
      reps: 11,
      completedSets: 0,
      completed: false,
      media: exercise5,
      mediaType: "image",
    },
  ],
};
