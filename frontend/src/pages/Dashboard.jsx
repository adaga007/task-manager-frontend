// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState("");
//   const navigate = useNavigate();

//   const fetchTasks = async () => {
//     const token = localStorage.getItem("token");
//     const res = await axios.get("http://localhost:5000/api/tasks", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setTasks(res.data);
//   };

//   const addTask = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     await axios.post(
//       "http://localhost:5000/api/tasks",
//       { title: newTask },
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     setNewTask("");
//     fetchTasks();
//   };

//   const deleteTask = async (id) => {
//     const token = localStorage.getItem("token");
//     await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     fetchTasks();
//   };

//   const handleUpdateClick = (task) => {
//     navigate(`/tasks/${task._id}/edit`, { state: task });
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
//     <div>
//       <h2>My Tasks</h2>
//       <form onSubmit={addTask}>
//         <input
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//           placeholder="New task"
//         />
//         <button type="submit">Add</button>
//       </form>
//       <ul>
//         {tasks.map((t) => (
//           <li key={t._id}>
//             {t.title}
//             <button onClick={() => deleteTask(t._id)}>Delete</button>
//             <button onClick={() => handleUpdateClick(t)}>Update</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
// import UpdateTask from "./UpdateTask";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  // const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  // ✅ Fetch tasks from backend
  useEffect(() => {
    fetchTasks();
  }, []);

  // // ✅ Update a task in backend
  // const handleUpdate = async (updatedTask) => {
  //   try {
  //     const res = await axios.put(
  //       `http://localhost:5000/api/tasks/${updatedTask._id}`,
  //       updatedTask
  //     );

  //     // Update task in state so UI refreshes
  //     setTasks(tasks.map((t) => (t._id === updatedTask._id ? res.data : t)));
  //     setSelectedTask(null); // close modal
  //   } catch (err) {
  //     console.error("Error updating task", err);
  //   }
  // };
  const handleUpdateClick = (task) => {
    navigate(`/tasks/${task._id}/edit`, { state: task });
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Tasks</h1>
      <a href="/add" className="text-blue-500 hover:underline">
        Add Task
      </a>
      {/* Task List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <div key={task._id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p className="text-gray-600">{task.description}</p>
            <p className="mt-2">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  task.status === "Completed"
                    ? "bg-green-200 text-green-700"
                    : task.status === "pending"
                    ? "bg-yellow-200 text-yellow-700"
                    : "bg-red-200 text-red-700"
                }`}
              >
                {task.status}
              </span>
            </p>

            <div className="mt-4 flex gap-2">
              <button
                // onClick={() => setSelectedTask(task)}
                onClick={() => handleUpdateClick(task)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Edit
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Task Modal */}
      {/* {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <UpdateTask task={selectedTask} onUpdate={handleUpdate} />
            <button
              onClick={() => setSelectedTask(null)}
              className="mt-4 w-full py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
}
