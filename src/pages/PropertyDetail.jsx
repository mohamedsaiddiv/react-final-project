import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MapPin, BedDouble, Bath, Maximize } from "lucide-react";
import PropertyImage from "../components/PropertyImage";
import { houses } from "../data/houses";

export default function PropertyDetail() {
  const { id } = useParams();
  const p = houses.find((h) => h.id === Number(id));
  const { user, addRequest } = useAuth();
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");
  if (!p)
    return (
      <p className="p-16 text-center">
        Property not found.{" "}
        <Link to="/properties" className="text-brand underline">
          Go back
        </Link>
      </p>
    );
  const field =
    "w-full px-3 py-2.5 rounded-md border border-slate-200 outline-none focus:border-brand";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to="/properties" className="text-brand font-medium hover:underline">
        ← Back to properties
      </Link>
      <div className="grid lg:grid-cols-[1fr_340px] gap-8 mt-4">
        <div>
          <PropertyImage
            src={p.image}
            alt={p.title}
            className="h-72 md:h-96 rounded-lg"
          />
          <h1 className="text-3xl font-extrabold mt-6">{p.title}</h1>
          <p className="flex items-center gap-1 text-slate-600 mt-1">
            <MapPin size={16} className="text-brand" />
            Mogadishu, {p.district} · {p.type}
          </p>
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              [BedDouble, p.beds, "Bedrooms"],
              [Bath, p.baths, "Bathrooms"],
              [Maximize, p.area + " m²", "Area"],
            ].map(([I, v, l]) => (
              <div
                key={l}
                className="bg-white border rounded-lg py-4 text-center"
              >
                <I className="mx-auto text-brand" />
                <p className="font-bold mt-1">{v}</p>
                <p className="text-sm text-slate-600">{l}</p>
              </div>
            ))}
          </div>
          <h2 className="text-xl font-bold mt-8">Description</h2>
          <p className="mt-2 text-slate-700 leading-relaxed max-w-prose">
            {p.desc}
          </p>
        </div>
        <aside className="bg-white border rounded-lg p-6 h-fit">
          <p className="text-3xl font-extrabold text-brand">
            ${p.price}
            <span className="text-base font-normal text-slate-600">
              {" "}
              / month
            </span>
          </p>
          {!user ? (
            <div className="mt-5">
              <p className="text-sm text-slate-600">
                You need an account to rent this property.
              </p>
              <Link
                to="/login"
                state={{
                  from: `/properties/${p.id}`,
                  msg: "Please log in to rent this property.",
                }}
                className="block text-center mt-3 bg-brand text-white font-semibold py-2.5 rounded-md hover:bg-brand/90"
              >
                Login to Rent
              </Link>
              <Link
                to="/signup"
                state={{
                  from: `/properties/${p.id}`,
                  msg: "Create an account to rent this property.",
                }}
                className="block text-center mt-2 border border-brand text-brand font-semibold py-2.5 rounded-md hover:bg-brand/5"
              >
                Create an account
              </Link>
            </div>
          ) : sent ? (
            <p className="mt-5 bg-blue-50 text-brand rounded-md p-4 font-semibold">
              Request sent! See it in{" "}
              <Link to="/profile" className="underline">
                your profile
              </Link>
              .
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addRequest({
                  houseId: p.id,
                  title: p.title,
                  district: p.district,
                  price: p.price,
                  message,
                });
                setSent(true);
              }}
              className="mt-5 space-y-3"
            >
              <p className="text-sm text-slate-600">
                Requesting as <b>{user.name}</b> ({user.email})
              </p>
              <textarea
                rows="3"
                className={field}
                placeholder="Message to the owner (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="w-full bg-brand text-white font-semibold py-2.5 rounded-md hover:bg-brand/90">
                Request to Rent
              </button>
            </form>
          )}
        </aside>
      </div>
    </div>
  );
}
