import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  BarChart3,
  Bot,
  ChevronRight,
  GripVertical,
  LayoutGrid,
  MoreHorizontal,
  Plus,
  RotateCcw,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Responsive, WidthProvider, type Layout, type Layouts } from "react-grid-layout";

import { KpiCard, TimelineItem, WatchItemCard } from "@/components/anarix/BriefCards";
import {
  ActionSourceChart,
  EfficiencyChart,
  HourlyPerformanceChart,
  KeywordFunnelChart,
  RevenueTrendChart,
  SpendSalesChart,
} from "@/components/anarix/BriefCharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  actionSources,
  changeTimeline,
  marketplaces,
  morningKpis,
  recommendations,
  watchItems,
} from "@/lib/anarixBriefData";
import { cn } from "@/lib/utils";

const ResponsiveGrid = WidthProvider(Responsive);
const STORAGE_KEY = "anarix-dashboard-v1";

type WidgetKind =
  | "kpi"
  | "revenue"
  | "alerts"
  | "activity"
  | "marketplaces"
  | "recommendations"
  | "efficiency"
  | "spend"
  | "actions"
  | "hourly"
  | "keywords";

type WidgetTone = "default" | "positive" | "warning" | "focus";

type WidgetInstance = {
  id: string;
  kind: WidgetKind;
  title: string;
  tone?: WidgetTone;
  dataIndex?: number;
};

const widgetCatalog: Array<{ kind: WidgetKind; title: string; category: string; summary: string }> = [
  { kind: "kpi", title: "KPI metric", category: "Metrics", summary: "A focused metric with change and context." },
  { kind: "revenue", title: "Revenue trend", category: "Charts", summary: "Revenue and ad sales across seven days." },
  { kind: "efficiency", title: "ROAS & ACOS", category: "Charts", summary: "Efficiency movement over time." },
  { kind: "spend", title: "Spend vs ad sales", category: "Charts", summary: "Compare investment with attributed sales." },
  { kind: "actions", title: "Action mix", category: "Charts", summary: "Rules, agents, users, and harvest activity." },
  { kind: "hourly", title: "Hourly performance", category: "Charts", summary: "Dayparting and intraday performance." },
  { kind: "keywords", title: "Keyword funnel", category: "Charts", summary: "Search-term discovery and promotion." },
  { kind: "alerts", title: "Priority alerts", category: "Operations", summary: "Issues that need attention this morning." },
  { kind: "activity", title: "Activity feed", category: "Operations", summary: "Recent changes from rules, agents, and users." },
  { kind: "marketplaces", title: "Marketplace health", category: "Commerce", summary: "Channel revenue, efficiency, and budget." },
  { kind: "recommendations", title: "Recommended actions", category: "Written insight", summary: "A prioritized operator action plan." },
];

const defaultWidgets: WidgetInstance[] = [
  ...morningKpis.map((item, index) => ({ id: `kpi-${index}`, kind: "kpi" as const, title: item.label, dataIndex: index })),
  { id: "revenue", kind: "revenue", title: "Revenue and ad sales trend" },
  { id: "alerts", kind: "alerts", title: "Priority alerts", tone: "warning" },
  { id: "activity", kind: "activity", title: "What changed while you were away" },
  { id: "marketplaces", kind: "marketplaces", title: "Marketplace health" },
  { id: "recommendations", kind: "recommendations", title: "Recommended next moves", tone: "focus" },
];

const defaultDesktopLayout: Layout[] = [
  ...morningKpis.map((_, index) => ({ i: `kpi-${index}`, x: (index % 3) * 4, y: Math.floor(index / 3) * 2, w: 4, h: 2, minW: 3, minH: 2 })),
  { i: "revenue", x: 0, y: 4, w: 8, h: 5, minW: 5, minH: 4 },
  { i: "alerts", x: 8, y: 4, w: 4, h: 5, minW: 3, minH: 4 },
  { i: "activity", x: 0, y: 9, w: 6, h: 6, minW: 4, minH: 4 },
  { i: "marketplaces", x: 6, y: 9, w: 6, h: 6, minW: 4, minH: 4 },
  { i: "recommendations", x: 0, y: 15, w: 12, h: 4, minW: 5, minH: 3 },
];

const toneClasses: Record<WidgetTone, string> = {
  default: "border-border",
  positive: "border-success/40 bg-success/5",
  warning: "border-warning/50 bg-warning/5",
  focus: "border-primary/40 bg-primary/5",
};

function makeLayout(id: string, kind: WidgetKind, index: number): Layout {
  const isKpi = kind === "kpi";
  return { i: id, x: (index * 4) % 12, y: 100, w: isKpi ? 4 : 6, h: isKpi ? 2 : 5, minW: isKpi ? 3 : 4, minH: isKpi ? 2 : 4 };
}

