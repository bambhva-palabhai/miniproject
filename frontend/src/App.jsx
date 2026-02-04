// src/App.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";


const API = "http://localhost:5000/api/tasks"; // backend URL

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ textAlign: "center" }}>Task Manager</h1>
      <TaskForm fetchTasks={fetchTasks} />
      <TaskList tasks={tasks} fetchTasks={fetchTasks} />
    </div>
  );
}

export default App;
