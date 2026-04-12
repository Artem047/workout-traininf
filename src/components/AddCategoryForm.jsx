import React, { useState } from "react";

const AddCategoryForm = ({ onAddCategory }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("💪");
  const [selectedColor, setSelectedColor] = useState("#a78bfa");

  const icons = [
    "💪",
    "🏋️",
    "🦵",
    "🔙",
    "🔥",
    "💪",
    "🎯",
    "⚡",
    "🏃",
    "🧘",
    "🤸",
    "🏊",
    "🚴",
    "🥊",
    "🏀",
    "⚽",
  ];

  const colors = [
    "#ef4444",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec489a",
    "#06b6d4",
    "#f97316",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    onAddCategory(categoryName, selectedIcon, selectedColor);
    setCategoryName("");
    setSelectedIcon("💪");
    setSelectedColor("#a78bfa");
    setIsFormVisible(false);
  };

  return (
    <div className="add-category-wrapper">
      <button
        className="btn-add-category"
        onClick={() => setIsFormVisible(!isFormVisible)}
      >
        {isFormVisible ? "− Отмена" : "+ Создать группу мышц"}
      </button>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="add-category-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Название группы (например: Грудные, Ноги, Бицепс)"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="form-input"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">Выбери иконку:</label>
            <div className="icons-grid">
              {icons.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  className={`icon-btn ${selectedIcon === icon ? "active" : ""}`}
                  onClick={() => setSelectedIcon(icon)}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Выбери цвет:</label>
            <div className="colors-grid">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`color-btn ${selectedColor === color ? "active" : ""}`}
                  style={{ background: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          <button type="submit" className="btn-primary btn-full">
            Создать группу
          </button>
        </form>
      )}
    </div>
  );
};

export default AddCategoryForm;
