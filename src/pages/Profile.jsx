import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [saved, setSaved] = useState(false);
  const field =
    "w-full px-3 py-2.5 rounded-md border border-slate-200 outline-none focus:border-brand";

  const save = (e) => {
    e.preventDefault();
    updateUser({ name, phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-[320px_1fr] gap-8">
      <section className="bg-white border rounded-lg p-6 h-fit">
        <div className="w-16 h-16 rounded-full bg-brand text-white text-2xl font-bold flex items-center justify-center">
          {user.name[0].toUpperCase()}
        </div>
        <h1 className="text-xl font-extrabold mt-3">My Profile</h1>
        <form onSubmit={save} className="mt-4 space-y-3">
          <label className="block text-sm font-semibold">
            Full name
            <input
              required
              className={`${field} mt-1 font-normal`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="block text-sm font-semibold">
            Email
            <input
              disabled
              className={`${field} mt-1 font-normal bg-slate-100`}
              value={user.email}
            />
          </label>
          <label className="block text-sm font-semibold">
            Phone
            <input
              type="tel"
              className={`${field} mt-1 font-normal`}
              placeholder="e.g. 61 000 0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          <button className="w-full bg-brand text-white font-semibold py-2.5 rounded-md hover:bg-brand/90">
            {saved ? "Saved ✓" : "Save changes"}
          </button>
        </form>
        <button
          onClick={() => {
            logout();
            nav("/");
          }}
          className="w-full mt-3 border border-red-300 text-red-600 font-semibold py-2.5 rounded-md hover:bg-red-50"
        >
          Logout
        </button>
      </section>

      <section>
        <h2 className="text-2xl font-bold">My rental requests</h2>
        {user.requests.length === 0 ? (
          <div className="bg-white border rounded-lg p-10 mt-4 text-center text-slate-600">
            You haven't requested any property yet.
            <Link
              to="/properties"
              className="block mt-3 text-brand font-semibold hover:underline"
            >
              Browse properties
            </Link>
          </div>
        ) : (
          <ul className="mt-4 space-y-3">
            {user.requests.map((r, i) => (
              <li
                key={i}
                className="bg-white border rounded-lg p-4 flex justify-between gap-4"
              >
                <div>
                  <Link
                    to={`/properties/${r.houseId}`}
                    className="font-bold hover:text-brand"
                  >
                    {r.title}
                  </Link>
                  <p className="text-sm text-slate-600">
                    Mogadishu, {r.district} · ${r.price} / month
                  </p>
                  {r.message && <p className="text-sm mt-1">“{r.message}”</p>}
                </div>
                <div className="text-right text-sm shrink-0">
                  <p className="text-slate-500">{r.date}</p>
                  <span className="inline-block mt-1 bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                    Pending
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