export function DashboardWorkspace() {
  const [widgets, setWidgets] = useState<WidgetInstance[]>(defaultWidgets);
  const [layouts, setLayouts] = useState<Layouts>({ lg: defaultDesktopLayout });
  const [mounted, setMounted] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [detailWidget, setDetailWidget] = useState<WidgetInstance | null>(null);
  const [editWidget, setEditWidget] = useState<WidgetInstance | null>(null);
  const [query, setQuery] = useState("");
  const [prompt, setPrompt] = useState("");
  const [editorMessage, setEditorMessage] = useState("Try “make this green”, “show ROAS”, or “rename to Sales pulse”.");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { widgets?: WidgetInstance[]; layouts?: Layouts };
        if (parsed.widgets?.length) setWidgets(parsed.widgets);
        if (parsed.layouts?.lg?.length) setLayouts(parsed.layouts);
      }
    } catch {
      // Keep the curated default when stored data is unavailable.
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ widgets, layouts }));
  }, [layouts, mounted, widgets]);

  const filteredCatalog = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return widgetCatalog;
    return widgetCatalog.filter((item) => `${item.title} ${item.category} ${item.summary}`.toLowerCase().includes(normalized));
  }, [query]);

  function addWidget(kind: WidgetKind, title: string) {
    const id = `${kind}-${Date.now()}`;
    const dataIndex = kind === "kpi" ? widgets.filter((item) => item.kind === "kpi").length % morningKpis.length : undefined;
    setWidgets((current) => [...current, { id, kind, title: kind === "kpi" ? morningKpis[dataIndex ?? 0].label : title, dataIndex }]);
    setLayouts((current) => ({ ...current, lg: [...(current.lg ?? []), makeLayout(id, kind, widgets.length)] }));
    setPickerOpen(false);
  }

  function removeWidget(id: string) {
    setWidgets((current) => current.filter((item) => item.id !== id));
    setLayouts((current) => ({ ...current, lg: (current.lg ?? []).filter((item) => item.i !== id) }));
  }

  function updateWidget(id: string, changes: Partial<WidgetInstance>) {
    setWidgets((current) => current.map((item) => (item.id === id ? { ...item, ...changes } : item)));
    setEditWidget((current) => (current?.id === id ? { ...current, ...changes } : current));
  }

  function applyPrompt() {
    if (!editWidget || !prompt.trim()) return;
    const instruction = prompt.trim();
    const lower = instruction.toLowerCase();
    const changes: Partial<WidgetInstance> = {};

    if (lower.includes("green") || lower.includes("positive")) changes.tone = "positive";
    else if (lower.includes("orange") || lower.includes("warning") || lower.includes("risk")) changes.tone = "warning";
    else if (lower.includes("purple") || lower.includes("focus")) changes.tone = "focus";
    else if (lower.includes("neutral") || lower.includes("default")) changes.tone = "default";

    if (lower.includes("roas")) {
      changes.kind = editWidget.kind === "kpi" ? "kpi" : "efficiency";
      changes.title = editWidget.kind === "kpi" ? "Blended ROAS" : "ROAS & ACOS movement";
      if (editWidget.kind === "kpi") changes.dataIndex = 2;
    } else if (lower.includes("revenue") || lower.includes("sales")) {
      changes.kind = editWidget.kind === "kpi" ? "kpi" : "revenue";
      changes.title = editWidget.kind === "kpi" ? "Total revenue" : "Revenue and ad sales trend";
      if (editWidget.kind === "kpi") changes.dataIndex = 0;
    } else if (lower.startsWith("rename to ")) {
      changes.title = instruction.slice(10).trim() || editWidget.title;
    }

    if (Object.keys(changes).length === 0) {
      setEditorMessage("That edit is outside this local demo. Try changing the title, color, revenue, or ROAS view.");
      return;
    }
    updateWidget(editWidget.id, changes);
    setEditorMessage("Applied to this widget.");
    setPrompt("");
  }

  function resetDashboard() {
    setWidgets(defaultWidgets);
    setLayouts({ lg: defaultDesktopLayout });
  }

  return (
    <TooltipProvider>
      <main className="min-h-screen bg-background pb-24 text-foreground">
        <header className="border-b border-border bg-card">
          <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-primary"><BarChart3 className="size-4" /> Anarix Brief</div>
                <h1 className="mt-2 text-3xl font-semibold tracking-normal">Good morning — here’s what moved.</h1>
                <p className="mt-2 text-sm text-muted-foreground">Thursday, 24 September · All channels · Updated 8:42 AM</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={resetDashboard}><RotateCcw /> Reset</Button>
                <Button onClick={() => setPickerOpen(true)}><Plus /> Add widget</Button>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="outline" className="bg-secondary">Live overview</Badge>
              <span>Drag from the grip. Resize from a card’s lower-right corner.</span>
            </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-[1480px] px-2 py-5 sm:px-4 lg:px-6">
          {mounted ? (
            <ResponsiveGrid
              className="layout"
              layouts={layouts}
              breakpoints={{ lg: 1100, md: 768, sm: 0 }}
              cols={{ lg: 12, md: 1, sm: 1 }}
              rowHeight={68}
              margin={[16, 16]}
              containerPadding={[0, 0]}
              draggableHandle=".widget-drag-handle"
              isResizable
              isDraggable
              compactType="vertical"
              onLayoutChange={(layout, allLayouts) => setLayouts({ ...allLayouts, lg: allLayouts.lg ?? layout })}
            >
              {widgets.map((widget) => (
                <div key={widget.id}>
                  <WidgetShell
                    widget={widget}
                    onEdit={() => { setEditWidget(widget); setPrompt(""); setEditorMessage("Try “make this green”, “show ROAS”, or “rename to Sales pulse”."); }}
                    onRemove={() => removeWidget(widget.id)}
                    onExpand={widget.kind === "kpi" ? () => setDetailWidget(widget) : undefined}
                  >
                    <WidgetBody widget={widget} />
                  </WidgetShell>
                </div>
              ))}
            </ResponsiveGrid>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {morningKpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
            </div>
          )}
        </div>

        <Button asChild className="fixed bottom-6 right-6 z-40 shadow-lg">
          <Link to="/screen-inventory"><LayoutGrid /> Screen inventory</Link>
        </Button>

        <WidgetPicker open={pickerOpen} onOpenChange={setPickerOpen} query={query} setQuery={setQuery} items={filteredCatalog} onAdd={addWidget} />
        <KpiDetail widget={detailWidget} onOpenChange={(open) => !open && setDetailWidget(null)} />

        <Sheet open={Boolean(editWidget)} onOpenChange={(open) => !open && setEditWidget(null)}>
          <SheetContent className="w-full overflow-y-auto sm:max-w-md">
            <SheetHeader>
              <div className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground"><Sparkles className="size-5" /></div>
              <SheetTitle className="pt-3">Edit with AI</SheetTitle>
              <SheetDescription>Describe how you want to change “{editWidget?.title}”. This prototype applies supported edits locally.</SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-5">
              <div className="flex flex-wrap gap-2">
                {["Make this green", "Show ROAS", "Show revenue", "Rename to Sales pulse"].map((item) => (
                  <Button key={item} variant="outline" size="sm" onClick={() => setPrompt(item)}>{item}</Button>
                ))}
              </div>
              <Textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Change this widget…" className="min-h-28" />
              <p className="rounded-md bg-secondary p-3 text-sm leading-6 text-muted-foreground">{editorMessage}</p>
              <Button className="w-full" onClick={applyPrompt} disabled={!prompt.trim()}><Sparkles /> Apply edit</Button>
            </div>
          </SheetContent>
        </Sheet>
      </main>
    </TooltipProvider>
  );
}

