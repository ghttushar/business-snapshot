# Custom Anarix Brief Dashboard

## Goal
Turn the current first screen into the actual customizable Anarix morning dashboard—no chooser or intro page. Prioritize a polished default view, then provide a separate screen inventory containing the reusable elements from the written, dashboard, and mixed briefs.

## Default dashboard (`/`)
- Replace the current variation chooser with the dashboard itself, using the uploaded Signals screens as the interaction reference and the existing Anarix visual system.
- Start with a useful morning layout: KPI cards, revenue/ad-sales trend, alerts, action activity, marketplace health, and recommended next actions.
- Keep KPI cards at a stable size. Every KPI remains expandable, but its detailed breakdown opens in an overlay panel instead of inserting content below the KPI row and pushing the page downward.
- Add an **Add widget** control that opens a searchable/type-filtered picker for KPI, chart, table, written insight, alert, activity, and recommendation widgets.
- Make dashboard widgets draggable and resizable on desktop using a grid layout. Use stable single-column ordering on small screens so touch layouts remain readable.
- Give every widget a compact toolbar for drag handle, AI edit, and remove actions. Preserve clear tooltips and keyboard-accessible controls.
- Keep edits and layout changes in browser storage for this prototype, with a reset-to-default action. No account, Cloud setup, or remote data is added.

## Interactive AI editor demo
- The AI icon opens an editor attached to the selected widget.
- Accept a written instruction and provide quick actions such as changing the metric, title, visualization, comparison period, and color theme.
- Apply supported edits immediately from deterministic local presets and lightweight instruction matching, without calling an AI service or consuming AI credits.
- Clearly keep the interaction presented as a normal editor; unsupported prompts receive a useful local-demo response rather than pretending an AI request succeeded.

## Screen inventory (`/screen-inventory`)
- Add one dedicated inventory page containing the reusable components already designed across all three briefs.
- Group items into scannable sections: KPI cards, narrative summaries, charts, marketplace views, alerts/watchlists, action feeds, recommendations, tables, and supporting metric blocks.
- Reuse the existing components and sample data rather than redesigning them or creating new widgets unless implementation time remains.
- Add a simple fixed **Screen inventory** button at the bottom-right of the dashboard, plus a clear return control on the inventory page.

## Navigation and cleanup
- Update the brief navigation so the product has two destinations: Dashboard and Screen inventory.
- Keep the former brief URLs working by redirecting them to the appropriate new destination rather than leaving dead pages.
- Give both pages distinct Anarix page titles and social descriptions.

## Technical approach
- Add a proven React grid-layout package for desktop drag and resize behavior.
- Create a widget registry describing each widget’s type, default size, minimum size, renderer, and editable settings.
- Build focused dashboard-grid, widget-shell, widget-picker, KPI-detail, and AI-editor components around the existing cards and charts.
- Keep all visual colors on the current semantic design tokens; add tokens only if a missing role is required.
- Verify the default layout, KPI overlay, add/remove flow, drag/resize behavior, local persistence, AI demo edits, inventory navigation, and mobile layout in the running preview.

## Scope priority
1. Complete and verify the default customizable dashboard.
2. Assemble the existing designs into the screen inventory.
3. Create additional widgets only if the first two are complete.

No changes will be pushed to the remote repository.
