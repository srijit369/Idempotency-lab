# IDEMPOTENCY LAB – One Request. One Result.

> **An Interactive Educational Platform Teaching Idempotency in Distributed APIs & Duplicate Request Handling.**  
> *Developed as an instructional design and technical skilling experience for software engineering students and API developers.*

---

## 📌 1. Project Overview

**Idempotency Lab** is a modern, interactive, self-paced educational web platform engineered to teach the concept of **Idempotency in Distributed APIs and Duplicate Request Handling**.

In distributed systems, networks are inherently unreliable. When an API client (such as a web browser or mobile application) sends a request to charge a credit card, book a seat, or transfer funds, network delays or connection drops often prevent the response from reaching the client. Impatient users click buttons repeatedly, and automated SDK retry loops resend the same HTTP requests.

Without proper backend idempotency mechanisms, these retried requests cause **duplicate payments**, **overbooked stadium seats**, and **corrupted financial ledgers**.

**Idempotency Lab** bridges the gap between abstract mathematical definitions ($f(f(x)) = f(x)$) and production-grade engineering principles (IETF `Idempotency-Key` HTTP header specification, deterministic SHA-256 payload hashing, atomic distributed locking via Redis `SETNX`, and `HTTP 409 Conflict` error handling).

---

## 💥 2. The Problem Statement

### The Real-World Dilemma: "Did the Payment Go Through?"

Consider an e-commerce checkout flow on a 3G mobile network:
1. A customer clicks **"Pay ₹2,499"**.
2. The browser sends an `HTTP POST /v1/payments` request.
3. The API server processes the request, deducts money from the bank, and updates the database.
4. **The Network Drop**: Before the `HTTP 200 OK` response packet reaches the phone, the cellular tower drops the TCP connection.
5. **The User's Reaction**: The customer sees a spinning loader. Assuming the payment froze, they tap **"Pay ₹2,499"** a second time.
6. **The Critical Failure**: Without idempotency protection, the backend treats this second click as an entirely new transaction, charging the customer's card a second time (₹4,998 total).

```
[Customer Browser]               [API Server]               [Bank / Database]
       |                               |                            |
       |--- 1. POST /payments (₹2,500)>|                            |
       |                               |--- 2. Charge Bank Card --->|
       |<-- 3. Account Billed (₹2,500)-|                            |
       |                               |                            |
       |    ❌ 4. Connection Timeout   |                            |
       |  (Response lost in transit!)  |                            |
       |                               |                            |
       |--- 5. RETRY: POST /payments ->|                            |
       |    ("Did it work? Try again") |--- 6. Charge AGAIN! ------>| (🚨 DOUBLE CHARGE!)
       |                               |<-- 7. Second ₹2,500 Billed-|
```

### The Solution: Idempotent API Design

By attaching a unique client-generated token (**Idempotency Key**) in the request headers (`Idempotency-Key: pay_uuid_89a1b2`), the server can recognize retries. If the key was already processed, the backend skips the financial transaction and replays the original receipt with `Idempotency-Replayed: true`.

---

## 🎯 3. Learning Objectives

By completing this 45-minute course, learners will be able to:

1. **Diagnose Duplicate Request Vulnerabilities**: Understand why network partitions, read timeouts, and user impatience trigger duplicate requests in distributed microservices.
2. **Master HTTP Protocol Semantics (RFC 9110)**: Categorize HTTP methods into Safe (`GET`), Idempotent (`PUT`, `DELETE`), Non-Idempotent (`POST`), and Conditionally Idempotent (`PATCH`).
3. **Trace the 6-Step Idempotency Protocol**:
   - Client-side key generation (UUID v4).
   - API Gateway interception.
   - Centralized cache lookup.
   - Atomic concurrency locking (`IN_PROGRESS` state).
   - Response caching with headers.
   - Automatic Time-To-Live (TTL) expiration.
4. **Detect and Prevent Parameter Tampering**: Compute deterministic cryptographic hashes of request payloads to reject key reuse with altered amounts via `HTTP 409 Conflict`.
5. **Differentiate Educational vs. Production Architectures**: Recognize why local in-memory stores (`new Map()`) must be replaced in production with distributed stores (Redis, Postgres ACID transactions, and atomic `SETNX` distributed locks).
6. **Architect Resilient Distributed Endpoints**: Formulate comprehensive end-to-end solutions for real-world scenarios such as high-traffic event ticketing and payment gateways.

---

## 🗺️ 4. Course Structure & 45-Minute Curriculum

