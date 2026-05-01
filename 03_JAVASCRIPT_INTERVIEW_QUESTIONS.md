# 🔥 JAVASCRIPT INTERVIEW QUESTIONS - 1 YEAR FRONTEND ENGINEER

**Level:** Intermediate (1 year production experience)
**Duration:** 60-90 minutes
**Format:** Technical deep-dive with code examples

---

## SECTION 1: CORE JAVASCRIPT CONCEPTS

### Q1: Closures & Scope
**"Explain closures. Why are they important? Provide a real-world example."**

**What They're Testing:**
- Understanding of lexical scope
- Function scope vs block scope
- Practical applications
- Memory implications

**Your Answer Should Include:**
- [ ] Definition: "A closure is a function that has access to variables from its outer (enclosing) function scope"
- [ ] Why important: Data encapsulation, callbacks, event handlers
- [ ] Real example: Counter, data privacy, event listeners
- [ ] Mention: Memory implications of closures

**Real-World Example to Give:**
```javascript
// Counter using closure (data privacy)
function createCounter() {
  let count = 0; // Private variable

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
console.log(counter.count); // undefined (private!)
```

**Why This is Good:**
✅ Shows you understand encapsulation
✅ Demonstrates practical use
✅ Shows understanding of private variables

---

### Q2: Async/Await vs Promises vs Callbacks
**"Compare async/await, promises, and callbacks. When would you use each?"**

**What They're Testing:**
- Evolution of async patterns
- Practical differences
- Error handling
- Real-world decision making

**Your Answer Should Include:**

1. **Callbacks (Old Way)**
```javascript
// Callback hell
function fetchData(callback) {
  setTimeout(() => callback('data'), 1000);
}

fetchData((data) => {
  console.log(data);
  // More nesting...
});

// Problems: Callback hell, hard to read, error handling messy
```

2. **Promises (Better)**
```javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('data'), 1000);
  });
}

fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error))
  .finally(() => console.log('done'));
```

3. **Async/Await (Best)**
```javascript
async function getData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  } finally {
    console.log('done');
  }
}
```

**When to Use Each:**
- **Callbacks:** Legacy code, simple cases
- **Promises:** Chains of operations, compatibility
- **Async/Await:** Modern code, readability, error handling

**Real-World Mercanis Example:**
```javascript
// At Mercanis: Handling payment API calls
async function processPayment(orderId) {
  try {
    const order = await fetchOrder(orderId);
    const payment = await razorpay.charge(order.amount);
    await updateDatabase(orderId, payment.id);
    return { success: true, paymentId: payment.id };
  } catch (error) {
    logger.error('Payment failed:', error);
    await notifyUser(orderId, 'Payment failed');
    throw error;
  }
}
```

---

### Q3: Event Loop & Call Stack
**"Explain the event loop. Why does `setTimeout(fn, 0)` work differently than synchronous code?"**

**What They're Testing:**
- Understanding of browser execution model
- Microtask vs macrotask queues
- Practical implications

**Your Answer Should Include:**

1. **Call Stack:** Where functions execute
2. **Event Loop:** Checks if stack is empty, then processes queues
3. **Callback Queue (Macrotask):** setTimeout, setInterval, I/O
4. **Microtask Queue:** Promises, async/await, queueMicrotask

**Visual Example:**
```javascript
console.log('1: Start');

setTimeout(() => console.log('2: setTimeout'), 0);

Promise.resolve()
  .then(() => console.log('3: Promise'));

console.log('4: End');

// Output:
// 1: Start
// 4: End
// 3: Promise (microtask - executes first!)
// 2: setTimeout (macrotask - executes last!)
```

**Why This Matters:**
```javascript
// At Mercanis: Race condition example
let paymentStatus = 'pending';

// This might NOT work as expected!
setTimeout(() => {
  paymentStatus = 'completed'; // Macrotask
}, 0);

Promise.resolve()
  .then(() => {
    console.log(paymentStatus); // 'pending' (microtask runs first)
  });
```

