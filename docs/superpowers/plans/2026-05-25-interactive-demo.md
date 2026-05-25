# Interactive Product Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone interactive demo app at `demo.brittani.ai` that guides visitors through creating a deal, then lets them explore a pre-populated dashboard with semi-interactive mock data.

**Architecture:** Vite + React SPA with React Router for client-side navigation. A `TutorialOverlay` component manages the guided onboarding via a step state machine. All data is static mock — no backend. Deployed to Cloudflare Pages.

**Tech Stack:** Vite 6, React 19, TypeScript, Tailwind CSS v4, React Router 7, Framer Motion, Lucide Icons

---

### Task 1: Scaffold Project

**Files:**
- Create: `brittani-ai-demo/package.json`
- Create: `brittani-ai-demo/vite.config.ts`
- Create: `brittani-ai-demo/tsconfig.json`
- Create: `brittani-ai-demo/index.html`
- Create: `brittani-ai-demo/src/main.tsx`
- Create: `brittani-ai-demo/src/App.tsx`
- Create: `brittani-ai-demo/src/index.css`

- [ ] **Step 1: Create project directory and initialize**

```bash
mkdir -p /Users/brandonlevine/Desktop/AI-Assistant/brittani-ai-demo
cd /Users/brandonlevine/Desktop/AI-Assistant/brittani-ai-demo
git init
npm init -y
```

- [ ] **Step 2: Install dependencies**

```bash
npm install react@19 react-dom@19 react-router@7 framer-motion lucide-react clsx tailwind-merge
npm install -D typescript @types/react @types/react-dom vite @vitejs/plugin-react tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: Create vite.config.ts**

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
```

- [ ] **Step 4: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
```

- [ ] **Step 5: Create index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Brittani AI Demo</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Create src/index.css**

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #0f172a;
  --card: #ffffff;
  --primary: #2563eb;
  --primary-foreground: #ffffff;
  --secondary: #f1f5f9;
  --secondary-foreground: #334155;
  --muted-foreground: #64748b;
  --accent: #f1f5f9;
  --border: #e2e8f0;
  --input: #e2e8f0;
  --ring: #2563eb;
  --destructive: #ef4444;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  background: var(--background);
  color: var(--foreground);
  margin: 0;
}
```

- [ ] **Step 7: Create src/main.tsx**

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 8: Create src/App.tsx with basic router**

```tsx
import { BrowserRouter, Routes, Route } from "react-router";
import { DemoRoot } from "./routes/DemoRoot";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<DemoRoot />} />
      </Routes>
    </BrowserRouter>
  );
}
```

- [ ] **Step 9: Create placeholder DemoRoot**

Create `src/routes/DemoRoot.tsx`:

```tsx
export function DemoRoot() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Brittani AI Demo</h1>
    </div>
  );
}
```

- [ ] **Step 10: Verify it runs**

```bash
npx vite --open
```

Expected: Browser opens to localhost showing "Brittani AI Demo" text.

- [ ] **Step 11: Commit**

```bash
git add .
git commit -m "chore: scaffold Vite + React + Tailwind demo project"
```

---

### Task 2: Utility Functions & Shared UI

**Files:**
- Create: `src/lib/utils.ts`
- Create: `src/components/ui/DemoBanner.tsx`

- [ ] **Step 1: Create src/lib/utils.ts**

