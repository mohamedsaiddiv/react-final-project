export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold">About Kireeye</h1>
      <p className="mt-4 text-slate-700 leading-relaxed">
        Kireeye is a rental platform that helps people find houses, apartments,
        and rooms to rent, and helps property owners find tenants quickly.
      </p>
      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        {[
          ["Browse", "Filter by location, type, price, and size."],
          ["Compare", "See details and photos side by side."],
          ["Connect", "Message owners directly."],
        ].map(([t, d]) => (
          <div key={t} className="bg-white border rounded-lg p-5">
            <h3 className="font-bold text-brand">{t}</h3>
            <p className="text-sm text-slate-600 mt-1">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
