import { useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function onChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    setError("");
  }

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/register", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/table");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-400 via-teal-500 to-cyan-600 p-10">
      <form
        className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl p-8 space-y-4"
        onSubmit={submit}
      >
        <div className="flex flex-col items-center mb-2">
          <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <svg
              className="w-12 h-12 text-slate-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <button
            type="button"
            className="w-80 mt-10 absolute -top-6 left-1/2 transform -translate-x-1/2 bg-cyan-400 hover:bg-cyan-500 text-slate-800 font-bold py-3 px-8 rounded-lg shadow-lg transition-all"
          >
            SIGN UP
          </button>
        </div>

        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Create account
        </h2>

        {error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <label className="text-slate-300 text-sm font-medium block">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          required
          placeholder="Enter your name"
          className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
        />

        <label className="text-slate-300 text-sm font-medium block">
          Date of birth
        </label>
        <input
          name="dob"
          type="date"
          value={form.dob}
          onChange={onChange}
          required
          className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
        />

        <label className="text-slate-300 text-sm font-medium block">
          Email
        </label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          required
          placeholder="Enter your email"
          className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
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
          placeholder="Enter your password"
          className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
        />

        <button
          type="submit"
          className="w-full bg-cyan-400 hover:bg-cyan-500 text-slate-800 font-bold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105 mt-6"
        >
          REGISTER
        </button>

        <p className="text-center text-slate-400 text-sm mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