Copy utility functions from the real app:

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string | null): string {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function daysUntil(date: Date | string | null): number | null {
  if (!date) return null;
  const target = new Date(date);
  const now = new Date();
  const targetDay = Date.UTC(target.getUTCFullYear(), target.getUTCMonth(), target.getUTCDate());
  const todayDay = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((targetDay - todayDay) / (1000 * 60 * 60 * 24));
}

export function getPhaseLabel(phase: number): string {
  const labels: Record<number, string> = {
    0: "Setup",
    1: "Launch",
    2: "Earnest Money & Disclosures",
    3: "Inspection",
    4: "Financing & Title",
    5: "Pre-Closing",
    6: "Closing & Post-Closing",
  };
  return labels[phase] || "Unknown";
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    draft: "bg-gray-100 text-gray-700",
    approved: "bg-blue-100 text-blue-700",
    sent: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-700",
    launched: "bg-blue-100 text-blue-700",
    active: "bg-green-100 text-green-700",
    closed: "bg-purple-100 text-purple-700",
    cancelled: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
    reminded: "bg-orange-100 text-orange-700",
    completed: "bg-green-100 text-green-700",
    overdue: "bg-red-100 text-red-700",
  };
  return colors[status] || "bg-gray-100 text-gray-700";
}
```

- [ ] **Step 2: Create src/components/ui/DemoBanner.tsx**

```tsx
export function DemoBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-2 bg-[#1e293b] px-4 py-2 text-sm text-white">
      <span className="opacity-90">You're exploring a demo of Brittani AI</span>
      <span className="opacity-50">&middot;</span>
      <a
        href="https://app.brittani.ai/sign-up"
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-blue-300 hover:text-blue-200 transition-colors"
      >
        Sign Up Free &rarr;
      </a>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/utils.ts src/components/ui/DemoBanner.tsx
git commit -m "feat: add utility functions and demo banner component"
```

---

### Task 3: Mock Data

**Files:**
- Create: `src/mock/deal.ts`
- Create: `src/mock/emails.ts`
- Create: `src/mock/documents.ts`
- Create: `src/mock/deadlines.ts`
- Create: `src/mock/parties.ts`
- Create: `src/mock/chat.ts`

- [ ] **Step 1: Create src/mock/deal.ts**

```typescript
export const mockDeal = {
  _id: "demo-123",
  propertyAddress: "123 Main Street, Austin, TX 78701",
  purchasePrice: 485000,
  dealSide: "buy_side" as const,
  currentPhase: 1,
  status: "active",
  createdAt: "2026-06-01T14:00:00.000Z",
  contractAnalysis: {
    analyzedAt: "2026-06-01T14:02:00.000Z",
    closingDate: "2026-07-15",
    optionPeriodEnd: "2026-06-12",
    earnestMoneyDue: "2026-06-05",
    financingContingency: "2026-06-25",
  },
};
```

- [ ] **Step 2: Create src/mock/emails.ts**

```typescript
export interface MockEmail {
  _id: string;
  subject: string;
  to: string;
  toRole: string;
  status: "sent" | "draft";
  body: string;
  sentAt?: string;
  createdAt: string;
}

export const mockEmails: MockEmail[] = [
  {
    _id: "email-1",
    subject: "Welcome & Introduction — 123 Main Street Transaction",
    to: "lisa.chen@compass.com",
    toRole: "Seller's Agent",
    status: "sent",
    body: `Hi Lisa,\n\nI'm reaching out to introduce myself as the buyer's agent for the transaction at 123 Main Street, Austin, TX 78701.\n\nMy clients, Sarah and Michael Thompson, are excited to move forward. I've attached the fully executed purchase agreement for your records.\n\nPlease let me know the best way to coordinate — I'll be sending over EMD details to the title company shortly.\n\nLooking forward to a smooth transaction!\n\nBest regards`,
    sentAt: "2026-06-01T14:30:00.000Z",
    createdAt: "2026-06-01T14:25:00.000Z",
  },
  {
    _id: "email-2",
    subject: "EMD Instructions — 123 Main Street",
    to: "jennifer.park@austintitle.com",
    toRole: "Title Company",
    status: "draft",
    body: `Hi Jennifer,\n\nI'm writing regarding the purchase of 123 Main Street, Austin, TX 78701. My clients, Sarah and Michael Thompson, are the buyers.\n\nCould you please send over the wiring instructions for the earnest money deposit? The EMD amount is $10,000 and is due by June 5th per the contract terms.\n\nPlease confirm receipt once the deposit has been received.\n\nThank you!`,
    createdAt: "2026-06-01T14:28:00.000Z",
  },
  {
    _id: "email-3",
    subject: "Inspection Scheduling — 123 Main Street",
    to: "sarah.thompson@email.com",
    toRole: "Buyer",
    status: "draft",
    body: `Hi Sarah,\n\nGreat news — we're officially under contract on 123 Main Street!\n\nThe next step is scheduling the home inspection. Our option period ends June 12th, so we'll want to get this done by June 10th at the latest.\n\nHere are a couple of inspectors I recommend:\n- Austin Home Inspections (512-555-0123)\n- Lone Star Property Inspectors (512-555-0456)\n\nWould you like me to schedule one of these, or do you have a preferred inspector?\n\nLet me know!`,
    createdAt: "2026-06-01T14:32:00.000Z",
  },
  {
    _id: "email-4",
    subject: "Lender Introduction — 123 Main Street",
    to: "david.kim@firstnational.com",
    toRole: "Lender",
    status: "sent",
    body: `Hi David,\n\nI'm the buyer's agent for the property at 123 Main Street, Austin, TX 78701. My clients, Sarah and Michael Thompson, should have you listed as their lender.\n\nKey details:\n- Purchase price: $485,000\n- Closing date: July 15, 2026\n- Financing contingency deadline: June 25, 2026\n\nPlease let me know if you need anything from my end to keep the loan process on track.\n\nThank you!`,
    sentAt: "2026-06-01T14:35:00.000Z",
    createdAt: "2026-06-01T14:33:00.000Z",
  },
];
```

- [ ] **Step 3: Create src/mock/documents.ts**

```typescript
export interface MockDocument {
  _id: string;
  filename: string;
  size: string;
  uploadedAt: string;
  extractedTerms?: string[];
}

export const mockDocuments: MockDocument[] = [
  {
    _id: "doc-1",
    filename: "Purchase_Agreement_123_Main_St.pdf",
    size: "2.4 MB",
    uploadedAt: "2026-06-01T14:00:00.000Z",
    extractedTerms: [
      "Purchase Price: $485,000",
      "Closing Date: July 15, 2026",
      "Option Period: 10 days",
      "Earnest Money: $10,000",
      "Financing Contingency: 24 days",
    ],
  },
  {
    _id: "doc-2",
    filename: "Seller_Disclosure.pdf",
    size: "1.1 MB",
    uploadedAt: "2026-06-02T09:15:00.000Z",
    extractedTerms: [
      "Roof replaced: 2022",
      "HVAC system: 2020",
      "No known foundation issues",
      "HOA: $150/month",
    ],
  },
  {
    _id: "doc-3",
    filename: "HOA_Docs.pdf",
    size: "3.8 MB",
    uploadedAt: "2026-06-02T09:20:00.000Z",
    extractedTerms: [
      "Monthly dues: $150",
      "Special assessment: None pending",
      "Rental restrictions: 1-year minimum lease",
      "Architectural review required for exterior changes",
    ],
  },
];
```

- [ ] **Step 4: Create src/mock/deadlines.ts**

```typescript
export interface MockDeadline {
  _id: string;
  type: string;
  description: string;
  dueDate: string;
  status: "completed" | "pending" | "overdue";
}

export const mockDeadlines: MockDeadline[] = [
  {
    _id: "dl-1",
    type: "earnest_money",
    description: "Earnest Money Deposit Due",
    dueDate: "2026-06-05T00:00:00.000Z",
    status: "completed",
  },
  {
    _id: "dl-2",
    type: "inspection",
    description: "Home Inspection Complete",
    dueDate: "2026-06-10T00:00:00.000Z",
    status: "pending",
  },
  {
    _id: "dl-3",
    type: "option_period",
    description: "Option Period Ends",
    dueDate: "2026-06-12T00:00:00.000Z",
    status: "pending",
  },
  {
    _id: "dl-4",
    type: "appraisal",
    description: "Appraisal Due",
    dueDate: "2026-06-20T00:00:00.000Z",
    status: "pending",
  },
  {
    _id: "dl-5",
    type: "financing",
    description: "Financing Contingency Deadline",
    dueDate: "2026-06-25T00:00:00.000Z",
    status: "pending",
  },
  {
    _id: "dl-6",
    type: "title",
    description: "Title Commitment Due",
    dueDate: "2026-06-28T00:00:00.000Z",
    status: "pending",
  },
  {
    _id: "dl-7",
    type: "walkthrough",
    description: "Final Walkthrough",
    dueDate: "2026-07-13T00:00:00.000Z",
    status: "pending",
  },
  {
    _id: "dl-8",
    type: "closing",
    description: "Closing",
    dueDate: "2026-07-15T00:00:00.000Z",
    status: "pending",
  },
];
```

- [ ] **Step 5: Create src/mock/parties.ts**

```typescript
export interface MockParty {
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  brokerage?: string;
}

export const mockParties: MockParty[] = [
  {
    role: "Buyer",
    firstName: "Sarah",
    lastName: "Thompson",
    email: "sarah.thompson@email.com",
    phone: "(512) 555-0101",
  },
  {
    role: "Buyer",
    firstName: "Michael",
    lastName: "Thompson",
    email: "michael.thompson@email.com",
    phone: "(512) 555-0102",
  },
  {
    role: "Seller",
    firstName: "James",
    lastName: "Rodriguez",
    email: "james.rodriguez@email.com",
    phone: "(512) 555-0201",
  },
  {
    role: "Seller's Agent",
    firstName: "Lisa",
    lastName: "Chen",
    email: "lisa.chen@compass.com",
    phone: "(512) 555-0301",
    brokerage: "Compass Realty",
  },
  {
    role: "Title Company",
    firstName: "Jennifer",
    lastName: "Park",
    email: "jennifer.park@austintitle.com",
    phone: "(512) 555-0401",
    brokerage: "Austin Title Co",
  },
  {
    role: "Lender",
    firstName: "David",
    lastName: "Kim",
    email: "david.kim@firstnational.com",
    phone: "(512) 555-0501",
    brokerage: "First National Bank",
  },
];
```

- [ ] **Step 6: Create src/mock/chat.ts**

```typescript
export interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  text: string;
}

