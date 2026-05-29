# Brittani AI Website Uplevel Plan

> **Scope:** Platform page (replaces Features) + Solutions pages. No other sections touched.
> **Goal:** Make brittani.ai look like a $100M company. Deep, intelligent, and resonant with both individual agents and brokerage firms.
> **Reference model:** Harvey.ai (legal AI, $100M+ valuation, enterprise positioning)

---

## Part 1: Core Value Thesis

### What We Actually Are (Internal Positioning — Not Visitor Copy)

Brittani is not a dashboard. It is not TC "software." It is a transaction coordinator that does the work — sends emails from the agent's real address, monitors inbound replies, tracks deadlines, follows up with lenders and title companies, and only pulls the human in when a decision is needed.

> **Competitive Validation (May 2026):** Audited ListedKit, Transactly, Shaker, SkySlope, and Dotloop. The market has 3 lanes: dashboard tools, AI-assisted dashboards, and human outsourcing. "AI that actually does the coordination" is a 4th lane occupied by no one. "Emails from your real address" is completely unoccupied. "Text your TC" as primary interface is unoccupied. Our positioning is validated and defensible.

### The Positioning Shift

| Current | Target |
|---------|--------|
| "AI-Powered Transaction Coordinator" | "The Transaction Coordination Platform" |
| Feature list (what it does) | Platform architecture (how it works together) |
| Individual agent tool | Infrastructure for real estate operations |
| "Save $400/deal" | "Zero missed deadlines. Zero liability. Unlimited capacity." |
| Startup energy ("Built by real estate people") | Platform authority ("Engineered for every transaction") |
| Self-serve only | Self-serve + enterprise sales motion |

### Core Value Pillars (applies to both audiences)

1. **It Does the Work** — Not a dashboard. Not an assistant. Brittani sends the emails, tracks the replies, and follows up — without you lifting a finger.
2. **Zero-Miss Reliability** — Automatic deadline tracking that cannot forget, get sick, or have off days.
3. **Emails That Send Themselves** — From your real address. To the right party. At the right time. Your clients think you have a staff.
4. **Fully Auditable** — Every action logged, every email tracked. You (and your broker) can see everything — because autonomy without accountability is a liability.
5. **Unlimited Scale** — Same quality on deal #1 and deal #50. Cost doesn't scale with volume.

---

## Part 2: Navigation Restructure

### Current Nav
```
Features | Pricing | About | Blog | [Log In] [Get Started]
```

### New Nav
```
Platform ▾ | Solutions ▾ | Pricing | About | Blog | Resources ▾ | [Log In] [Request Demo]
```

### Platform Dropdown
| Item | Description |
|------|-------------|
| **Overview** | See how the whole system works together |
| **Contract Intelligence** | Reads your contracts so you don't have to |
| **Communications Engine** | Sends every deal email from your real address |
| **Deadline System** | Tracks every date. Reminds every party. Misses nothing. |
| **Deal Command Center** | Every deal running — one place to prove it |
| **Brittani Agent** | Text your TC from anywhere (featured item with visual) |
| **Integrations** | Gmail, future: Outlook, MLS, DocuSign |

### Solutions Dropdown
| Item | Target Persona |
|------|---------------|
| **For Individual Agents** | Solo practitioners, small teams |
| **For Brokerages** | Managing brokers, ops directors |
| **For Teams** | Team leads managing 3-7 agents |

### Resources Dropdown (future, but nav slot reserved)
| Item | Purpose |
|------|---------|
| Blog | Existing content |
| ROI Calculator | Quantify savings vs. human TC |
| Help Center | Product documentation |

---

## Part 3: Platform Page (Replaces /features)

### Design Philosophy (Harvey Pattern)
- Hero → Value pillars → Social proof metrics → Module deep-dives → Integrations → Security/Trust → CTA
- Proof comes BEFORE technical details (credibility-first)
- Modules presented as interconnected system, not isolated features
- Outcome-first language: what you achieve, not what it does
- Enterprise controls are features, not fine print

### Section-by-Section Blueprint

#### Section 1: Platform Hero
- **Headline:** "It Runs Your Deals. You Close Them."
- **Subheadline:** "From contract to close, Brittani coordinates every email, every deadline, every follow-up — so you never touch admin again."
- **Visual:** Abstract architectural diagram showing the 6 platform capabilities connected
- **CTA:** Request a Demo
- **Metric badge:** "X,XXX+ deals coordinated" (once we have the number)

