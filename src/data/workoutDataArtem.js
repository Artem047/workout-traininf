// Импорт изображений для ГРУДНЫХ
import chest1 from "../assets/images/artem/chest/exercise1.png";
import chest2 from "../assets/images/artem/chest/exercise2.png";
import chest3 from "../assets/images/artem/chest/exercise3.png";
import chest4 from "../assets/images/artem/chest/exercise4.png";
import chest5 from "../assets/images/artem/chest/exercise5.png";

// Импорт изображений для СПИНЫ
import back1 from "../assets/images/artem/back/exercise1.png";
import back2 from "../assets/images/artem/back/exercise2.png";
import back3 from "../assets/images/artem/back/exercise3.png";
import back4 from "../assets/images/artem/back/exercise4.png";
import back5 from "../assets/images/artem/back/exercise5.png";
import back6 from "../assets/images/artem/back/exercise6.png";

// Импорт изображений для НОГ
import legs1 from "../assets/images/artem/legs/exercise1.png";
import legs2 from "../assets/images/artem/legs/exercise2.png";
import legs3 from "../assets/images/artem/legs/exercise3.png";
import legs4 from "../assets/images/artem/legs/exercise4.png";
import legs5 from "../assets/images/artem/legs/exercise5.png";
import legs6 from "../assets/images/artem/legs/exercise6.png";

// Импорт изображений для РУК
import bicepCurl from "../assets/images/artem/arms/bicep-curl.png";
import frenchPress from "../assets/images/artem/arms/french-press.png";
import concentratedBicepCurl from "../assets/images/artem/arms/concentratedBicepCurl.png";
import hammerCurls from "../assets/images/artem/arms/hammerCurls.png";

export const artemWorkoutData = [
  // ГРУДНЫЕ
  {
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
        media: chest1,
        mediaType: "image",
      },
      {
        id: 1002,
        name: "Отжимания с резиной (руки шире плеч) + ноги на возвышении",
        sets: 4,
        reps: 10,
        completedSets: 0,
        completed: false,
        media: chest2,
        mediaType: "image",
      },
      {
        id: 1003,
        name: "Жим гантелей сидя (плечи — передняя дельта)",
        sets: 3,
        reps: 11,
        completedSets: 0,
        completed: false,
        media: chest3,
        mediaType: "image",
      },
      {
        id: 1004,
        name: "Пуловер с одной гантелью лёжа (растяжка груди)",
        sets: 3,
        reps: 11,
        completedSets: 0,
        completed: false,
        media: chest4,
        mediaType: "image",
      },
      {
        id: 1005,
        name: "Разгибание гантели из-за головы (трицепс)",
        sets: 3,
        reps: 11,
        completedSets: 0,
        completed: false,
        media: chest5,
        mediaType: "image",
      },
    ],
  },

  // СПИНА
  {
    id: "back",
    name: "Спина",
    icon: "🔙",
    color: "#3b82f6",
    exercises: [
      {
        id: 2001,
        name: "Тяга гантели в наклоне (одной рукой, упор)",
        sets: 4,
        reps: 11,
        completedSets: 0,
        completed: false,
        media: back1,
        mediaType: "image",
      },
      {
        id: 2002,
        name: "Тяга двух гантелей в наклоне",
        sets: 4,
        reps: 9,
        completedSets: 0,
        completed: false,
        media: back2,
        mediaType: "image",
      },
      {
        id: 2003,
        name: "Тяга резины к поясу сидя (имитация тяги блока)",
        sets: 3,
        reps: 13,
        completedSets: 0,
        completed: false,
        media: back3,
        mediaType: "image",
      },
      {
        id: 2004,
        name: "Разведение рук с гантелями в наклоне (задняя дельта)",
        sets: 4,
        reps: 13,
        completedSets: 0,
        completed: false,
        media: back4,
        mediaType: "image",
      },
      {
        id: 2005,
        name: "Разведение рук в стороны стоя (средняя дельта)",
        sets: 3,
        reps: 13,
        completedSets: 0,
        completed: false,
        media: back5,
        mediaType: "image",
      },
      {
        id: 2006,
        name: "Шраги с гантелями (трапеции)",
        sets: 3,
        reps: 13,
        completedSets: 0,
        completed: false,
        media: back6,
        mediaType: "image",
      },
    ],
  },

  // НОГИ
  {
    id: "legs",
    name: "Ноги",
    icon: "🦵",
    color: "#10b981",
    exercises: [
      {
        id: 3001,
        name: "Приседания с гантелями (у груди или на плечах)",
        sets: 5,
        reps: 8,
        completedSets: 0,
        completed: false,
        media: legs1,
        mediaType: "image",
      },
      {
        id: 3002,
        name: "Румынская тяга с гантелями",
        sets: 4,
        reps: 10,
        completedSets: 0,
        completed: false,
        media: legs2,
        mediaType: "image",
      },
      {
        id: 3003,
        name: "Болгарские выпады (задняя нога на стуле, 10 на ногу)",
        sets: 4,
        reps: 10,
        completedSets: 0,
        completed: false,
        media: legs3,
        mediaType: "image",
      },
      {
        id: 3004,
        name: "Подъёмы на носки стоя с гантелью",
        sets: 4,
        reps: 15,
        completedSets: 0,
        completed: false,
        media: legs4,
        mediaType: "image",
      },
      {
        id: 3005,
        name: "Скручивания с гантелью на груди",
        sets: 3,
        reps: 13,
        completedSets: 0,
        completed: false,
        media: legs5,
        mediaType: "image",
      },
      {
        id: 3006,
        name: "Планка",
        sets: 3,
        reps: "40 сек",
        completedSets: 0,
        completed: false,
        media: legs6,
        mediaType: "image",
      },
    ],
  },

  // РУКИ
  {
    id: "arms",
    name: "Руки",
    icon: "💪",
    color: "#ec4899",
    exercises: [
      {
        id: 5001,
        name: "Подъём штанги на бицепс",
        sets: 4,
        reps: 12,
        completedSets: 0,
        completed: false,
        media: bicepCurl,
        mediaType: "image",
      },
      {
        id: 5002,
        name: "Французский жим",
        sets: 4,
        reps: 12,
        completedSets: 0,
        completed: false,
        media: frenchPress,
        mediaType: "image",
      },
      {
        id: 5003,
        name: "Молотковые сгибания с гантелями",
        sets: 4,
        reps: 12,
        completedSets: 0,
        completed: false,
        media: hammerCurls,
        mediaType: "image",
      },
      {
        id: 5004,
        name: "Концентрированный подъём гантели на бицепс",
        sets: 4,
        reps: 12,
        completedSets: 0,
        completed: false,
        media: concentratedBicepCurl,
        mediaType: "image",
      },
    ],
  },
];
