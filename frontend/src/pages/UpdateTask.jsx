// UpdateTask.jsx
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateTask() {
  const location = useLocation();
  const { id } = useParams(); // task ID from URL
  const navigate = useNavigate();

  const task = location.state;

  // state for each editable field
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "pending");

  // Fetch task details
  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTitle(res.data.title);
      setDescription(res.data.description || "");
      setStatus(res.data.status || "pending");
    };

    fetchTask();
  }, [id]);

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/tasks/${id}`,
      { title, description, status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    navigate("/tasks"); // redirect back to dashboard
  };

  return (
    <div>
      <h2>Edit Task</h2>
      <form onSubmit={handleUpdate}>
        {/* Title */}
        <div>
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
          />
        </div>

        {/* Description */}
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description"
          />
        </div>

        {/* Status */}
        <div>
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button type="submit">Update Task</button>
      </form>
    </div>
  );
}
