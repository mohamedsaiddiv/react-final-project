import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, BedDouble, Bath, Maximize, Heart } from "lucide-react";
import PropertyImage from "./PropertyImage";

export default function PropertyCard({ p }) {
  const [liked, setLiked] = useState(false);
  return (
    <article className="bg-white rounded-lg border border-slate-200 p-2 shadow-sm">
      <div className="relative">
        <PropertyImage
          src={p.image}
          alt={p.title}
          className="h-44 rounded-md"
        />
        <button
          onClick={() => setLiked(!liked)}
          aria-label="Save"
          className="absolute top-2 right-2 w-8 h-8 rounded-md bg-black/40 flex items-center justify-center"
        >
          <Heart
            size={18}
            className={
              liked ? "fill-red-500 text-red-500" : "fill-white text-white"
            }
          />
        </button>
        <span className="absolute bottom-0 left-0 bg-brand text-white text-sm font-semibold px-3 py-1 rounded-tr-md">
          ${p.price} / month
        </span>
      </div>
      <div className="px-2 pt-3 pb-2">
        <h3 className="font-bold">{p.title}</h3>
        <p className="flex items-center gap-1 text-sm text-slate-600 mt-1">
          <MapPin size={15} className="text-brand" /> Mogadishu, {p.district}
        </p>
        <div className="flex gap-5 text-sm text-slate-600 mt-3">
          <span className="flex items-center gap-1">
            <BedDouble size={16} />
            {p.beds}
          </span>
          <span className="flex items-center gap-1">
            <Bath size={16} />
            {p.baths}
          </span>
          <span className="flex items-center gap-1">
            <Maximize size={16} />
            {p.area} m²
          </span>
        </div>
        <Link
          to={`/properties/${p.id}`}
          className="block text-center mt-3 bg-brand text-white text-sm font-medium py-2 rounded hover:bg-brand/90"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
