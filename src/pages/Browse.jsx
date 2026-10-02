import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Home,
  DollarSign,
  Search,
  BedDouble,
  Bath,
  SlidersHorizontal,
} from "lucide-react";
import PropertyCard from "../components/PropertyCard";
import PropertyImage from "../components/PropertyImage";
import { houses, districts, types, prices } from "../data/houses";

const empty = { district: "", type: "", maxPrice: "", beds: "", baths: "" };

// Select with a left icon, used in both the hero search and the sidebar.
function Field({ icon: Icon, value, onChange, placeholder, options, label }) {
  return (
    <label className="flex items-center gap-2 border border-slate-200 rounded-md px-3 py-2.5 bg-white text-sm text-slate-600">
      <Icon size={17} className="text-slate-500 shrink-0" />
      <select
        aria-label={label || placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent outline-none"
      >
        <option value="">{placeholder}</option>
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function Browse({ hero = false }) {
  const [draft, setDraft] = useState(empty);
  const [applied, setApplied] = useState(empty);
  const set = (k) => (v) => setDraft({ ...draft, [k]: v });
  const apply = () => setApplied(draft);

  const list = houses.filter(
    (h) =>
      (!applied.district || h.district === applied.district) &&
      (!applied.type || h.type === applied.type) &&
      (!applied.maxPrice || h.price <= +applied.maxPrice) &&
      (!applied.beds || h.beds >= +applied.beds) &&
      (!applied.baths || h.baths >= +applied.baths),
  );
  const num = [1, 2, 3, 4].map((n) => [n, `${n}+`]);
  const distOpts = districts.map((d) => [d, `Mogadishu, ${d}`]);
  const typeOpts = types.map((t) => [t, t]);
  const priceOpts = prices.map((p) => [p, `Up to $${p}`]);

  return (
    <>
      {hero && (
        <section className="relative bg-navy text-white">
          <PropertyImage
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=70"
            alt=""
            className="absolute inset-0 h-full opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 pt-10 pb-8">
            <h1 className="text-4xl font-extrabold">Find Your Perfect Home</h1>
            <p className="mt-4 text-lg max-w-md">
              Discover the best houses, apartments and rooms for rent in your
              favorite location.
            </p>
            <div className="mt-8 grid md:grid-cols-[1fr_1fr_1fr_auto] gap-3 bg-white p-2 rounded-md max-w-4xl">
              <Field
                icon={MapPin}
                label="Location"
                value={draft.district}
                onChange={set("district")}
                placeholder="Location (e.g. Mogadishu)"
                options={distOpts}
              />
              <Field
                icon={Home}
                label="Property type"
                value={draft.type}
                onChange={set("type")}
                placeholder="Property Type"
                options={typeOpts}
              />
              <Field
                icon={DollarSign}
                label="Max price"
                value={draft.maxPrice}
                onChange={set("maxPrice")}
                placeholder="Max Price"
                options={priceOpts}
              />
              <button
                onClick={apply}
                className="bg-brand font-semibold px-10 py-2.5 rounded-md flex items-center justify-center gap-2 hover:bg-brand/90"
              >
                <Search size={18} />
                Search
              </button>
            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-[1fr_300px] gap-6">
        <section>
          <div className="flex justify-between items-baseline mb-4">
            <h2 className="text-2xl font-bold">
              {hero ? "Featured Properties" : "Properties for Rent"}
            </h2>
            <p className="text-sm text-slate-600">
              Showing {list.length}{" "}
              {list.length === 1 ? "property" : "properties"}
            </p>
          </div>
          {list.length === 0 ? (
            <p className="bg-white rounded-lg border p-10 text-center text-slate-600">
              No properties match your filters. Try changing them.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {list.map((p) => (
                <PropertyCard key={p.id} p={p} />
              ))}
            </div>
          )}
        </section>

        <aside className="space-y-4 self-start">
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
            <h2 className="font-bold text-lg">Filter Properties</h2>
            <div>
              <p className="text-sm font-semibold mb-1.5">Location</p>
              <Field
                icon={MapPin}
                value={draft.district}
                onChange={set("district")}
                placeholder="All Locations"
                options={distOpts}
              />
            </div>
            <div>
              <p className="text-sm font-semibold mb-1.5">Property Type</p>
              <Field
                icon={Home}
                value={draft.type}
                onChange={set("type")}
                placeholder="All Types"
                options={typeOpts}
              />
            </div>
            <div>
              <p className="text-sm font-semibold mb-1.5">Price Range</p>
              <Field
                icon={DollarSign}
                value={draft.maxPrice}
                onChange={set("maxPrice")}
                placeholder="Any Price"
                options={priceOpts}
              />
            </div>
            <div>
              <p className="text-sm font-semibold mb-1.5">Bedrooms</p>
              <Field
                icon={BedDouble}
                value={draft.beds}
                onChange={set("beds")}
                placeholder="Any"
                options={num}
              />
            </div>
            <div>
              <p className="text-sm font-semibold mb-1.5">Bathrooms</p>
              <Field
                icon={Bath}
                value={draft.baths}
                onChange={set("baths")}
                placeholder="Any"
                options={num.slice(0, 3)}
              />
            </div>
            <button
              onClick={apply}
              className="w-full bg-brand text-white font-semibold py-2.5 rounded-md flex items-center justify-center gap-2 hover:bg-brand/90"
            >
              <SlidersHorizontal size={17} />
              Apply Filters
            </button>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
            <div className="flex gap-3">
              <Home className="text-brand fill-brand shrink-0" />
              <div>
                <p className="font-semibold text-sm">
                  Looking to rent out your property?
                </p>
                <p className="text-sm text-slate-600">
                  List your house and find tenants quickly.
                </p>
              </div>
            </div>
            <Link
              to="/contact"
              className="block text-center mt-4 bg-white border border-brand text-brand font-semibold py-2 rounded-md hover:bg-brand/5 text-sm"
            >
              Post a Property
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
