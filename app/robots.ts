// FILE: app/robots.ts  ← CREATE THIS FILE
import { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent:"*", allow:"/", disallow:["/api/","/_next/","/admin/"] },
      { userAgent:["GPTBot","ChatGPT-User","CCBot","anthropic-ai"], disallow:"/" },
    ],
    sitemap: "https://www.medcarercm.com/sitemap.xml",
    host:    "https://www.medcarercm.com",
  };
}
