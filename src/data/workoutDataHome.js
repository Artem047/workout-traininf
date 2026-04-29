// src/data/workoutDataHome.js

// Импорт изображений для домашних тренировок
// (используем те же изображения, можно заменить на свои)

// ГРУДНЫЕ
import chest1 from "../assets/images/artem/chest/exercise1.png";
import chest2 from "../assets/images/artem/chest/exercise2.png";

// СПИНА
import back1 from "../assets/images/artem/back/exercise1.png";
import back2 from "../assets/images/artem/back/exercise2.png";

// НОГИ
import legs1 from "../assets/images/artem/legs/exercise1.png";
import legs2 from "../assets/images/artem/legs/exercise2.png";
import legs3 from "../assets/images/artem/legs/exercise3.png";

// РУКИ
import arms1 from "../assets/images/artem/arms/bicep-curl.png";

export const homeWorkoutData = [
  {
    id: "home-chest",
    name: "Грудные (резинки)",
    icon: "🏋️",
    color: "#ef4444",
    exercises: [
      {
        id: 1101,
        name: "Жим резинки лёжа (имитация жима гантелей)",
        sets: 3,
        reps: 12,
        completedSets: 0,
        completed: false,
        media: chest1,
        mediaType: "image",
      },
      {
        id: 1102,
        name: "Сведение рук с резинкой стоя (имитация кроссовера)",
        sets: 3,
        reps: 15,
        completedSets: 0,
        completed: false,
        media: chest2,
        mediaType: "image",
      },
      {
        id: 1103,
        name: "Отжимания с резинкой на спине (утяжеление)",
        sets: 3,
        reps: 10,
        completedSets: 0,
        completed: false,
        media: chest1,
        mediaType: "image",
      },
    ],
  },
  {
    id: "home-back",
    name: "Спина (резинки)",
    icon: "🔙",
    color: "#3b82f6",
    exercises: [
      {
        id: 2101,
        name: "Тяга резинки к поясу сидя",
        sets: 4,
        reps: 12,
        completedSets: 0,
        completed: false,
        media: back1,
        mediaType: "image",
      },
      {
        id: 2102,
        name: "Пуловер с резинкой лёжа",
        sets: 3,
        reps: 12,
        completedSets: 0,
        completed: false,
        media: back2,
        mediaType: "image",
      },
      {
        id: 2103,
        name: "Разведение рук с резинкой в наклоне",
        sets: 3,
        reps: 15,
        completedSets: 0,
        completed: false,
        media: back1,
        mediaType: "image",
      },
    ],
  },
  {
    id: "home-legs",
    name: "Ноги (резинки)",
    icon: "🦵",
    color: "#10b981",
    exercises: [
      {
        id: 3101,
        name: "Приседания с резинкой под стопами",
        sets: 4,
        reps: 15,
        completedSets: 0,
        completed: false,
        media: legs1,
        mediaType: "image",
      },
      {
        id: 3102,
        name: "Ягодичный мост с резинкой",
        sets: 3,
        reps: 20,
        completedSets: 0,
        completed: false,
        media: legs2,
        mediaType: "image",
      },
      {
        id: 3103,
        name: "Отведение ноги в сторону с резинкой",
        sets: 3,
        reps: 15,
        completedSets: 0,
        completed: false,
        media: legs3,
        mediaType: "image",
      },
      {
        id: 3104,
        name: "Подъём на носки с резинкой",
        sets: 3,
        reps: 20,
        completedSets: 0,
        completed: false,
        media: legs1,
        mediaType: "image",
      },
    ],
  },
  {
    id: "home-arms",
    name: "Руки (резинки)",
    icon: "💪",
    color: "#ec4899",
    exercises: [
      {
        id: 5101,
        name: "Сгибание рук на бицепс с резинкой",
        sets: 3,
        reps: 12,
        completedSets: 0,
        completed: false,
        media: arms1,
        mediaType: "image",
      },
      {
        id: 5102,
        name: "Разгибание рук на трицепс с резинкой",
        sets: 3,
        reps: 12,
        completedSets: 0,
        completed: false,
        media: arms1,
        mediaType: "image",
      },
    ],
  },
];
