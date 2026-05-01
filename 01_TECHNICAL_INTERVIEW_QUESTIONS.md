# 🔥 TECHNICAL INTERVIEW QUESTIONS - MERCANIS FRONTEND DEVELOPER

## Category 1: REAL-TIME SYSTEMS & WEBSOCKETS

### Q1: WebSocket Architecture & Concurrent Connections
**"Tell us about your WebSocket implementation at Mercanis. How did you handle 2000+ concurrent supplier connections?"**

**Expected Answer:**
- Used Socket.io library (wrapper around WebSockets with fallback support)
- Implemented reconnection logic with exponential backoff (1s → 2s → 4s → 8s)
- Message queuing to prevent data loss during network interruptions
- Client-side deduplication using message IDs
- Server-side connection pooling and load balancing across multiple instances
- Memory management: cleaned up stale connections every 5 minutes
- Monitoring with Sentry to track connection failures

**Follow-up Questions They Might Ask:**
- How did you handle memory leaks with thousands of connections?
- What's the difference between WebSockets and polling? When would you use each?
- How did you ensure message ordering and delivery guarantees?
- What happens when a supplier loses internet connection mid-operation?

**Code Example to Prepare:**
```javascript
// Socket.io client with reconnection
import io from 'socket.io-client';

const socket = io('https://api.mercanis.com', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
});

socket.on('connect', () => console.log('Connected'));
socket.on('disconnect', () => console.log('Disconnected'));

// Message deduplication
const messageIds = new Set();
socket.on('order:update', (msg) => {
  if (!messageIds.has(msg.id)) {
    messageIds.add(msg.id);
    // Process message
  }
});
```

---

### Q2: Real-time Inventory Updates (10K updates/minute)
**"How did you implement a system that processes 10,000 inventory updates per minute without data loss or UI lag?"**

**Expected Answer:**
- Implemented WebSocket delta updates (only send changed SKU data, not entire inventory)
- Used Redux for centralized state with normalized shape preventing duplicates
- Applied idempotent message handling: same message applied multiple times = same result
- Batch updates: collect 100 updates, apply together every 100ms
- Web Workers for heavy calculations off main thread
- Virtual scrolling for rendering 1000+ items without freezing
- Implemented conflict resolution: last-write-wins with timestamp-based ordering

**Technical Details:**
- Message format: `{ skuId, warehouseId, quantity, timestamp }`
- Deduplication using Map: `Map<skuId-warehouseId, latestUpdate>`
- Optimistic updates: update UI immediately, rollback if server rejects
- Error handling: retry logic with exponential backoff

**Follow-up Questions:**
- How do you handle race conditions when two suppliers update same SKU simultaneously?
- What's your strategy for syncing offline changes?
- How do you prevent the server from being overwhelmed?

---

### Q3: Real-time Notifications System
**"Walk us through your notification architecture handling 500K+ notifications daily."**

**Expected Answer:**
- WebSocket-based delivery system with fallback to polling
- Multi-layer queuing:
  - Priority queue (critical → high → normal)
  - Message batching (bundle 10 notifications if arriving within 1s)
  - Client-side deduplication by message ID
- Delivery guarantee: 3-attempt retry with exponential backoff
- Notifications types:
  - Toast (auto-dismiss after 10s)
  - Sticky (critical issues, requires action)
  - Email (if supplier offline >1 hour)
  - SMS (if email not read in 24h)
- Analytics: track delivery rate, read rate, action rate

**Implementation:**
- 99.9% delivery guarantee achieved through multi-layer verification
- Monitoring with LogRocket for session replay of notification failures
- A/B testing notification content to improve action rates

---

## Category 2: PAYMENT SYSTEMS & RECONCILIATION

### Q4: Payment Reconciliation (3-Layer System)
**"Explain your 3-layer payment reconciliation system that achieves 99.95% accuracy."**

**Expected Answer:**

**Layer 1: Immediate Webhook Verification**
- Razorpay sends webhook when payment completed
- Verify signature using HMAC-SHA256 (prevent tampering)
- Update Redux state immediately
- Send success response to Razorpay (ack receipt)

**Layer 2: 30-second Polling Fallback**
- If webhook not received in 30s, client polls payment status API
- Check `payment_status` field
- Update UI if necessary

**Layer 3: 15-minute Batch Reconciliation**
- Cron job runs every 15 minutes
- Query all payments from last 24 hours
- Compare with `payments_processed` collection
- Find orphaned transactions (payment successful but DB not updated)
- Auto-complete these transactions

