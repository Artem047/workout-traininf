// src/data/workoutDataAngelina.js

// Импорт изображений для грудных упражнений Ангелины
import back1 from "../assets/images/angelina/back/back1.png";
import back2 from "../assets/images/angelina/back/back2.png";
import back3 from "../assets/images/angelina/back/back3.png";
import back4 from "../assets/images/angelina/back/back4.png";
import back5 from "../assets/images/angelina/back/back5.png";
import back6 from "../assets/images/angelina/back/back6.png";

import legs1 from "../assets/images/angelina/legs/legs1.png";
import legs2 from "../assets/images/angelina/legs/legs2.png";
import legs3 from "../assets/images/angelina/legs/legs3.png";
import legs4 from "../assets/images/angelina/legs/legs4.png";
import legs5 from "../assets/images/angelina/legs/legs5.png";

export const angelinaWorkoutData = [
  {
    id: "chest",
    name: "Грудь, спина, руки",
    icon: "🏋️",
    color: "#ef4444",
    exercises: [
      {
        id: 1001,
        name: "Жим гантелей лёжа/на полу (8-10 кг)",
        sets: 4,
        reps: 11,
        completedSets: 0,
        completed: false,
        media: back1,
        mediaType: "image",
      },
      {
        id: 1002,
        name: "Тяга гантелей в наклоне (8-10 кг)",
        sets: 4,
        reps: 11,
        completedSets: 0,
        completed: false,
        media: back2,
        mediaType: "image",
      },
      {
        id: 1003,
        name: "3.	Жим гантелей стоя/сидя (8-10 кг)",
        sets: 3,
        reps: 11,
        completedSets: 0,
        completed: false,
        media: back3,
        mediaType: "image",
      },
      {
        id: 1004,
        name: "4.	Разводка гантелей лёжа/на полу (10-12 кг)",
        sets: 3,
        reps: 12,
        completedSets: 0,
        completed: false,
        media: back4,
        mediaType: "image",
      },
      {
        id: 1005,
        name: "Бицепс (6-8 кг)",
        sets: 3,
        reps: 13,
        completedSets: 0,
        completed: false,
        media: back5,
        mediaType: "image",
      },
      {
        id: 1006,
        name: "Трицепс (6-8 кг)",
        sets: 3,
        reps: 13,
        completedSets: 0,
        completed: false,
        media: back6,
        mediaType: "image",
      },
    ],
  },
  {
    id: "legs",
    name: "Ноги и попа",
    icon: "🔙",
    color: "#3b82f6",
    exercises: [
      {
        id: 2001,
        name: "1.	Гоблет-присед (10-20 кг)",
        sets: 4,
        reps: 11,
        completedSets: 0,
        completed: false,
        media: legs1,
        mediaType: "image",
      },
      {
        id: 2002,
        name: "2.	Румынская тяга (20-30 кг)",
        sets: 4,
        reps: 11,
        completedSets: 0,
        completed: false,
        media: legs2,
        mediaType: "image",
      },
      {
        id: 2003,
        name: "Болгарские приседания (10-15 кг)",
        sets: 3,
        reps: 11,
        completedSets: 0,
        completed: false,
        media: legs3,
        mediaType: "image",
      },
      {
        id: 2004,
        name: "Ягодичный мостик с отягощением + резинкой (20-30 кг)",
        sets: 3,
        reps: 13,
        completedSets: 0,
        completed: false,
        media: legs4,
        mediaType: "image",
      },
      {
        id: 2005,
        name: "Одноногая румынская тяга с резинкой",
        sets: 3,
        reps: 11,
        completedSets: 0,
        completed: false,
        media: legs5,
        mediaType: "image",
      },
    ],
  },
];