#### Section 2: Value Pillars (3 columns)
Modeled on Harvey's "Why the top performers choose Harvey" pattern.

| Pillar | Headline | One-liner |
|--------|----------|-----------|
| 1 | Close More, Coordinate Zero | Every email, follow-up, and deadline handled — you just sell |
| 2 | Zero Missed Deadlines | Automatic tracking across every party, every date, every deal |
| 3 | Your Email, Your Relationships | Sends from your real address — title companies and lenders trust it because it's you |

#### Section 3: Proof Metrics (Harvey's "Delivering value at scale" pattern)
Three large numbers with labels:

| Metric | Display |
|--------|---------|
| Deals coordinated | "X,XXX+" |
| Emails sent autonomously | "XX,XXX+" |
| Deadline accuracy | "100%" |

Below: 2-3 named testimonials with headshots and brokerage names.

#### Section 4: Platform Modules (5 cards, expandable)
Each module gets:
- Icon + name
- One-line outcome statement
- Product screenshot or abstract visual
- "Learn more" link to dedicated sub-page

| Module | Name | Outcome Statement |
|--------|------|-------------------|
| 1 | **Contract Intelligence** | Upload a PDF. Get every date, dollar, and defect — in seconds. |
| 2 | **Communications Engine** | Every party gets the right email at the right time. From your real address. You never hit send. |
| 3 | **Deadline System** | Every contingency, every inspection deadline, every closing date — tracked and reminded automatically. |
| 4 | **Deal Command Center** | Every deal running. One place to prove it. You don't manage deals — you check on deals that manage themselves. |
| 5 | **Coordination Agents** | Inspection scheduling, lender follow-ups, title status — handled. |
| 6 | **Brittani Agent (SMS + Chat)** | Text from your car. Get deal answers, approve emails, check deadlines — no app, no login, no dashboard. |

---

### Module 6 Deep-Dive: Brittani Agent (SMS + Co-Pilot)

> **This is the flagship differentiator.** Real estate agents spend 80% of their day in the field — driving between showings, at inspections, meeting clients. They cannot sit at a dashboard. Brittani meets them where they are: their text messages.

#### Why This Matters (The "On the Road" Thesis)

The average agent checks their phone 100+ times/day between appointments. Every other TC tool requires opening a browser, logging in, navigating to a deal. Brittani is the only TC that works from a text thread.

**The moment that sells it:** An agent is pulling into a listing appointment and their buyer's agent texts asking "when does the inspection period end on Oak Street?" The agent texts Brittani: "inspection deadline 123 Oak St" — gets the answer in 3 seconds. No login. No app. No dashboard. Just the answer.

#### How It Works (visitor-facing version)

```
You send a text → Brittani recognizes you → Pulls up your deals →
  Answers your question or takes action → Responds in seconds
```

> **INTERNAL NOTE (dev reference only):** Twilio webhook → phone-to-user match → load conversation context (30-min sessions) → Agent Core (Claude + 10 tools) → response via SMS (< 300 chars). This flow does NOT appear on the website.

Same agent core powers both SMS and the web co-pilot chat panel. Same tools, same intelligence, same secure access to your deals only. The only difference is the channel.

#### Capabilities via Text

| What You Text | What Happens |
|---------------|--------------|
| "deals" or "what's active?" | Lists all active deals with addresses |
| "deadlines this week" | Shows upcoming deadlines across all deals |
| "summary 123 Oak St" | Full deal summary — phase, parties, next actions |
| "approve emails for Oak St" | Approves pending email drafts (with confirmation) |
| "mark inspection complete" | Updates deadline status (with confirmation) |
| "what did the lender say?" | Retrieves latest inbound email classification |

#### Key Technical Differentiators
- **Session memory:** 30-minute conversation windows. Say "the Oak St deal" once, then follow up with "what about the deadlines?" — Brittani remembers context.
- **Cross-session awareness:** Brittani carries summaries from prior conversations. It knows your deal history.
- **Proactive notifications:** Brittani texts YOU when deadlines approach, when email drafts are ready for approval, when a lender responds. You don't have to ask.
- **Confirmation on write actions:** "I'm about to mark the inspection complete for 123 Oak St. Reply YES to confirm." — no accidental mutations via typo.
- **Complete record:** Every text exchange is logged for compliance and peace of mind.