---

## SECTION 2: THIS & OBJECT-ORIENTED CONCEPTS

### Q4: "this" Binding
**"Explain how 'this' works in different contexts. When does it break? How do you fix it?"**

**What They're Testing:**
- Understanding of context binding
- Common pitfalls
- Solutions (arrow functions, bind, call, apply)

**Your Answer Should Include:**

1. **Default Binding (Function)**
```javascript
function greet() {
  console.log(this); // window (or undefined in strict mode)
}
greet();
```

2. **Implicit Binding (Method)**
```javascript
const obj = {
  name: 'Mercanis',
  greet: function() {
    console.log(this.name); // 'Mercanis'
  }
};
obj.greet();
```

3. **Explicit Binding (call, apply, bind)**
```javascript
function greet(greeting) {
  console.log(`${greeting}, ${this.name}`);
}

const obj = { name: 'Mercanis' };
greet.call(obj, 'Hello'); // Explicit binding
greet.apply(obj, ['Hi']); // Same as call
const boundGreet = greet.bind(obj); // Returns new function
```

4. **Arrow Functions (Lexical this)**
```javascript
const obj = {
  name: 'Mercanis',
  greet: () => {
    console.log(this.name); // undefined (arrow uses outer this)
  }
};
obj.greet();
```

**Real Problem at Mercanis:**
```javascript
// PROBLEM: Event handler loses 'this'
class OrderManager {
  constructor() {
    this.orders = [];
  }

  loadOrders() {
    // BROKEN: 'this' is undefined!
    element.addEventListener('click', this.handleClick);
  }

  handleClick() {
    this.orders.push(...); // Error! 'this' is element, not OrderManager
  }
}

// SOLUTION 1: Arrow function
loadOrders() {
  element.addEventListener('click', () => this.handleClick());
}

// SOLUTION 2: bind
loadOrders() {
  element.addEventListener('click', this.handleClick.bind(this));
}

// SOLUTION 3: Arrow method
handleClick = () => {
  this.orders.push(...); // Works! Lexical this
}
```

---

### Q5: Prototypes & Inheritance
**"Explain prototypal inheritance. What's the difference between `__proto__` and `prototype`?"**

**What They're Testing:**
- Understanding of JS object model
- Prototype chain
- Constructor functions vs classes

**Your Answer Should Include:**

```javascript
// Prototype chain visualization
const animal = {
  speak: function() { return 'sound'; }
};

const dog = Object.create(animal);
dog.bark = function() { return 'woof'; };

console.log(dog.speak()); // inherited from animal
console.log(dog.__proto__ === animal); // true

// Constructor function way
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return this.name + ' makes sound';
};

const myDog = new Animal('Dog');
console.log(myDog.speak()); // Dog makes sound
console.log(myDog.__proto__ === Animal.prototype); // true
```

**Modern Class Syntax:**
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return this.name + ' makes sound';
  }
}

class Dog extends Animal {
  bark() {
    return this.speak() + ' (woof!)';
  }
}

const dog = new Dog('Buddy');
console.log(dog.bark()); // Buddy makes sound (woof!)
```

**Key Points:**
- `__proto__`: Actual object's prototype (don't use in production)
- `prototype`: Constructor's prototype property
- Prototype chain: Object → constructor.prototype → Object.prototype → null

---

## SECTION 3: ARRAY & OBJECT MANIPULATION

### Q6: Array Methods & Functional Programming
**"When would you use map, filter, reduce? Provide real examples. What's the difference in performance?"**

**What They're Testing:**
- Functional programming knowledge
- Understanding of array iteration
- Performance awareness
- Real-world application

**Your Answer Should Include:**

1. **Map: Transform array**
```javascript
// Extract supplier names
const suppliers = [
  { id: 1, name: 'Supplier A', revenue: 100000 },
  { id: 2, name: 'Supplier B', revenue: 200000 }
];

