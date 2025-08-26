import { Link } from "react-router-dom";
import { useUser } from "../context/userContext";
import Header from "../components/Header";

export default function LandingPage() {
  const { user } = useUser();
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* {Nav bar} */}
      <Header />
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center flex-1 px-6">
        <h2 className="text-5xl font-extrabold text-gray-800 leading-tight">
          Organize Your <span className="text-blue-600">Tasks</span>, Boost Your{" "}
          <span className="text-purple-600">Productivity</span>
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          TaskManager helps you stay on top of your work with an easy-to-use
          dashboard, task tracking, and real-time updates. Manage your day like
          a pro.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            to={user ? "/tasks" : "/register"}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
          >
            {user ? "Create Tasks" : "Get Started"}
          </Link>
          <Link
            to="/demo"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300"
          >
            Live Demo
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-12">Why Choose TaskManager?</h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="p-6 bg-blue-50 rounded-xl shadow-md">
              <h4 className="text-xl font-semibold mb-3">Easy to Use</h4>
              <p className="text-gray-600">
                Create, update, and track tasks seamlessly with an intuitive
                dashboard.
              </p>
            </div>
            <div className="p-6 bg-purple-50 rounded-xl shadow-md">
              <h4 className="text-xl font-semibold mb-3">Stay Organized</h4>
              <p className="text-gray-600">
                Categorize tasks by priority, deadline, and progress to stay
                productive.
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-xl shadow-md">
              <h4 className="text-xl font-semibold mb-3">Cloud Sync</h4>
              <p className="text-gray-600">
                Access your tasks anywhere with real-time synchronization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-100 text-center text-gray-600">
        © {new Date().getFullYear()} TaskManager. All rights reserved.
      </footer>
    </div>
  );
}