function WidgetShell({ widget, children, onEdit, onRemove, onExpand }: { widget: WidgetInstance; children: React.ReactNode; onEdit: () => void; onRemove: () => void; onExpand?: () => void }) {
  return (
    <section className={cn("group flex h-full min-h-0 flex-col overflow-hidden rounded-lg border bg-card shadow-sm", toneClasses[widget.tone ?? "default"])}>
      <div className="flex h-11 shrink-0 items-center gap-2 border-b border-border px-3">
        <Tooltip>
          <TooltipTrigger asChild><Button variant="ghost" size="icon" className="widget-drag-handle size-8 cursor-grab"><GripVertical /></Button></TooltipTrigger>
          <TooltipContent>Drag widget</TooltipContent>
        </Tooltip>
        <p className="min-w-0 flex-1 truncate text-sm font-semibold">{widget.title}</p>
        {onExpand ? (
          <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="size-8" onClick={onExpand}><ChevronRight /></Button></TooltipTrigger><TooltipContent>View breakdown</TooltipContent></Tooltip>
        ) : null}
        <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="size-8" onClick={onEdit}><Sparkles /></Button></TooltipTrigger><TooltipContent>Edit with AI</TooltipContent></Tooltip>
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="size-8" aria-label="Widget options"><MoreHorizontal /></Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end"><DropdownMenuItem onClick={onEdit}><Sparkles /> Edit widget</DropdownMenuItem><DropdownMenuItem onClick={onRemove} className="text-destructive"><Trash2 /> Remove</DropdownMenuItem></DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="min-h-0 flex-1 overflow-auto p-4">{children}</div>
    </section>
  );
}

