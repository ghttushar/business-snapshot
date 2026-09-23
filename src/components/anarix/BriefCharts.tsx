import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { actionSources, hourlyData, keywordFunnel, trendData } from "@/lib/anarixBriefData";

const trendConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  adSales: { label: "Ad sales", color: "var(--chart-2)" },
  spend: { label: "Spend", color: "var(--chart-3)" },
} satisfies ChartConfig;

const efficiencyConfig = {
  roas: { label: "ROAS", color: "var(--chart-1)" },
  acos: { label: "ACOS", color: "var(--chart-4)" },
} satisfies ChartConfig;

const actionConfig = {
  count: { label: "Actions", color: "var(--chart-2)" },
} satisfies ChartConfig;

const hourlyConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  spend: { label: "Spend", color: "var(--chart-3)" },
} satisfies ChartConfig;

const keywordConfig = {
  terms: { label: "Terms", color: "var(--chart-5)" },
} satisfies ChartConfig;

export function RevenueTrendChart({ compact = false }: { compact?: boolean }) {
  return (
    <ChartContainer config={trendConfig} className={compact ? "h-56 w-full" : "h-72 w-full"}>
      <AreaChart data={trendData} margin={{ left: 0, right: 10, top: 10, bottom: 0 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} />
        <YAxis hide />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area type="monotone" dataKey="revenue" stroke="var(--color-revenue)" fill="var(--color-revenue)" fillOpacity={0.16} strokeWidth={2} />
        <Area type="monotone" dataKey="adSales" stroke="var(--color-adSales)" fill="var(--color-adSales)" fillOpacity={0.12} strokeWidth={2} />
      </AreaChart>
    </ChartContainer>
  );
}

export function SpendSalesChart() {
  return (
    <ChartContainer config={trendConfig} className="h-72 w-full">
      <BarChart data={trendData} margin={{ left: 0, right: 10, top: 10, bottom: 0 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} />
        <YAxis hide />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="adSales" fill="var(--color-adSales)" radius={[6, 6, 0, 0]} />
        <Bar dataKey="spend" fill="var(--color-spend)" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}

export function EfficiencyChart() {
  return (
    <ChartContainer config={efficiencyConfig} className="h-64 w-full">
      <LineChart data={trendData} margin={{ left: 0, right: 10, top: 10, bottom: 0 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} />
        <YAxis hide />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line type="monotone" dataKey="roas" stroke="var(--color-roas)" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="acos" stroke="var(--color-acos)" strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  );
}

export function ActionSourceChart() {
  return (
    <ChartContainer config={actionConfig} className="h-72 w-full">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie data={actionSources} dataKey="count" nameKey="source" innerRadius={62} outerRadius={96} paddingAngle={3}>
          {actionSources.map((entry, index) => (
            <Cell key={entry.source} fill={`var(--chart-${(index % 5) + 1})`} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}

export function HourlyPerformanceChart() {
  return (
    <ChartContainer config={hourlyConfig} className="h-64 w-full">
      <AreaChart data={hourlyData} margin={{ left: 0, right: 10, top: 10, bottom: 0 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="hour" tickLine={false} axisLine={false} />
        <YAxis hide />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area type="monotone" dataKey="revenue" stroke="var(--color-revenue)" fill="var(--color-revenue)" fillOpacity={0.18} strokeWidth={2} />
        <Line type="monotone" dataKey="spend" stroke="var(--color-spend)" strokeWidth={2} dot={false} />
      </AreaChart>
    </ChartContainer>
  );
}

export function KeywordFunnelChart() {
  return (
    <ChartContainer config={keywordConfig} className="h-64 w-full">
      <BarChart data={keywordFunnel} layout="vertical" margin={{ left: 14, right: 20, top: 10, bottom: 0 }}>
        <CartesianGrid horizontal={false} />
        <XAxis type="number" hide />
        <YAxis dataKey="stage" type="category" tickLine={false} axisLine={false} width={78} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="terms" fill="var(--color-terms)" radius={[0, 6, 6, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
