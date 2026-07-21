# Marketing "Brittani via SMS" on the Website — Research & Design Decisions

*2026-07-21. Research basis for the `SMSShowcase` rolling-accordion creative shipped to the
home, features, solutions/agents, and solutions/teams pages.*

"Brittani via SMS" is the flagship differentiator ("the only TC that works from a text
thread") — yet before this work it appeared only on /platform and the solutions pages, with
zero homepage presence. This document summarizes the research used to design and write the
new showcase section, and the validation process applied to the copy.

---

## 1. How SaaS sites market SMS/texting features (web research)

- **Phone-frame chat mockup is the canonical pattern.** SMS platforms (Podium,
  SimpleTexting, Attentive, EZ Texting) and "text your AI" products (Alfred, Sidekicks,
  Mei) all pair a device frame containing a realistic conversation thread with benefit
  copy beside it. Real product UI beats abstract illustration; for an SMS product the
  thread *is* the product UI.
- **Animated threads outperform static screenshots** — messages revealed one at a time
  with entrance animation turn passive reading into a micro-demo.
- **Dominant layout: side-by-side accordion + persistent phone** — accordion items on the
  left, phone on the right; activating an item swaps the conversation. This beats a
  carousel: carousel studies (Erik Runyon / Notre Dame; NN/g) show ~1% interaction and
  84% of clicks on slide 1, because hidden rotating content gets missed. With an
  accordion, all benefit-labeled headers stay scannable even for visitors who ignore the
  rotation.
- **Direct competitive gap:** ListedKit and Transactly (the closest TC competitors) market
  outcomes but are dashboard-centric; neither leads with an SMS-native interface.
  Follow Up Boss proves texting-native workflow resonates with agents, but it's a CRM for
  texting *clients* — "agent texts the coordinator" is open, defensible ground.

## 2. Rolling/accordion creative best practices (applied to the component)

| Decision | Value | Basis |
|---|---|---|
| Panel count | 4 | NN/g ≤5 frames; engagement collapses after position 1; 3–5 consensus |
| First panel | Open by default, strongest use case first | Runyon: top slot gets 48–84% of engagement |
| Auto-advance | 8s per panel, desktop only | WCAG-adjacent floor of 5s + ~4s thread animation; NN/g: never auto-advance on mobile |
| Pause/stop | Visible pause/play control, first in the widget's tab order | WCAG 2.2.2 (Pause, Stop, Hide) — hard requirement |
| Interaction | Hover pauses; any click/keyboard focus stops rotation permanently | ARIA APG carousel pattern |
| Progress | Filling progress bar on the active header | Tells users rotation is happening (NN/g objection) |
| Reduced motion | `prefers-reduced-motion` disables rotation and bubble animation entirely | WCAG / a11y guidance |
| Semantics | Heading-wrapped `<button>`, `aria-expanded`, `aria-controls`, `role="region"`, `aria-live` off while rotating / polite when stopped | ARIA APG accordion + carousel patterns |
| Mobile | Stacked accordion; conversation renders inside the open panel; no side phone; no rotation | Tabs→accordion responsive conversion research |

## 3. Copy formulas used

- **Direct beats clever** (Unbounce: direct headlines win 88% of tests) — every headline
  states the benefit plainly.
- **The "no app / no login" negation stack** is the established framing for SMS-first AI
  products (Alfred: "Text Your AI Assistant — no app to download"; Sidekicks; Mei):
  *negate 2–3 frictions, end with the one action.* Also already house style
  ("No app. No login. No dashboard.").
- **Realistic conversation samples are the social proof.** Threads use real street names,
  correct FL deal vocabulary (EMD, inspection contingency, loan commitment, clear to
  close), one-word agent replies ("send", "yes") — written the way a phone-first agent
  actually texts.
- **Message match:** whatever a panel header promises, the phone thread literally shows.
- **Approval-gated sending is featured, not hidden** — agents' documented fear of
  delegating to a TC is losing control of the client relationship; every send in every
  conversation shows a draft + explicit confirmation first.

## 4. Audience facts that anchor the angle

- 94% of Realtors use mobile to communicate with clients; median 44% of client-work time
  on mobile; the car and the open house are the workplace (NAR/RPR). "Text it from your
  car" matches measured behavior, not a gimmick.
- Missed deadlines are a commission-protection and liability story, not convenience.
- Communication gaps are the #1 driver of bad agent reviews — the 24/7 + proactive-alert
  panels speak to team leads' reputation risk.

## 5. Per-page copy angles (ICP segments)

| Page | Segment | Angle | Headline |
|---|---|---|---|
| `/` (home) | All agents | Pain-led moments | "Your TC Is One Text Away" |
| `/features` | Evaluators | Capability-led | "Every Deal Answer. One Text Thread." |
| `/solutions/agents` | Solo agent | Day-in-the-life timeline (9:40 AM → 11 PM) | "Run Your Deals From Your Car" |
| `/solutions/teams` | Team lead | Oversight without chasing agents | "Your Whole Pipeline, One Text Away" |

Copy lives in `src/data/smsShowcase.ts`; the component is
`src/components/global/SMSShowcase.astro`.

## 6. ICP validation loops (subagent-driven)

Each page's copy was scored by an independent ICP-persona reviewer (skeptical FL
agent / team lead + strict copy chief) against a 7-point rubric derived from the site's
own voice guide and product truth:

1. Names a specific field moment in the agent's day
2. Realistic deal vocabulary, used correctly
3. Quantifies time/money with site-supported figures only
4. Zero AI hype, zero hedging, no banned words/punctuation
5. Claims match product truth (no client-texting, no unapproved sends, FL only)
6. One idea survives a 10-second skim
7. CTA matches funnel stage and segment (self-serve trial for agents/teams)

Maximum two loops per domain. Results:

<!-- VALIDATION-RESULTS -->

## 7. Flagged uncertainties (do not quote publicly without verification)

- T3 Sixty "39% vs 13% deadline miss" stat and "$8.5k–$35k failure cost" figures are
  single-source (vendor blog) — excluded from shipped copy.
- Optimal panel count for auto-rotating accordions has no controlled study; 3–5 is
  reasoned consensus from carousel research.
- "Inspector confirmed for tomorrow 9am" (home panel 1) assumes inspection-coordination
  status is queryable over SMS — consistent with the Professional plan's inspection
  coordination feature, but worth confirming against the product before paid promotion.
