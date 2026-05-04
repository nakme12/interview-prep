# 🚀 JavaScript Interview Roadmap (1+ YOE)

## 📌 Phase 1: The Basics (But Tricky)
*Interviewer check karta hai ki aapka foundation kitna strong hai.*

### 1. Variables & Scope
*   **Topics:** ar vs let vs const, Function Scope vs Block Scope.
*   **The "Gotcha":** Temporal Dead Zone (TDZ).
*   **Cross-Question:** "Kya hum const se bane object ki properties change kar sakte hain?" 
    *   *Answer:* Haan, kyunki const reference ko lock karta hai, value ko nahi.

### 2. Hoisting
*   **Topics:** Variable hoisting vs Function hoisting.
*   **Cross-Question:** "Agar hum let variable ko declare karne se pehle access karein toh kya hoga?"
    *   *Answer:* ReferenceError (TDZ ki wajah se).

---

## 📌 Phase 2: Modern ES6+ (Daily Bread)
*Ye wahi cheezein hain jo aap coding round mein use karoge.*

### 3. Array Methods (Priority: 🔥🔥🔥)
*   **Topics:** map(), ilter(), educe(), ind(), some(), every().
*   **Cross-Question:** "map aur orEach mein kya antar hai?"
    *   *Answer:* map naya array return karta hai, orEach sirf loop chalata hai aur undefined return karta hai.

### 4. Destructuring & Spread
*   **Topics:** Object/Array destructuring, Spread (...) vs Rest parameters.
*   **Cross-Question:** "Deep copy aur Shallow copy mein spread operator kaise kaam karta hai?"

---

## 📌 Phase 3: The Engine (Advanced Core)
*Selection isi phase se decide hota hai.*

### 5. Closures (Priority: 🔥🔥🔥)
*   **Topics:** Lexical scope, Encapsulation (Private variables).
*   **Real Example:** Creating a counter or a "Once" function.

### 6. The 	his Keyword
*   **Topics:** Implicit binding, Explicit binding (call, pply, ind).
*   **Cross-Question:** "Arrow function mein 	his kaise behave karta hai?"
    *   *Answer:* Arrow function ka apna 	his nahi hota, wo apne parent (lexical) scope se inherit karta hai.

### 7. Prototypes & Inheritance
*   **Topics:** Prototype chain, __proto__ vs prototype.

---

## 📌 Phase 4: Asynchronous JS (The Survival Kit)
*API handling aur Performance ke liye.*

### 8. Event Loop (Priority: 🔥🔥🔥)
*   **Topics:** Call Stack, Web APIs, Microtask Queue (Promises) vs Macrotask Queue (setTimeout).

### 9. Promises & Async/Await
*   **Topics:** Promise states (Pending, Resolved, Rejected), Promise.all(), Promise.allSettled().
*   **Cross-Question:** "Agar 3 API calls mein se ek fail ho jaye, toh Promise.all ka behavior kya hoga?"
    *   *Answer:* Wo turant reject ho jayega.

---

## 📌 Phase 5: Web APIs & Optimization
*Senior level skills for 1+ YOE.*

### 10. Performance Optimization
*   **Topics:** De-bouncing (Search bar), Throttling (Scrolling/Resizing).
*   **Browser Storage:** LocalStorage vs SessionStorage vs Cookies.

---

## 🛠 Machine Coding Tasks (Interview Practical)
1.  **Flatten an Array:** [1, [2, [3]]] -> [1, 2, 3]
2.  **Remove Duplicates:** [1, 2, 2, 3] -> [1, 2, 3]
3.  **Debounce Function:** Ek custom debounce function likho.
4.  **Group Objects:** Array of users ko age ke basis par group karo (using educe).
