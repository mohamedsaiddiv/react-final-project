import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Browse from "./pages/Browse";
import PropertyDetail from "./pages/PropertyDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Browse hero />} />
          <Route path="/properties" element={<Browse />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Auth mode="login" />} />
          <Route path="/signup" element={<Auth mode="signup" />} />
          <Route
            path="*"
            element={
              <p className="p-16 text-center text-xl">Page not found.</p>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
