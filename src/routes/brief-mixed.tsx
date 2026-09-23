import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Bot, CalendarClock, CircleDollarSign, ListChecks, Sparkles } from "lucide-react";

import { BriefChrome } from "@/components/anarix/BriefChrome";
import { KpiCard, SectionCard, TimelineItem, WatchItemCard } from "@/components/anarix/BriefCards";
import { EfficiencyChart, HourlyPerformanceChart, RevenueTrendChart } from "@/components/anarix/BriefCharts";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { actionSources, changeTimeline, marketplaces, morningKpis, recommendations, topMovers, watchItems } from "@/lib/anarixBriefData";

export const Route = createFileRoute("/brief-mixed")({
  head: () => ({
    meta: [
      { title: "Mixed Morning Brief — Anarix" },
      {
        name: "description",
        content: "A mixed Anarix morning brief combining narrative summaries, charts, alerts, action logs, and ecommerce priorities.",
      },
      { property: "og:title", content: "Mixed Morning Brief — Anarix" },
      {
        property: "og:description",
        content: "A balanced Anarix morning brief for performance, rule actions, agent changes, keyword harvesting, and next steps.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MixedBriefPage,
});

function MixedBriefPage() {
  return (
    <BriefChrome
      current="mixed"
      eyebrow="Mixed style variation"
      title="Morning operating brief: what happened, why it matters, and what to do next"
      subtitle="A balanced version that combines the written business story with charts, alerts, marketplace health, automation activity, and clear next moves."
    >
      <div className="grid gap-6">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-normal text-primary">
              <Sparkles className="size-4" />
              Morning summary
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-normal text-foreground">The business is up, and yesterday’s automation work appears to be the main driver.</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Revenue reached $428.6K, ad sales accelerated faster than spend, and blended ROAS improved to 5.42x. The most important operational takeaway is that demand quality improved after rule actions, keyword harvesting, and dayparting adjustments. The only near-term risk is budget exhaustion on efficient campaigns before the next high-converting traffic window.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <SummaryStat icon={<CircleDollarSign className="size-4" />} label="Sales upside" value="+$47.2K" />
              <SummaryStat icon={<Bot className="size-4" />} label="Automations" value="207" />
              <SummaryStat icon={<CalendarClock className="size-4" />} label="Peak window" value="12–3 PM" />
            </div>
          </div>

          <SectionCard title="Priority alerts" eyebrow="Morning triage">
            <div className="space-y-3">
              {watchItems.slice(0, 3).map((item) => (
                <WatchItemCard key={item.label} {...item} />
              ))}
            </div>
          </SectionCard>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {morningKpis.slice(0, 6).map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <SectionCard title="Performance trend" eyebrow="Business and ads">
            <RevenueTrendChart compact />
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <InsightBlock label="Revenue" value="+$47.2K" note="above 7-day average" />
              <InsightBlock label="Ad sales" value="+18.7%" note="after rules and harvests" />
              <InsightBlock label="Spend" value="+5.9%" note="controlled growth" />
            </div>
          </SectionCard>

          <SectionCard title="Efficiency pulse" eyebrow="ROAS and ACOS">
            <EfficiencyChart />
          </SectionCard>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <SectionCard title="Action impact summary" eyebrow="What moved the business">
            <div className="space-y-4">
              {actionSources.map((source) => (
                <div key={source.source} className="rounded-lg border border-border bg-secondary p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="font-semibold text-foreground">{source.source}</p>
                    <Badge variant="outline" className="border-border bg-background">{source.count}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{source.impact}</p>
                  <Progress value={Math.min(source.count, 130)} max={130} className="mt-4 h-2" />
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Hourly performance and dayparting" eyebrow="Schedule quality">
            <HourlyPerformanceChart />
            <div className="mt-5 rounded-lg border border-border bg-secondary p-4">
              <div className="flex items-start gap-3">
                <ListChecks className="mt-0.5 size-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Why it matters</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    The dayparting shift improved ROAS in the strongest shopping windows and protected spend overnight. Today’s plan should keep coverage high in the 10 AM–2 PM and 6 PM–9 PM windows while monitoring campaign caps.
                  </p>
                </div>
              </div>
            </div>
          </SectionCard>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <SectionCard title="Marketplace and ecommerce health" eyebrow="Where the money moved">
            <div className="space-y-3">
              {marketplaces.map((marketplace) => (
                <div key={marketplace.name} className="rounded-lg border border-border bg-secondary p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-foreground">{marketplace.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{marketplace.status}</p>
                    </div>
                    <p className="text-lg font-semibold text-foreground">{marketplace.revenue}</p>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                    <span className="text-success">{marketplace.delta}</span>
                    <span className="text-muted-foreground">{marketplace.roas} ROAS</span>
                    <span className="text-muted-foreground">{marketplace.acos} ACOS</span>
                  </div>
                  <Progress value={marketplace.budget} className="mt-4 h-2" />
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Recommended action plan" eyebrow="Next decisions">
            <div className="space-y-4">
              {recommendations.map((item) => (
                <div key={item.title} className="group rounded-lg border border-border bg-secondary p-4">
                  <div className="flex items-start justify-between gap-4">
                    <Badge className="bg-primary text-primary-foreground">{item.priority}</Badge>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                  <h3 className="mt-3 font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <SectionCard title="Top movers" eyebrow="Products and campaigns">
            <div className="space-y-3">
              {topMovers.map((item) => (
                <div key={item.name} className="rounded-lg border border-border bg-secondary p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-foreground">{item.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{item.area}</p>
                    </div>
                    <span className="text-sm font-semibold text-success">{item.change}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{item.sales} · {item.reason}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Activity feed" eyebrow="Rules, agents, users, keywords, dayparting">
            <div className="max-h-[760px] space-y-5 overflow-y-auto pr-2">
              {changeTimeline.map((item) => (
                <TimelineItem key={`${item.time}-${item.title}`} {...item} />
              ))}
            </div>
          </SectionCard>
        </section>
      </div>
    </BriefChrome>
  );
}

function SummaryStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-secondary p-4">
      <div className="flex items-center gap-2 text-primary">{icon}<span className="text-xs font-semibold uppercase tracking-normal">{label}</span></div>
      <p className="mt-3 text-xl font-semibold text-foreground">{value}</p>
    </div>
  );
}

function InsightBlock({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-lg bg-secondary p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-semibold text-foreground">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{note}</p>
    </div>
  );
}
