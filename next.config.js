/** @type {import('next').NextConfig} */
const nextConfig = {

  /* ── Image optimization ── */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"], // AVIF is 50% smaller than WebP
    minimumCacheTTL: 86400,                // cache images 24 hours
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // responsive breakpoints
    imageSizes:  [16, 32, 48, 64, 96, 128, 256, 384],
  },

  /* ── Compression ── */
  compress: true,        // gzip/brotli all responses
  poweredByHeader: false,// remove X-Powered-By header

  /* ── Bundle optimization ── */
  experimental: {
    optimizeCss:       true,  // minify CSS
    optimizePackageImports: ["lucide-react"], // tree-shake icon libraries
  },

  /* ── Headers for caching static assets ── */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",    value: "nosniff"          },
          { key: "X-Frame-Options",            value: "DENY"             },
          { key: "Referrer-Policy",            value: "strict-origin"    },
        ],
      },
      {
        // Cache fonts, images, js, css for 1 year
        source: "/(.*)\\.(ico|png|jpg|jpeg|svg|webp|avif|woff|woff2|ttf|js|css)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
