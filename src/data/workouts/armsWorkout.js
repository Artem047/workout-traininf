import bicepCurl from "../../assets/images/arms/bicep-curl.png";
import frenchPress from "../../assets/images/arms/french-press.png";
import concentratedBicepCurl from "../../assets/images/arms/concentratedBicepCurl.png";
import hammerCurls from "../../assets/images/arms/hammerCurls.png";

export const armsWorkout = {
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
};
