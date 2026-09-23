import { Link } from "@tanstack/react-router";
import { ArrowLeft, BarChart3, FileText, LayoutDashboard, PanelsTopLeft } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const navItems = [
  { to: "/brief-written", label: "Brief", icon: FileText },
  { to: "/brief-dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/brief-mixed", label: "Mixed", icon: PanelsTopLeft },
] as const;

type BriefChromeProps = {
  children: ReactNode;
  current: "written" | "dashboard" | "mixed" | "home";
  eyebrow?: string;
  title: string;
  subtitle: string;
  meta?: string;
};

export function BriefChrome({ children, current, eyebrow, title, subtitle, meta }: BriefChromeProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                aria-label="Back to brief chooser"
                className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-secondary text-secondary-foreground transition-colors hover:bg-accent"
              >
                <ArrowLeft className="size-4" />
              </Link>
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-normal text-muted-foreground">
                  <BarChart3 className="size-3.5 text-primary" />
                  <span>Anarix Morning Brief</span>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{meta ?? "Today • All channels • Amazon, Walmart, DTC"}</div>
              </div>
            </div>

            <nav className="grid grid-cols-3 gap-2 rounded-lg border border-border bg-secondary p-1 text-sm font-medium lg:w-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active =
                  (current === "written" && item.to === "/brief-written") ||
                  (current === "dashboard" && item.to === "/brief-dashboard") ||
                  (current === "mixed" && item.to === "/brief-mixed");

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-3 text-muted-foreground transition-colors hover:bg-background hover:text-foreground",
                      active && "bg-background text-foreground shadow-sm",
                    )}
                  >
                    <Icon className="size-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="max-w-4xl py-3">
            {eyebrow ? <p className="text-sm font-semibold uppercase tracking-normal text-primary">{eyebrow}</p> : null}
            <h1 className="mt-2 text-3xl font-semibold tracking-normal text-foreground sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
    </main>
  );
}