export const initialMessage: ChatMessage = {
  id: "msg-1",
  role: "assistant",
  text: "Hi! I've set up your deal for 123 Main St. EMD instructions have been sent to title. What would you like to do next?",
};

export const suggestedPrompts = [
  "When is the option period?",
  "Draft a follow-up to the lender",
  "What's next on the timeline?",
] as const;

export const cannedResponses: Record<string, string> = {
  "When is the option period?":
    "The option period for 123 Main Street ends on **June 12, 2026** — that's 3 days from now. The home inspection should be completed by June 10th to give you time to review findings and negotiate any repairs before the period expires.\n\nWould you like me to check on the inspection scheduling status?",
  "Draft a follow-up to the lender":
    "I've drafted a follow-up email to David Kim at First National Bank:\n\n**Subject:** Checking in — 123 Main Street loan status\n\n> Hi David, just checking in on the loan progress for 123 Main Street. The financing contingency deadline is June 25th. Could you provide a status update on the appraisal and underwriting? Let me know if you need anything from our side. Thanks!\n\nWould you like me to send this, or would you like to make changes?",
  "What's next on the timeline?":
    "Here's what's coming up for 123 Main Street:\n\n1. **Home Inspection** — Due June 10 (1 day away)\n2. **Option Period Ends** — June 12 (3 days)\n3. **Appraisal Due** — June 20 (11 days)\n4. **Financing Contingency** — June 25 (16 days)\n\nThe most urgent item is the home inspection. I'd recommend confirming the inspector is scheduled. Would you like me to draft a reminder to the buyers?",
};
```

- [ ] **Step 7: Commit**

```bash
git add src/mock/
git commit -m "feat: add comprehensive mock data for demo deal"
```

---

### Task 4: Tutorial System (Core)

**Files:**
- Create: `src/tutorial/TutorialContext.tsx`
- Create: `src/tutorial/PulseDot.tsx`
- Create: `src/tutorial/Tooltip.tsx`
- Create: `src/tutorial/steps.ts`

- [ ] **Step 1: Create src/tutorial/steps.ts**

```typescript
export type TutorialStep =
  | "drag-hint"
  | "drag-file"
  | "click-upload"
  | "processing"
  | "review-property"
  | "review-parties"
  | "launched"
  | "complete";

export const STEP_ORDER: TutorialStep[] = [
  "drag-hint",
  "drag-file",
  "click-upload",
  "processing",
  "review-property",
  "review-parties",
  "launched",
  "complete",
];

export function nextStep(current: TutorialStep): TutorialStep {
  const idx = STEP_ORDER.indexOf(current);
  if (idx === -1 || idx >= STEP_ORDER.length - 1) return "complete";
  return STEP_ORDER[idx + 1];
}
```

- [ ] **Step 2: Create src/tutorial/TutorialContext.tsx**

```tsx
import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { type TutorialStep, nextStep } from "./steps";

interface TutorialContextType {
  step: TutorialStep;
  isActive: boolean;
  advance: () => void;
  skip: () => void;
  goToStep: (step: TutorialStep) => void;
}

const TutorialContext = createContext<TutorialContextType | null>(null);

export function TutorialProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<TutorialStep>("drag-hint");
  const isActive = step !== "complete";

  const advance = useCallback(() => {
    setStep((current) => nextStep(current));
  }, []);

  const skip = useCallback(() => {
    setStep("complete");
  }, []);

  const goToStep = useCallback((target: TutorialStep) => {
    setStep(target);
  }, []);

  return (
    <TutorialContext.Provider value={{ step, isActive, advance, skip, goToStep }}>
      {children}
    </TutorialContext.Provider>
  );
}

export function useTutorial() {
  const ctx = useContext(TutorialContext);
  if (!ctx) throw new Error("useTutorial must be used within TutorialProvider");
  return ctx;
}
```

- [ ] **Step 3: Create src/tutorial/PulseDot.tsx**

```tsx
import { cn } from "@/lib/utils";

interface PulseDotProps {
  className?: string;
  size?: "sm" | "md";
}

export function PulseDot({ className, size = "md" }: PulseDotProps) {
  const sizeClass = size === "sm" ? "h-4 w-4" : "h-6 w-6";
  return (
    <span className={cn("absolute pointer-events-none", className)}>
      <span
        className={cn(
          "block rounded-full bg-yellow-400 animate-[pulse-dot_1.5s_ease-in-out_infinite]",
          sizeClass
        )}
      />
    </span>
  );
}
```

- [ ] **Step 4: Create src/tutorial/Tooltip.tsx**

```tsx
import { cn } from "@/lib/utils";

interface TooltipProps {
  text: string;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function Tooltip({ text, position = "bottom", className }: TooltipProps) {
  const positionClasses = {
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    left: "right-full mr-2 top-1/2 -translate-y-1/2",
    right: "left-full ml-2 top-1/2 -translate-y-1/2",
  };

  return (
    <div
      className={cn(
        "absolute z-50 whitespace-nowrap rounded-lg bg-[#1e293b] px-3 py-2 text-sm text-white shadow-lg",
        positionClasses[position],
        className
      )}
    >
      {text}
    </div>
  );
}
```

- [ ] **Step 5: Add pulse-dot keyframe to src/index.css**

Add to the bottom of `src/index.css`:

```css
@keyframes pulse-dot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.5; }
}
```

- [ ] **Step 6: Commit**

```bash
git add src/tutorial/ src/index.css
git commit -m "feat: add tutorial context, pulse dot, and tooltip components"
```

---

### Task 5: Tutorial — Draggable File & Animated Cursor

**Files:**
- Create: `src/tutorial/DraggableFile.tsx`
- Create: `src/tutorial/AnimatedCursor.tsx`

- [ ] **Step 1: Create src/tutorial/AnimatedCursor.tsx**

```tsx
import { motion } from "framer-motion";

interface AnimatedCursorProps {
  onComplete: () => void;
}