The course is structured into **8 pedagogically scaffolded modules** designed to be completed in approximately 45 minutes:

| # | Module Title | Est. Time | Focus Area & Description | Key Interactive Element |
|---|---|---|---|---|
| **01** | **Introduction** | 5 mins | The real-world problem: network latency, double clicks, and duplicate charges. | Interactive Double-Click demo, network pause & push notification emulator |
| **02** | **Understanding API Requests** | 5 mins | Client/Server roles, HTTP anatomy, Connection vs Response Timeouts. | Interactive Timeout Lab with packet wire & ledger diff |
| **03** | **What is Idempotency?** | 7 mins | Mathematical definition $f(f(x)) = f(x)$, elevator vs ATM analogy, HTTP verbs. | Interactive Elevator vs ATM playground & HTTP method inspector |
| **04** | **How Idempotency Keys Work** | 8 mins | Coat-check ticket analogy, SHA-256 payload hashing, 6 architectural mechanisms. | Step-by-step Architectural Circuit with Auto-Play & Scrubber |
| **05** | **Interactive Payment Simulator** | 8 mins | The core hands-on API testing playground. | Full API playground with amount presets, shield deflection & 409 conflict |
| **06** | **JavaScript Code Lab** | 7 mins | Express-style middleware implementation using JavaScript `Map`. | Line-by-Line Debugger Stepper, Live Variable Watcher, 3 preset runners |
| **07** | **Knowledge Check** | 5 mins | Formative assessment across 5 core technical topics. | 5 MCQs with instant feedback, streak tracking & pedagogical rationales |
| **08** | **Final Practical Challenge** | 5 mins | Scenario-based capstone: Online Ticket Booking system design. | 5 student reflection text prompts + expert model solutions |
| **—** | **Course Completion** | — | Graduation celebration, quiz score badge, and review checklist. | Confetti celebration, printable certificate, rank credential |

---

## 🔬 5. Key Interactive Features

### 1. 5-Scene Interactive Technical Storytelling Experience (`StoryExperience.jsx`)
- **Immersive Narrative Arc**: Transforms dry theoretical documentation into a dramatic 5-scene technical story:
  - **Scene 1: The Online Purchase**: Maya buys a ₹84,999 laptop; explores client-side UUID key attachment.
  - **Scene 2: The Network Problem**: A 3.8-second 4G latency spike drops the response packet; ambiguous client timeout forces click #2.
  - **Scene 3: The Duplicate Request**: Visualizes the unprotected double billing disaster (₹1,69,998 billed twice on bank ledger).
  - **Scene 4: The Idempotency Solution**: Architectural fix with `Idempotency-Key: pay_89a1b2`, Redis cache lookup, and safe HTTP 200 OK replay.
  - **Scene 5: Try It Yourself**: Fully interactive payment gateway simulator with live client-server-database pipeline, custom ₹ amounts, RFC key generation, duplicate testing, and 409 conflict detection.
- **Predict-and-Observe Checkpoints**: Interactive multiple-choice prompts before each scene transition that reward XP and reinforce architectural intuition.
- **Dedicated Vector Visualizations**: 7 custom SVG illustrations in `public/images/` depicting laptops, smartphones, network drops, double ledgers, server racks, database stores, and glowing shields.

### 2. Developer Gamification & Progression Engine
- **Live XP Points**: Earn XP by experimenting in simulations, answering checkpoints, debugging code, and completing challenges.
- **5 Developer Engineering Ranks**:
  - `Intern Dispatcher` (0–150 XP)
  - `Junior Backend Dev` (150–350 XP)
  - `Reliability Engineer` (350–650 XP)
  - `API Architect` (650–950 XP)
  - `Principal Systems Master` (950+ XP)
- **8 Achievement Badges**: Includes `Analogy Master`, `Circuit Navigator`, `Ledger Protector`, `Conflict Sentinel`, `Step Debugger`, and `Distributed Architect`.
- **Floating XP Toasts & Badges Modal**: Spring-animated notifications and an interactive badges drawer.

### 2. Dark Mode & Light Mode Theme Switcher
- **Persistent Theme Engine**: Automatically saves user preference (`'dark'` or `'light'`) to `localStorage`.
- **One-Click Navbar Toggle**: Animated Sun/Moon icon toggle with smooth rotation transitions.
- **Curated Dual Palettes**: Deep midnight navy dark mode & warm off-white editorial light mode with high-contrast dark code IDE panes.