#### Platform Page Presentation

This module gets **premium visual treatment** — it's the most viscerally impressive capability. 

Visual concept: A phone mockup showing a real SMS conversation thread:
```
Agent: "what's next on the elm st deal?"
Brittani: "2 items pending:
• EMD confirmation due tomorrow (title hasn't confirmed receipt)
• 3 email drafts ready for your review
Want me to follow up with title on EMD?"
Agent: "yes"
Brittani: "Done. Follow-up sent to Sarah at Premier Title. I'll let you know when she responds."
```

#### Platform Dropdown Addition

| Item | Description |
|------|-------------|
| **Brittani Agent** | Your AI TC, accessible via text message or chat — anywhere, anytime |

This becomes a featured item in the Platform dropdown (Harvey uses "Harvey Agents" as their featured nav item with an image preview).

---

#### Section 5: How It Works Together (Architecture Visual)
A clean flow diagram showing the CUSTOMER JOURNEY (not the tech stack):
```
Upload Contract → Dates & Terms Extracted → All Parties Notified → Replies Monitored → Deal Closes
       ↕                    ↕                       ↕                      ↕              ↕
  [You click once]   [AI reads it]         [Emails sent for you]   [AI classifies]  [Everything logged]
                                                                          ↕
                                                               ┌─────────────────────┐
                                                               │   Brittani Agent    │
                                                               │ Text to check in,   │
                                                               │ approve, or act     │
                                                               └─────────────────────┘
```

> **INTERNAL NOTE:** Do NOT use infrastructure names (S3, Bedrock, Pub/Sub, SQS) in the visitor-facing diagram. Keep labels in plain language. Technical architecture can live in a developer/investor page if needed.

This is the "one platform" section. Language: "Upload a contract and everything connects. Dates populate from the analysis. Emails trigger from the dates. Follow-ups fire from inbound replies. You just watch it work — or text Brittani to check in."

#### Section 6: Integrations
- "Works with the tools you already use"
- Current: Gmail, Google Workspace
- Coming: Outlook/Microsoft 365, DocuSign, MLS feeds, Stripe billing
- Pattern: Icon grid with "active" and "coming soon" states

#### Section 7: Security & Trust
- **Headline:** "It acts on your behalf — so security is foundational, not optional."
- **Bridge to one thing:** Autonomous coordination means Brittani sends emails, accesses deals, and acts as you. That demands bank-level security by default.
- Bullets (plain language):
  - Your email credentials are encrypted at rest in isolated, enterprise-grade storage
  - Your brokerage's data is completely separate from every other brokerage
  - Every action Brittani takes is logged — who, what, when, which deal
  - Google security-audited (CASA compliance) for Gmail access
- Language: "We store nothing we don't need. Your credentials are encrypted. Your data is isolated. Every action is logged. When your broker asks 'what happened on the Smith deal?' — there's a complete record."

#### Section 8: Final CTA
- "See what autonomous transaction coordination looks like."
- [Request a Demo] [View Pricing]

---

## Part 4: Solutions Pages

### Design Philosophy
- Each solution page speaks directly to ONE persona's world
- Problem → Capability → Outcome flow (Harvey pattern)
- Social proof specific to that audience
- Connect capabilities to their actual daily workflow, not abstract features
- Make each page feel like "this was built specifically for me"

---

### Solution 1: For Individual Agents (/solutions/agents)

#### Hero
- **Headline:** "Close More Deals. Coordinate Zero."
- **Subheadline:** "Brittani handles every email, every deadline, every follow-up — while you focus on what generates revenue."
- **Visual:** Split screen: left = old way (chaos, spreadsheets, missed emails), right = Brittani way (clean dashboard, automated status)

#### The Pain (3 cards — emotional, visceral)
| Pain | Stat/Hook |
|------|-----------|
| Drowning in coordination | "It's 11pm. You're sending follow-up emails because the day was consumed by showings. There has to be a better way." |
| Missed deadlines kill deals | "One missed inspection deadline doesn't just cost this deal — it costs the next five referrals." |
| Human TCs cost $300-500/deal | "At 10 deals/month, that's $4,000 walking out the door. And they still take vacations." |

