import { createFileRoute } from "@tanstack/react-router";

import { ScreenInventory } from "@/components/anarix/ScreenInventory";

export const Route = createFileRoute("/screen-inventory")({
  head: () => ({
    meta: [
      { title: "Screen Inventory — Anarix Brief" },
      { name: "description", content: "Browse the complete inventory of Anarix morning brief metrics, charts, alerts, insights, and marketplace views." },
      { property: "og:title", content: "Screen Inventory — Anarix Brief" },
      { property: "og:description", content: "The reusable component inventory for the Anarix morning brief dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ScreenInventory,
});