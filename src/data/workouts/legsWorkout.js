import exercise1 from "../../assets/images/legs/exercise1.png";
import exercise2 from "../../assets/images/legs/exercise2.png";
import exercise3 from "../../assets/images/legs/exercise3.png";
import exercise4 from "../../assets/images/legs/exercise4.png";
import exercise5 from "../../assets/images/legs/exercise5.png";
import exercise6 from "../../assets/images/legs/exercise6.png";

export const legsWorkout = {
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
      media: exercise1,
      mediaType: "image",
    },
    {
      id: 3002,
      name: "Румынская тяга с гантелями",
      sets: 4,
      reps: 10,
      completedSets: 0,
      completed: false,
      media: exercise2,
      mediaType: "image",
    },
    {
      id: 3003,
      name: "Болгарские выпады (задняя нога на стуле, 10 на ногу)",
      sets: 4,
      reps: 10,
      completedSets: 0,
      completed: false,
      media: exercise3,
      mediaType: "image",
    },
    {
      id: 3004,
      name: "Подъёмы на носки стоя с гантелью",
      sets: 4,
      reps: 15,
      completedSets: 0,
      completed: false,
      media: exercise4,
      mediaType: "image",
    },
    {
      id: 3005,
      name: "Скручивания с гантелью на груди",
      sets: 3,
      reps: 13,
      completedSets: 0,
      completed: false,
      media: exercise5,
      mediaType: "image",
    },
    {
      id: 3006,
      name: "Планка",
      sets: 3,
      reps: "40 сек",
      completedSets: 0,
      completed: false,
      media: exercise6,
      mediaType: "image",
    },
  ],
};