export function AnimatedCursor({ onComplete }: AnimatedCursorProps) {
  return (
    <motion.div
      className="absolute z-[100] pointer-events-none"
      initial={{ x: 300, y: -50, opacity: 0 }}
      animate={[
        { x: 300, y: -50, opacity: 1 },
        { x: 150, y: 80 },
        { x: 50, y: 120 },
        { x: 50, y: 120, opacity: 0 },
      ]}
      transition={{
        duration: 1.5,
        ease: "easeInOut",
        times: [0, 0.3, 0.7, 1],
      }}
      onAnimationComplete={onComplete}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 3l14 8-6 1-4 6-4-15z"
          fill="#1e293b"
          stroke="white"
          strokeWidth="1.5"
        />
      </svg>
      <div className="absolute top-4 left-4 w-16 h-10 bg-white border border-gray-200 rounded shadow-md flex items-center gap-1 px-2">
        <span className="text-red-500 text-xs">PDF</span>
        <span className="text-[8px] text-gray-500 truncate">Contract.pdf</span>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Create src/tutorial/DraggableFile.tsx**

```tsx
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { PulseDot } from "./PulseDot";

interface DraggableFileProps {
  onDropped: () => void;
}

export function DraggableFile({ onDropped }: DraggableFileProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isDropped, setIsDropped] = useState(false);
  const isTouchDevice = "ontouchstart" in window;
  const ref = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData("text/plain", "demo-file");
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    if (isTouchDevice) {
      setIsDropped(true);
      onDropped();
    }
  };

  if (isDropped) return null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-6 top-1/3 z-40"
    >
      <div className="relative">
        <PulseDot className="-top-2 -right-2" size="sm" />
        <div
          draggable={!isTouchDevice}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onClick={handleClick}
          className={`cursor-grab active:cursor-grabbing bg-white border-2 border-gray-200 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow ${
            isDragging ? "opacity-50 rotate-2 scale-105" : ""
          }`}
        >
          <FileText className="h-10 w-10 text-red-500 mx-auto" />
          <p className="mt-2 text-xs font-medium text-gray-700 text-center max-w-[120px]">
            Purchase_Agreement
            <br />
            _123_Main_St.pdf
          </p>
          <p className="mt-1 text-[10px] text-gray-400 text-center">2.4 MB</p>
        </div>
        <p className="mt-2 text-xs text-gray-500 text-center font-medium">
          {isTouchDevice ? "Tap to upload" : "Drag me to upload"}
        </p>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/tutorial/DraggableFile.tsx src/tutorial/AnimatedCursor.tsx
git commit -m "feat: add draggable file card and animated cursor hint"
```

---

### Task 6: New Deal Wizard (Tutorial-Aware)

**Files:**
- Create: `src/routes/NewDeal.tsx`

- [ ] **Step 1: Create src/routes/NewDeal.tsx**

This is adapted from the real app's `deals/new/page.tsx`, with API calls removed and tutorial hooks added:

```tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  Loader2,
  MapPin,
  Users,
  FileText,
  Check,
  Rocket,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTutorial } from "@/tutorial/TutorialContext";
import { DraggableFile } from "@/tutorial/DraggableFile";
import { AnimatedCursor } from "@/tutorial/AnimatedCursor";
import { PulseDot } from "@/tutorial/PulseDot";
import { Tooltip } from "@/tutorial/Tooltip";
import { mockParties } from "@/mock/parties";

type DealSide = "buy_side" | "sell_side" | "dual";

const STEPS = [
  { label: "Upload", icon: Upload },
  { label: "Processing", icon: Loader2 },
  { label: "Property", icon: MapPin },
  { label: "Parties", icon: Users },
];

const PROCESSING_MESSAGES = [
  "Reading through your contract...",
  "Circling the key terms...",
  "Identifying all the parties involved...",
  "Highlighting important dates...",
  "Checking the fine print...",
  "Extracting the purchase price...",
  "Reviewing contingencies...",
  "Finding inspection deadlines...",
  "Mapping out the closing timeline...",
  "Almost there, dotting the i's...",
];

export function NewDeal() {
  const navigate = useNavigate();
  const { step: tutorialStep, advance, isActive } = useTutorial();
  const [wizardStep, setWizardStep] = useState(0);
  const [dealSide] = useState<DealSide>("buy_side");
  const [fileDropped, setFileDropped] = useState(false);
  const [processingMessage, setProcessingMessage] = useState(PROCESSING_MESSAGES[0]);
  const [propertyAddress, setPropertyAddress] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");

  // Typewriter effect for property step
  useEffect(() => {
    if (wizardStep === 2 && !propertyAddress) {
      const address = "123 Main Street, Austin, TX 78701";
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setPropertyAddress(address.slice(0, i));
        if (i >= address.length) clearInterval(interval);
      }, 30);
      setTimeout(() => setPurchasePrice("485000"), address.length * 30 + 200);
      return () => clearInterval(interval);
    }
  }, [wizardStep, propertyAddress]);

  // Processing auto-advance
  useEffect(() => {
    if (wizardStep === 1) {
      let msgIdx = 0;
      const msgInterval = setInterval(() => {
        msgIdx++;
        setProcessingMessage(PROCESSING_MESSAGES[msgIdx % PROCESSING_MESSAGES.length]);
      }, 700);
      const timer = setTimeout(() => {
        clearInterval(msgInterval);
        setWizardStep(2);
        if (isActive) advance();
      }, 5000);
      return () => {
        clearInterval(msgInterval);
        clearTimeout(timer);
      };
    }
  }, [wizardStep, isActive, advance]);

  const handleFileDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setFileDropped(true);
      if (tutorialStep === "drag-file") advance();
    },
    [tutorialStep, advance]
  );

  const handleFileDropped = useCallback(() => {
    setFileDropped(true);
    if (tutorialStep === "drag-file") advance();
  }, [tutorialStep, advance]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleUploadClick = () => {
    setWizardStep(1);
    if (tutorialStep === "click-upload") advance();
  };

  const handleNext = () => {
    setWizardStep(3);
    if (tutorialStep === "review-property") advance();
  };

  const handleLaunch = () => {
    if (tutorialStep === "review-parties") advance();
    setTimeout(() => {
      navigate("/deal/demo-123");
    }, 1500);
  };

  const priceDisplay = purchasePrice
    ? new Intl.NumberFormat("en-US").format(parseInt(purchasePrice, 10))
    : "";

  return (
    <div className="mx-auto max-w-3xl space-y-6 pt-14 px-4">
      {/* Animated cursor hint */}
      {tutorialStep === "drag-hint" && (
        <AnimatedCursor onComplete={advance} />
      )}

      {/* Draggable file card */}
      {(tutorialStep === "drag-file" || tutorialStep === "click-upload") &&
        !fileDropped && (
          <DraggableFile onDropped={handleFileDropped} />
        )}

      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">New Deal</h1>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between">
        {STEPS.map((s, i) => (
          <div key={s.label} className="flex items-center">
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors",
                i <= wizardStep
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                  : "bg-[var(--secondary)] text-[var(--muted-foreground)]"
              )}
            >
              {i < wizardStep ? (
                <Check className="h-4 w-4" />
              ) : (
                <s.icon className={cn("h-4 w-4", i === 1 && wizardStep === 1 && "animate-spin")} />
              )}
            </div>
            <span
              className={cn(
                "ml-2 text-sm font-medium hidden sm:block",
                i <= wizardStep ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)]"
              )}
            >
              {s.label}
            </span>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-3 h-px w-8 sm:w-16",
                  i < wizardStep ? "bg-[var(--primary)]" : "bg-[var(--border)]"
                )}
              />
            )}
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        {/* Step 0: Upload */}
        {wizardStep === 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Upload Contracts</h2>
            <p className="text-sm text-[var(--muted-foreground)]">
              Upload the purchase agreement and any addenda. Our AI will extract property details,
              party information, dates, and key terms.
            </p>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)]">Your Role</label>
              <div className="mt-2 grid grid-cols-3 gap-3">
                {([
                  { value: "buy_side", label: "Buyer's Agent" },
                  { value: "sell_side", label: "Seller's Agent" },
                  { value: "dual", label: "Transactional Agent" },
                ] as const).map((opt) => (
                  <div
                    key={opt.value}
                    className={cn(
                      "rounded-lg border px-4 py-3 text-sm font-medium text-center transition-colors",
                      dealSide === opt.value
                        ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]"
                        : "border-[var(--border)] text-[var(--muted-foreground)]"
                    )}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            </div>

            <div
              className={cn(
                "flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 transition-colors",
                fileDropped
                  ? "border-green-400 bg-green-50"
                  : "border-[var(--border)] hover:border-[var(--primary)]"
              )}
              onDragOver={handleDragOver}
              onDrop={handleFileDrop}
            >
              <Upload className="h-10 w-10 text-[var(--muted-foreground)]" />
              <p className="mt-3 text-sm font-medium text-[var(--foreground)]">
                {fileDropped ? "File uploaded!" : "Drop your contract here"}
              </p>
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">PDF files up to 25MB each</p>
            </div>

            {fileDropped && (
              <div className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--secondary)] px-3 py-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-[var(--foreground)]">
                    Purchase_Agreement_123_Main_St.pdf
                  </span>
                  <span className="text-xs text-[var(--muted-foreground)]">2.4 MB</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 1: Processing */}
        {wizardStep === 1 && (
          <div className="flex flex-col items-center justify-center py-16 space-y-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[var(--primary)]/10 animate-ping" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)]/10">
                <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" />
              </div>
            </div>
            <div className="space-y-2 text-center">
              <h2 className="text-lg font-semibold text-[var(--foreground)]">Brittani is on it</h2>
              <p className="text-sm text-[var(--primary)] font-medium min-h-[20px] transition-all duration-300">
                {processingMessage}
              </p>
              <p className="text-xs text-[var(--muted-foreground)] pt-2">
                This usually takes under 30 seconds
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Property */}
        {wizardStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Review Property Details</h2>
            <p className="text-sm text-[var(--muted-foreground)]">
              These details were extracted from your contracts. Please review and correct if needed.
            </p>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)]">
                Property Address
              </label>
              <input
                type="text"
                value={propertyAddress}
                readOnly
                className="mt-1 w-full rounded-lg border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)]">
                Purchase Price
              </label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-2 text-sm text-[var(--muted-foreground)]">$</span>
                <input
                  type="text"
                  value={priceDisplay}
                  readOnly
                  className="w-full rounded-lg border border-[var(--input)] bg-[var(--background)] pl-7 pr-3 py-2 text-sm text-[var(--foreground)]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Parties */}
        {wizardStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Review Party Information</h2>
            <p className="text-sm text-[var(--muted-foreground)]">
              These contacts were extracted from your contracts.
            </p>
            {mockParties.map((party) => (
              <div key={`${party.role}-${party.lastName}`} className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4">
                <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2">{party.role}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-[var(--muted-foreground)]">
                  <span>{party.firstName} {party.lastName}</span>
                  <span>{party.email}</span>
                  <span>{party.phone}</span>
                  {party.brokerage && <span>{party.brokerage}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pb-8">
        <div />
        <div className="flex gap-3">
          {wizardStep === 0 && (
            <div className="relative">
              {fileDropped && tutorialStep === "click-upload" && (
                <>
                  <PulseDot className="-top-2 -right-2" size="sm" />
                  <Tooltip text="Click to start the AI analysis" position="top" />
                </>
              )}
              <button
                onClick={handleUploadClick}
                disabled={!fileDropped}
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                <Upload className="h-4 w-4" /> Upload & Analyze
              </button>
            </div>
          )}
          {wizardStep === 2 && (
            <div className="relative">
              {tutorialStep === "review-property" && (
                <>
                  <PulseDot className="-top-2 -right-2" size="sm" />
                  <Tooltip text="Brittani extracted all this — click Next" position="top" />
                </>
              )}
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90 transition-opacity"
              >
                Next <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
          {wizardStep === 3 && (
            <div className="relative">
              {tutorialStep === "review-parties" && (
                <>
                  <PulseDot className="-top-2 -right-2" size="sm" />
                  <Tooltip text="All parties identified — launch your deal!" position="top" />
                </>
              )}
              <button
                onClick={handleLaunch}
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90 transition-opacity"
              >
                <Rocket className="h-4 w-4" /> Confirm & Activate
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/routes/NewDeal.tsx
git commit -m "feat: add new deal wizard with tutorial integration"
```

---

### Task 7: Deal Dashboard (Exploration Phase)

**Files:**
- Create: `src/routes/DealLayout.tsx`
- Create: `src/routes/DealDashboard.tsx`

- [ ] **Step 1: Create src/routes/DealLayout.tsx**

```tsx
import { NavLink, Outlet } from "react-router";
import { cn } from "@/lib/utils";
import { mockDeal } from "@/mock/deal";

const tabs = [
  { label: "Overview", to: "/deal/demo-123" },
  { label: "Emails", to: "/deal/demo-123/emails" },
  { label: "Documents", to: "/deal/demo-123/documents" },
  { label: "Deadlines", to: "/deal/demo-123/deadlines" },
  { label: "Brittani", to: "/deal/demo-123/chat" },
];

export function DealLayout() {
  return (
    <div className="space-y-4 pt-14 px-4 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">{mockDeal.propertyAddress}</h1>
        <p className="text-sm text-[var(--muted-foreground)]">
          Buyer&apos;s Agent &middot; ${mockDeal.purchasePrice.toLocaleString()}
        </p>
      </div>
      <nav className="flex gap-1 border-b border-[var(--border)] pb-px overflow-x-auto">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === "/deal/demo-123"}
            className={({ isActive }) =>
              cn(
                "rounded-t-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                isActive
                  ? "bg-[var(--primary)]/10 text-[var(--primary)] border-b-2 border-[var(--primary)]"
                  : "text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--foreground)]"
              )
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
```

- [ ] **Step 2: Create src/routes/DealDashboard.tsx**

```tsx
import { mockDeal } from "@/mock/deal";
import { mockDeadlines } from "@/mock/deadlines";
import { mockParties } from "@/mock/parties";
import { formatCurrency, formatDate, daysUntil, getPhaseLabel } from "@/lib/utils";

export function DealDashboard() {
  const phases = [0, 1, 2, 3, 4, 5, 6];
  const closingDate = mockDeal.contractAnalysis.closingDate;
  const daysLeft = daysUntil(closingDate);

  return (
    <div className="space-y-6">
      {/* Phase Progress */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
        <h2 className="text-sm font-semibold text-[var(--foreground)] mb-3">Transaction Progress</h2>
        <div className="flex items-center gap-1">
          {phases.map((phase) => (
            <div key={phase} className="flex-1">
              <div
                className={`h-2 rounded-full ${
                  phase < mockDeal.currentPhase
                    ? "bg-[var(--primary)]"
                    : phase === mockDeal.currentPhase
                    ? "bg-[var(--primary)]/60"
                    : "bg-[var(--secondary)]"
                }`}
              />
              <p className="mt-1 text-[10px] text-[var(--muted-foreground)] hidden sm:block">
                {getPhaseLabel(phase)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-center">
          <p className="text-xs text-[var(--muted-foreground)]">Purchase Price</p>
          <p className="text-xl font-bold text-[var(--foreground)]">
            {formatCurrency(mockDeal.purchasePrice)}
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-center">
          <p className="text-xs text-[var(--muted-foreground)]">Closing Date</p>
          <p className="text-xl font-bold text-[var(--foreground)]">
            {formatDate(closingDate)}
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-center">
          <p className="text-xs text-[var(--muted-foreground)]">Days Remaining</p>
          <p className="text-xl font-bold text-[var(--foreground)]">{daysLeft}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Deadlines */}
        <div className="lg:col-span-2 rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
          <h2 className="text-sm font-semibold text-[var(--foreground)] mb-3">Upcoming Deadlines</h2>
          <div className="space-y-2">
            {mockDeadlines.slice(0, 4).map((dl) => {
              const days = daysUntil(dl.dueDate);
              return (
                <div key={dl._id} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
                  <div className="flex items-center gap-2">
                    <span className={dl.status === "completed" ? "text-green-500" : "text-[var(--muted-foreground)]"}>
                      {dl.status === "completed" ? "✓" : "○"}
                    </span>
                    <span className={`text-sm ${dl.status === "completed" ? "line-through text-[var(--muted-foreground)]" : "text-[var(--foreground)]"}`}>
                      {dl.description}
                    </span>
                  </div>
                  <span className="text-xs text-[var(--muted-foreground)]">
                    {days !== null && days <= 3 && days >= 0 ? (
                      <span className="text-orange-600 font-medium">{days}d left</span>
                    ) : (
                      formatDate(dl.dueDate)
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Parties */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
          <h2 className="text-sm font-semibold text-[var(--foreground)] mb-3">Parties</h2>
          <div className="space-y-3">
            {mockParties.slice(0, 4).map((party) => (
              <div key={`${party.role}-${party.lastName}`} className="text-sm">
                <p className="font-medium text-[var(--foreground)]">
                  {party.firstName} {party.lastName}
                </p>
                <p className="text-xs text-[var(--muted-foreground)]">{party.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/routes/DealLayout.tsx src/routes/DealDashboard.tsx
git commit -m "feat: add deal layout with tabs and dashboard overview"
```

---

### Task 8: Emails Tab

**Files:**
- Create: `src/routes/DealEmails.tsx`

- [ ] **Step 1: Create src/routes/DealEmails.tsx**

```tsx
import { useState } from "react";
import { Mail, Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockEmails, type MockEmail } from "@/mock/emails";
import { formatDate, getStatusColor } from "@/lib/utils";

export function DealEmails() {
  const [emails, setEmails] = useState<MockEmail[]>(mockEmails);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleApprove = (emailId: string) => {
    setEmails((prev) =>
      prev.map((e) =>
        e._id === emailId
          ? { ...e, status: "sent" as const, sentAt: new Date().toISOString() }
          : e
      )
    );
  };

  const drafts = emails.filter((e) => e.status === "draft");
  const sent = emails.filter((e) => e.status === "sent");

  return (
    <div className="space-y-6">
      {/* Drafts */}
      {drafts.length > 0 && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">
            {drafts.length} Draft{drafts.length > 1 ? "s" : ""} Pending Review
          </h2>
          <div className="space-y-3">
            {drafts.map((email) => (
              <div key={email._id} className="rounded-lg border border-blue-200 bg-white p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-[var(--foreground)]">{email.subject}</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">
                      To: {email.to} ({email.toRole})
                    </p>
                  </div>
                  <button
                    onClick={() => handleApprove(email._id)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700 transition-colors"
                  >
                    <Check className="h-3 w-3" /> Approve & Send
                  </button>
                </div>
                <button
                  onClick={() => setExpandedId(expandedId === email._id ? null : email._id)}
                  className="mt-2 text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  {expandedId === email._id ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  {expandedId === email._id ? "Hide" : "Preview"}
                </button>
                {expandedId === email._id && (
                  <pre className="mt-3 text-sm text-[var(--foreground)] whitespace-pre-wrap bg-gray-50 rounded-lg p-3 border border-gray-100">
                    {email.body}
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sent */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)]">
        <div className="border-b border-[var(--border)] px-5 py-4">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">All Communications</h2>
        </div>
        {sent.length === 0 ? (
          <div className="flex flex-col items-center py-12">
            <Mail className="h-10 w-10 text-[var(--muted-foreground)]" />
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">No sent emails yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-[var(--border)]">
            {sent.map((email) => (
              <div key={email._id} className="px-5 py-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-[var(--foreground)]">{email.subject}</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">
                      To: {email.to} ({email.toRole}) &middot; {formatDate(email.sentAt || email.createdAt)}
                    </p>
                  </div>
                  <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", getStatusColor(email.status))}>
                    {email.status}
                  </span>
                </div>
                <button
                  onClick={() => setExpandedId(expandedId === email._id ? null : email._id)}
                  className="mt-2 text-xs text-[var(--primary)] hover:text-[var(--primary)]/80 flex items-center gap-1"
                >
                  {expandedId === email._id ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  {expandedId === email._id ? "Hide" : "Read"}
                </button>
                {expandedId === email._id && (
                  <pre className="mt-3 text-sm text-[var(--foreground)] whitespace-pre-wrap bg-gray-50 rounded-lg p-3 border border-gray-100">
                    {email.body}
                  </pre>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/routes/DealEmails.tsx
git commit -m "feat: add emails tab with draft approval interaction"
```

---

### Task 9: Documents Tab

**Files:**
- Create: `src/routes/DealDocuments.tsx`

- [ ] **Step 1: Create src/routes/DealDocuments.tsx**

```tsx
import { useState } from "react";
import { FileText, X } from "lucide-react";
import { mockDocuments, type MockDocument } from "@/mock/documents";
import { formatDate } from "@/lib/utils";

export function DealDocuments() {
  const [selectedDoc, setSelectedDoc] = useState<MockDocument | null>(null);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)]">
        <div className="border-b border-[var(--border)] px-5 py-4">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Deal Documents</h2>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {mockDocuments.map((doc) => (
            <button
              key={doc._id}
              onClick={() => setSelectedDoc(doc)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-[var(--accent)]/50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-red-500" />
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)]">{doc.filename}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Uploaded {formatDate(doc.uploadedAt)} &middot; {doc.size}
                  </p>
                </div>
              </div>
              <span className="text-xs text-[var(--primary)]">View &rarr;</span>
            </button>
          ))}
        </div>
      </div>

      {/* Document Preview Panel */}
      {selectedDoc && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">{selectedDoc.filename}</h3>
            <button
              onClick={() => setSelectedDoc(null)}
              className="rounded-lg p-1.5 hover:bg-[var(--accent)]"
            >
              <X className="h-4 w-4 text-[var(--muted-foreground)]" />
            </button>
          </div>
          {selectedDoc.extractedTerms && (
            <div>
              <p className="text-xs font-medium text-[var(--muted-foreground)] uppercase mb-2">
                Extracted Key Terms
              </p>
              <div className="space-y-2">
                {selectedDoc.extractedTerms.map((term, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-lg bg-yellow-50 border border-yellow-200 px-3 py-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                    <span className="text-sm text-[var(--foreground)]">{term}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/routes/DealDocuments.tsx
git commit -m "feat: add documents tab with extracted terms preview"
```

---

### Task 10: Deadlines Tab

**Files:**
- Create: `src/routes/DealDeadlines.tsx`

- [ ] **Step 1: Create src/routes/DealDeadlines.tsx**

```tsx
import { useState } from "react";
import { CheckCircle2, Circle, AlertTriangle } from "lucide-react";
import { mockDeadlines, type MockDeadline } from "@/mock/deadlines";
import { formatDate, daysUntil, getStatusColor } from "@/lib/utils";

export function DealDeadlines() {
  const [deadlines, setDeadlines] = useState<MockDeadline[]>(mockDeadlines);

  const toggleComplete = (id: string) => {
    setDeadlines((prev) =>
      prev.map((dl) =>
        dl._id === id
          ? { ...dl, status: dl.status === "completed" ? "pending" : "completed" }
          : dl
      )
    );
  };

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)]">
      <div className="divide-y divide-[var(--border)]">
        {deadlines.map((dl) => {
          const days = daysUntil(dl.dueDate);
          return (
            <div key={dl._id} className="flex items-start gap-4 px-5 py-4 hover:bg-[var(--accent)]/30 transition-colors">
              <button
                onClick={() => toggleComplete(dl._id)}
                className="mt-0.5 shrink-0 cursor-pointer"
              >
                {dl.status === "completed" ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : days !== null && days <= 3 && days >= 0 ? (
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                ) : (
                  <Circle className="h-5 w-5 text-[var(--muted-foreground)]" />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p
                    className={`text-sm font-medium ${
                      dl.status === "completed"
                        ? "text-[var(--muted-foreground)] line-through"
                        : "text-[var(--foreground)]"
                    }`}
                  >
                    {dl.description}
                  </p>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(dl.status)}`}>
                    {dl.status}
                  </span>
                </div>
                <div className="mt-1 text-sm text-[var(--muted-foreground)]">
                  Due: {formatDate(dl.dueDate)}
                  {days !== null && dl.status !== "completed" && (
                    <span
                      className={
                        days <= 3 && days >= 0
                          ? " text-orange-600 font-medium"
                          : days < 0
                          ? " text-red-600 font-medium"
                          : ""
                      }
                    >
                      {" "}&middot;{" "}
                      {days === 0 ? "Due today" : days < 0 ? `${Math.abs(days)} days overdue` : `${days} days remaining`}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-[var(--muted-foreground)] capitalize">
                  Type: {dl.type.replace(/_/g, " ")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/routes/DealDeadlines.tsx
git commit -m "feat: add deadlines tab with toggle-complete interaction"
```

---

### Task 11: Brittani Chat Tab

**Files:**
- Create: `src/routes/DealChat.tsx`

- [ ] **Step 1: Create src/routes/DealChat.tsx**

```tsx
import { useState } from "react";
import { Bot, User, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  initialMessage,
  suggestedPrompts,
  cannedResponses,
  type ChatMessage,
} from "@/mock/chat";

export function DealChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [inputValue, setInputValue] = useState("");
  const [usedPrompts, setUsedPrompts] = useState<Set<string>>(new Set());

  const handleSend = (text: string) => {
    const userMsg: ChatMessage = { id: `msg-${Date.now()}`, role: "user", text };
    const response = cannedResponses[text];

    if (response) {
      setUsedPrompts((prev) => new Set([...prev, text]));
      setMessages((prev) => [
        ...prev,
        userMsg,
        { id: `msg-${Date.now() + 1}`, role: "assistant", text: response },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        userMsg,
        {
          id: `msg-${Date.now() + 1}`,
          role: "assistant",
          text: "I'd love to help with that! In the full version, I can answer any question about your deal, draft emails, update deadlines, and more.\n\n**[Sign up to chat with Brittani for real →](https://app.brittani.ai/sign-up)**",
        },
      ]);
    }
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim()) handleSend(inputValue.trim());
    }
  };

  const availablePrompts = suggestedPrompts.filter((p) => !usedPrompts.has(p));

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] flex flex-col h-[500px]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn("flex gap-2", msg.role === "user" ? "flex-row-reverse" : "flex-row")}
          >
            <div
              className={cn(
                "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full",
                msg.role === "user"
                  ? "bg-[var(--secondary)] text-[var(--secondary-foreground)]"
                  : "bg-[var(--primary)] text-white"
              )}
            >
              {msg.role === "user" ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
            </div>
            <div
              className={cn(
                "max-w-[85%] rounded-lg px-3 py-2 text-sm",
                msg.role === "user"
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--secondary)] text-[var(--secondary-foreground)]"
              )}
            >
              <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{
                __html: msg.text
                  .replace(/\*\*\[(.+?)\]\((.+?)\)\*\*/g, '<a href="$2" target="_blank" class="font-semibold text-blue-600 hover:underline">$1</a>')
                  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\n/g, '<br>')
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Prompts */}
      {availablePrompts.length > 0 && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {availablePrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-xs text-[var(--foreground)] hover:bg-[var(--accent)] transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="border-t border-[var(--border)] px-4 py-3">
        <div className="flex items-end gap-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Brittani..."
            rows={1}
            className="flex-1 resize-none rounded-lg border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
          />
          <button
            onClick={() => inputValue.trim() && handleSend(inputValue.trim())}
            disabled={!inputValue.trim()}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--primary)] text-white disabled:opacity-50 hover:bg-[var(--primary)]/90 transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/routes/DealChat.tsx
