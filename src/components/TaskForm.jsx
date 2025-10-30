import React, { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;
    onAdd(description);
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-2 mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Enter new task..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="btn btn-success" type="submit">
        Add
      </button>
    </form>
  );
}
