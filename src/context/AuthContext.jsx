import { createContext, useContext, useState } from "react";

// DEMO auth: users live in localStorage. A real app would use a backend (never store plain passwords).
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const read = (k, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(k)) ?? fallback;
  } catch {
    return fallback;
  }
};
const write = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {
    /* ignore */
  }
};

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => read("kireeye_users", []));
  const [email, setEmail] = useState(() => read("kireeye_session", null));
  const user = users.find((u) => u.email === email) || null;

  const saveUsers = (list) => {
    setUsers(list);
    write("kireeye_users", list);
  };
  const startSession = (e) => {
    setEmail(e);
    write("kireeye_session", e);
  };

  const signup = ({ name, email: e, password }) => {
    const mail = e.trim().toLowerCase();
    if (users.some((u) => u.email === mail))
      return "An account with this email already exists.";
    saveUsers([
      ...users,
      { name, email: mail, password, phone: "", requests: [] },
    ]);
    startSession(mail);
    return null;
  };
  const login = (e, password) => {
    const mail = e.trim().toLowerCase();
    const found = users.find(
      (u) => u.email === mail && u.password === password,
    );
    if (!found) return "Wrong email or password.";
    startSession(mail);
    return null;
  };
  const logout = () => {
    setEmail(null);
    write("kireeye_session", null);
  };
  const updateUser = (patch) =>
    saveUsers(users.map((u) => (u.email === email ? { ...u, ...patch } : u)));
  const addRequest = (req) =>
    updateUser({
      requests: [
        { ...req, date: new Date().toLocaleDateString() },
        ...user.requests,
      ],
    });

  return (
    <AuthContext.Provider
      value={{ user, signup, login, logout, updateUser, addRequest }}
    >
      {children}
    </AuthContext.Provider>
  );
}