#### How Brittani Solves It (7 accordion workflows — Harvey pattern)
1. **Deal Launch** — Upload contract, enter parties, click launch. Full automation in 60 seconds.
2. **Party Communications** — Intro emails, status updates, and reminders sent from YOUR email address.
3. **Deadline Protection** — Every date extracted, every reminder scheduled. Cannot miss.
4. **Inspection Coordination** — Multi-party scheduling via email. No phone tag.
5. **Lender & Title Follow-ups** — Weekly automated status checks. You know before your client asks.
6. **Inbound Intelligence** — AI reads replies, classifies status updates, flags what needs your attention.
7. **Brittani via SMS** — Text from your car. Check deadlines, approve emails, get deal summaries. No app required. The only TC that works from a text thread.

#### The "Aha Moment" Section
> "You're pulling into a listing appointment. Your buyer's agent just texted asking about the inspection deadline. You text Brittani: 'inspection deadline 123 Oak St.' Three seconds later, you have the answer. No login. No app. No dashboard. Just the answer — from your car."

> "Two contracts signed on the same day. Upload both, click Launch twice. Both deals are live — all parties notified, all deadlines tracked — in under 3 minutes. Your evening is yours."

#### Testimonials (agent-specific)
Named agents with deal counts and time-saved metrics.

#### CTA
- "Start your first deal free" / "Request a Demo"

---

### Solution 2: For Brokerages (/solutions/brokerages)

#### Hero
- **Headline:** "Every Deal Coordinated. No Staff Required."
- **Subheadline:** "Give every agent on your roster the same TC — one that never misses, never quits, and costs less than a transaction fee."
- **Visual:** Org-chart style showing: Managing Broker → Agents → Brittani (coordinating all deals)

#### The Business Case (3 pillars — CFO language)
| Pillar | Headline | Detail |
|--------|----------|--------|
| 1 | Eliminate Variable TC Cost | "$400/deal × 400 deals = $160K/year. Replace with flat per-seat pricing. No turnover. No coverage gaps." |
| 2 | Zero Liability Exposure | "Deadlines that cannot miss. One saved E&O claim pays for the platform for a decade." |
| 3 | Every Deal Coordinated — And Fully Documented | "When the state auditor calls, you pull up a dashboard — not a filing cabinet. Every action logged, every communication tracked." |

#### Enterprise Capabilities (7 accordion — Harvey pattern)
1. **Managing Broker Dashboard** — Cross-agent visibility into all deals, deadlines, and communications.
2. **Audit Trail** — Immutable log of every action. Actor, timestamp, context. Regulatory-ready.
3. **Workspace Controls** — Enforce email policies, approval workflows, and communication standards brokerage-wide.
4. **Instant Agent Onboarding** — New agent gets an invite. Same-day access to full TC automation. No training.
5. **Consistent Service Quality** — Every deal follows the same workflow. Your brand experience doesn't vary by agent.
6. **Capacity Multiplication** — Each agent handles 30%+ more deals without additional support staff.
7. **SMS Agent for Every Seat** — Every agent on your team gets Brittani via text. Deal answers from the field, email approvals from the car, deadline checks between showings. No training required — they already know how to text.

#### ROI Section (visual calculator or static comparison)
| | Human TCs | Brittani |
|---|-----------|----------|
| 50 agents × 8 deals/year | $160,000/year | ~$90,000/year |
| Deadline miss rate | 2-5% | 0% |
| Managing broker visibility | Zero | Complete |
| New agent time-to-value | 2-4 weeks | Same day |
| Scales with volume? | No (hire more) | Yes (same cost) |

#### The Mandate Trigger (social proof section)
> "A missed inspection deadline on a $600K deal created a $20K settlement. The managing broker mandated Brittani for all 50 agents the following Monday."

#### Competitive Positioning (vs. alternatives)
- vs. Human TCs: Variable cost, capacity-limited, turnover risk, no audit trail
- vs. Dotloop/SkySlope/Brokermint: Filing cabinets, not actors. They store documents — Brittani does the work.
- vs. DIY (agents coordinate themselves): Inconsistent quality, liability exposure, no oversight

