import { ArrowDownRight, ArrowUpRight, CircleAlert, CircleCheck, Clock3 } from "lucide-react";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  delta,
  detail,
}: {
  label: string;
  value: string;
  delta: string;
  detail: string;
}) {
  const positive = !delta.startsWith("-");
  return (
    <Card className="border-border bg-card shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold",
              positive ? "bg-success/10 text-success" : "bg-warning/15 text-warning-foreground",
            )}
          >
            {positive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
            {delta}
          </span>
        </div>
        <div className="mt-4 text-3xl font-semibold tracking-normal text-card-foreground">{value}</div>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{detail}</p>
      </CardContent>
    </Card>
  );
}

export function SectionCard({
  title,
  eyebrow,
  children,
  className,
  action,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}) {
  return (
    <Card className={cn("border-border bg-card shadow-sm", className)}>
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 p-5 pb-2">
        <div>
          {eyebrow ? <p className="text-xs font-semibold uppercase tracking-normal text-primary">{eyebrow}</p> : null}
          <CardTitle className="mt-1 text-lg font-semibold tracking-normal text-card-foreground">{title}</CardTitle>
        </div>
        {action}
      </CardHeader>
      <CardContent className="p-5 pt-3">{children}</CardContent>
    </Card>
  );
}

export function TimelineItem({
  time,
  category,
  title,
  detail,
  impact,
}: {
  time: string;
  category: string;
  title: string;
  detail: string;
  impact: string;
}) {
  return (
    <div className="grid gap-3 border-l border-border pl-4 sm:grid-cols-[8rem_1fr] sm:gap-5 sm:border-l-0 sm:pl-0">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground sm:justify-end">
        <Clock3 className="size-4 text-primary" />
        {time}
      </div>
      <div className="relative rounded-lg border border-border bg-secondary p-4">
        <span className="absolute -left-6 top-5 hidden size-3 rounded-full bg-primary ring-4 ring-background sm:block" />
        <Badge variant="outline" className="border-border bg-background text-muted-foreground">
          {category}
        </Badge>
        <h3 className="mt-3 text-base font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{detail}</p>
        <p className="mt-3 rounded-md bg-background p-3 text-sm font-medium leading-6 text-foreground">{impact}</p>
      </div>
    </div>
  );
}

export function MarketplaceRow({
  name,
  revenue,
  delta,
  roas,
  acos,
  budget,
  status,
}: {
  name: string;
  revenue: string;
  delta: string;
  roas: string;
  acos: string;
  budget: number;
  status: string;
}) {
  return (
    <div className="grid gap-4 rounded-lg border border-border bg-secondary p-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:items-center">
      <div>
        <p className="font-semibold text-foreground">{name}</p>
        <p className="mt-1 text-sm text-muted-foreground">{status}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Revenue</p>
        <p className="font-semibold text-foreground">{revenue} <span className="text-success">{delta}</span></p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Efficiency</p>
        <p className="font-semibold text-foreground">{roas} ROAS · {acos} ACOS</p>
      </div>
      <div>
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-muted-foreground">Budget used</span>
          <span className="font-semibold text-foreground">{budget}%</span>
        </div>
        <Progress value={budget} className="h-2" />
      </div>
    </div>
  );
}

export function WatchItemCard({
  label,
  metric,
  note,
  severity,
}: {
  label: string;
  metric: string;
  note: string;
  severity: "High" | "Medium" | "Low";
}) {
  const Icon = severity === "Low" ? CircleCheck : CircleAlert;
  return (
    <div className="rounded-lg border border-border bg-secondary p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span
            className={cn(
              "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md",
              severity === "High" && "bg-destructive/10 text-destructive",
              severity === "Medium" && "bg-warning/15 text-warning-foreground",
              severity === "Low" && "bg-success/10 text-success",
            )}
          >
            <Icon className="size-4" />
          </span>
          <div>
            <p className="font-semibold text-foreground">{label}</p>
            <p className="mt-1 text-sm text-muted-foreground">{note}</p>
          </div>
        </div>
        <Badge variant="outline" className="shrink-0 border-border bg-background">
          {severity}
        </Badge>
      </div>
      <p className="mt-4 text-sm font-semibold text-primary">{metric}</p>
    </div>
  );
}