**Code Example:**
```javascript
// Webhook handler
app.post('/webhook/razorpay', (req, res) => {
  const signature = req.headers['x-razorpay-signature'];
  const body = req.rawBody;

  // Verify signature
  const hash = crypto
    .createHmac('sha256', RAZORPAY_SECRET)
    .update(body)
    .digest('hex');

  if (hash !== signature) {
    return res.status(400).send('Invalid signature');
  }

  const event = req.body;
  if (event.event === 'payment.authorized') {
    // Update DB
    Payment.updateOne(
      { razorpayId: event.payload.payment.entity.id },
      { status: 'completed' }
    );
  }

  res.json({ status: 'ok' });
});

// Polling fallback
async function checkPaymentStatus(orderId) {
  const payment = await razorpay.payments.fetch(orderId);
  if (payment.status === 'captured') {
    // Update Redux
  }
}

// Batch reconciliation (cron job)
async function reconcilePayments() {
  const payments = await razorpay.payments.list({ count: 100 });
  for (const payment of payments) {
    const dbPayment = await Payment.findOne({ razorpayId: payment.id });
    if (!dbPayment) {
      // Orphaned - create it
      await Payment.create({ razorpayId: payment.id, status: 'completed' });
    }
  }
}
```

**Follow-up Questions:**
- How do you handle duplicate payments (user clicks submit twice)?
- What's your strategy for payments that fail during processing?
- How do you maintain PCI-DSS compliance?
- How do you test this system thoroughly?

---

### Q5: Razorpay Integration & Error Handling
**"Tell us about your payment gateway integration with Razorpay. How do you handle various error scenarios?"**

**Expected Answer:**

**Integration Points:**
- Razorpay Checkout SDK on frontend (card data never touches your server)
- Order creation endpoint on backend
- Payment verification endpoint
- Webhook endpoint for confirmations

**Error Scenarios:**

1. **Card Declined**
   - Razorpay returns error immediately
   - Show user-friendly message: "Your card was declined"
   - Suggest trying different card or payment method

2. **Payment Timeout (No Response)**
   - Start polling after 30s
   - Show "Payment processing, please wait..."
   - After 5 min, show "Payment status unclear, check your bank"

3. **Network Error During Payment**
   - Catch network error, don't show "Payment failed"
   - Show "Connection lost, retrying..."
   - Auto-retry with exponential backoff
   - If still fails after 3 retries, move to polling

4. **Webhook Not Received**
   - Layer 2 polling catches this
   - User can manually check status
   - Manual payment completion option for critical cases

5. **Duplicate Transaction**
   - Use Razorpay's idempotency key
   - Same key = same transaction even if API called twice
   - Prevent charging customer twice if user clicks submit multiple times

**PCI-DSS Compliance:**
- Never store card numbers (Razorpay handles this)
- All sensitive data over HTTPS only
- CSP headers preventing XSS
- Regular security audits

---

## Category 3: PERFORMANCE OPTIMIZATION

### Q6: 35% Load Time Improvement
**"You achieved 35% improvement in page load time (4.2s → 2.7s). Walk us through your optimization strategy."**

**Expected Answer:**

1. **Code Splitting (Biggest Impact)**
   ```javascript
   // Before: Single bundle 4.2MB
   // After: Code splitting
   const Analytics = React.lazy(() => import('./Analytics'));
   const Orders = React.lazy(() => import('./Orders'));

   // Dashboard only loads order list
   // Analytics bundle loads only when user clicks Analytics tab
   ```
   - Result: Initial bundle reduced from 4.2MB to 1.8MB

2. **Image Optimization**
   ```javascript
   // Use Next.js Image component
   <Image
     src="/supplier-logo.jpg"
     width={200}
     height={200}
     // Auto: creates WebP, srcset for different sizes
   />
   ```
   - Result: 65% reduction in image bytes (automatic format conversion)

3. **Remove Unused Dependencies**
   - Webpack Bundle Analyzer identified unused code
   - Removed 3 unused npm packages
   - Used tree-shaking to eliminate unused functions
   - Result: 10% bundle reduction

4. **Lazy Load Heavy Libraries**
   ```javascript
   // Recharts only loaded on analytics page
   const Recharts = React.lazy(() => import('recharts'));

   // D3.js loaded on-demand for advanced charts
   const D3 = React.lazy(() => import('d3'));
   ```
   - Result: 15% initial bundle reduction