#### CTA
- "Schedule an Enterprise Demo" / "Talk to Sales"

---

### Solution 3: For Teams (/solutions/teams)

#### Hero
- **Headline:** "One AI TC for Your Entire Team"
- **Subheadline:** "Team leads: stop assigning admin. Start assigning deals."

#### Key differentiators for teams
- Shared workspace with role-based access
- Team lead oversight without micromanagement
- Consistent client experience across all team members
- One subscription covers the team

#### Structure mirrors individual agent page but with team overlay language

---

## Part 5: Design & Visual Direction

### The "$100M Company" Aesthetic (Harvey Patterns)

| Element | Current | Target |
|---------|---------|--------|
| Color palette | Not audited | Dark, sophisticated. Deep navy/charcoal + warm accent (gold/amber) |
| Typography | Standard sans-serif | Premium feel. Large headlines, generous spacing, high contrast |
| Imagery | Generic/placeholder | Product screenshots, abstract architectural diagrams, professional headshots |
| Backgrounds | Flat | Subtle textures (Harvey uses bronze/metallic textures) |
| Icons | Standard Lucide | Custom icon set, consistent weight, architectural feeling |
| Animations | Minimal | Subtle scroll reveals, parallax on diagrams, accordion interactions |
| White space | Adequate | Generous — let the platform breathe |
| Social proof | Fake avatar bubbles (SM, MR) | Real headshots, named people, company logos |

### Key Visual Principles
1. **No startup cliches** — No gradient backgrounds, no "rocket ship" metaphors, no "powered by AI" badges
2. **Architecture over screenshots** — Show how the system works, not just what the UI looks like
3. **Proof over promises** — Metrics, testimonials, logos before feature descriptions
4. **Depth through structure** — Navigation dropdowns, sub-pages, learn-more links all create the impression "there is so much more under the hood"
5. **Consultative, not urgent** — "Request a Demo" not "Sign Up Now FREE!!!" The product sells itself.

### Information Architecture That Communicates Depth
- Platform page with 5 module cards, each linking to its own sub-page
- Solutions with 3 persona pages, each with 6 detailed workflows
- Resources dropdown (even if sparse initially) signals maturity
- "Learn more" links everywhere — the user should always feel there's another layer to explore

---

## Part 6: Punchy Messaging Framework (Make It Punchy — Applied)

> Based on Emma Stratton's VBF methodology. The website copy MUST follow this framework.

### The One Thing (Stake Our Claim)

**Brittani's unique value:** Autonomous coordination.

Every TC tool on the market gives agents a dashboard. Brittani is the only one that actually DOES the work — sends the emails, tracks the replies, follows up with the lender, and only pulls the human in when a decision is needed.

This is what we're known for. Repeat it everywhere. Don't dilute it.

### VBF Framework — Company Level

```
VALUE PROPOSITION: Close more deals without coordinating a single one.

BENEFIT 1: Never touch coordination again
Upload, launch, done. Brittani handles every email, every follow-up,
every deadline — autonomously, from your real email address.

  FEATURES:
  • AI contract analysis (dates, terms, defects in seconds)
  • Context-aware email drafting and sending via Gmail API
  • Automated party introductions on deal launch

BENEFIT 2: Never miss what matters
Every critical date tracked. Every reply classified. Every status
update surfaced — before you have to ask.

  FEATURES:
  • Programmatic deadline tracking with multi-stage reminders
  • Inbound email AI classification
  • Proactive SMS notifications (deadlines, drafts ready, lender responses)

BENEFIT 3: Stay in control from anywhere
Text Brittani from your car. Approve emails between showings.
Check deadlines from the field. No app required.

  FEATURES:
  • SMS agent (full deal access via text message)
  • Web co-pilot chat panel
  • 30-minute session memory with cross-session awareness
```

### VBF Framework — Per Persona (Nested)

**For Individual Agents (A+ Customer):**
```
VALUE PROPOSITION: Sell more. Coordinate zero.

BENEFIT 1: Get your evenings back
Two contracts signed today? Upload both. Click Launch twice.
Both deals are live in under 3 minutes. Your evening is yours.

BENEFIT 2: Know before your client asks
The lender responded? EMD confirmed? Inspection scheduled?
Brittani monitors everything and tells you what happened — via text.

BENEFIT 3: Look like you have a team (even if it's just you)
Every email comes from YOUR address. Every party gets timely,
professional communication. Your clients think you have a staff.
```

