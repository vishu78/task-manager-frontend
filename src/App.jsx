import React, { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  // Load from localStorage or API
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    } else {
      loadTasks();
    }
  }, []);

  // Save tasks in localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  const handleAdd = async (description) => {
    try {
      const res = await createTask({ description });
      setTasks((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error("Error adding task", err);
    }
  };

  const handleToggle = async (task) => {
    try {
      const updated = { ...task, isCompleted: !task.isCompleted };
      await updateTask(task.id, updated);
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? updated : t))
      );
    } catch (err) {
      console.error("Error toggling task", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  // Filtering
  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.isCompleted;
    if (filter === "completed") return t.isCompleted;
    return true;
  });

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📝 Task Manager</h2>

      <TaskForm onAdd={handleAdd} />

      {/* Filter buttons */}
      <div className="d-flex justify-content-center mb-3 gap-2">
        <button
          className={`btn ${filter === "all" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`btn ${filter === "active" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`btn ${filter === "completed" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <TaskList tasks={filteredTasks} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}