function WidgetBody({ widget }: { widget: WidgetInstance }) {
  if (widget.kind === "kpi") {
    const kpi = morningKpis[widget.dataIndex ?? 0] ?? morningKpis[0];
    return <div className="flex h-full flex-col justify-center"><div className="text-3xl font-semibold">{kpi.value}</div><div className="mt-2 flex items-center gap-2"><Badge className={kpi.delta.startsWith("-") ? "bg-warning text-warning-foreground" : "bg-success text-success-foreground"}>{kpi.delta}</Badge><span className="truncate text-sm text-muted-foreground">{kpi.detail}</span></div></div>;
  }
  if (widget.kind === "revenue") return <RevenueTrendChart compact />;
  if (widget.kind === "efficiency") return <EfficiencyChart />;
  if (widget.kind === "spend") return <SpendSalesChart />;
  if (widget.kind === "actions") return <ActionSourceChart />;
  if (widget.kind === "hourly") return <HourlyPerformanceChart />;
  if (widget.kind === "keywords") return <KeywordFunnelChart />;
  if (widget.kind === "alerts") return <div className="space-y-3">{watchItems.slice(0, 3).map((item) => <WatchItemCard key={item.label} {...item} />)}</div>;
  if (widget.kind === "activity") return <div className="space-y-4">{changeTimeline.slice(0, 4).map((item) => <TimelineItem key={item.time} {...item} />)}</div>;
  if (widget.kind === "marketplaces") return <div className="space-y-3">{marketplaces.map((item) => <div key={item.name} className="rounded-md bg-secondary p-3"><div className="flex justify-between gap-3"><div><p className="font-semibold">{item.name}</p><p className="text-xs text-muted-foreground">{item.status}</p></div><p className="font-semibold">{item.revenue}</p></div><div className="mt-3 flex justify-between text-xs text-muted-foreground"><span>{item.roas} ROAS</span><span>{item.budget}% budget</span></div><Progress value={item.budget} className="mt-2 h-1.5" /></div>)}</div>;
  return <div className="grid gap-3 md:grid-cols-3">{recommendations.map((item) => <div key={item.title} className="rounded-md border border-border bg-secondary p-4"><Badge variant="outline" className="bg-background">{item.priority}</Badge><h3 className="mt-3 font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p></div>)}</div>;
}

function WidgetPicker({ open, onOpenChange, query, setQuery, items, onAdd }: { open: boolean; onOpenChange: (open: boolean) => void; query: string; setQuery: (value: string) => void; items: typeof widgetCatalog; onAdd: (kind: WidgetKind, title: string) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto">
        <DialogHeader><DialogTitle>Add a widget</DialogTitle><DialogDescription>Choose the next view for your morning dashboard.</DialogDescription></DialogHeader>
        <div className="relative"><Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search metrics, charts, or operations" className="pl-9" /></div>
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => <button key={item.kind} type="button" onClick={() => onAdd(item.kind, item.title)} className="rounded-lg border border-border bg-card p-4 text-left transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><div className="flex items-start justify-between gap-3"><div><Badge variant="outline">{item.category}</Badge><h3 className="mt-3 font-semibold">{item.title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{item.summary}</p></div><Plus className="mt-1 size-4 shrink-0 text-primary" /></div></button>)}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function KpiDetail({ widget, onOpenChange }: { widget: WidgetInstance | null; onOpenChange: (open: boolean) => void }) {
  const kpi = widget?.kind === "kpi" ? morningKpis[widget.dataIndex ?? 0] : undefined;
  return (
    <Dialog open={Boolean(widget)} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader><DialogTitle>{widget?.title}</DialogTitle><DialogDescription>Metric breakdown without changing the dashboard layout.</DialogDescription></DialogHeader>
        {kpi ? <div className="grid gap-5 sm:grid-cols-[0.8fr_1.2fr]"><div className="rounded-lg bg-secondary p-5"><p className="text-sm text-muted-foreground">Current value</p><p className="mt-2 text-4xl font-semibold">{kpi.value}</p><Badge className="mt-4 bg-success text-success-foreground">{kpi.delta}</Badge><p className="mt-4 text-sm leading-6 text-muted-foreground">{kpi.detail}</p></div><div><RevenueTrendChart compact /><div className="mt-3 flex items-start gap-2 rounded-md border border-border p-3 text-sm text-muted-foreground"><AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" />Compared with the previous seven-day operating average across connected channels.</div></div></div> : null}
      </DialogContent>
    </Dialog>
  );
}