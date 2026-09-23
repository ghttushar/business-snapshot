export type TrendPoint = {
  day: string;
  revenue: number;
  adSales: number;
  spend: number;
  roas: number;
  acos: number;
};

export type HourlyPoint = {
  hour: string;
  revenue: number;
  spend: number;
  roas: number;
};

export type ActionSource = {
  source: string;
  count: number;
  impact: string;
  tone: "good" | "watch" | "neutral";
};

export type Marketplace = {
  name: string;
  revenue: string;
  delta: string;
  roas: string;
  acos: string;
  budget: number;
  status: string;
};

export type ChangeItem = {
  time: string;
  category: string;
  title: string;
  detail: string;
  impact: string;
};

export type TopMover = {
  name: string;
  area: string;
  sales: string;
  change: string;
  reason: string;
};

export type WatchItem = {
  label: string;
  metric: string;
  note: string;
  severity: "High" | "Medium" | "Low";
};

export const morningKpis = [
  {
    label: "Total revenue",
    value: "$428.6K",
    delta: "+12.4%",
    detail: "$47.2K above the 7-day average",
  },
  {
    label: "Ad sales",
    value: "$196.8K",
    delta: "+18.7%",
    detail: "Rule changes lifted sponsored product sales",
  },
  {
    label: "Blended ROAS",
    value: "5.42x",
    delta: "+0.38x",
    detail: "Spend shifted away from low-intent hours",
  },
  {
    label: "ACOS",
    value: "18.4%",
    delta: "-1.9 pts",
    detail: "Main efficiency gain came from Walmart manual campaigns",
  },
  {
    label: "Budget utilized",
    value: "73%",
    delta: "+6 pts",
    detail: "6 campaigns likely to cap before 4 PM PST",
  },
  {
    label: "Actions applied",
    value: "312",
    delta: "+41",
    detail: "Rules, agents, keyword harvests, and user edits",
  },
];

export const trendData: TrendPoint[] = [
  { day: "Thu", revenue: 352, adSales: 141, spend: 34, roas: 4.16, acos: 24.0 },
  { day: "Fri", revenue: 367, adSales: 149, spend: 32, roas: 4.65, acos: 21.5 },
  { day: "Sat", revenue: 381, adSales: 154, spend: 34, roas: 4.52, acos: 22.1 },
  { day: "Sun", revenue: 344, adSales: 132, spend: 31, roas: 4.26, acos: 23.5 },
  { day: "Mon", revenue: 389, adSales: 163, spend: 33, roas: 4.94, acos: 20.2 },
  { day: "Tue", revenue: 406, adSales: 172, spend: 34, roas: 5.06, acos: 19.8 },
  { day: "Wed", revenue: 429, adSales: 197, spend: 36, roas: 5.42, acos: 18.4 },
];

export const hourlyData: HourlyPoint[] = [
  { hour: "12a", revenue: 9, spend: 2.4, roas: 3.8 },
  { hour: "3a", revenue: 7, spend: 1.8, roas: 3.9 },
  { hour: "6a", revenue: 18, spend: 3.6, roas: 5.0 },
  { hour: "9a", revenue: 48, spend: 7.2, roas: 6.7 },
  { hour: "12p", revenue: 67, spend: 10.8, roas: 6.2 },
  { hour: "3p", revenue: 74, spend: 12.4, roas: 6.0 },
  { hour: "6p", revenue: 51, spend: 9.8, roas: 5.2 },
  { hour: "9p", revenue: 27, spend: 5.6, roas: 4.8 },
];

export const actionSources: ActionSource[] = [
  { source: "Rule actions", count: 126, impact: "+$18.4K protected", tone: "good" },
  { source: "MCP agents", count: 58, impact: "21 checks completed", tone: "neutral" },
  { source: "Users", count: 34, impact: "8 budget edits", tone: "neutral" },
  { source: "Keyword harvest", count: 71, impact: "43 promoted", tone: "good" },
  { source: "Dayparting", count: 23, impact: "9 schedules changed", tone: "watch" },
];

export const marketplaces: Marketplace[] = [
  {
    name: "Amazon US",
    revenue: "$246.9K",
    delta: "+15.8%",
    roas: "5.8x",
    acos: "17.2%",
    budget: 78,
    status: "Scaling efficiently",
  },
  {
    name: "Walmart",
    revenue: "$122.4K",
    delta: "+9.1%",
    roas: "4.9x",
    acos: "20.5%",
    budget: 69,
    status: "Strong mid-day lift",
  },
  {
    name: "DTC store",
    revenue: "$59.3K",
    delta: "+6.4%",
    roas: "3.7x",
    acos: "27.1%",
    budget: 61,
    status: "Conversion rate stable",
  },
];

