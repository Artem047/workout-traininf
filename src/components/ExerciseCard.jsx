// src/components/ExerciseCard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ExerciseCard.css";

const ExerciseCard = ({
  exercise,
  categoryId,
  onCompleteSet,
  onResetSet,
  onDelete,
  onUpdateExercise,
}) => {
  const [showMedia, setShowMedia] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(exercise.name);
  const [editSets, setEditSets] = useState(exercise.sets);
  const [editReps, setEditReps] = useState(exercise.reps);
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    if (
      !e.target.closest(".btn-media-view") &&
      !e.target.closest(".btn-delete") &&
      !e.target.closest(".btn-edit") &&
      !e.target.closest(".set-btn") &&
      !e.target.closest(".edit-form")
    ) {
      navigate(`/exercise/${categoryId}/${exercise.id}`);
    }
  };

  const handleSetClick = (setIndex) => {
    const isCompleted = setIndex < exercise.completedSets;

    if (isCompleted) {
      onResetSet(setIndex);
    } else if (setIndex === exercise.completedSets) {
      onCompleteSet();
    }
  };

  const handleSaveEdit = () => {
    if (editName.trim()) {
      onUpdateExercise({
        ...exercise,
        name: editName,
        sets: editSets,
        reps: editReps,
      });
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="exercise-card edit-mode">
        <div className="edit-exercise-form">
          <div className="edit-form-group">
            <label>Название</label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              autoFocus
            />
          </div>
          <div className="edit-form-row">
            <div className="edit-form-group">
              <label>Подходы</label>
              <input
                type="number"
                value={editSets}
                onChange={(e) => setEditSets(parseInt(e.target.value) || 0)}
                min="1"
              />
            </div>
            <div className="edit-form-group">
              <label>Повторения</label>
              <input
                type="number"
                value={editReps}
                onChange={(e) => setEditReps(parseInt(e.target.value) || 0)}
                min="1"
              />
            </div>
          </div>
          <div className="edit-form-actions">
            <button className="btn-save-edit" onClick={handleSaveEdit}>
              💾 Сохранить
            </button>
            <button
              className="btn-cancel-edit"
              onClick={() => setIsEditing(false)}
            >
              ✖ Отмена
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`exercise-card ${exercise.completed ? "completed" : ""}`}
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className="card-header">
        <div className="exercise-info">
          <h3 className="exercise-name">{exercise.name}</h3>
          <div className="exercise-meta">
            <span className="meta-badge">
              🎯 {exercise.completedSets}/{exercise.sets}
            </span>
            <span className="meta-badge">🔄 ×{exercise.reps}</span>
          </div>
        </div>
        <div className="card-actions">
          <button
            className="btn-edit"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            title="Редактировать"
          >
            ✏️
          </button>
          {exercise.media && (
            <button
              className="btn-media-view"
              onClick={(e) => {
                e.stopPropagation();
                setShowMedia(!showMedia);
              }}
              title="Показать фото"
            >
              {showMedia ? "📷 Скрыть" : "📷 Показать"}
            </button>
          )}
          <button
            className="btn-delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(exercise.id);
            }}
            title="Удалить"
          >
            🗑️
          </button>
        </div>
      </div>

      {showMedia && exercise.media && exercise.mediaType === "image" && (
        <div className="exercise-media" onClick={(e) => e.stopPropagation()}>
          <div className="media-container">
            <img
              src={exercise.media}
              alt={exercise.name}
              className="exercise-image"
            />
          </div>
        </div>
      )}

      <div className="sets-container" onClick={(e) => e.stopPropagation()}>
        <div className="sets-grid">
          {[...Array(exercise.sets)].map((_, idx) => {
            const isCompleted = idx < exercise.completedSets;
            return (
              <button
                key={idx}
                className={`set-btn ${isCompleted ? "completed" : ""}`}
                onClick={() => handleSetClick(idx)}
              >
                {isCompleted ? "✓" : `${idx + 1}`}
              </button>
            );
          })}
        </div>
      </div>

      {exercise.completed && (
        <div className="completed-badge">
          <span>✨ Выполнено! ✨</span>
        </div>
      )}
    </div>
  );
};

export default ExerciseCard;