git commit -m "feat: add Brittani chat tab with canned responses and sign-up CTA"
```

---

### Task 12: Wire Up Router & DemoRoot

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/routes/DemoRoot.tsx`

- [ ] **Step 1: Update src/App.tsx with full routing**

```tsx
import { BrowserRouter, Routes, Route } from "react-router";
import { TutorialProvider } from "./tutorial/TutorialContext";
import { DemoRoot } from "./routes/DemoRoot";
import { NewDeal } from "./routes/NewDeal";
import { DealLayout } from "./routes/DealLayout";
import { DealDashboard } from "./routes/DealDashboard";
import { DealEmails } from "./routes/DealEmails";
import { DealDocuments } from "./routes/DealDocuments";
import { DealDeadlines } from "./routes/DealDeadlines";
import { DealChat } from "./routes/DealChat";

export function App() {
  return (
    <TutorialProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DemoRoot />}>
            <Route index element={<NewDeal />} />
            <Route path="deal/demo-123" element={<DealLayout />}>
              <Route index element={<DealDashboard />} />
              <Route path="emails" element={<DealEmails />} />
              <Route path="documents" element={<DealDocuments />} />
              <Route path="deadlines" element={<DealDeadlines />} />
              <Route path="chat" element={<DealChat />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </TutorialProvider>
  );
}
```

