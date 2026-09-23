import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2, Target, TrendingUp } from "lucide-react";

import { BriefChrome } from "@/components/anarix/BriefChrome";
import { KpiCard, MarketplaceRow, SectionCard, TimelineItem, WatchItemCard } from "@/components/anarix/BriefCards";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { changeTimeline, marketplaces, morningKpis, recommendations, topMovers, watchItems } from "@/lib/anarixBriefData";

export const Route = createFileRoute("/brief-written")({
  head: () => ({
    meta: [
      { title: "Written Morning Brief — Anarix" },
      {
        name: "description",
        content: "A written Anarix morning brief covering performance, actions, keyword harvesting, dayparting, and business priorities.",
      },
      { property: "og:title", content: "Written Morning Brief — Anarix" },
      {
        property: "og:description",
        content: "A narrative morning readout for ecommerce performance, ad actions, automation changes, and daily priorities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WrittenBriefPage,
});

function WrittenBriefPage() {
  return (
    <BriefChrome
      current="written"
      eyebrow="Brief style variation"
      title="Morning business brief for NapQueens and connected marketplaces"
      subtitle="A written-first view for founders and operators who want the story behind revenue, ads, rules, agent work, and marketplace movement before deciding what to do today."
    >
      <div className="grid gap-6">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {morningKpis.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <SectionCard title="Executive readout" eyebrow="What changed since yesterday morning">
            <div className="space-y-5 text-sm leading-7 text-muted-foreground">
              <p>
                The business is entering the day in a stronger position than yesterday. Revenue is up 12.4%, ad-attributed sales are up 18.7%, and blended ROAS improved to 5.42x after the system moved budget away from low-converting hours and tightened bids on inefficient targets.
              </p>
              <p>
                Yesterday’s actions had a visible impact: automated rule changes protected spend, MCP agents caught budget pacing issues early, and the team manually increased budget on the campaigns that still had inventory and strong conversion. Keyword harvesting also added new exact-match coverage, giving the account more control over the terms already driving profitable sales.
              </p>
              <p>
                The main risk this morning is not demand. Demand is healthy. The risk is that six efficient campaigns may run out of budget before peak traffic. If inventory is available, the first decision today should be whether to raise those budgets before late-morning traffic builds.
              </p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-secondary p-4">
                <p className="text-sm text-muted-foreground">Revenue vs 7-day avg</p>
                <p className="mt-2 text-2xl font-semibold text-foreground">+$47.2K</p>
              </div>
              <div className="rounded-lg border border-border bg-secondary p-4">
                <p className="text-sm text-muted-foreground">Waste reduced</p>
                <p className="mt-2 text-2xl font-semibold text-foreground">$6.8K</p>
              </div>
              <div className="rounded-lg border border-border bg-secondary p-4">
                <p className="text-sm text-muted-foreground">New terms promoted</p>
                <p className="mt-2 text-2xl font-semibold text-foreground">43</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Today’s priority stack" eyebrow="Operator focus">
            <div className="space-y-4">
              {recommendations.map((item) => (
                <div key={item.title} className="rounded-lg border border-border bg-secondary p-4">
                  <Badge className="bg-primary text-primary-foreground">{item.priority}</Badge>
                  <h3 className="mt-3 font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </section>

        <SectionCard title="Performance improvement after yesterday’s actions" eyebrow="Action impact">
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="rounded-lg border border-border bg-secondary p-5">
              <TrendingUp className="size-5 text-success" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">Efficiency improved</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                ACOS dropped 1.9 points after bid rules lowered exposure on high-spend terms and rebalanced dayparting windows.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-secondary p-5">
              <Target className="size-5 text-primary" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">Demand stayed healthy</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Sales climbed while spend rose only slightly, which suggests the system captured better traffic rather than simply buying more traffic.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-secondary p-5">
              <CheckCircle2 className="size-5 text-success" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">Manual edits aligned</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                User-made budget increases landed on campaigns that were already outperforming, so manual work supported the automated plan.
              </p>
            </div>
          </div>
        </SectionCard>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionCard title="Marketplace readout" eyebrow="Business channels">
            <div className="space-y-3">
              {marketplaces.map((marketplace) => (
                <MarketplaceRow key={marketplace.name} {...marketplace} />
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Watchlist" eyebrow="Needs attention">
            <div className="space-y-3">
              {watchItems.map((item) => (
                <WatchItemCard key={item.label} {...item} />
              ))}
            </div>
          </SectionCard>
        </section>

        <SectionCard title="What happened yesterday" eyebrow="Rules, agents, users, keywords, and dayparting">
          <div className="space-y-5">
            {changeTimeline.map((item) => (
              <TimelineItem key={`${item.time}-${item.title}`} {...item} />
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Top movers behind the morning number" eyebrow="Campaign and SKU movement">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="py-3 font-medium">Campaign / product</th>
                  <th className="py-3 font-medium">Area</th>
                  <th className="py-3 font-medium">Sales</th>
                  <th className="py-3 font-medium">Change</th>
                  <th className="py-3 font-medium">Reason</th>
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
          <Separator className="my-5" />
          <div className="flex flex-col gap-3 rounded-lg bg-secondary p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-foreground">Suggested first move</p>
              <p className="mt-1 text-sm text-muted-foreground">Approve budget increases only where ROAS is above 4.5x and inventory is confirmed.</p>
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Open campaign review <ArrowUpRight className="size-4" />
            </div>
          </div>
        </SectionCard>
      </div>
    </BriefChrome>
  );
}
