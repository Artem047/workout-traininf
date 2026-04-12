// src/components/CategorySection.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CategorySection.css";

const CategorySection = ({ category, onDeleteCategory, onUpdateCategory }) => {
  const navigate = useNavigate();
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState(category.name);
  const [editCategoryIcon, setEditCategoryIcon] = useState(category.icon);
  const [editCategoryColor, setEditCategoryColor] = useState(category.color);

  const availableIcons = [
    "🏋️",
    "💪",
    "🦵",
    "🔙",
    "🏃",
    "🧘",
    "🤸",
    "🏊",
    "🚴",
    "⚽",
    "🏀",
    "🎾",
    "🥋",
    "🏆",
  ];
  const availableColors = [
    "#ef4444",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
    "#f97316",
  ];

  const handleCategoryClick = () => {
    navigate(`/category/${category.id}`);
  };

  const handleUpdateCategory = () => {
    if (editCategoryName.trim()) {
      onUpdateCategory(category.id, {
        ...category,
        name: editCategoryName,
        icon: editCategoryIcon,
        color: editCategoryColor,
      });
      setIsEditingCategory(false);
    }
  };

  // Подсчёт прогресса
  const totalSets = category.exercises.reduce((sum, ex) => sum + ex.sets, 0);
  const completedSets = category.exercises.reduce(
    (sum, ex) => sum + ex.completedSets,
    0,
  );
  const categoryProgress = totalSets ? (completedSets / totalSets) * 100 : 0;
  const completedExercises = category.exercises.filter(
    (ex) => ex.completed,
  ).length;

  return (
    <div className="category-section-compact">
      <div
        className="category-card"
        onClick={handleCategoryClick}
        style={{
          borderLeftColor: category.color,
          cursor: "pointer",
        }}
      >
        {!isEditingCategory ? (
          <>
            <div className="category-card-left">
              <span className="category-card-icon">{category.icon}</span>
              <div className="category-card-info">
                <h3 className="category-card-name">{category.name}</h3>
                <div className="category-card-stats">
                  <span>📋 {category.exercises.length} упр.</span>
                  <span>✅ {completedExercises}</span>
                  <span>
                    🎯 {completedSets}/{totalSets}
                  </span>
                </div>
              </div>
            </div>

            <div className="category-card-right">
              <div className="category-card-progress">
                <div className="compact-progress-bar">
                  <div
                    className="compact-progress-fill"
                    style={{ width: `${categoryProgress}%` }}
                  ></div>
                </div>
                <span className="progress-percent">
                  {Math.round(categoryProgress)}%
                </span>
              </div>

              <div className="category-card-actions">
                <button
                  className="compact-edit-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditingCategory(true);
                  }}
                  title="Редактировать"
                >
                  ✏️
                </button>
                <button
                  className="compact-delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteCategory(category.id);
                  }}
                  title="Удалить"
                >
                  🗑️
                </button>
              </div>
            </div>
          </>
        ) : (
          <div
            className="compact-edit-form"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              className="compact-edit-input"
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
              placeholder="Название"
              autoFocus
            />
            <select
              className="compact-edit-select"
              value={editCategoryIcon}
              onChange={(e) => setEditCategoryIcon(e.target.value)}
            >
              {availableIcons.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
            <select
              className="compact-edit-color"
              value={editCategoryColor}
              onChange={(e) => setEditCategoryColor(e.target.value)}
              style={{ backgroundColor: editCategoryColor }}
            >
              {availableColors.map((color) => (
                <option
                  key={color}
                  value={color}
                  style={{ backgroundColor: color, color: "white" }}
                >
                  {color}
                </option>
              ))}
            </select>
            <button className="compact-save-btn" onClick={handleUpdateCategory}>
              💾
            </button>
            <button
              className="compact-cancel-btn"
              onClick={() => setIsEditingCategory(false)}
            >
              ✖
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySection;
