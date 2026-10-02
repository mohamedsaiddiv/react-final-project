import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Auth({ mode = "login" }) {
  const signup = mode === "signup";
  const { user, login, signup: register } = useAuth();
  const nav = useNavigate();
  const { state } = useLocation();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const from = state?.from || "/profile";
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const field =
    "w-full px-3 py-3 rounded-md border border-slate-200 outline-none focus:border-brand";

  if (user) return <Navigate to={from} replace />;

  const submit = (e) => {
    e.preventDefault();
    const err = signup ? register(form) : login(form.email, form.password);
    if (err) setError(err);
    else nav(from, { replace: true });
  };

  return (
    <div className="max-w-sm mx-auto px-4 py-14">
      <h1 className="text-3xl font-extrabold">
        {signup ? "Create your account" : "Welcome back"}
      </h1>
      {state?.msg && (
        <p className="mt-4 bg-amber-50 text-amber-800 rounded-md p-3 text-sm">
          {state.msg}
        </p>
      )}
      <form onSubmit={submit} className="mt-6 space-y-4">
        {signup && (
          <input
            required
            className={field}
            placeholder="Full name"
            value={form.name}
            onChange={set("name")}
          />
        )}
        <input
          required
          type="email"
          className={field}
          placeholder="Email"
          value={form.email}
          onChange={set("email")}
        />
        <input
          required
          type="password"
          minLength="6"
          className={field}
          placeholder="Password (min 6 characters)"
          value={form.password}
          onChange={set("password")}
        />
        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
        <button className="w-full bg-brand text-white font-semibold py-3 rounded-md hover:bg-brand/90">
          {signup ? "Sign Up" : "Login"}
        </button>
        <p className="text-sm text-slate-600 text-center">
          {signup ? "Already have an account?" : "New here?"}{" "}
          <Link
            to={signup ? "/login" : "/signup"}
            state={state}
            className="text-brand font-semibold"
          >
            {signup ? "Login" : "Sign Up"}
          </Link>
        </p>
      </form>
    </div>
  );
}