5. **Caching Strategy**
   - Service Worker caching static assets
   - Redux persisting state across sessions
   - React Query caching API responses (5 min)
   - Browser cache-control headers for CSS/JS
   - Result: 2nd page load 80% faster

6. **Resource Hints**
   ```html
   <!-- Preload critical resources -->
   <link rel="preload" href="/fonts/inter.woff2" as="font">
   <!-- Prefetch next page resources -->
   <link rel="prefetch" href="/js/analytics.js">
   <!-- DNS prefetch for APIs -->
   <link rel="dns-prefetch" href="//api.mercanis.com">
   ```

**Measurement:**
- Used Lighthouse for performance auditing
- Chrome DevTools for network profiling
- React Profiler for component rendering times
- Sentry for monitoring real-world performance

---

### Q7: Memory Leaks & Performance Monitoring
**"How did you prevent memory leaks with WebSockets, and how do you monitor performance in production?"**

**Expected Answer:**

**Memory Leak Prevention:**
- Cleanup WebSocket listeners on component unmount
- Cancel pending API requests on navigate
- Clear Redux state for unmounted components
- Remove event listeners

```javascript
useEffect(() => {
  socket.on('order:update', handleOrderUpdate);

  return () => {
    // Cleanup: remove listener on unmount
    socket.off('order:update', handleOrderUpdate);
  };
}, []);
```

**Production Monitoring:**
- Sentry: tracks JS errors, performance bottlenecks, session replays
- LogRocket: user session replays for debugging
- Google Analytics: track page views, conversion funnels
- Lighthouse CI: automated performance regression testing
- Custom metrics: track API response times, webhook delays

---

## Category 4: STATE MANAGEMENT & ARCHITECTURE

### Q8: Redux Architecture & Normalized State
**"Explain your Redux state structure. Why did you normalize the state?"**

**Expected Answer:**

```javascript
// BEFORE: Nested structure (bad for updates)
{
  orders: [
    { id: 1, supplier: { id: 101, name: 'Supplier A' }, items: [...] },
    { id: 2, supplier: { id: 102, name: 'Supplier B' }, items: [...] }
  ]
}
// Problem: To update supplier name, iterate through all orders

// AFTER: Normalized (good for updates)
{
  entities: {
    orders: {
      1: { id: 1, supplierId: 101, itemIds: [201, 202] },
      2: { id: 2, supplierId: 102, itemIds: [203, 204] }
    },
    suppliers: {
      101: { id: 101, name: 'Supplier A' },
      102: { id: 102, name: 'Supplier B' }
    },
    items: {
      201: { id: 201, name: 'Item 1', price: 100 },
      ...
    }
  }
}
// Benefit: Update supplier name in O(1) time
```

**Benefits:**
- Update any entity in O(1) time
- Prevent data duplication
- Easier to manage relationships
- Redux DevTools time-travel debugging
- Memoized selectors with Reselect library

**Selector Memoization:**
```javascript
// Without memoization: runs every time, returns new object
const selectOrders = state => state.orders.map(id =>
  state.entities.orders[id]
);

// With memoization: returns same reference if inputs unchanged
import { createSelector } from 'reselect';

const selectOrderIds = state => state.orderIds;
const selectOrderEntities = state => state.entities.orders;

const selectOrders = createSelector(
  [selectOrderIds, selectOrderEntities],
  (ids, entities) => ids.map(id => entities[id])
);
// Now: if orderIds/entities unchanged → same reference → no re-render
```

---

### Q9: React Hooks & Custom Hooks
**"Tell us about your custom hooks. Give examples of complex hooks you've built."**

**Expected Answer:**

**Custom Hook 1: useWebSocket**
```javascript
function useWebSocket(url) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('connecting');

  useEffect(() => {
    const socket = io(url);

    socket.on('connect', () => setStatus('connected'));
    socket.on('disconnect', () => setStatus('disconnected'));
    socket.on('message', setData);

    return () => socket.disconnect();
  }, [url]);

  return { data, status };
}

// Usage
const { data: orders, status } = useWebSocket('https://api.mercanis.com');
```

**Custom Hook 2: usePagination**
```javascript
function usePagination(items, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(0);

  const paginatedItems = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const pageCount = Math.ceil(items.length / itemsPerPage);

  return { paginatedItems, currentPage, setCurrentPage, pageCount };
}
```

