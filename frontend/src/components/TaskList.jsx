import { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/tasks";

function TaskList({ tasks, fetchTasks }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");

  const toggleTask = async (task) => {
    await axios.put(`${API}/${task._id}`, {
      completed: !task.completed,
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
    setOriginalTitle(task.title); // 👈 backup
  };
  const cancelEdit = () => {
    setEditTitle(originalTitle); // restore old text
    setEditingId(null);          // exit edit mode
  };


  const updateTask = async (id) => {
    if (!editTitle.trim()) {
      alert("Task title cannot be empty");
      return;
    }

    await axios.put(`${API}/${id}`, { title: editTitle });
    setEditingId(null);
    fetchTasks();
  };



  return (
    <table border="1" width="100%" cellPadding="10">
      <thead>
        <tr>
          <th>Task</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {tasks.map((task) => (
          <tr key={task._id}>
            {/* TASK COLUMN */}
            <td>
              {editingId === task._id ? (
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              ) : (
                <span
                  onClick={() => toggleTask(task)}
                  style={{
                    cursor: "pointer",
                    textDecoration: task.completed
                      ? "line-through"
                      : "none",
                  }}
                >
                  {task.title}
                </span>
              )}
            </td>

            {/* ACTIONS COLUMN */}
            <td>
              {editingId === task._id ? (
                <>
                  <button onClick={() => updateTask(task._id)}>
                    Update
                  </button>
                  <button onClick={cancelEdit} style={{ marginLeft: "5px" }}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => startEdit(task)}>Edit</button>{" "}
                  <button onClick={() => deleteTask(task._id)}>Delete</button>
                </>
              )}

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskList;
