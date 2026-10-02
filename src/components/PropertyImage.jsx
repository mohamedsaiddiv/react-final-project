import { useState } from "react";

// Real photo with a blue fallback block if the image can't load.
export default function PropertyImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div className={`bg-gradient-to-br from-navy to-brand ${className}`} />
    );
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`w-full object-cover ${className}`}
    />
  );
}
