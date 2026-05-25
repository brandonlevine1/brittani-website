# Interactive Product Demo — Design Spec

## Overview

A standalone interactive demo of the Brittani AI deal creation flow, embedded on the marketing site's features page. Visitors experience a guided tutorial (drag-and-drop file upload → AI processing → property/parties review → launch), then freely explore a pre-populated deal dashboard with semi-interactive emails, documents, deadlines, and a canned Brittani chat.

## Goals

- Showcase the product's ease of use without requiring sign-up
- Build muscle memory — visitors physically perform the drag-and-drop action
- Convert visitors to sign-up via persistent CTA throughout the experience
- Zero backend, zero API cost, zero token risk

## Architecture

### Deployment

- **Repo:** `brittani-ai-demo` (new standalone repo under brittani-ai org)
- **Domain:** `demo.brittani.ai`
- **Host:** Cloudflare Pages (static SPA, git-push deploys)
- **Embed:** iframe on `brittani.ai/features` page, below the hero section

### Stack

- Vite 6
- React 19
- TypeScript
- Tailwind CSS v4
- React Router 7 (client-side)
- Framer Motion (cursor/drag animations)
- Lucide Icons (same as real app)

### Code Reuse Strategy

Copy components from `brittani-ai` (the real app) into the demo repo:
- Deal wizard UI (`src/app/(platform)/deals/new/page.tsx`)
- Deal dashboard layout
- Email thread components
- Document list components
- Deadline timeline components
- Brittani chat panel UI
- Shared UI primitives (`cn()`, buttons, inputs, cards)

Strip all API calls and replace with imports from `src/mock/*.ts` files.

### Protection

- **Cloudflare Bot Management:** Bot score filtering, JS challenges for suspicious traffic
- **Rate limiting:** 60 requests/minute per IP via Cloudflare rules
- **CSP headers:** `frame-ancestors` restricted to `brittani.ai` only (prevents embedding elsewhere)
- **No backend:** Nothing to exploit — all data is static and bundled in the build

## Directory Structure

