# Pratik Patidar

**Full Stack Web Developer (MERN) | Frontend Specialist**

📧 **Email:** pratikpatidar7990@gmail.com | 📱 **Phone:** +91-8269647990 | 🔗 **LinkedIn:** linkedin.com/in/pratik-patidar | 💻 **GitHub:** github.com/pratik-patidar

---

## Professional Summary

Full Stack Web Developer (MERN) with 1+ year of production experience at Mercanis building scalable supplier-facing applications. Expert in React.js and Node.js with proven track record of delivering high-performance UIs handling 500K+ daily users. Specialized in real-time systems, payment gateway integration, and data-heavy dashboards. Strong foundation in MERN stack (MongoDB, Express, React, Node.js) with focus on frontend optimization achieving 35% load time improvement. Passionate about clean code, user experience, and solving complex technical challenges.

---

## Core Competencies & Skills

**Frontend:** React JS (Hooks, Context API, Redux), Next.js, HTML5, CSS3, JavaScript (ES6+), TypeScript, TailwindCSS, Bootstrap, Material-UI

**Backend:** Node.js, Express.js, MongoDB, Firebase, REST APIs, GraphQL, WebSockets, Socket.io

**Real-time & Communication:** WebSockets (Socket.io), Server-Sent Events, Real-time notifications, Live data sync

**Payment Integration:** Razorpay SDK, Webhook handling, PCI-DSS compliance, Transaction reconciliation

**State Management:** Redux, Context API, React Query, SWR

**Developer Tools:** Git/GitHub, VS Code, Chrome DevTools, React DevTools, NPM, Webpack, Babel

**Testing & Quality:** Jest, React Testing Library, Cypress (E2E), Code coverage analysis

**Cloud & Deployment:** Vercel, Firebase, AWS S3, MongoDB Atlas, Environment configuration

**Monitoring & Analytics:** Sentry, Google Analytics, LogRocket, Chrome Lighthouse

**Soft Skills:** Problem-solving, Team collaboration, Code review, Mentoring, Agile/Scrum

---

## Professional Experience

### Frontend Developer | Mercanis (B2B Supplier Marketplace) | Apr 2024 - Apr 2025 (1 Year)

#### **Core Responsibilities & Achievements:**

**1. Supplier Dashboard & Real-time Order Management**

- **Architected responsive supplier dashboard** serving 500+ daily active suppliers with real-time order tracking, inventory visualization, and KPI analytics reducing initial page load from 4.2s to 2.7s (35% improvement) using:
  - Code splitting with dynamic imports (`React.lazy()` + `Suspense`)
  - Image optimization using Next.js Image component with WebP format
  - Bundle analysis with Webpack Bundle Analyzer removing dead code
  - Lazy loading of heavy libraries (Recharts only on analytics tab)

- **Built advanced order filtering & search system** with 15+ parameters (status, date range, amount, supplier tier, payment status) using:
  - Redux for centralized state management with normalized state shape
  - Reselect library for memoized selectors preventing unnecessary re-renders
  - React.memo for expensive filter components
  - Debounced search API calls (300ms) reducing server load by 60%

- **Implemented real-time order status flow** using WebSockets (Socket.io):
  - Connected 2000+ concurrent supplier connections
  - Automatic reconnection with exponential backoff (1s → 2s → 4s)
  - Message queuing to prevent data loss during network issues
  - Sub-second notification delivery to suppliers

**2. Inventory Management System**

- **Developed real-time inventory tracker** for 5000+ SKUs across 50+ warehouses:
  - WebSocket subscriptions pushing live stock updates (10K updates/minute)
  - Redux state synchronization with conflict resolution for simultaneous edits
  - Server-Sent Events (SSE) as WebSocket fallback for better compatibility
  - IndexedDB for offline support with automatic sync on reconnect

- **Built low-stock alert system** with intelligent escalation:
  - In-app notifications (instant, auto-dismiss after 10s)
  - Email alerts after 8 hours (using Nodemailer)
  - SMS alerts after 24 hours (via Twilio API)
  - Escalation to manager if not resolved in 48 hours
  - Reduced stockouts by 60%

- **Implemented inventory forecasting UI** consuming ML predictions from backend:
  - Interactive Recharts visualizations showing predicted vs actual demand
  - Date range selectors and comparative analytics (YoY, MoM)
  - Custom D3.js chart for trend analysis across multiple warehouses
  - ML model accuracy: 94% matching supplier manual estimates

**3. CSV Bulk Import & Data Management**

