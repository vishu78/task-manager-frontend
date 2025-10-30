import React from "react";

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li
      className={`list-group-item d-flex justify-content-between align-items-center ${
        task.isCompleted ? "list-group-item-success" : ""
      }`}
    >
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          checked={task.isCompleted}
          onChange={() => onToggle(task)}
        />
        <label
          className={`form-check-label ${
            task.isCompleted ? "text-decoration-line-through text-muted" : ""
          }`}
        >
          {task.description}
        </label>
      </div>
      <button
        className="btn btn-sm btn-danger"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </li>
  );
}