### 3. Module 3: Elevator vs ATM Mental Models
- **Elevator Simulation ($f(f(x)) = f(x)$)**: Interactive floor panel with animated elevator car showing that pressing 1 time or 10 times results in the identical final state.
- **ATM Simulation ($f(f(x)) \neq f(x)$)**: Interactive ₹2,000 cash dispenser showing cumulative balance depletion and cash note stacking.

### 4. Module 4: Architectural Circuit (`Client ➔ API Server ➔ Database`)
- **3 Scenarios**: First Request, Duplicate Retry, and Payload Tampering Conflict.
- **Auto-Play Circuit Scrubber**: Autonomous playback demonstrating packet movement across network pipes.
- **Live Inspection**: Inspects the incoming Payload, HTTP `Idempotency-Key` Header, Database Status, and returned HTTP Status code.

### 5. Module 5: Interactive Payment Simulator (API Playground)
- **Payment Amount Presets**: Quick select ₹100, ₹500, ₹1,000, ₹2,500, or enter custom numeric values in Indian Rupees (`₹`).
- **UUID Idempotency Key Generator**: Generate random RFC-compliant keys with a single click.
- **Duplicate Request Testing**: Send repeated requests using the same key to verify identical responses and zero double-billing.
- **Payload Mutation Testing (409 Conflict)**: Change the payment amount while keeping the same key to trigger and observe `HTTP 409 Conflict`.
- **Idempotency Protection Toggle**: Turn protection ON/OFF to experience unprotected vs protected API behavior.
- **Live Server Activity Log**: Real-time terminal log documenting internal server decisions.
- **Metrics Dashboard**: Live counter tracking Total Requests, Successful Operations, Duplicates Detected, and Total Amount Processed.

### 6. Module 6: JavaScript Code Lab & Debugger Stepper
- **Interactive Line-by-Line Stepper**: Step through execution with active line highlighting (`CURRENT STEP`).
- **Live Variable Watcher**: Watches values of `idempotencyKey`, `req.body.amount`, `idempotencyStore.has(key)`, and response status.
- **3 Runnable Live Scenarios**:
  - *Example 1*: Send a new payment request (₹1,000, fresh key) $\rightarrow$ `HTTP 201 Created`.
  - *Example 2*: Send the same payment request again $\rightarrow$ `HTTP 200 OK` (Cached replay).
  - *Example 3*: Send a different amount with the same key (₹2,500) $\rightarrow$ `HTTP 409 Conflict`.

### 7. Formative Assessment & Capstone Challenge
- **Knowledge Check**: 5 multiple-choice questions with streak tracking, immediate explanations, and score tracking.
- **Final Challenge**: Online ticket booking scenario with 5 open-ended prompts, a quick-fill demo button, and comprehensive model solutions.

---

## 🛠️ 6. Technology Stack

