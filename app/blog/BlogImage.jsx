"use client";

import { useState } from "react";

export default function BlogImage({ src, alt, bg, emoji, wrapperStyle, imgStyle }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div style={{ ...wrapperStyle, position: "relative", background: imgError ? bg : "transparent", minHeight: 200, overflow: "hidden" }}>
      {!imgError ? (
        <img
          loading="lazy"
          src={src}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", ...imgStyle }}
          onError={() => setImgError(true)}
        />
      ) : (
        <div style={{ width: "100%", height: "100%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56 }}>
          {emoji}
        </div>
      )}
    </div>
  );
}
