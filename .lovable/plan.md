# Plan: Anarix Morning Brief variations

## Goal
Create three independent, scrollable Anarix brief screens that help a user quickly understand what happened across their business, ads, ecommerce platform, and automation activity first thing in the morning.

The three screens will be:

1. **Brief style** — more written/narrative, like an executive morning memo.
2. **Dashboard style** — more charts, KPIs, graphs, tables, and data visualizations.
3. **Mixed style** — a balanced version with written insights plus visual summaries.

I will not push anything to the remote repository.

## What I confirmed
- The current local project is a TanStack Start app with a blank home page.
- The project already includes reusable UI pieces and Recharts for visualizations.
- The uploaded Anarix document describes platform capabilities such as campaign logs, action changes, search terms, dayparting, budget utilization, targeting opportunities, marketplace support, and campaign performance concepts.
- The document will be used only as product context, not as a direct implementation checklist.

## Screens to create

### 1. Brief style screen
A content-heavy morning update focused on readable business narrative:
- Opening summary with date range, account/marketplace scope, and overall health.
- Performance improvement after yesterday’s actions.
- Sections for revenue, ad sales, spend, ROAS/ACOS, budget utilization, and ecommerce health.
- “What changed yesterday” timeline covering:
  - Rules action changes
  - MCP/agent changes
  - User-made changes
  - Keyword harvesting
  - Dayparting rule actions
- Recommended next actions and watchlist.
- Long-form insight cards so the page feels like a thorough business brief.

### 2. Dashboard style screen
A data-heavy command center focused on fast scanning:
- KPI tiles for sales, ad spend, ROAS, ACOS, conversion rate, budget utilization, actions taken, and alerts.
- Multiple chart panels, likely including:
  - Revenue/ad sales trend
  - Spend vs sales
  - ROAS/ACOS movement
  - Hourly/dayparting heatmap-style view
  - Action volume by source
  - Keyword harvesting funnel
- Marketplace/channel comparison sections.
- Compact tables for top movers, underperforming campaigns, harvested keywords, and rule actions.

### 3. Mixed style screen
A balanced morning workspace:
- Concise executive summary at the top.
- Priority alerts and “why it matters” notes.
- Selected charts for performance, budget utilization, action impact, and marketplace health.
- Activity feed combining automated changes, agent changes, and user changes.
- Recommendations grouped by urgency.

## Navigation and placement
- Replace the blank home page with a simple Anarix brief variation chooser.
- Add three independent pages:
  - `/brief-written`
  - `/brief-dashboard`
  - `/brief-mixed`
- Each page will be usable on its own, with shared Anarix-style framing and easy links between the three versions.

## Content approach
- Use realistic sample data for now, since no live backend data source was requested.
- Make the copy feel like a real morning business readout, not placeholder text.
- Cover the morning questions a business user would care about:
  - Are sales improving?
  - Did ads get better or worse?
  - What actions happened yesterday?
  - Which automations changed performance?
  - What needs attention today?
  - Which campaigns, keywords, budgets, and marketplaces moved the most?

## Visual approach
- Build a polished Anarix business intelligence feel using the existing app shell and UI components.
- Use semantic design tokens in the global stylesheet rather than hardcoded color values in pages.
- Keep the pages dense, scrollable, and information-rich without making them feel cluttered.
- Use charts and tables where they help the user understand patterns quickly.

## Technical details
- Update route metadata so each new content page has its own title, description, Open Graph title, and Open Graph description.
- Create shared mock data and reusable brief sections/components where useful, while keeping the three screens independent from a user perspective.
- Use the existing Recharts dependency for charts.
- Do not add backend storage, authentication, or live API integrations in this pass.
- Do not run any git push or remote-changing command.

## Validation
- Check that all three pages load from their independent URLs.
- Check that the home chooser links to all three pages.
- Check desktop and mobile layouts for readable, non-overlapping content.
- Verify the pages are scrollable and contain enough depth to feel like a thorough morning brief.