**For Brokerages (Secondary Buyer):**
```
VALUE PROPOSITION: Every deal coordinated. No staff required.

BENEFIT 1: Predictable cost, unlimited capacity
Replace $400/deal variable TC expense with flat per-seat pricing.
No two-week notices. No training new hires. No coverage gaps.

BENEFIT 2: Full automation, full transparency
Every deal coordinated autonomously — and every action documented.
When the state auditor calls, you pull up the record in seconds.

BENEFIT 3: Every agent performs like your best agent
New hire on Monday, full TC coordination by Tuesday. Same workflow,
same standards, same client experience — regardless of who's on the deal.
GCI per agent goes up when coordination is no longer the bottleneck.
```

### Outside-In Copy Rules (Stratton's "Translation" Principle)

Every piece of copy on this website must pass the outside-in test. The reader should NEVER have to translate a feature into a benefit themselves.

| Inside-Out (DO NOT USE) | Outside-In (USE THIS) |
|---|---|
| "AI-powered contract analysis" | "Every date, dollar, and defect — in seconds" |
| "Gmail OAuth integration" | "Emails from your real address, not a SaaS domain" |
| "EventBridge-scheduled reminders" | "Every critical date tracked. Nothing slips." |
| "Claude Sonnet 4 NLP extraction" | "Upload a PDF. Get the full picture instantly." |
| "Twilio SMS webhook with session context" | "Text Brittani from your car. Get the answer in 3 seconds." |
| "Multi-tenant workspace isolation" | "Your data is yours. Always." |
| "SQS-driven async pipeline" | "From signed contract to full automation in 60 seconds." |

### The Headline Test (Stratton's Formulas Applied)

**Command Formula** ("Now you can ___"):
- "Close more deals without coordinating a single one."
- "Run deals from your text messages."
- "Launch a transaction in 60 seconds."

**Aspirational Formula** ("Imagine if you could ___"):
- "Imagine never sending another coordination email."
- "Imagine getting a text every time your deal status changes."
- "Imagine every new agent on your team performing like a veteran."

**Ultimate Formula** ("Ultimately, you will be able to ___"):
- "Build a real estate business that scales without scaling admin."
- "Give every agent enterprise-grade TC without enterprise-grade cost."

### The "Brown Shaved Ice" Check

Before publishing ANY page, ask: "If someone reads just the headline and three benefit headers, do they get ONE clear message?"

If the answer is "it's a mix of things" — rewrite until it's one thing.

Our one thing on every page: **Brittani does the coordination. You do the selling.**

---

## Part 7: Tone & Copy Guidelines

### Harvey's Tone (What We're Modeling)
- Confident without being hyperbolic
- Results-oriented, not feature-oriented
- Team-centric ("your firm," "your team," "your agents")
- Action verbs: streamline, accelerate, unlock, navigate, deliver
- Domain-specific language (real estate terms, not tech jargon)
- No exclamation points. No emojis. No "revolutionary."

### Brittani Copy Rules
1. **Outcome-first:** Not "AI-powered contract analysis" → "Every date, dollar, and defect — extracted in seconds."
2. **Domain translation:** Use real estate language. "Inspection period," "EMD," "clear-to-close," "contingency," "due diligence" — not "workflow automation."
3. **Metric-based validation:** "100% deadline accuracy" not "never miss a deadline"
4. **Enterprise controls as features:** "Complete audit trail" not "we log stuff"
5. **Authority through plain-language specificity:** "Reminders at 3 days, 1 day, and day-of — automatic, every time." NEVER use infrastructure brand names (EventBridge, Twilio, Bedrock, SQS) in visitor-facing copy. Depth comes from describing WHAT happens in precise detail, not from naming the tool that does it.
6. **No hedging:** Not "helps you manage" → "manages." Not "assists with communication" → "sends the emails."
7. **Customer is the hero:** Lead with things THEY can now do/be/feel. Brittani is the sidekick, not the protagonist. "You never send another coordination email" not "Brittani sends emails for you."

