import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, FileText, LayoutDashboard, PanelsTopLeft, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anarix Morning Brief Variations" },
      {
        name: "description",
        content: "Choose between written, dashboard, and mixed Anarix morning business brief screens.",
      },
      { property: "og:title", content: "Anarix Morning Brief Variations" },
      {
        property: "og:description",
        content: "Three independent Anarix brief screens for business, marketplace, ads, and automation updates.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const variations = [
  {
    to: "/brief-written",
    title: "Brief style",
    description: "A written morning memo with narrative context, decisions, action history, and recommendations.",
    icon: FileText,
    label: "Read the brief",
  },
  {
    to: "/brief-dashboard",
    title: "Dashboard style",
    description: "A dense analytics cockpit with charts, KPI tiles, action summaries, and performance tables.",
    icon: LayoutDashboard,
    label: "Open dashboard",
  },
  {
    to: "/brief-mixed",
    title: "Mixed style",
    description: "A balanced workspace combining executive notes, visual trends, watchlists, and next actions.",
    icon: PanelsTopLeft,
    label: "View mixed screen",
  },
] as const;

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-3 py-2 text-sm font-semibold text-primary">
            <Sparkles className="size-4" />
            Anarix morning intelligence
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-normal text-foreground sm:text-5xl lg:text-6xl">
            Three ways to understand the business before the day starts.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            Pick a variation for the Anarix brief: a written business readout, a data visualization dashboard, or a hybrid command center.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {variations.map((variation) => {
            const Icon = variation.icon;
            return (
              <Card key={variation.to} className="border-border bg-card shadow-sm">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="flex size-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <Icon className="size-6" />
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold tracking-normal text-card-foreground">{variation.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{variation.description}</p>
                  <Button asChild className="mt-6 w-full justify-between">
                    <Link to={variation.to}>
                      {variation.label}
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}
