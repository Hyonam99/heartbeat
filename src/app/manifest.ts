import type { MetadataRoute } from "next";
import routePath from "@/constants/route.json";

const manifest = (): MetadataRoute.Manifest => ({
  name: "Heartbeat",
  short_name: "Heartbeat",
  description: "Church media attendance and duty roster",
  start_url: routePath.Member.CheckIn,
  display: "standalone",
  background_color: "#fafafa",
  theme_color: "#4f46e5",
  icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
});

export default manifest;