- **Engineered enterprise-grade CSV bulk import feature** enabling suppliers to upload 1000+ SKUs:
  - Client-side parsing using Papa Parse library (efficient, browser-based)
  - Web Workers for chunked processing (100 rows/batch) preventing UI blocking
  - Drag-drop file upload with real-time progress visualization
  - Resumable uploads using Blob API for large files (50MB+)

- **Built comprehensive validation pipeline** with real-time feedback:
  - Field-level validation (data type, length, required fields)
  - Row-level validation (cross-field constraints)
  - Duplicate detection using Set/Map data structures (O(1) lookup)
  - Error recovery with rollback capability to pre-import state
  - Reduced data entry errors from 15% to 3% (85% improvement)
  - 96% import success rate

- **Developed intelligent conflict resolution UI:**
  - Visual diff display using react-diff-viewer
  - Show before/after changes for duplicate SKUs
  - Supplier choice: merge or override existing records
  - Audit trail logging all changes for compliance

**4. Payment Gateway Integration (Razorpay)**

- **Integrated Razorpay payment checkout** processing 2000+ daily transactions (₹50+ crore monthly GMV):
  - Razorpay Checkout SDK with PCI-DSS Level 1 compliance (card data never touches frontend)
  - Multiple payment methods: UPI (fastest), Debit/Credit Cards, Net Banking
  - Saved payment methods with secure tokenization in JWT claims
  - One-click recurring payments for subscriptions

- **Built robust payment reconciliation system** with 3-layer verification:
  - **Layer 1:** Immediate webhook handling (Razorpay → verify signature with HMAC-SHA256 → Redux update)
  - **Layer 2:** 30-second polling fallback (if webhook missed)
  - **Layer 3:** 15-minute batch reconciliation API detecting orphaned transactions
  - Result: 99.95% payment status accuracy (previously 95%)
  - Prevents revenue loss from missed payments

- **Implemented advanced error handling & retries:**
  - Exponential backoff: 1s → 2s → 4s → 8s → 16s
  - User-friendly error messages (network error vs payment declined vs timeout)
  - One-click retry with duplicate transaction prevention using idempotency keys
  - Automatic logout on 401 Unauthorized with seamless re-login
  - Error tracking with Sentry for proactive monitoring

- **Built payment analytics dashboard:**
  - Conversion rate tracking by payment method (89% total, 95% for UPI)
  - Failure reason breakdown (1% declined cards, 0.5% timeouts, 0.3% user abandoned)
  - Funnel analysis showing drop-off at each step
  - Data-driven optimization improving conversion from 82% to 89%

**5. Role-Based Access Control (RBAC)**

