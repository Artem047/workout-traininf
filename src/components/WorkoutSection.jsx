import React, { useState, useEffect } from "react";
import ExerciseCard from "./ExerciseCard";
import AddExerciseForm from "./AddExerciseForm";

const WorkoutSection = ({
  sectionId,
  title,
  icon,
  color,
  exercises: initialExercises,
  onUpdate,
}) => {
  const [exercises, setExercises] = useState(initialExercises);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    setExercises(initialExercises);
  }, [initialExercises]);

  useEffect(() => {
    onUpdate(sectionId, exercises);
  }, [exercises, sectionId, onUpdate]);

  const addExercise = (newExercise) => {
    setExercises([...exercises, newExercise]);
  };

  const completeSet = (exerciseId) => {
    setExercises(
      exercises.map((ex) => {
        if (ex.id === exerciseId) {
          const newCompleted = ex.completedSets + 1;
          return {
            ...ex,
            completedSets: newCompleted,
            completed: newCompleted === ex.sets,
          };
        }
        return ex;
      }),
    );
  };

  const deleteExercise = (exerciseId) => {
    if (window.confirm("Удалить упражнение?")) {
      setExercises(exercises.filter((ex) => ex.id !== exerciseId));
    }
  };

  const totalExercises = exercises.length;
  const completedExercises = exercises.filter((ex) => ex.completed).length;
  const progress = totalExercises
    ? (completedExercises / totalExercises) * 100
    : 0;

  const totalSets = exercises.reduce((sum, ex) => sum + ex.sets, 0);
  const completedSets = exercises.reduce(
    (sum, ex) => sum + ex.completedSets,
    0,
  );
  const setsProgress = totalSets ? (completedSets / totalSets) * 100 : 0;

  return (
    <div className="workout-section" style={{ borderColor: color }}>
      <div
        className="section-header"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          background: `linear-gradient(135deg, ${color}20, transparent)`,
        }}
      >
        <div className="section-title">
          <span className="section-icon">{icon}</span>
          <h2>{title}</h2>
          <span className="section-arrow">{isExpanded ? "▼" : "▶"}</span>
        </div>
        <div className="section-stats">
          <div className="section-stat">
            <span>
              📊 {completedExercises}/{totalExercises}
            </span>
          </div>
          <div className="section-stat">
            <span>🎯 {Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="section-content">
          {exercises.length > 0 && (
            <div className="section-progress">
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${setsProgress}%`, background: color }}
                >
                  <div className="progress-glow"></div>
                </div>
              </div>
              <div className="progress-stats">
                <span>
                  ✅ Подходов: {completedSets}/{totalSets}
                </span>
                <span>💪 Прогресс: {Math.round(setsProgress)}%</span>
              </div>
            </div>
          )}

          <AddExerciseForm onAddExercise={addExercise} />

          <div className="exercises-list">
            {exercises.length === 0 && (
              <div className="empty-state-small">
                <span>📝</span>
                <p>Нет упражнений. Добавьте первое!</p>
              </div>
            )}

            {exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onCompleteSet={completeSet}
                onDelete={deleteExercise}
              />
            ))}
          </div>

          {exercises.length > 0 && (
            <button
              className="btn-reset-section"
              onClick={() => {
                if (
                  window.confirm(
                    `Очистить все упражнения в разделе "${title}"?`,
                  )
                ) {
                  setExercises([]);
                }
              }}
              style={{ background: `${color}`, opacity: 0.8 }}
            >
              🗑️ Очистить раздел
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkoutSection;