- [ ] **Step 2: Update src/routes/DemoRoot.tsx**

```tsx
import { Outlet } from "react-router";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { useTutorial } from "@/tutorial/TutorialContext";

export function DemoRoot() {
  const { isActive, skip } = useTutorial();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <DemoBanner />
      {isActive && (
        <button
          onClick={skip}
          className="fixed top-12 right-4 z-50 rounded-lg bg-white/90 border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] shadow-sm transition-colors"
        >
          Skip Tutorial &rarr;
        </button>
      )}
      <Outlet />
    </div>
  );
}
```

- [ ] **Step 3: Verify it compiles and routes work**

```bash
npx tsc --noEmit && npx vite
```

Expected: App loads, tutorial begins, navigation works between routes.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx src/routes/DemoRoot.tsx
git commit -m "feat: wire up router with all routes and tutorial skip button"
```

---

### Task 13: Cloudflare Pages Config & SPA Fallback

**Files:**
- Create: `public/_redirects`
- Create: `.gitignore`
- Update: `package.json` (add scripts)

- [ ] **Step 1: Create public/_redirects for SPA routing**

```
/* /index.html 200
```

- [ ] **Step 2: Create .gitignore**

```
node_modules
dist
.env
.env.local
```

- [ ] **Step 3: Add scripts to package.json**

Update the `scripts` section in `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview"
  }
}
```

- [ ] **Step 4: Verify production build**

```bash
npm run build
```

Expected: Builds successfully, outputs to `dist/`.

- [ ] **Step 5: Commit**

```bash
git add public/_redirects .gitignore package.json
git commit -m "chore: add Cloudflare Pages SPA config and build scripts"
```

---

### Task 14: Create GitHub Repo & Deploy Setup

**Files:** None (GitHub + Cloudflare configuration)

- [ ] **Step 1: Create GitHub repo**

```bash
gh repo create brittani-ai/brittani-ai-demo --private --source=. --remote=origin --push
```

- [ ] **Step 2: Push all work**

```bash
git push -u origin main
```

- [ ] **Step 3: Document Cloudflare Pages setup**

Create a comment or note that the user needs to:
1. Go to Cloudflare Pages dashboard
2. Connect `brittani-ai/brittani-ai-demo` repo
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add custom domain: `demo.brittani.ai`
6. Configure headers (in `public/_headers`):

Create `public/_headers`:
```
/*
  X-Frame-Options: ALLOW-FROM https://brittani.ai
  Content-Security-Policy: frame-ancestors 'self' https://brittani.ai
```

- [ ] **Step 4: Commit headers**

```bash
git add public/_headers
git commit -m "chore: add security headers for iframe embedding"
git push
```

---

### Task 15: Marketing Site Integration

**Files:**
- Modify: `/Users/brandonlevine/Desktop/AI-Assistant/britanni-ai-website/src/pages/features.astro`

- [ ] **Step 1: Add interactive demo section to features page**

Add below `<FeatureHero />` in `features.astro`:

```astro
<!-- Interactive Demo -->
<section class="py-16 bg-slate-50">
  <div class="max-w-6xl mx-auto px-6 md:px-8">
    <div class="text-center mb-8">
      <p class="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-2">Try It Now</p>
      <h2 class="text-3xl md:text-4xl font-bold text-slate-900">See Brittani in Action</h2>
      <p class="text-slate-600 mt-2 max-w-xl mx-auto">Create a deal in under 30 seconds — no sign-up required</p>
    </div>

    <!-- Desktop: iframe -->
    <div class="hidden md:block rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
      <iframe
        src="https://demo.brittani.ai"
        width="100%"
        height="700"
        frameborder="0"
        allow="clipboard-write"
        loading="lazy"
        title="Brittani AI Interactive Demo"
      ></iframe>
    </div>

    <!-- Mobile: screenshot + CTA -->
    <div class="md:hidden">
      <div class="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white p-4">
        <div class="bg-slate-100 rounded-xl h-64 flex items-center justify-center">
          <div class="text-center">
            <p class="text-4xl mb-2">✨</p>
            <p class="text-sm font-medium text-slate-700">Interactive Demo</p>
            <p class="text-xs text-slate-500 mt-1">Best experienced on desktop</p>
          </div>
        </div>
      </div>
      <div class="text-center mt-4">
        <a
          href="https://demo.brittani.ai"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/25"
        >
          Try the Interactive Demo &rarr;
        </a>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit on marketing site**

```bash
cd /Users/brandonlevine/Desktop/AI-Assistant/britanni-ai-website
git add src/pages/features.astro
git commit -m "feat: add interactive demo iframe section to features page"
```

---

### Task 16: End-to-End Verification

- [ ] **Step 1: Run the demo app locally**

```bash
cd /Users/brandonlevine/Desktop/AI-Assistant/brittani-ai-demo
npm run dev
```

- [ ] **Step 2: Manual test — Tutorial flow**

Walk through in the browser:
1. Ghost cursor animation plays
2. Draggable file card appears — drag it to the upload zone
3. File appears in list, "Upload & Analyze" button pulses
4. Click it — processing animation runs for ~5s
5. Property fields typewriter-fill, "Next" button pulses
6. Click Next — parties show, "Confirm & Activate" pulses
7. Click it — navigates to `/deal/demo-123`

- [ ] **Step 3: Manual test — Exploration**

1. Browse each tab (Overview, Emails, Documents, Deadlines, Brittani)
2. Approve an email draft — confirm it moves to Sent
3. Click a document — confirm extracted terms show
4. Toggle a deadline complete — confirm UI updates
5. Click a suggested chat prompt — confirm canned response
6. Type custom text in chat — confirm sign-up CTA response
7. Click "Sign Up Free" in banner — confirm opens in new tab

- [ ] **Step 4: Manual test — Skip button**

1. Reload the page
2. Click "Skip Tutorial →"
3. Confirm it navigates directly to the deal dashboard

- [ ] **Step 5: Manual test — Mobile**

1. Resize browser to <768px width
2. Confirm touch-friendly "Tap to upload" text
3. Confirm all tabs render correctly stacked

- [ ] **Step 6: Build for production**

```bash
npm run build && npx vite preview
```

Expected: Production build serves correctly, all routes work via SPA fallback.
