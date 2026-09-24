import { Link } from "@tanstack/react-router";
import { ArrowLeft, LayoutGrid, Sparkles } from "lucide-react";

import { KpiCard, MarketplaceRow, SectionCard, TimelineItem, WatchItemCard } from "@/components/anarix/BriefCards";
import { ActionSourceChart, EfficiencyChart, HourlyPerformanceChart, KeywordFunnelChart, RevenueTrendChart, SpendSalesChart } from "@/components/anarix/BriefCharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { actionSources, changeTimeline, marketplaces, morningKpis, recommendations, topMovers, watchItems } from "@/lib/anarixBriefData";

export function ScreenInventory() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
          <Button asChild variant="outline" className="w-fit"><Link to="/"><ArrowLeft /> Dashboard</Link></Button>
          <div><div className="flex items-center gap-2 text-sm font-semibold text-primary"><LayoutGrid className="size-4" /> Screen inventory</div><h1 className="mt-2 text-3xl font-semibold tracking-normal sm:text-4xl">Every brief component, in one place.</h1><p className="mt-2 max-w-3xl text-muted-foreground">Reusable metrics, charts, written insights, operations, and marketplace views from the three Anarix brief directions.</p></div>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-8 sm:px-6 lg:px-8">
        <InventorySection title="KPI cards" count={morningKpis.length}><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{morningKpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}</div></InventorySection>
        <InventorySection title="Written insight" count={2}><div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"><div className="rounded-lg border border-border bg-card p-6 shadow-sm"><div className="flex items-center gap-2 text-sm font-semibold text-primary"><Sparkles className="size-4" /> Morning summary</div><h2 className="mt-4 text-2xl font-semibold">The business is up, and yesterday’s automation work appears to be the main driver.</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Revenue reached $428.6K, ad sales accelerated faster than spend, and blended ROAS improved to 5.42x. The most important operational takeaway is that demand quality improved after rule actions, keyword harvesting, and dayparting adjustments.</p></div><SectionCard title="Recommended action plan" eyebrow="Next decisions"><div className="space-y-3">{recommendations.map((item) => <div key={item.title} className="rounded-md bg-secondary p-4"><Badge>{item.priority}</Badge><h3 className="mt-3 font-semibold">{item.title}</h3><p className="mt-2 text-sm text-muted-foreground">{item.detail}</p></div>)}</div></SectionCard></div></InventorySection>
        <InventorySection title="Charts" count={6}><div className="grid gap-6 lg:grid-cols-2"><SectionCard title="Revenue trend"><RevenueTrendChart /></SectionCard><SectionCard title="Spend vs ad sales"><SpendSalesChart /></SectionCard><SectionCard title="ROAS and ACOS"><EfficiencyChart /></SectionCard><SectionCard title="Action mix"><ActionSourceChart /></SectionCard><SectionCard title="Hourly performance"><HourlyPerformanceChart /></SectionCard><SectionCard title="Keyword funnel"><KeywordFunnelChart /></SectionCard></div></InventorySection>
        <InventorySection title="Marketplace views" count={2}><div className="grid gap-6 lg:grid-cols-2"><SectionCard title="Marketplace rows"><div className="space-y-3">{marketplaces.map((item) => <MarketplaceRow key={item.name} {...item} />)}</div></SectionCard><SectionCard title="Channel health"><div className="space-y-3">{marketplaces.map((item) => <div key={item.name} className="rounded-md bg-secondary p-4"><div className="flex justify-between"><div><p className="font-semibold">{item.name}</p><p className="text-sm text-muted-foreground">{item.status}</p></div><p className="font-semibold">{item.revenue}</p></div><Progress value={item.budget} className="mt-4 h-2" /></div>)}</div></SectionCard></div></InventorySection>
        <InventorySection title="Alerts and activity" count={2}><div className="grid gap-6 lg:grid-cols-2"><SectionCard title="Watchlist"><div className="space-y-3">{watchItems.map((item) => <WatchItemCard key={item.label} {...item} />)}</div></SectionCard><SectionCard title="Activity feed"><div className="space-y-5">{changeTimeline.map((item) => <TimelineItem key={item.time} {...item} />)}</div></SectionCard></div></InventorySection>
        <InventorySection title="Tables and action data" count={2}><div className="grid gap-6"><SectionCard title="Top movers"><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="text-muted-foreground"><tr className="border-b"><th className="py-3">Name</th><th>Area</th><th>Sales</th><th>Change</th><th>Driver</th></tr></thead><tbody>{topMovers.map((item) => <tr key={item.name} className="border-b last:border-0"><td className="py-4 font-semibold">{item.name}</td><td className="text-muted-foreground">{item.area}</td><td>{item.sales}</td><td className="text-success">{item.change}</td><td className="text-muted-foreground">{item.reason}</td></tr>)}</tbody></table></div></SectionCard><SectionCard title="Automation sources"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{actionSources.map((item) => <div key={item.source} className="rounded-md bg-secondary p-4"><p className="text-sm text-muted-foreground">{item.source}</p><p className="mt-2 text-2xl font-semibold">{item.count}</p><p className="mt-2 text-xs text-muted-foreground">{item.impact}</p></div>)}</div></SectionCard></div></InventorySection>
      </div>
    </main>
  );
}

function InventorySection({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return <section><div className="mb-4 flex items-center gap-3"><h2 className="text-xl font-semibold">{title}</h2><Badge variant="outline">{count}</Badge></div>{children}</section>;
}