- **Framework**: [React 18](https://react.dev/) (Functional components, custom hooks, modular state)
- **Build Tool**: [Vite 5](https://vitejs.dev/) (Lightning-fast HMR and optimized production bundling)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) (Custom dark navy palette, light mode overrides, soft shadows, glow effects)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) (Spring physics, layout animations, exit transitions)
- **Icons**: [Lucide React](https://lucide.dev/) (Clean, accessible SVG iconography)
- **Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) (Graduation celebration)
- **Typography**: Inter (UI prose) & JetBrains Mono (Code blocks and JSON payloads)
- **Storage**: Browser `localStorage` (Progress persistence, gamification XP, and theme preference)

---

## 📂 7. Project Directory Structure

```
Kalvium/
├── index.html                           # Root HTML entry with Inter & JetBrains Mono web fonts
├── package.json                         # Project dependencies, scripts, and build configuration
├── postcss.config.js                    # PostCSS configuration for Tailwind CSS
├── tailwind.config.js                   # Custom color palette (dark navy, off-white, teal, blue)
├── vite.config.js                       # Vite dev server and build configuration
├── README.md                            # Comprehensive project documentation
├── .gitignore                           # Git ignore rules (node_modules, dist, env)
├── public/
│   └── images/                          # 7 custom high-fidelity SVG architectural assets
│       ├── customer-purchase.svg        # Scene 1: Laptop checkout with ₹84,999 action
│       ├── payment-in-progress.svg      # Scene 1: Smartphone transmitting packet
│       ├── network-problem.svg          # Scene 2: Severed TCP connection & packet loss
│       ├── duplicate-requests.svg       # Scene 3: Two duplicate packets & double billing
│       ├── server-processing.svg        # Scene 5: Server rack processing incoming requests
│       ├── database-storage.svg         # Scene 4: Committed database ledger & Redis cache
│       └── idempotency-shield.svg       # Scene 4: Glowing shield deflecting duplicate retry
└── src/
    ├── main.jsx                         # React 18 DOM mount point
    ├── App.jsx                          # Main state machine: routing, progress, & view transitions
    ├── index.css                        # Tailwind directives, light/dark themes, custom scrollbars
    │
    ├── context/
    │   ├── GamificationContext.jsx      # XP, ranks, badges, toasts, and activity registry
    │   └── ThemeContext.jsx             # Dark / Light mode state with localStorage persistence
    │
    ├── components/
    │   ├── story/
    │   │   └── StoryExperience.jsx      # 5-Scene Interactive Story with predict & observe + simulator
    │   │
    │   ├── layout/
    │   │   ├── Navbar.jsx               # Top navigation: brand, theme switch, XP, progress, reset
    │   │   ├── Sidebar.jsx              # Collapsible sidebar: 8 modules, duration, status checks
    │   │   └── Footer.jsx               # Footer: RFC 9110 & IETF specification references
    │   ├── gamification/
    │   │   ├── XpToast.jsx              # Floating spring notification toast for XP & badges
    │   │   └── BadgesModal.jsx          # Interactive developer rank & badge gallery drawer
    │   ├── ui/
    │   │   ├── Badge.jsx                # Multi-color semantic status badges
    │   │   ├── Button.jsx               # Reusable styled button component
    │   │   ├── Callout.jsx              # Informational, warning, and success callout boxes
    │   │   ├── Card.jsx                 # Glassmorphic styled card wrappers
    │   │   ├── CodeBlock.jsx            # Syntax highlighted monospace code snippets
    │   │   ├── ProgressBar.jsx          # Animated progress bar component
    │   │   ├── AnimatedCounter.jsx      # Spring-animated number counters
    │   │   └── NetworkParticles.jsx     # Interactive canvas particle mesh
    │   ├── WelcomeDashboard.jsx         # Cinematic welcome screen with request dissector
    │   ├── InteractiveFlowDiagram.jsx   # Visual Client ➔ API ➔ DB circuit (3 scenarios + auto-play)
    │   ├── LessonHeader.jsx             # Module title, badge, duration, and objective header
    │   ├── TakeawaysCard.jsx            # Key mental models and summary notes card
    │   ├── NavigationButtons.jsx        # Previous / Next / Finish navigation controls
    │   ├── CourseCompletionScreen.jsx   # Celebration screen, quiz score, certificate, print summary
    │   └── CourseCompleteModal.jsx      # Summary modal for quick review
    │
    ├── data/
    │   ├── courseData.js                # HTTP methods matrix, lesson content, sample solutions
    │   └── courseOutline.js             # 8-module syllabus metadata and durations
    │
    ├── modules/
    │   ├── Module1Intro.jsx             # Slow network e-commerce double-click scenario & ledger
    │   ├── Module2ApiRequests.jsx       # Client/server anatomy, Timeout Lab (Connection vs Response)
    │   ├── Module3WhatIsIdempotency.jsx # f(f(x))=f(x), Elevator vs ATM interactive playground
    │   ├── Module4HowKeysWork.jsx       # Coat-check analogy, step-by-step diagram, 6 mechanisms
    │   ├── Module5PaymentSimulator.jsx  # Interactive API playground, UUID generator, 409 conflict
    │   ├── Module6CodeLab.jsx           # Line-by-line debugger stepper, Variable Watcher, 3 presets
    │   ├── Module7Quiz.jsx              # 5 MCQs on core concepts with immediate rationales & streaks
    │   └── Module8Challenge.jsx         # Stadium ticket booking scenario with 5 student prompts
    │
    └── utils/
        └── idempotencyEngine.js         # Deterministic SHA-like hashing & UUID generator
```

---

## ⚡ 8. Installation & Running Locally

### Prerequisites

Ensure you have **Node.js** (v18.0.0 or higher) and **npm** installed:
```bash
node -v
npm -v
```

### Step 1: Clone or Open the Workspace

```bash
git clone <your-repository-url>
cd Kalvium
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Run the Development Server

```bash
npm run dev
```

The terminal will display the local and network URLs:
```
  VITE v5.4.21  ready in 841 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.11:5173/
```

Open [http://localhost:5173](http://localhost:5173) in your web browser.

### Step 4: Build for Production

To create an optimized production build:
```bash
npm run build
```
The compiled, minified bundle will be output to the `dist/` folder. You can preview the production build locally with:
```bash
npm run preview
```

---

## 🎮 9. Payment Simulator In-Depth Guide (Module 5)

The **Interactive Payment Simulator** models a production API Gateway and database ledger.

### How to Test Key Scenarios:

```
+---------------------------------------------------------------------------------------+
|                              PAYMENT SIMULATOR DASHBOARD                              |
|                                                                                       |
|  [ Protection: ON/OFF ]   [ Amount: ₹500 ]     [ Key: pay_89a1b2 ] [ Generate Key ]   |
|                                                                                       |
|  [ > Send Payment ]   [ >> Retry Same Key ]   [ ₹! Mutate Amount ]   [ + New Key ]    |
+---------------------------------------------------------------------------------------+
|  METRICS:  Total Requests: 3  |  Successful: 1  |  Duplicates: 1  |  Billed: ₹500     |
+---------------------------------------------------------------------------------------+
```

1. **Test a Successful First Request**:
   - Keep **Idempotency Protection ON**.
   - Click **"Send Payment (₹500)"**.
   - *Result*: The server checks the database cache, finds no existing key, processes the payment, and returns `HTTP 201 Created` with header `Idempotency-Replayed: false`. The customer is billed ₹500.

2. **Test a Duplicate Request (Retry)**:
   - Without changing the amount or key, click **"Retry with Same Key"**.
   - *Result*: The server detects `pay_89a1b2` in the cache, verifies that the payload (₹500) matches, skips billing the card, and replays the cached receipt with `HTTP 200 OK` and header `Idempotency-Replayed: true`. Metrics show `Duplicates Detected: 1` and `Total Amount Processed` remains ₹500!

3. **Test a Payload Mismatch (`409 Conflict`)**:
   - Click **"Change Amount (Same Key)"** to send ₹1,200 while keeping key `pay_89a1b2`.
   - *Result*: The server detects that key `pay_89a1b2` was originally used for ₹500. It rejects the tampered request with **`HTTP 409 Conflict`**:
     ```json
     {
       "error": "idempotency_key_reused_with_different_payload",
       "message": "Idempotency key 'pay_89a1b2' was already used for a payment of ₹500. Reusing keys with different parameters is forbidden."
     }
     ```

4. **Test an Unprotected API (Protection OFF)**:
   - Toggle **Idempotency Protection to OFF**.
   - Click **"Send Payment"** three times rapidly.
   - *Result*: The database ledger logs three separate charges (`₹500`, `₹500`, `₹500`), demonstrating how an unprotected API double-bills customers under network retry conditions.

---

## 🛡️ 10. Verification & Quality Assurance Checklist

- [x] **Dark & Light Mode Switcher**: Animated Sun/Moon toggle with persistent preference in `localStorage`.
- [x] **Gamification Engine**: Real-time XP tracking, 5 developer ranks, 8 badges, floating toasts.
- [x] **All 8 Modules Accessible**: Linear previous/next navigation and direct sidebar jumping.
- [x] **Sidebar Navigation**: Responsive mobile slide-out drawer and desktop collapsible mode (`w-80` to `w-20`).
- [x] **Dynamic Progress Tracking**: Real-time progress bar calculation stored in `localStorage`.
- [x] **Lesson Completion Tracking**: Green checkmark indicators appear upon completing each module.
- [x] **Timeout Laboratory**: Visual packet wire testing Connection Timeout vs Response Timeout.
- [x] **Elevator vs ATM Playground**: Direct comparison of state invariance vs dangerous mutation.
- [x] **Line-by-Line Code Debugger**: Stepper with active line highlights and live variable watcher.
- [x] **Interactive Simulator**: Fully functional payment gateway playground with live ledger and logs.
- [x] **Duplicate Deduplication**: Retried requests safely replay cached responses with `Idempotency-Replayed: true`.
- [x] **Payload Conflict Detection**: Modified payloads with existing keys trigger `HTTP 409 Conflict`.
- [x] **Interactive Quiz**: 5 MCQs with instantaneous green/red feedback, streaks, and explanations.
- [x] **Capstone Challenge**: 5 structured student reflection prompts + model solutions + badge.
- [x] **Currency Consistency**: All values standardized to Indian Rupees (`₹` / `INR`).
- [x] **Zero Console Errors**: Verified clean production build (`npm run build`) with zero errors.

---

## 📄 11. Author & Assignment Context

- **Project**: Idempotency Lab – One Request. One Result.
- **Role**: Instructional Designer Intern (Skilling Courses) Hiring Assignment.
- **Subject**: Distributed Systems, API Architecture, and Duplicate Request Handling.
- **License**: MIT
