// src/components/WorkoutCalendar.jsx
import React, { useState, useEffect } from "react";
import "./WorkoutCalendar.css";

const WorkoutCalendar = ({ categories, refreshTrigger, onWorkoutMarked }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [workoutHistory, setWorkoutHistory] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const [showMarkModal, setShowMarkModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Загрузка истории из localStorage
  const loadHistory = () => {
    const saved = localStorage.getItem("workout-history");
    if (saved) {
      setWorkoutHistory(JSON.parse(saved));
    } else {
      setWorkoutHistory({});
    }
  };

  useEffect(() => {
    loadHistory();
  }, [refreshTrigger]);

  // Сохранение истории
  const saveHistory = (newHistory) => {
    localStorage.setItem("workout-history", JSON.stringify(newHistory));
    setWorkoutHistory(newHistory);
    if (onWorkoutMarked) onWorkoutMarked();
  };

  // Отметить тренировку за выбранную дату
  const markWorkoutForDate = (date, categoryId, categoryName, categoryIcon) => {
    const dateStr = date.toISOString().split("T")[0];
    const newHistory = { ...workoutHistory };

    if (!newHistory[dateStr]) {
      newHistory[dateStr] = [];
    }

    const alreadyMarked = newHistory[dateStr].some((w) => w.id === categoryId);

    if (!alreadyMarked) {
      newHistory[dateStr].push({
        id: categoryId,
        name: categoryName,
        icon: categoryIcon,
        timestamp: new Date().toISOString(),
      });
      saveHistory(newHistory);
      return true;
    }
    return false;
  };

  // Удалить тренировку
  const removeWorkout = (date, workoutId) => {
    const dateStr = date.toISOString().split("T")[0];
    const newHistory = { ...workoutHistory };

    if (newHistory[dateStr]) {
      newHistory[dateStr] = newHistory[dateStr].filter(
        (w) => w.id !== workoutId,
      );
      if (newHistory[dateStr].length === 0) {
        delete newHistory[dateStr];
      }
      saveHistory(newHistory);

      if (
        selectedDate &&
        selectedDate.toISOString().split("T")[0] === dateStr
      ) {
        setSelectedWorkouts(newHistory[dateStr] || []);
      }
    }
  };

  // Получить тренировки за день
  const getWorkoutsForDate = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    return workoutHistory[dateStr] || [];
  };

  // Проверить, есть ли тренировки за день
  const hasWorkoutsOnDate = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    return workoutHistory[dateStr] && workoutHistory[dateStr].length > 0;
  };

  // Получить цвет для дня
  const getDayColor = (date) => {
    const workouts = getWorkoutsForDate(date);
    if (workouts.length === 0) return "";
    if (workouts.length >= 3) return "many";
    if (workouts.length === 2) return "two";
    return "one";
  };

  // Открыть модальное окно для отметки тренировки
  const openMarkModal = (date) => {
    setSelectedDate(date);
    setShowMarkModal(true);
  };

  // Закрыть модальное окно
  const closeMarkModal = () => {
    setShowMarkModal(false);
    setSelectedCategory(null);
  };

  // Подтвердить отметку тренировки
  const confirmMarkWorkout = () => {
    if (selectedCategory && selectedDate) {
      const success = markWorkoutForDate(
        selectedDate,
        selectedCategory.id,
        selectedCategory.name,
        selectedCategory.icon,
      );

      if (success) {
        alert(
          `✅ Тренировка "${selectedCategory.name}" отмечена за ${selectedDate.toLocaleDateString("ru-RU")}!`,
        );
        // Обновляем отображение выбранного дня
        setSelectedWorkouts(getWorkoutsForDate(selectedDate));
      } else {
        alert(
          `⚠️ Тренировка "${selectedCategory.name}" уже отмечена за эту дату!`,
        );
      }
      closeMarkModal();
    }
  };

  // Рендер календаря
  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    let startDayOfWeek = firstDay.getDay();
    startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

    const days = [];

    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === new Date().toDateString();
      const hasWorkouts = hasWorkoutsOnDate(date);
      const colorClass = getDayColor(date);
      const workouts = getWorkoutsForDate(date);

      days.push(
        <div
          key={day}
          className={`calendar-day ${hasWorkouts ? `has-workout ${colorClass}` : ""} ${isToday ? "today" : ""}`}
          onClick={() => {
            setSelectedDate(date);
            setSelectedWorkouts(workouts);
          }}
          onDoubleClick={() => openMarkModal(date)}
        >
          <span className="day-number">{day}</span>
          {hasWorkouts && <div className="workout-dot"></div>}
        </div>,
      );
    }

    return days;
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  return (
    <div className="workout-calendar">
      <div className="calendar-header">
        <button onClick={prevMonth} className="calendar-nav">
          ◀
        </button>
        <h3>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button onClick={nextMonth} className="calendar-nav">
          ▶
        </button>
      </div>

      <div className="calendar-weekdays">
        <div>Пн</div>
        <div>Вт</div>
        <div>Ср</div>
        <div>Чт</div>
        <div>Пт</div>
        <div>Сб</div>
        <div>Вс</div>
      </div>

      <div className="calendar-days">{renderCalendar()}</div>

      <div className="calendar-hint">
        💡 Нажмите на день для просмотра, дважды - для отметки тренировки
      </div>

      <div className="calendar-legend">
        <div className="legend-item">
          <div className="legend-color one"></div>
          <span>1 тренировка</span>
        </div>
        <div className="legend-item">
          <div className="legend-color two"></div>
          <span>2 тренировки</span>
        </div>
        <div className="legend-item">
          <div className="legend-color many"></div>
          <span>3+ тренировок</span>
        </div>
      </div>

      {selectedDate && (
        <div className="selected-day-info">
          <div className="selected-day-header">
            <h4>
              {selectedDate.toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </h4>
            <button
              className="add-workout-btn"
              onClick={() => openMarkModal(selectedDate)}
            >
              + Добавить тренировку
            </button>
          </div>
          {selectedWorkouts.length > 0 ? (
            <div className="workout-list">
              {selectedWorkouts.map((workout) => (
                <div key={workout.id} className="workout-item">
                  <span>
                    {workout.icon} {workout.name}
                  </span>
                  <button
                    className="remove-workout-btn"
                    onClick={() => removeWorkout(selectedDate, workout.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-workouts">
              Нет тренировок. Нажмите "+ Добавить тренировку"
            </p>
          )}
        </div>
      )}

      {/* Модальное окно для выбора тренировки */}
      {showMarkModal && (
        <div className="modal-overlay" onClick={closeMarkModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Отметить тренировку</h3>
              <button className="modal-close" onClick={closeMarkModal}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p>
                Выберите тренировку для{" "}
                <strong>{selectedDate?.toLocaleDateString("ru-RU")}</strong>:
              </p>
              <div className="category-list-modal">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`category-select-btn ${selectedCategory?.id === cat.id ? "selected" : ""}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <span className="cat-icon">{cat.icon}</span>
                    <span className="cat-name">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-cancel" onClick={closeMarkModal}>
                Отмена
              </button>
              <button
                className="modal-confirm"
                onClick={confirmMarkWorkout}
                disabled={!selectedCategory}
              >
                Отметить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutCalendar;
