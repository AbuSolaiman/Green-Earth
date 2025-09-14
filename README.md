# JavaScript ES6 Concepts - README

This document explains some important ES6 concepts and JavaScript methods.

---

## 1) Difference between var, let, and const

- *var*
  - Function-scoped or globally scoped.
  - Can be redeclared and updated.
  - Hoisted (declared at the top of scope) but initialized with undefined.

- *let*
  - Block-scoped (works only inside {} where declared).
  - Can be updated but *not redeclared* in the same scope.
  - Hoisted but not initialized (in Temporal Dead Zone).

- *const*
  - Block-scoped.
  - Cannot be updated or redeclared.
  - Must be initialized at the time of declaration.
  - For objects/arrays, the reference cannot change, but their contents can be modified.

---

## 2) Difference between map(), forEach(), and filter()

- *map()*
  - Returns a *new array* with modified values.
  - Does not change the original array.
  - Useful when you want to transform data.

- *forEach()*
  - Executes a function for *each element* in the array.
  - Returns *undefined* (no new array).
  - Mostly used for side effects like logging or updating external variables.

- *filter()*
  - Returns a *new array* with elements that satisfy a condition.
  - Original array remains unchanged.
  - Useful for selecting specific elements.

---

## 3) Arrow Functions in ES6

- Introduced in ES6 as a shorter syntax for functions.
- Example:
  ```js
  const add = (a, b) => a + b;

---

## 4) How does destructuring assignment work in ES6?

- A syntax to extract values from arrays or objects into variables.
- Array Example:
  ```js
  const numbers = [10, 20, 30];
  const [a, b] = numbers;
  console.log(a, b);

---

## 5) Explain template literals in ES6. How are they different from string concatenation?

- A new way to create strings using backticks `.
- Supports multiline strings and string interpolation with ${}.
- Example:
  ```js
  const name = "Elias";
   const age = 22;
  console.log(My name is ${name} and I am ${age} years old.);
## Difference from String Concatenation:
- Easier to read and maintain.
- No need to use + operator.
- Can directly embed variables and expressions.
