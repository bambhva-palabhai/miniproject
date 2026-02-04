// src/components/TaskForm.jsx
import { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/tasks";

function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState("");

  const addTask = async () => {
    if (!title) return;
    try {
      await axios.post(API, { title });
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return (
    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Enter new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ flex: 1, padding: "0.5rem" }}
      />
      <button onClick={addTask} style={{ padding: "0.5rem 1rem" }}>
        Add
      </button>
    </div>
  );
}

export default TaskForm;