const names = suppliers.map(s => s.name);
// ['Supplier A', 'Supplier B']
```

2. **Filter: Select items**
```javascript
// Get high-revenue suppliers
const highRevenue = suppliers.filter(s => s.revenue > 150000);
// [{ id: 2, name: 'Supplier B', revenue: 200000 }]
```

3. **Reduce: Aggregate data**
```javascript
// Calculate total revenue
const total = suppliers.reduce((sum, s) => sum + s.revenue, 0);
// 300000

// Complex reduce: group by revenue tier
const grouped = suppliers.reduce((acc, s) => {
  const tier = s.revenue > 150000 ? 'high' : 'low';
  acc[tier] = acc[tier] || [];
  acc[tier].push(s);
  return acc;
}, {});
```

4. **Performance Comparison**
```javascript
// Multiple iterations (BAD - O(3n))
const result = array
  .map(x => x * 2)      // First pass
  .filter(x => x > 10)  // Second pass
  .reduce((sum, x) => sum + x, 0); // Third pass

// Single iteration (BETTER - O(n))
const result = array.reduce((acc, x) => {
  const doubled = x * 2;
  if (doubled > 10) {
    return acc + doubled;
  }
  return acc;
}, 0);

// For large arrays (100K+): Second version is 3x faster!
```

**Real Mercanis Example:**
```javascript
// Filter orders, calculate total, get top 3
const orders = [
  { id: 1, supplier: 'A', amount: 5000, status: 'completed' },
  { id: 2, supplier: 'B', amount: 3000, status: 'pending' },
  { id: 3, supplier: 'A', amount: 8000, status: 'completed' }
];

// Calculate top suppliers by revenue
const topSuppliers = orders
  .filter(o => o.status === 'completed')
  .reduce((acc, o) => {
    const existing = acc.find(s => s.supplier === o.supplier);
    if (existing) {
      existing.total += o.amount;
    } else {
      acc.push({ supplier: o.supplier, total: o.amount });
    }
    return acc;
  }, [])
  .sort((a, b) => b.total - a.total)
  .slice(0, 3);
```

---

### Q7: Object Methods - Keys, Values, Entries
**"Explain Object.keys(), Object.values(), Object.entries(). When do you use each?"**

**Your Answer Should Include:**

```javascript
const supplier = {
  id: 1,
  name: 'Supplier A',
  revenue: 100000,
  city: 'Delhi'
};

// Get all keys
Object.keys(supplier);
// ['id', 'name', 'revenue', 'city']

// Get all values
Object.values(supplier);
// [1, 'Supplier A', 100000, 'Delhi']

// Get key-value pairs
Object.entries(supplier);
// [['id', 1], ['name', 'Supplier A'], ['revenue', 100000], ['city', 'Delhi']]

// Practical: Convert to query string
const queryString = Object.entries(supplier)
  .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
  .join('&');
