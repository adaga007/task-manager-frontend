import { useState, useEffect } from "react";
import { useTask } from "../context/taskContext";
import LoadingButton from "../components/LoadingButton";
import { useParams } from "react-router-dom";

export default function UpdateTask() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
  });
  const { id } = useParams(); // task ID from URL
  const { taskUpdate, updateTask, isTaskLoading } = useTask();

  // const task = location.state;
  // Pre-fill form with task data when page loads
  useEffect(() => {
    if (taskUpdate) {
      setFormData({
        title: taskUpdate.title,
        description: taskUpdate.description,
        status: taskUpdate.status,
      });
    }
  }, [taskUpdate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateTask(id, formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Update Task
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-gray-600 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-600 font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description"
              rows="4"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-600 font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Submit Button */}
          {/* <button
            type="submit"
            className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition duration-200"
          >
            Update Task
          </button> */}
          <LoadingButton isLoading={isTaskLoading} type="submit">
            {isTaskLoading ? "Updating..." : "Update Task"}
          </LoadingButton>
        </form>
      </div>
    </div>
  );
}