```
brittani-ai-demo/
├── src/
│   ├── components/
│   │   ├── deals/         # Deal dashboard, detail views
│   │   ├── emails/        # Email threads, draft approval
│   │   ├── documents/     # Document list, preview panel
│   │   ├── deadlines/     # Deadline timeline, checkboxes
│   │   ├── brittani/      # Chat panel (canned responses)
│   │   └── ui/            # Shared UI primitives
│   ├── tutorial/
│   │   ├── TutorialOverlay.tsx    # Step machine, overlay wrapper
│   │   ├── AnimatedCursor.tsx     # Ghost cursor hint animation
│   │   ├── DraggableFile.tsx      # The file card users drag
│   │   ├── PulseDot.tsx           # Yellow pulsing hotspot
│   │   ├── Tooltip.tsx            # Tutorial tooltip bubbles
│   │   └── steps.ts              # Step definitions & config
│   ├── mock/
│   │   ├── deal.ts               # Deal: 123 Main St, $485k, Phase 1
│   │   ├── emails.ts             # 4 email threads (2 sent, 2 drafts)
│   │   ├── documents.ts          # 3 PDFs with extracted terms
│   │   ├── deadlines.ts          # 8 deadlines across phases
│   │   ├── parties.ts            # 6 contacts
│   │   └── chat.ts              # Canned Brittani responses
│   ├── routes/
│   │   ├── DemoRoot.tsx          # Layout + tutorial + banner
│   │   ├── NewDeal.tsx           # Wizard (from real app, mocked)
│   │   ├── DealDashboard.tsx     # Deal overview tab
│   │   ├── DealEmails.tsx        # Emails tab
│   │   ├── DealDocuments.tsx     # Documents tab
│   │   └── DealDeadlines.tsx     # Deadlines tab
│   ├── App.tsx                   # Router config
│   └── main.tsx                  # Entry point
├── public/
│   └── contract-thumbnail.svg    # File card asset
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Tutorial Flow (Guided Phase)

### Step 1: Drag & Drop (User performs action)

**Phase A — Animated Hint (1.5s):**
1. Ghost cursor appears and briefly demonstrates the drag motion (fast, subtle)
2. Cursor fades out
3. A draggable file card appears at the right side of the screen
4. Yellow pulse on the file card
5. Tooltip: "Grab this file and drop it in the upload zone"

**Phase B — User Action:**
1. File card is actually draggable (HTML5 drag events + pointer fallback)
2. User drags it toward the dashed upload zone
3. Upload zone highlights with blue border pulse on hover
4. On drop: file appears in the file list (same UI as real app)
5. Yellow pulse shifts to "Upload & Analyze" button
6. Tooltip: "Nice! Now click to start the AI analysis"

**Fallback:** If no drag detected after 10s, show "Click to upload" below the file card. Touch devices get click-only immediately.

### Step 2: AI Processing (Auto-plays, ~5s)

- Same processing UI as real app (spinning loader, pulsing ring)
- Cycles through messages: "Reading through your contract...", "Extracting the purchase price...", etc.
- Compressed from real 30s to ~5s
- Auto-advances when complete — no user action

### Step 3: Property Details (Pre-filled)

- Fields animate with typewriter effect: "123 Main Street, Austin, TX 78701"
- Purchase price fills: "$485,000"
- Role shows "Buyer's Agent" pre-selected
- Yellow pulse on "Next" button
- Tooltip: "Brittani extracted all this from your contract — click Next"
- **User action:** Clicks "Next"

### Step 4: Parties (Pre-filled)

- All party fields populate with realistic fake data
- Yellow pulse on "Confirm & Activate" button
- Tooltip: "All parties identified — launch your deal!"
- **User action:** Clicks "Confirm & Activate"

### Step 5: Deal Launched (Transition)

- Brief success/confetti animation
- Tutorial overlay fades out with message: "Your deal is live — explore everything Brittani set up for you"
- Route changes to `/deal/demo-123`
- Free exploration begins

### Tutorial UX Rules

- **Skip button** always visible (top-right "Skip →") for returning visitors
- **Never auto-advances** past a user-action step (only Step 2 auto-advances)
- If user doesn't click within 8s, tooltip pulses more prominently
- Processing messages: same array from real app (`PROCESSING_MESSAGES`)

## Free Exploration Phase

After tutorial completes, user navigates the deal dashboard with React Router:

### Routes

- `/deal/demo-123` — Overview (phases, stats, recent activity)
- `/deal/demo-123/emails` — Email threads
- `/deal/demo-123/documents` — Document list + preview
- `/deal/demo-123/deadlines` — Deadline timeline
- `/deal/demo-123/parties` — Contact cards
- `/deal/demo-123/chat` — Brittani chat panel

### Mock Data: "123 Main Street, Austin, TX 78701"

**Deal:**
- Purchase price: $485,000
- Closing date: Jul 15, 2026
- Current phase: Phase 1 — The Launch
- Role: Buyer's Agent
- Days remaining: 42

**Emails (4 threads):**
1. Welcome & Intro to Seller's Agent — Sent
2. EMD Instructions to Title Company — Draft (awaiting approval)
3. Inspection Scheduling to Buyer — Draft
4. Lender Intro to Lender — Sent

**Documents (3):**
1. Purchase_Agreement_123_Main_St.pdf (2.4 MB)
2. Seller_Disclosure.pdf (1.1 MB)
3. HOA_Docs.pdf (3.8 MB)

**Deadlines (8):**
1. EMD Due — Jun 5 ✅ Complete
2. Option Period Ends — Jun 12 ⏳ (3 days)
3. Inspection Complete — Jun 10
4. Appraisal Due — Jun 20
5. Financing Contingency — Jun 25
6. Title Commitment — Jun 28
7. Final Walkthrough — Jul 13
8. Closing — Jul 15

**Parties (6):**
- Buyer: Sarah & Michael Thompson
- Seller: James Rodriguez
- Buyer's Agent: (the user, pre-filled)
- Seller's Agent: Lisa Chen, Compass Realty
- Title Company: Austin Title Co, Jennifer Park
- Lender: First National Bank, David Kim

**Brittani Chat:**
- Opening message: "Hi! I've set up your deal for 123 Main St. EMD instructions have been sent to title. What would you like to do next?"
- 3 suggested prompts with canned responses:
  - "When is the option period?" → response about Jun 12 deadline
  - "Draft a follow-up to the lender" → shows a mock drafted email
  - "What's next on the timeline?" → summarizes upcoming deadlines
- Custom text input → "Sign up to chat with Brittani for real" CTA

### Interactivity Matrix

| Section | Clickable | State Changes |
|---------|-----------|---------------|
| Emails | Open thread, read full body | Click "Approve" → draft moves to Sent |
| Documents | Click → preview panel opens | View extracted key terms (highlighted) |
| Deadlines | Hover for details | Click checkbox → mark complete |
| Parties | View contact cards | View-only |
| Chat | Click suggested prompts | Canned response appears in chat |
| Overview | View stats and phase | View-only |

## Persistent Elements

**Demo banner (top of page, always visible):**
- Dark background (`#1e293b`), white text
- "You're exploring a demo of Brittani AI · Sign Up Free →"
- Sign Up link goes to the real app's sign-up page
- Fixed position, ~36px height

