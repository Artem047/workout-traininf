// src/context/UserContext.jsx
import React, { createContext, useState, useContext } from "react";
import { getUserWorkoutData } from "../data/workoutData";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentWorkoutData, setCurrentWorkoutData] = useState(null);

  const selectUser = (user) => {
    setCurrentUser(user);
    const userData = getUserWorkoutData(user.id);
    setCurrentWorkoutData(userData);
  };

  const switchUser = () => {
    setCurrentUser(null);
    setCurrentWorkoutData(null);
  };

  const updateWorkoutData = (newData) => {
    setCurrentWorkoutData(newData);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        currentWorkoutData,
        selectUser,
        switchUser,
        updateWorkoutData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
