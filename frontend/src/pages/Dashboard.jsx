import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useTask } from "../context/taskContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { tasks, setTaskUpdate, deleteTask, isTaskLoading } = useTask();
  const navigate = useNavigate();

  const handleUpdateClick = (task) => {
    // navigate(`/tasks/${task._id}/edit`, { state: task });
    setTaskUpdate(task);
    navigate(`/tasks/${task._id}/edit`);
  };
  const handleDeleteClick = (id) => {
    deleteTask(id);
  };

  // if (isTaskLoading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <div className="w-12 h-12 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      {isTaskLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="w-12 h-12 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="p-6 bg-gray-100 min-h-screen">
          <h1 className="text-3xl font-bold mb-6">My Tasks</h1>
          <div>
            <Link
              to="/add"
              className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Task
            </Link>
          </div>
          {/* Task List   */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-2">
            {tasks.map((task) => (
              <div key={task._id} className="bg-white shadow-md rounded-lg p-4">
                <div className="flex justify-between ">
                  <h2 className="text-xl font-semibold">{task.title}</h2>
                  <p className="mt-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        task.status === "completed"
                          ? "bg-green-200 text-green-700"
                          : task.status === "pending"
                          ? "bg-yellow-200 text-yellow-700"
                          : "bg-red-200 text-red-700"
                      }`}
                    >
                      {task.status}
                    </span>
                  </p>
                </div>

                <p className="text-gray-600 mt-2">{task.description}</p>

                <div className="mt-4 flex gap-2">
                  <button
                    // onClick={() => setSelectedTask(task)}
                    onClick={() => handleUpdateClick(task)}
                    className="px-4 bg-blue-500 text-sm text-white rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(task._id)}
                    className="px-4  bg-red-500 text-sm text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
