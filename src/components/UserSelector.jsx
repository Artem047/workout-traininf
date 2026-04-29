// src/components/UserSelector.jsx
import React from "react";
import "./UserSelector.css";

const UserSelector = ({ onSelectUser, selectedUser }) => {
  const users = [
    { id: "artem", name: "Артём", icon: "👨", color: "#3b82f6" },
    { id: "angelina", name: "Ангелина", icon: "👩", color: "#ec4899" },
  ];

  return (
    <div className="user-selector">
      <div className="user-selector-title">
        <span>👥 Кто тренируется?</span>
      </div>
      <div className="user-buttons">
        {users.map((user) => (
          <button
            key={user.id}
            className={`user-btn ${selectedUser?.id === user.id ? "active" : ""}`}
            onClick={() => onSelectUser(user)}
            style={{
              borderColor:
                selectedUser?.id === user.id ? user.color : "transparent",
              background:
                selectedUser?.id === user.id
                  ? `${user.color}20`
                  : "rgba(30, 34, 48, 0.6)",
            }}
          >
            <span className="user-icon">{user.icon}</span>
            <span className="user-name">{user.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserSelector;
