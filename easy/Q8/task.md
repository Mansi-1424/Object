# 💼 Compensation Intelligence System

## Problem Title
Compensation Intelligence System using Context-Based Function Execution

---

## Problem Description
The Compensation Intelligence System is a web-based application designed to
calculate the final payable earnings of an individual based on multiple
financial components such as base earnings, performance additions, and
statutory deductions.

The system demonstrates how a single calculation function can be reused
across different financial contexts using JavaScript’s context-handling
mechanisms. It highlights the use of function execution with dynamic data
binding, event handling, and DOM manipulation.

---

## Input
- Base Earnings (numeric value)
- Performance Addition / Bonus (numeric value)
- Statutory Deduction / Tax (numeric value)

All inputs must be valid numbers.

---

## Explanation
1. The user enters base earnings, bonus, and deduction values.
2. JavaScript retrieves and validates all numeric inputs.
3. A financial context object is created to store base earnings.
4. A shared calculation function is executed using the provided context.
5. The function computes the final payable amount using all components.
6. The result is displayed dynamically in the result panel.
7. This approach allows reusable logic with different financial data.

---

## Constraints
- All input values must be numeric
- Empty or invalid inputs are not allowed
- Calculation logic is reusable but context-specific
- Function execution depends on a valid financial context
- The system performs client-side calculations only

---
