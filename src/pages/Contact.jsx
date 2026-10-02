import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const field =
    "w-full px-3 py-3 rounded-md border border-slate-200 bg-white outline-none focus:border-brand";
  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold">Contact us</h1>
      <p className="text-slate-600 mt-2">
        Want to list a property, or have a question? Write to us.
      </p>
      {sent ? (
        <p className="mt-8 bg-brand text-white rounded-md p-5 font-semibold">
          Thank you, {form.name}! We received your message.
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="mt-8 space-y-4"
        >
          <input
            required
            className={field}
            placeholder="Your name"
            value={form.name}
            onChange={set("name")}
          />
          <input
            required
            type="email"
            className={field}
            placeholder="Email"
            value={form.email}
            onChange={set("email")}
          />
          <textarea
            required
            rows="5"
            className={field}
            placeholder="Your message"
            value={form.message}
            onChange={set("message")}
          />
          <button className="bg-brand text-white font-semibold px-8 py-3 rounded-md hover:bg-brand/90">
            Send message
          </button>
        </form>
      )}
    </div>
  );
}
