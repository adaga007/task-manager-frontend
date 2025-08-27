import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useTask } from "../context/taskContext";

export default function Dashboard() {
  const { tasks, setTaskUpdate, deleteTask } = useTask();
  const navigate = useNavigate();

  const handleUpdateClick = (task) => {
    // navigate(`/tasks/${task._id}/edit`, { state: task });
    setTaskUpdate(task);
    navigate(`/tasks/${task._id}/edit`);
  };
  const handleDeleteClick = (id) => {
    deleteTask(id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">My Tasks</h1>
        <a href="/add" className="text-blue-500 hover:underline">
          Add Task
        </a>
        {/* Task List   */}
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
                <button
                  onClick={() => handleDeleteClick(task._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