### Headline Formula (for both Platform + Solutions)
**[Outcome for YOU] + [How it feels] + [Differentiator]**
- "Zero Missed Deadlines. Automatic Tracking. Across Every Deal."
- "Every Party. The Right Email. On Autopilot."
- "Upload a Contract. Launch a Deal. 60 Seconds."

---

## Part 8: Emotional Hooks (Weave Throughout)

> The plan is logical. Now make it FEEL like something. Every page needs at least 2-3 of these visceral moments.

### For Individual Agents (use in Pain sections + Aha moments)

| Hook | Where to Use |
|------|-------------|
| "It's 11pm. You're sending follow-up emails because the day was consumed by showings. There has to be a better way." | Pain section opener |
| "That Sunday-night pit in your stomach when you remember the emails you haven't sent." | Pain card #1 |
| "Your kid has a game at 4. You shouldn't be chasing a title company instead of being there." | CTA area |
| "One missed deadline doesn't just cost this deal — it costs the next five referrals." | Deadline pain card |
| "Your client asks 'what's happening with my deal?' and you don't know." | Benefit 2 context |
| "No more calling the lender three times to get an update they could have emailed." | Lender follow-up accordion |

### For Managing Brokers (use in Brokerage pain + mandate trigger)

| Hook | Where to Use |
|------|-------------|
| "Stop getting calls at 2am because an agent missed a deadline on a $800K deal." | Pain opener |
| "When the state auditor calls, you pull up the dashboard — not a filing cabinet." | Audit trail benefit |
| "No two-week notices. No training new hires. No coverage gaps." | TC cost pillar |
| "Your best agent and your newest agent deliver the same client experience." | Consistency accordion |
| "A recruiting differentiator that costs less than a transaction fee." | CTA area |

---

## Part 9: Competitive Positioning Anchors

> From the competitive audit — these claims are UNOCCUPIED in the market. Use them.

### Lines We Own (No Competitor Can Claim These Today)

1. "It doesn't help you manage transactions. It manages them."
2. "Emails from your address. Not ours."
3. "Text it like you'd text a human TC."
4. "No dashboard required. No login. It just works."
5. "The first TC that works while you sleep."
6. "They give you a checklist. Brittani completes the checklist."
7. "Other tools show you what's overdue. Brittani made sure it was never late."

### Competitive Framing (for comparison sections)

| Market Category | What They Do | What We Do |
|---|---|---|
| Dashboard tools (Shaker, Dotloop) | Give you a nicer place to manage your own work | Do the work. You check in when you want. |
| AI-assisted tools (ListedKit, SkySlope) | Surface what's urgent, help you draft | Send, track, follow up, and act — autonomously |
| Human TC services (Transactly) | Outsource to a person ($400/deal, capacity-limited) | Same outcome, 1/4 the cost, unlimited capacity |

---

## Part 10: Real Estate Vocabulary Guide

> Use these terms to sound native. Avoid terms that require tech literacy.

### Words Agents Use (weave into copy)

| Term | Meaning | Where to Use |
|------|---------|-------------|
| Under contract / pending | Deal status between acceptance and close | Deal status references |
| Contingencies | Conditions that must be satisfied (inspection, financing, appraisal) | Deadline System module |
| Due diligence period | Regional alternative to "inspection period" (NC, SC, GA, CO) | Module 3 + regional awareness |
| Option period | Texas equivalent of inspection period | Show state-awareness in Contract Intelligence |
| Appraisal gap | When property appraises below purchase price | SMS scenario example |
| CDA | Commission Disbursement Authorization | Brokerage audit trail |
| HOA estoppel | HOA document confirming dues owed | Coordination Agents module |
| Closing disclosure (CD) | Final financial document before close | Deadline examples |
| Transaction timeline | What agents call the deal sequence | Use instead of "workflow" in agent-facing copy |
| Wire fraud | #1 closing fear — massive emotional trigger | Security section |
| Amendment / addendum | Contract modifications mid-deal | Contract Intelligence references |

### Words to AVOID in Agent-Facing Copy