**Custom Hook 3: useAsync (for API calls)**
```javascript
function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setStatus('pending');
    try {
      const response = await asyncFunction();
      setData(response);
      setStatus('success');
    } catch (err) {
      setError(err);
      setStatus('error');
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) execute();
  }, [execute, immediate]);

  return { status, data, error, execute };
}

// Usage
const { data: suppliers, error, execute } = useAsync(
  () => fetch('/api/suppliers').then(r => r.json())
);
```

---

## Category 5: DATA STRUCTURES & ALGORITHMS

### Q10: CSV Import Data Structures
**"You built a CSV import system handling 1000+ SKUs with duplicate detection. What data structures did you use?"**

**Expected Answer:**

```javascript
// Duplicate detection using Set/Map
class CSVImporter {
  constructor() {
    this.skuMap = new Map(); // skuId → sku data
    this.duplicates = new Set(); // Detected duplicates
  }

  detectDuplicates(rows) {
    rows.forEach(row => {
      if (this.skuMap.has(row.skuId)) {
        this.duplicates.add(row.skuId);
      } else {
        this.skuMap.set(row.skuId, row);
      }
    });
  }

  // Fuzzy matching for near-duplicates
  fuzzyMatch(row) {
    const similarity = (str1, str2) => {
      // Levenshtein distance or similar algorithm
    };

    for (let [id, existingSku] of this.skuMap) {
      if (similarity(row.name, existingSku.name) > 0.9) {
        return { existingSku, similarity };
      }
    }
  }
}
```

**Time Complexity:**
- Exact match: O(1) per SKU
- Total for 1000 SKUs: O(n)
- Fuzzy match: O(n) per SKU (compare with all existing)
- Optimized: Use Trie + Bloom filters for faster matching

---

## Category 6: SECURITY & COMPLIANCE

### Q11: PCI-DSS Compliance & Security
**"How did you ensure PCI-DSS compliance in your payment system?"**

**Expected Answer:**

1. **Card Data Handling:**
   - NEVER store card numbers (Razorpay handles encryption)
   - Use Razorpay Checkout (hosted, not custom form)
   - Tokenize cards for future payments (Razorpay returns token)

2. **HTTPS & Encryption:**
   - All API calls over HTTPS only
   - Secure cookies: HttpOnly, Secure, SameSite flags
   - Encrypt sensitive data at rest (JWT tokens, secret keys)

