import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-ink text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-3 items-center gap-4 text-sm">
        <b className="text-lg">Kireeye</b>
        <div className="flex gap-6 md:justify-center text-white/80">
          {[
            ["/", "Home"],
            ["/properties", "Properties"],
            ["/about", "About"],
            ["/contact", "Contact"],
          ].map(([to, l]) => (
            <Link key={to} to={to} className="hover:text-white">
              {l}
            </Link>
          ))}
        </div>
        <p className="md:text-right text-white/70">
          © {new Date().getFullYear()} Kireeye. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
