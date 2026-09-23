import { createFileRoute } from "@tanstack/react-router";
import { Activity, AlertTriangle, ArrowUpRight, Bot, CheckCircle2, Gauge, Zap } from "lucide-react";

import { BriefChrome } from "@/components/anarix/BriefChrome";
import { KpiCard, SectionCard } from "@/components/anarix/BriefCards";
import { ActionSourceChart, EfficiencyChart, HourlyPerformanceChart, KeywordFunnelChart, RevenueTrendChart, SpendSalesChart } from "@/components/anarix/BriefCharts";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { actionSources, keywordFunnel, marketplaces, morningKpis, topMovers, watchItems } from "@/lib/anarixBriefData";

export const Route = createFileRoute("/brief-dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard Morning Brief — Anarix" },
      {
        name: "description",
        content: "A data-heavy Anarix dashboard for morning ecommerce performance, ad efficiency, actions, budgets, and keyword movement.",
      },
      { property: "og:title", content: "Dashboard Morning Brief — Anarix" },
      {
        property: "og:description",
        content: "A chart-rich Anarix morning dashboard for sales, ads, marketplace performance, rules, agents, and keywords.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardBriefPage,
});

function DashboardBriefPage() {
  return (
    <BriefChrome
      current="dashboard"
      eyebrow="Dashboard style variation"
      title="Business command center: performance, actions, and risk"
      subtitle="A visual-first Anarix overview with KPI tiles, trend charts, marketplace comparisons, action volume, keyword movement, and today’s watchlist."
    >
      <div className="grid gap-6">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          {morningKpis.map((kpi) => (
            <div key={kpi.label} className="xl:col-span-2">
              <KpiCard {...kpi} />
            </div>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <SectionCard title="Revenue and ad sales trend" eyebrow="7-day performance" action={<Badge className="bg-success text-success-foreground">+12.4%</Badge>}>
            <RevenueTrendChart />
          </SectionCard>
          <SectionCard title="Action mix" eyebrow="Yesterday">
            <ActionSourceChart />
            <div className="grid gap-2">
              {actionSources.map((source) => (
                <div key={source.source} className="flex items-center justify-between rounded-md bg-secondary px-3 py-2 text-sm">
                  <span className="text-muted-foreground">{source.source}</span>
                  <span className="font-semibold text-foreground">{source.count}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <SectionCard title="Spend vs ad sales" eyebrow="Efficiency">
            <SpendSalesChart />
          </SectionCard>
          <SectionCard title="ROAS and ACOS movement" eyebrow="Quality of growth">
            <EfficiencyChart />
          </SectionCard>
          <SectionCard title="Keyword harvesting funnel" eyebrow="Search terms">
            <KeywordFunnelChart />
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {keywordFunnel.map((item) => (
                <div key={item.stage} className="rounded-md bg-secondary p-3">
                  <p className="text-muted-foreground">{item.stage}</p>
                  <p className="mt-1 text-xl font-semibold text-foreground">{item.terms}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionCard title="Dayparting and hourly trend" eyebrow="When performance moved">
            <HourlyPerformanceChart />
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <MetricPill icon={<Zap className="size-4" />} label="Best window" value="12 PM–3 PM" />
              <MetricPill icon={<Gauge className="size-4" />} label="ROAS peak" value="6.7x" />
              <MetricPill icon={<AlertTriangle className="size-4" />} label="Weak window" value="1 AM–5 AM" />
            </div>
          </SectionCard>

          <SectionCard title="Marketplace health" eyebrow="Channel comparison">
            <div className="space-y-4">
              {marketplaces.map((marketplace) => (
                <div key={marketplace.name} className="rounded-lg border border-border bg-secondary p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-foreground">{marketplace.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{marketplace.status}</p>
                    </div>
                    <Badge variant="outline" className="border-border bg-background text-success">{marketplace.delta}</Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Revenue</p>
                      <p className="font-semibold text-foreground">{marketplace.revenue}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">ROAS</p>
                      <p className="font-semibold text-foreground">{marketplace.roas}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">ACOS</p>
                      <p className="font-semibold text-foreground">{marketplace.acos}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                      <span>Budget utilization</span>
                      <span>{marketplace.budget}%</span>
                    </div>
                    <Progress value={marketplace.budget} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <SectionCard title="Top movers" eyebrow="Campaign, SKU, and channel changes">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <th className="py-3 font-medium">Name</th>
                    <th className="py-3 font-medium">Area</th>
                    <th className="py-3 font-medium">Sales</th>
                    <th className="py-3 font-medium">Change</th>
                    <th className="py-3 font-medium">Primary driver</th>
                  </tr>
                </thead>
                <tbody>
                  {topMovers.map((item) => (
                    <tr key={item.name} className="border-b border-border last:border-0">
                      <td className="py-4 font-semibold text-foreground">{item.name}</td>
                      <td className="py-4 text-muted-foreground">{item.area}</td>
                      <td className="py-4 text-foreground">{item.sales}</td>
                      <td className="py-4 text-success">{item.change}</td>
                      <td className="py-4 text-muted-foreground">{item.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

          <SectionCard title="Alerts" eyebrow="Morning triage">
            <div className="space-y-3">
              {watchItems.map((item) => (
                <div key={item.label} className="rounded-lg border border-border bg-secondary p-4">
                  <div className="flex items-start gap-3">
                    {item.severity === "Low" ? <CheckCircle2 className="mt-0.5 size-5 text-success" /> : <AlertTriangle className="mt-0.5 size-5 text-warning" />}
                    <div>
                      <p className="font-semibold text-foreground">{item.label}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{item.metric}</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.note}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <MetricPanel icon={<Activity className="size-5" />} title="Rules executed" value="126" detail="Budget, bid, and status guardrails ran without failures." />
          <MetricPanel icon={<Bot className="size-5" />} title="Agent checks" value="58" detail="Budget pacing, anomaly checks, and account-level reviews completed." />
          <MetricPanel icon={<ArrowUpRight className="size-5" />} title="Projected lift" value="+$31K" detail="Expected revenue upside if budget risk is handled before noon." />
        </section>
      </div>
    </BriefChrome>
  );
}

function MetricPill({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-secondary p-3">
      <div className="flex items-center gap-2 text-primary">{icon}<span className="text-xs font-semibold uppercase tracking-normal">{label}</span></div>
      <p className="mt-2 font-semibold text-foreground">{value}</p>
    </div>
  );
}

function MetricPanel({ icon, title, value, detail }: { icon: React.ReactNode; title: string; value: string; detail: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="flex size-10 items-center justify-center rounded-md bg-secondary text-primary">{icon}</span>
        <Badge variant="outline" className="border-border bg-secondary">Live</Badge>
      </div>
      <p className="mt-5 text-sm font-medium text-muted-foreground">{title}</p>
      <p className="mt-2 text-3xl font-semibold text-foreground">{value}</p>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{detail}</p>
    </div>
  );
}