3. **Authentication & Authorization:**
   - JWT tokens with short expiration (15 min access, 7-day refresh)
   - Refresh token in HttpOnly cookie (can't be stolen via XSS)
   - Password hashing with Bcrypt (not plaintext)
   - OAuth 2.0 for third-party integrations

4. **Input Validation:**
   - Validate all user inputs on frontend AND backend
   - Sanitize to prevent XSS/SQL injection
   - Use parameterized queries (never string concatenation)

5. **Content Security Policy:**
   ```html
   <meta http-equiv="Content-Security-Policy"
         content="default-src 'self';
                  script-src 'self' 'unsafe-inline';
                  style-src 'self' 'unsafe-inline';">
   ```

6. **Regular Audits:**
   - OWASP Top 10 security checklist
   - Penetration testing
   - Dependency scanning for vulnerabilities
   - Code review focusing on security

---

### Q12: XSS & CSRF Prevention
**"How did you prevent XSS and CSRF attacks?"**

**Expected Answer:**

**XSS Prevention:**
```javascript
// DON'T: Unsafe HTML injection
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// DO: React automatically escapes text
<div>{userInput}</div>

// If HTML needed, sanitize first
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userInput);
```

**CSRF Prevention:**
```javascript
// Server generates CSRF token
app.get('/api/orders', (req, res) => {
  const token = crypto.randomBytes(32).toString('hex');
  res.json({ data, csrfToken: token });
});

// Client includes token in headers
axios.defaults.headers.post['X-CSRF-Token'] = csrfToken;

// Server validates token on mutations
app.post('/api/orders', (req, res) => {
  if (req.body.csrfToken !== req.session.csrfToken) {
    return res.status(403).send('CSRF validation failed');
  }
  // Process order
});
```

---

## Category 7: TESTING

### Q13: Testing Strategy
**"What's your testing approach? How do you achieve 75%+ code coverage?"**

**Expected Answer:**

**Testing Pyramid:**
```
        E2E Tests (Cypress)
       /                    \
    Integration Tests     (React Testing Library)
    /                                         \
Unit Tests (Jest)
```

**Unit Tests (60% of tests):**
- Test utility functions in isolation
- Test Redux reducers and selectors
- Test custom hooks
- Mock external dependencies

**Integration Tests (30% of tests):**
- Test component + hook combinations
- Test user interactions (clicking, typing)
- Test data flow through components
- Render full component tree, mock APIs

**E2E Tests (10% of tests):**
- Test critical user flows
- Payment process: create order → checkout → payment → confirmation
- CSV import: upload → validate → resolve conflicts → import
- Use Cypress for automation

**Example Unit Test:**
```javascript
import { reducer, initialState } from './orderSlice';

describe('orderSlice', () => {
  it('should add order to state', () => {
    const action = { type: 'orders/added', payload: { id: 1, name: 'Order 1' } };
    const newState = reducer(initialState, action);
    expect(newState.orders[1]).toEqual({ id: 1, name: 'Order 1' });
  });
});
```

**Example Integration Test:**
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import OrderForm from './OrderForm';

describe('OrderForm', () => {
  it('should submit order', async () => {
    render(<OrderForm />);

    fireEvent.change(screen.getByLabelText('Order ID'), { target: { value: '123' } });
    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Order submitted successfully')).toBeInTheDocument();
  });
});
```

---

## Category 8: SYSTEM DESIGN & ARCHITECTURE

### Q14: Scalability & Load Handling
**"How would you scale the supplier platform to handle 1 million daily users (10x growth)?"**

**Expected Answer:**

**Frontend Scaling:**
- Implement service worker caching (reduce server load)
- CDN distribution of static assets (CloudFront)
- Code splitting per route (reduce initial load)
- Lazy loading components and libraries

**Backend Scaling:**
- Database sharding by supplier ID (horizontal scaling)
- Read replicas for analytics queries (separate from writes)
- Redis caching for frequently accessed data
- Message queue (Redis/RabbitMQ) for async operations

**WebSocket Scaling:**
- Multiple WebSocket servers behind load balancer
- Sticky sessions (user always connects to same server)
- Redis pub/sub for inter-server communication
- Connection pooling and circuit breakers

**Monitoring & Alerting:**
- Set up alerts for CPU >80%, memory >85%
- Auto-scaling: add servers when load >70%
- Rate limiting to prevent abuse
- Graceful degradation: disable real-time if server overloaded

---

### Q15: Microservices vs Monolith
**"Do you think Mercanis should move to microservices? Why or why not?"**

**Expected Answer:**

**Current Architecture (Monolith - Right Choice):**
- Single Next.js app (frontend + API routes)
- Single MongoDB database
- Simple deployment (Vercel)
- Easy debugging and monitoring
- Lower operational complexity

**When to Move to Microservices:**
- ✓ Different teams owning different services
- ✓ Services have different scaling needs
- ✓ Services use different technology stacks
- ✓ >500 engineers in organization

**For Mercanis:**
- Current: 50 engineers → monolith is fine
- If grows to 200 engineers → consider splitting:
  - Order service (handles order logic)
  - Payment service (Razorpay integration)
  - Notification service (real-time alerts)
  - Analytics service (data aggregation)

**Trade-offs:**
- Microservices: easier scaling, but harder debugging, distributed transactions
- Monolith: simpler, but harder to scale, all-or-nothing deployments

---

## FINAL PREPARATION TIPS

### Before Interview:
1. ✅ Read through all questions and answers
2. ✅ Prepare code examples on your laptop
3. ✅ Practice explaining technical concepts in 2-3 minutes
4. ✅ Prepare questions to ask interviewer:
   - What's your tech stack?
   - How do you handle scaling challenges?
   - What's your biggest technical debt?
   - How do you do code reviews?

### During Interview:
1. ✅ Use STAR method (Situation → Task → Action → Result)
2. ✅ Provide specific numbers (35% improvement, 500K users)
3. ✅ Explain WHY you chose a technology (not just WHAT)
4. ✅ Draw diagrams if explaining complex architecture
5. ✅ Ask clarifying questions before jumping to answer

### After Interview:
1. ✅ Send thank-you email within 24 hours
2. ✅ Mention specific topics you discussed
3. ✅ Reiterate your interest in the role

---

**Good Luck! You've got this! 🚀**