| Tech Word | Use Instead |
|-----------|-------------|
| Autonomous | "Does the work for you" / "handles it" / "on autopilot" |
| Programmatic | "Automatic" / "built-in" |
| Infrastructure | "System" / "support" (for agents) — OK for broker pages |
| Module | "Tool" / "capability" |
| Platform architecture | "How it all works together" |
| Orchestration | "Coordination" |
| Pipeline | "Process" / "from start to finish" |
| Tenant-isolated | "Your data is separate from everyone else's" |
| OAuth | "Secure email connection" |

---

## Part 11: Implementation Sequence

> **Technical Feasibility (verified):** The current Astro + Tailwind stack handles ALL planned features with zero new dependencies. No React, no Alpine.js, no framework additions. Mega-menus = vanilla JS. Accordions = native `<details>` (already exists in FAQ component). Phone mockup = pure CSS. Architecture diagram = inline SVG. Routes = file-based (free). Amplify build = no impact. Only action: add `/features` → `/platform` 301 redirect in Amplify config.

### Phase 1: Platform Page (Week 1-2)
1. Create `/platform` route (new page)
2. Build platform hero component
3. Build value pillars component
4. Build metrics/proof section
5. Build module cards (5 expandable cards)
6. Build architecture diagram section
7. Build integrations grid
8. Build security/trust section
9. Update navigation (add Platform dropdown)

### Phase 2: Solutions Pages (Week 2-3)
1. Create `/solutions/agents` route
2. Create `/solutions/brokerages` route
3. Create `/solutions/teams` route
4. Build shared solution page layout (hero → pain → workflows → proof → CTA)
5. Build accordion workflow component (reusable)
6. Build ROI comparison component (for brokerages page)
7. Update navigation (add Solutions dropdown)

### Phase 3: Navigation & Polish (Week 3-4)
1. Implement mega-menu dropdowns (Platform, Solutions, Resources)
2. Migrate `/features` content into platform sub-pages
3. Redirect `/features` → `/platform`
4. Update all internal links
5. Update CTAs from "Get Started" → "Request Demo" (primary) + "Get Started" (secondary)
6. Add real testimonials and metrics as they become available

### Phase 4: Visual Uplevel (Week 4-5)
1. Color palette update (darker, more sophisticated)
2. Typography upgrade (larger headlines, better hierarchy)
3. Replace placeholder social proof with real data
4. Add subtle animations (scroll reveals, hover states)
5. Build architectural diagram assets
6. Product screenshot creation (clean, staged dashboard views)

---

## Part 12: What NOT to Change (Out of Scope)

- Homepage (not in scope, though it will benefit from nav changes)
- Pricing page
- About page
- Blog
- Footer (minimal updates for new nav links)
- Any backend/app functionality

---

## Part 13: Success Criteria

The website should pass these tests:

1. **The Squint Test:** At a glance, does it look like a company that raised $50M+?
2. **The Brokerage Test:** Would a managing broker with 50 agents see this and think "this is infrastructure for my firm"?
3. **The Depth Test:** Can a visitor click 3 levels deep and still find substantive content?
4. **The Solo Agent Test:** Does the individual agent still feel spoken to directly?
5. **The Competitor Test:** Does it look categorically different from Dotloop, SkySlope, ListedKit, and other TC tools?
6. **The Authority Test:** Does the copy sound like a market leader or a startup hoping to be one?

---

## Appendix: Harvey.ai Patterns Applied to Brittani

| Harvey Pattern | Brittani Equivalent |
|---------------|---------------------|
| "Practice Made Perfect" | "Transaction Coordination, Perfected" |
| Platform → Assistant, Vault, Knowledge, Agents, Ecosystem | Platform → Contract Intelligence, Communications, Deadlines, Command Center, Coordination Agents |
| Solutions → Innovation, In-House, Transactional, Litigation | Solutions → Individual Agents, Brokerages, Teams |
| "142,000+ professionals" | "X,XXX+ deals coordinated" |
| "200K+ queries/day" | "XX,XXX+ emails sent autonomously" |
| SOC2, ISO 27001, GDPR | CASA-compliant (Google), AWS infrastructure, tenant isolation |
| "Enterprise-grade security and controls" | "Enterprise-grade security by default" |
| Named CLO/GC testimonials | Named managing broker / top-producer testimonials |
| "Professional Class AI" | "Transaction Coordination Platform" |
| "One platform engineered to elevate your entire team" | "One platform engineered for every transaction" |