export const changeTimeline: ChangeItem[] = [
  {
    time: "05:40 AM",
    category: "Rules action changes",
    title: "Bid ceilings tightened on 18 campaigns",
    detail:
      "Rules reduced keyword and product target bids where ACOS crossed the 28% guardrail for two consecutive windows.",
    impact: "Spend trimmed by $6.8K while preserving 94% of revenue volume.",
  },
  {
    time: "06:15 AM",
    category: "MCP Agents changes",
    title: "Agent reconciled budget pacing anomalies",
    detail:
      "The budget monitor found campaigns spending too fast in Amazon US and moved six of them into a conservative pacing band.",
    impact: "Expected to prevent four campaigns from going out of budget before peak evening hours.",
  },
  {
    time: "07:05 AM",
    category: "Users made changes",
    title: "Team raised daily budgets on top movers",
    detail:
      "Two operators increased budget on NapQueens Core, Mattress Protectors, and Sleep Essentials after morning stock checks.",
    impact: "Adds room for roughly $21K in incremental ad-attributed sales today.",
  },
  {
    time: "07:42 AM",
    category: "Keywords harvesting",
    title: "High-converting search terms promoted",
    detail:
      "43 search terms moved from discovery into manual campaigns, with exact match preferred for terms above 4.5x ROAS.",
    impact: "New keywords contributed $9.6K in yesterday-attributed sales during the test window.",
  },
  {
    time: "08:10 AM",
    category: "Dayparting rule actions",
    title: "Midday and evening schedules rebalanced",
    detail:
      "The system shifted budget weight away from 1 AM–5 AM and increased coverage from 10 AM–2 PM and 6 PM–9 PM.",
    impact: "Hourly ROAS improved from 4.8x to 5.6x across adjusted windows.",
  },
];

export const topMovers: TopMover[] = [
  {
    name: "NapQueens Core Mattress",
    area: "Amazon Sponsored Products",
    sales: "$64.2K",
    change: "+24.6%",
    reason: "Exact match harvests and higher afternoon availability",
  },
  {
    name: "Cooling Gel Pillow Set",
    area: "Walmart Manual Campaigns",
    sales: "$31.8K",
    change: "+17.2%",
    reason: "Bid multiplier increase on mobile placements",
  },
  {
    name: "Mattress Protector Bundle",
    area: "DTC Store",
    sales: "$18.9K",
    change: "+11.5%",
    reason: "Better add-on attach rate after PDP merchandising update",
  },
  {
    name: "Queen Hybrid Clearance",
    area: "Amazon Auto Campaigns",
    sales: "$12.7K",
    change: "-8.3%",
    reason: "Budget constrained before evening traffic peak",
  },
];

export const watchItems: WatchItem[] = [
  {
    label: "Six campaigns may cap early",
    metric: "Budget use above 87%",
    note: "Review Amazon US campaigns before 11 AM if stock is available.",
    severity: "High",
  },
  {
    label: "Walmart app traffic is efficient",
    metric: "6.1x ROAS",
    note: "Consider increasing app platform multiplier on the top three SKUs.",
    severity: "Medium",
  },
  {
    label: "Search terms need cleanup",
    metric: "28 terms below 1.5x",
    note: "Add negatives where spend continued after two poor conversion windows.",
    severity: "Medium",
  },
  {
    label: "DTC conversion steady",
    metric: "3.9% CVR",
    note: "No immediate action; monitor checkout drop-off after today’s traffic spike.",
    severity: "Low",
  },
];

export const keywordFunnel = [
  { stage: "Discovered", terms: 284 },
  { stage: "Qualified", terms: 126 },
  { stage: "Promoted", terms: 43 },
  { stage: "Negatives", terms: 28 },
];

export const recommendations = [
  {
    priority: "Do first",
    title: "Protect today’s peak hours",
    detail:
      "Increase budgets on campaigns that are already above 70% utilization and still above 4.5x ROAS.",
  },
  {
    priority: "Optimize",
    title: "Move exact-match winners faster",
    detail:
      "The newly harvested keywords are converting quickly; graduate the best 12 into higher-control manual campaigns.",
  },
  {
    priority: "Watch",
    title: "Audit overnight spend",
    detail:
      "Dayparting improved efficiency, but 1 AM–5 AM still has weak conversion on two Walmart campaigns.",
  },
];