// id=1&name=Supplier%20A&revenue=100000&city=Delhi
```

---

## SECTION 4: ERROR HANDLING & DEBUGGING

### Q8: Error Handling Best Practices
**"How do you handle errors in production code? Give examples with async/await, promises, and APIs."**

**What They're Testing:**
- Production readiness
- Error recovery
- Monitoring & logging
- User experience

**Your Answer Should Include:**

1. **Try-Catch Best Practices**
```javascript
async function processPayment(orderId) {
  try {
    const order = await fetchOrder(orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    const payment = await razorpay.charge(order.amount);
    return payment;

  } catch (error) {
    // Log error for monitoring
    logger.error('Payment error:', {
      orderId,
      message: error.message,
      stack: error.stack,
      timestamp: new Date()
    });

    // Notify user
    await notifyUser(orderId, 'Payment failed. Please try again.');

    // Re-throw or return error state
    throw error;
  } finally {
    // Cleanup
    clearTemporaryData(orderId);
  }
}
```

2. **Promise Error Handling**
```javascript
fetchData()
  .then(data => processData(data))
  .catch(error => {
    // Handle specific errors
    if (error.code === 'TIMEOUT') {
      return retryWithBackoff();
    }
    if (error.code === '401') {
      redirectToLogin();
    }
    return null;
  })
  .finally(() => hideLoadingSpinner());
```

3. **Error Boundary (React)**
```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to Sentry
    Sentry.captureException(error, { errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

4. **API Error Handling**
```javascript
async function fetchWithRetry(url, maxRetries = 3) {
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();

    } catch (error) {
      lastError = error;

      // Exponential backoff
      const delay = Math.pow(2, i) * 1000;
      console.log(`Retry ${i + 1}/${maxRetries} after ${delay}ms`);

      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}
```

---

## SECTION 5: PERFORMANCE & OPTIMIZATION

### Q9: Debounce vs Throttle
**"Explain debounce and throttle. When would you use each? Implement both."**

**What They're Testing:**
- Performance optimization
- Understanding of execution control
- Practical implementation

**Your Answer Should Include:**

1. **Debounce: Wait until activity stops**
```javascript
// Use case: Search input, autocomplete
function debounce(func, delay) {
  let timeoutId;

  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

// Example: Search orders
const handleSearch = debounce((query) => {
  fetchOrders(query); // Only called 500ms after user stops typing
}, 500);

input.addEventListener('input', (e) => {
  handleSearch(e.target.value);
});

// Without debounce: 10 chars = 10 API calls
// With debounce: 10 chars = 1 API call (when user stops)
```

2. **Throttle: Execute at most every N milliseconds**
```javascript
function throttle(func, delay) {
  let lastCall = 0;

  return function(...args) {
    const now = Date.now();

    if (now - lastCall >= delay) {
      func(...args);
      lastCall = now;
    }
  };
}

// Example: Scroll event
const handleScroll = throttle(() => {
  updateScrollPosition(); // Called max every 100ms
}, 100);

window.addEventListener('scroll', handleScroll);

// Without throttle: Scroll event fires 100+ times/sec
// With throttle: Your function called max 10 times/sec
```

3. **Comparison**
```javascript
// Debounce: "Wait until user stops doing something"
// Use for: Search, form submission, resize

// Throttle: "Run at most once per N milliseconds"
// Use for: Scroll, mouse move, window resize

// Real Mercanis example:
// Debounce: Search suppliers (wait for user to finish typing)
const searchSuppliers = debounce((term) => {
  fetchSuppliers(term);
}, 300);

// Throttle: Track scroll position (update every 200ms max)
const trackScroll = throttle(() => {
  analytics.track('scrolled', { position: window.scrollY });
}, 200);
```

---

### Q10: Memory Leaks & Performance Issues
**"How do you identify and fix memory leaks? Common causes in React?"**

**What They're Testing:**
- Production experience
- Debugging skills
- Understanding of resource management

**Your Answer Should Include:**

1. **Common Memory Leak: Event Listeners**
```javascript
// LEAK: Listener never removed
class Component {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  // Listener still attached! Memory leak!
}

// FIX: Remove listener
class Component {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
```

2. **Memory Leak: WebSocket/Timer**
```javascript
// LEAK: Socket never closed
componentDidMount() {
  this.socket = io('https://api.mercanis.com');
  this.socket.on('update', this.handleUpdate);
}

// FIX: Close socket
componentWillUnmount() {
  this.socket.disconnect();
}
```

3. **Memory Leak: Subscriptions (Observable)**
```javascript
// LEAK: Subscription never unsubscribed
componentDidMount() {
  this.subscription = observable$.subscribe(data => {
    this.setState(data);
  });
}

// FIX: Unsubscribe
componentWillUnmount() {
  this.subscription.unsubscribe();
}
```

4. **Detecting Memory Leaks**
```javascript
// Use Chrome DevTools:
// 1. Open DevTools → Performance tab
// 2. Record (red circle)
// 3. Perform action (open/close component multiple times)
// 4. Stop recording
// 5. Check Memory heap: Should go down when component unmounts
// 6. If heap keeps growing → Memory leak!

// Or use performance.memory:
console.log(performance.memory);
// {
//   jsHeapSizeLimit: 2172649472,
//   totalJSHeapSize: 1234567890,
//   usedJSHeapSize: 987654321
// }
```

---

## SECTION 6: ADVANCED CONCEPTS

### Q11: Destructuring & Spread Operator
**"Explain destructuring and spread operator. Show practical examples."**

**Your Answer Should Include:**

```javascript
// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first = 1, second = 2, rest = [3, 4, 5]

// Object destructuring
const { name, city, ...otherProps } = {
  name: 'Supplier A',
  city: 'Delhi',
  revenue: 100000,
  employees: 50
};
// name = 'Supplier A', city = 'Delhi'
// otherProps = { revenue: 100000, employees: 50 }

// Spread operator: Combine arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Spread operator: Copy objects
const original = { name: 'A', city: 'Delhi' };
const copy = { ...original }; // Shallow copy

// Spread with new properties
const updated = { ...original, city: 'Mumbai' };
// { name: 'A', city: 'Mumbai' }

// Real Mercanis example:
// Extract only needed fields from order
const { id, supplierId, amount, ...metadata } = order;
// Use id, supplierId, amount in response
// Metadata for logging
```

---

### Q12: Template Literals & String Methods
**"When do you use template literals? Show interpolation, multiline, and tagged templates."**

**Your Answer Should Include:**

```javascript
// Basic template literal
const name = 'Supplier A';
const message = `Hello, ${name}!`; // "Hello, Supplier A!"

// Multiline strings (useful for JSON, HTML)
const json = `
  {
    "supplier": "${name}",
    "timestamp": "${new Date().toISOString()}"
  }
`;

// Expression evaluation
const x = 10, y = 20;
const result = `${x} + ${y} = ${x + y}`; // "10 + 20 = 30"

// Tagged template functions
function sql(strings, ...values) {
  // Strings: [' SELECT * FROM suppliers WHERE id = ', '']
  // Values: [1]
  return strings[0] + values[0] + strings[1];
}

const supplierId = 1;
const query = sql`SELECT * FROM suppliers WHERE id = ${supplierId}`;

// Real Mercanis: Error message formatting
function logError(strings, ...values) {
  const [context, code, message] = values;
  return `[${new Date().toISOString()}] ${context}: ${code} - ${message}`;
}

const error = logError`
  Context: ${'Payment'}
  Code: ${'TIMEOUT'}
  Message: ${'Payment gateway did not respond'}
`;
```

---

## SECTION 7: INTERVIEW STRATEGY

### What Interviewers Are Looking For:

✅ **Understanding:** Not just memorization, but WHY
✅ **Practical Examples:** Real-world usage, not textbook
✅ **Trade-offs:** Every solution has pros/cons
✅ **Production Readiness:** Error handling, performance, monitoring
✅ **Communication:** Explaining clearly, not just code

### Red Flags (Things to Avoid):

❌ Saying "I don't know" without trying
❌ Memorized definitions without understanding
❌ No error handling in code examples
❌ Ignoring performance implications
❌ Not asking clarifying questions
❌ Writing code without explaining

### Tips for Each Question:

1. **Think out loud** - Explain your thought process
2. **Ask clarifying questions** - "Do you want production code or just concept?"
3. **Provide examples** - Always show code, not just explanation
4. **Discuss trade-offs** - "This is fast but uses more memory..."
5. **Mention monitoring** - "I'd add Sentry to track errors"
6. **Reference your experience** - "At Mercanis, we used this pattern for..."

---

## SECTION 8: FOLLOW-UP QUESTIONS TO EXPECT

For each main question, they might ask:

### Q1 Follow-ups (Closures):
- What's a memory leak with closures?
- How do you avoid closure-related memory leaks?
- Difference between closure and scope?

### Q2 Follow-ups (Async):
- How does Promise.all() vs Promise.race() work?
- What's the difference between async/await and Promise.then()?
- How do you handle partial failures in Promise.all()?

### Q3 Follow-ups (Event Loop):
- What's the difference between microtask and macrotask queues?
- Why does Promise.then() execute before setTimeout()?
- How would you optimize code with knowledge of event loop?

### Q4 Follow-ups (this):
- How does 'this' work in arrow functions?
- Why is 'this' important in object-oriented JS?
- How do you debug 'this' binding issues?

### Q5 Follow-ups (Prototypes):
- What's the difference between __proto__ and .prototype?
- Why should you avoid modifying Array.prototype?
- How does class inheritance relate to prototypes?

### Q6 Follow-ups (Array Methods):
- What's the time complexity of map/filter/reduce?
- When should you NOT use functional methods?
- How do you handle errors in chain of array methods?

### Q7 Follow-ups (Object Methods):
- How do you create a deep copy of an object?
- What's the difference between Object.assign and spread?
- How do you filter object properties?

### Q8 Follow-ups (Error Handling):
- How do you test error handling?
- What should you log in production errors?
- How do you handle unhandled promise rejections?

### Q9 Follow-ups (Debounce/Throttle):
- When would you use debounce vs throttle?
- How does debounce affect user experience?
- Can you implement both in one function?

### Q10 Follow-ups (Memory Leaks):
- How do you test for memory leaks?
- What's the difference between memory leak and memory bloat?
- How do you profile React component memory usage?

### Q11 Follow-ups (Destructuring):
- What's the difference between destructuring and rest parameters?
- How do you rename destructured variables?
- Can you destructure nested objects?

### Q12 Follow-ups (Template Literals):
- What's a tagged template literal?
- Why use template literals over string concatenation?
- How do you escape special characters in template literals?

---

## 🚀 HOW TO USE THIS DOCUMENT

### Before Interview:
1. [ ] Read each question completely
2. [ ] Try answering WITHOUT looking at the answer
3. [ ] Compare your answer to provided answer
4. [ ] Identify gaps in your knowledge
5. [ ] Write down your own code examples
6. [ ] Practice explaining each concept (2-3 minutes)

### During Interview:
1. [ ] Take 10 seconds to understand the question
2. [ ] Ask clarifying questions if needed
3. [ ] Provide real code examples (not pseudocode)
4. [ ] Mention trade-offs and gotchas
5. [ ] Explain WHY, not just WHAT
6. [ ] Discuss production implications

### After Question:
1. [ ] Ask "Does this answer your question?"
2. [ ] Be ready for follow-ups
3. [ ] Don't memorize - understand!

---

## 📊 DIFFICULTY BREAKDOWN

| Q | Topic | Difficulty | Time | Real-world? |
|---|-------|-----------|------|------------|
| 1 | Closures | Medium | 8-10 min | ✅ Very common |
| 2 | Async/Await | Medium | 10-12 min | ✅ Daily use |
| 3 | Event Loop | Hard | 12-15 min | ✅ Important |
| 4 | this Binding | Medium | 10-12 min | ✅ Common bugs |
| 5 | Prototypes | Hard | 10-12 min | 🟡 Less common |
| 6 | Array Methods | Easy | 8-10 min | ✅ Very common |
| 7 | Object Methods | Easy | 6-8 min | ✅ Common |
| 8 | Error Handling | Medium | 10-12 min | ✅ Critical |
| 9 | Debounce/Throttle | Hard | 12-15 min | ✅ Optimization |
| 10 | Memory Leaks | Hard | 12-15 min | ✅ Production |
| 11 | Destructuring | Easy | 8-10 min | ✅ Modern JS |
| 12 | Template Literals | Easy | 6-8 min | ✅ Modern JS |

---

**Total Expected Interview Time:** 120-150 minutes (covers 60-90 min interview)

**Next Steps:** Answer these questions, then we'll review your answers and improve them! 💪

Good luck with your preparation! 🚀