## Marketing Site Integration

In `brittani-ai-website/src/pages/features.astro`, add an iframe section below `<FeatureHero />`:

```html
<section class="py-16 bg-slate-50">
  <div class="max-w-6xl mx-auto px-6 md:px-8">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-slate-900">Try It Yourself</h2>
      <p class="text-slate-600 mt-2">Create a deal in under 30 seconds — no sign-up required</p>
    </div>
    <div class="rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
      <iframe
        src="https://demo.brittani.ai"
        width="100%"
        height="700"
        frameborder="0"
        allow="clipboard-write"
        loading="lazy"
      ></iframe>
    </div>
  </div>
</section>
```

## Animation Specs

**Yellow Pulse Hotspot:**
- Size: 24px circle
- Color: `#eab308` (Tailwind yellow-500)
- Animation: CSS keyframe, scale 1→1.4→1, opacity 1→0.5→1, 1.5s infinite
- Position: absolute, centered over target element

**Animated Ghost Cursor:**
- macOS-style cursor SVG (black arrow pointer)
- Framer Motion path animation along bezier curve
- Duration: ~1.5s, ease-in-out
- Fades out after demonstrating the motion

**Draggable File Card:**
- White card with drop shadow, PDF icon, filename text
- HTML5 Drag API for desktop, pointer events fallback
- On drag: slight rotation (2deg), increased shadow
- Drop zone: border-color transitions from gray dashed → blue solid on dragenter

**Typewriter Effect:**
- Characters appear one at a time, ~30ms interval
- Slight random delay (±10ms) for realism
- Blinking cursor at end until complete
- Applied to address and price fields in Step 3

**Success Animation (Step 5):**
- Brief confetti burst (lightweight canvas-confetti library or CSS-only)
- Tutorial overlay fades out over 500ms
- Route transition with subtle page slide

## CTA / Sign-Up Redirect

The demo runs inside an iframe on the marketing site. When the user clicks "Sign Up Free →":
- Use `window.open('https://app.brittani.ai/sign-up', '_blank')` to open sign-up in a new tab
- This works from within iframes without needing `postMessage` to the parent
- The `allow="clipboard-write"` on the iframe is sufficient; no additional sandbox attributes needed
- If the demo is accessed directly at `demo.brittani.ai` (not in iframe), the CTA works the same way

## Mobile Considerations

- Drag-and-drop replaced with tap-to-upload on touch devices
- Tutorial tooltips positioned above (not beside) on narrow screens
- iframe height may need to be taller on mobile for scrolling
- Consider a "Open demo in new tab" link below iframe for mobile users