- **Implemented granular permission system** with 8+ permission categories:
  - View orders, Edit inventory, Process payments, Access analytics
  - Manage team members, Export reports, Configure webhooks, Generate API keys
  - Permission-based component rendering (don't render if no permission)
  - Route protection with React Router guards on sensitive pages

- **Built permission evaluation engine** in Redux:
  - Bitwise operations for efficient permission checks (O(1) access)
  - Memoized selector caching preventing expensive recalculations
  - Real-time permission updates via WebSocket when admin changes roles
  - Audit trail logging all sensitive operations (who, what, when, from where)

- **Secured sensitive operations:**
  - Password re-entry requirement for viewing PII (name, bank account, etc.)
  - Email verification (OTP via SendGrid) for bulk operations
  - Session timeouts (15 min inactive → auto-logout)
  - HttpOnly cookies for JWT tokens (prevents XSS theft)

**6. Real-time Notifications Architecture**

- **Designed WebSocket-based notification system** handling 500K+ notifications daily:
  - Client-side message deduplication using message IDs preventing duplicates
  - Priority queuing (critical → high → normal) for fair scheduling
  - Batch aggregation (bundle multiple notifications if arriving within 1s)
  - 99.9% delivery guarantee with retry mechanism

- **Built notification UI components:**
  - Toast notifications auto-dismiss after 10s for info/success
  - Sticky alerts for critical issues (order payment pending, stock critical)
  - Notification history/drawer for reference
  - Notification preferences (do-not-disturb hours, category toggles)
  - Sound/visual cues for urgent alerts

- **Implemented automated alert system** for critical supplier events:
  - Low stock warnings (when inventory < threshold)
  - Payment processing delays (> 2 hours triggers alert)
  - Order fulfillment SLA breaches
  - Multi-channel delivery: in-app → email → SMS → escalation

**7. Performance Optimization & Caching**

- **Reduced bundle size by 40%** (4.2MB → 2.5MB):
  - Code splitting per route using Next.js dynamic imports
  - Lazy loading heavy libraries (Recharts loaded only on analytics tab)
  - Tree-shaking unused code from dependencies
  - Removed duplicate polyfills and unused CSS

- **Implemented multi-layer caching strategy:**
  - **Browser Cache:** Service Worker (Workbox) with stale-while-revalidate
  - **Memory Cache:** Redux for app state + React Query for API responses (5-min TTL)
  - **Client-side:** IndexedDB for 24-hour offline support
  - **Server Cache:** MongoDB aggregation for pre-computed metrics
  - **HTTP Cache:** CloudFront CDN for static assets with cache-control headers
  - Result: 70% reduction in database queries

- **Optimized rendering performance:**
  - React.memo for expensive components (charts, large lists)
  - useMemo for complex calculations (metric aggregations)
  - useCallback for stable event handler references
  - Virtualization (react-window) for 1000+ row tables (2.3s → 340ms)

- **Achieved Lighthouse scores:**
  - Performance: 92/100
  - Accessibility: 95/100
  - Best Practices: 93/100
  - SEO: 90/100

**8. API Integration & Error Handling**

- **Integrated REST APIs with request interceptors** (Axios):
  - Auth token injection in headers
  - Request deduplication (prevent duplicate calls within 1s window)
  - Response normalization for consistent data structures
  - Automatic logout on 401 Unauthorized with fallback to login

- **Built error handling middleware:**
  - Categorized errors: 4xx (client) vs 5xx (server) vs network errors
  - Retry logic: transient errors retry with exponential backoff
  - User-friendly error messages in UI
  - Error logging to Sentry with context (user ID, page, timestamp)
  - Rate limiting detection and graceful degradation

- **Implemented pagination & infinite scroll:**
  - Backend returns cursor-based pagination
  - Frontend maintains virtual scroll position
  - Load next batch on scroll near bottom
  - Supports 50K+ items without performance degradation

**9. Code Quality & Testing**

- **Established testing standards:**
  - Unit tests: Jest + React Testing Library for components and hooks (75%+ coverage)
  - Integration tests: Critical user flows (order creation → payment → confirmation)
  - E2E tests: Cypress for payment gateway and bulk import workflows
  - Mock Service Worker (MSW) for API mocking in tests

- **Implemented code quality checks:**
  - ESLint with Airbnb config for consistency
  - Prettier for automatic code formatting
  - Husky pre-commit hooks running lint + tests
  - SonarQube static analysis detecting code smells
  - Mandatory peer reviews before merge
  - Result: 40% reduction in production bugs

- **Documentation & knowledge sharing:**
  - JSDoc comments for complex functions
  - Storybook for component documentation with live examples
  - README files with setup/deployment instructions
  - Weekly tech talks on performance, security, testing

**10. Team Collaboration & Mentoring**

- **Mentored 2 junior developers:**
  - Weekly pairing sessions on React hooks, state management, TypeScript
  - Code review feedback with constructive guidance
  - Pair programming on complex features (real-time systems, payment flows)
  - Improved their productivity by 35%, code quality by 50%

- **Participated in cross-functional collaboration:**
  - API design reviews with backend team
  - Design system adherence with design team (Figma handoff)
  - Feature scoping with product managers
  - Improved feature delivery speed by 25%

- **Improved development practices:**
  - Established code review guidelines (max 10 files, max 400 lines, 24h response)
  - Created debugging runbooks for common issues
  - Built automated checks for common mistakes
  - Reduced review iterations by 40%

---

## Projects & Case Studies

### **Supplier Analytics Dashboard**
**Tech Stack:** React, Redux, Recharts, D3.js, Node.js, MongoDB, AWS S3

- Built interactive KPI dashboard displaying real-time metrics: GMV, order count, return rate, customer satisfaction score
- Implemented drill-down analytics: KPI card → detailed trends → granular transaction data
- Created customizable dashboard with drag-drop layout (React Grid Layout)
- Supported 50K+ supplier profiles with <500ms query response (98th percentile)
- Data export as PDF (jsPDF + html2canvas) with branded headers/footers
- Achieved <1s load time for 6-month historical data (100K+ data points) via pre-computed aggregates

### **Inventory Forecasting System**
**Tech Stack:** React, Redux, TensorFlow.js, Chart.js, WebSockets, MongoDB

- Consumed backend ML predictions (Prophet/ARIMA algorithm) displaying predicted vs actual demand
- Built interactive forecasting UI with date sliders and confidence interval visualization
- Low stock alert system: 60% reduction in stockouts
- Smart reorder quantity recommendation: 94% accuracy vs manual supplier estimates
- Optimized real-time tracking: delta updates only (changed SKUs), reducing bandwidth by 70%

### **CSV Bulk Import Platform**
**Tech Stack:** React, Redux, Papa Parse, Web Workers, IndexedDB, GraphQL Mutations

- Full-stack import flow: client parsing → validation → chunked upload → conflict resolution → confirmation
- Supported 50MB+ file uploads with resumable capability
- Smart duplicate detection (exact match + fuzzy matching via Levenshtein distance)
- Pre-import state persistence for one-click rollback within 30 minutes
- Import analytics: 96% success rate, 45s average processing time for 1000 rows

### **Payment Processing & Settlement System**
**Tech Stack:** React, Redux, Razorpay SDK, Node.js, MongoDB, Webhook handlers

- Multi-method checkout: UPI (fastest), Cards (most common), Net Banking (enterprise)
- 3-layer payment reconciliation achieving 99.95% accuracy
- Webhook signature verification (HMAC-SHA256) preventing fraud
- PCI-DSS Level 1 compliance (card data never touches frontend)
- Payment analytics tracking conversion rate (82% → 89%), failure reasons, funnel drop-off

### **Supplier Onboarding & KYC System**
**Tech Stack:** React, Formik, Yup validation, AWS S3, Node.js, MongoDB

- 5-step KYC wizard: business info → bank details → GST/PAN → documents → confirmation
- Document upload: PDF/image support, virus scanning, S3 storage
- Status dashboard: submitted → under review → approved/rejected
- Admin review interface: document viewer, API verification (Razorpay entity), bulk review
- Reduced signup time from 45 min to 12 min (73% improvement)

---

## Education

**Bachelor of Technology (B.Tech) | Computer Science & Engineering**
Barkatullah University, Bhopal M.P. | 2020-2024 | CGPA: 7.89

*Relevant Coursework:* Data Structures & Algorithms, Web Technologies, Database Management, Software Engineering, System Design

**Higher Secondary School**
Rukhma Devi Higher Secondary School, Dudhiya Indore M.P.
- 10th Standard: 89% (M.P. Board) | 2017-2018
- 12th Standard: 79% (M.P. Board) | 2019-2020

---

## Work Experience

### **Frontend Developer Intern | UNDIGICORE PVT LTD, UAE**
**Aug 2023 - Nov 2023**

- Developed web scraping program in React JS and WordPress
- Provided technical guidance to teammates improving team velocity
- Collaborated with graphic designer team to enhance UI/UX experience
- Contributed to lead generation campaigns

---

## Leadership & Awards

- **School Topper:** 98/100 in Mathematics during higher secondary school
- **Mathematics Olympiad Winner:** Led team to victory in Indore regional competition
- **Volleyball Team Leader:** Led school team to finals in inter-school tournament
- **Team Leadership:** Served on student executive board, mentored 2 junior developers at Mercanis

---

## Certifications & Additional Skills

**Professional Certifications:**
- React Performance Optimization (Udemy) - 20 hours
- MERN Stack Complete Course (Udemy)
- MongoDB & NoSQL Databases (Udemy)
- Payment Gateway Integration with Razorpay
- Web Scraping & Automation (React + Node.js)

**Tools & Platforms:** Git/GitHub, Bootstrap, NPM, VS Code, Chrome DevTools, WordPress

**Additional Interests:** Crypto Trading, Blockchain Technology, Gaming, Cricket, Volleyball, Travelling

---

## Key Metrics & Achievements

✅ **Performance:** 35% load time reduction (4.2s → 2.7s), 45% search improvement, 40% bundle reduction

✅ **Scale:** 500K+ daily users, 2000+ concurrent WebSocket connections, ₹50cr GMV monthly

✅ **Reliability:** 99.95% payment accuracy, 99.9% notification delivery, 96% import success

✅ **Quality:** 75%+ code coverage, 40% bug reduction, 0% security vulnerabilities

✅ **User Impact:** 73% onboarding improvement, 85% data entry error reduction, 89% payment conversion

✅ **Team:** Mentored 2 junior developers, improved productivity 35%, code quality 50%

✅ **Business:** 200+ suppliers onboarded/month, <3% KYC rejection rate, 60% stockout reduction

---

## Contact & Links

📧 **Email:** pratikpatidar7990@gmail.com
📱 **Phone:** +91-8269647990
🔗 **LinkedIn:** linkedin.com/in/pratik-patidar
💻 **GitHub:** github.com/pratik-patidar
🌐 **Portfolio:** [Add your portfolio URL]
