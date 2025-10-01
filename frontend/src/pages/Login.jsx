import { useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function onChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    setError("");
  }

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/table");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-400 via-teal-500 to-cyan-600 p-4">
      <div className="relative w-full max-w-md m-10">
        <button
          type="button"
          className="w-80 mt-2 absolute -top-6 left-1/2 transform -translate-x-1/2 bg-cyan-400 hover:bg-cyan-500 text-slate-800 font-bold py-3 px-8 rounded-lg shadow-lg transition-all"
        >
          SIGN IN
        </button>

        <form
          className="bg-slate-800 rounded-2xl shadow-2xl p-8 space-y-4 pt-14"
          onSubmit={submit}
        >
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-12 h-12 text-slate-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
                       1.79-4 4 1.79 4 4 4zm0 2c-2.67 
                       0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Welcome back
          </h2>

          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <label className="text-slate-300 text-sm font-medium block">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
            placeholder="username"
            className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
          />

          <label className="text-slate-300 text-sm font-medium block">
            Password
          </label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            required
            placeholder="password"
            className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
          />

          <button
            type="submit"
            className="w-full bg-cyan-400 hover:bg-cyan-500 text-slate-800 font-bold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105 mt-6"
          >
            LOGIN
          </button>

          <p className="text-center text-slate-400 text-sm mt-4">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
