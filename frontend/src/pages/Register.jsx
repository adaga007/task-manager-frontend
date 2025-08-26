// import { useState } from "react";
// import axios from "axios";

// export default function Register() {
//   const [form, setForm] = useState({ username: "", email: "", password: "" });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post("http://localhost:5000/api/auth/register", form);
//     alert("Registered successfully!");
//   };

//   // return (
//   //   <form onSubmit={handleSubmit}>
//   //     <input
//   //       placeholder="Username"
//   //       onChange={(e) => setForm({ ...form, username: e.target.value })}
//   //     />
//   //     <input
//   //       placeholder="Email"
//   //       onChange={(e) => setForm({ ...form, email: e.target.value })}
//   //     />
//   //     <input
//   //       type="password"
//   //       placeholder="Password"
//   //       onChange={(e) => setForm({ ...form, password: e.target.value })}
//   //     />
//   //     <button type="submit">Register</button>
//   //   </form>
//   // );
//     return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Create an Account
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Username */}
//           <div>
//             <label className="block text-gray-600 font-medium">Username</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Enter your username"
//               className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-gray-600 font-medium">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-gray-600 font-medium">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-200"
//           >
//             Register
//           </button>
//         </form>

//         {/* Login Link */}
//         <p className="text-center text-gray-600 text-sm mt-4">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-500 hover:underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );

// }

import { useState } from "react";
import axios from "axios";
import { useUser } from "../context/userContext";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { login } = useUser();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      formData
    );
    localStorage.setItem("token", res.data.token);
    login(res.data.user);
    alert("Registered successfully!");

    // Add axios POST request here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-gray-600 font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-200"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
