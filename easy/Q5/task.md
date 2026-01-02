# 🏫 School Student Manager

## Problem Title
School Student Management System Using JavaScript Objects

---

## Problem Description
The School Student Manager is a dynamic web-based system designed to manage
student academic and profile information using JavaScript object-oriented
concepts.

The application simulates a real school environment where each student has
personal details, subject-wise marks, academic status, and performance data.
All operations such as grade calculation, promotion, attendance updates, and
report generation are handled using object methods and DOM manipulation.

---

## Input
- Student data stored as JavaScript objects
- Each student contains:
  - Name, Roll Number, Age
  - Grade and Attendance Status
  - Subject-wise Marks
- Selected student and selected action from dropdown controls

> No manual numeric input is required from the user.

---

## JavaScript Logic Demo 


### Student Object Logic
- Each student is represented as an object
- Marks are stored as a nested object
- Methods are used to:
  - Calculate total marks
  - Calculate percentage
  - Assign grade based on percentage
  - Promote the student to next grade
  - Update attendance status

### Display Logic
- Selected student data is extracted from the object
- Profile and academic sections update dynamically
- Subject marks are rendered using object iteration
- Grades are calculated in real time

### Action Handling Logic
- User selects an action from the control panel
- Corresponding object method is executed
- Results are reflected instantly on the UI
- All actions are logged in the activity section

### Statistics Logic
- Total students calculated from object length
- Average percentage calculated using aggregation
- Top performer determined by comparing percentages
- Unique subjects calculated using a set-like structure

---

## Explanation
1. Student data is stored using JavaScript objects.
2. Nested objects represent subject-wise marks.
3. Object methods encapsulate academic logic.
4. DOM manipulation updates the interface dynamically.
5. Dropdown selections control which object is active.
6. Buttons trigger object methods and UI updates.
7. Activity logs record every system operation.
8. Statistics provide a class-level overview.
9. Keyboard shortcuts enhance usability.

---

## Constraints
- Marks must be numeric values between 0 and 100
- Grade calculation follows predefined ranges
- Each student must contain a marks object
- Promotion logic applies only to numeric grades
- System runs entirely on client-side
- Data resets are simulated (no database used)

---

## Real-World Use Case
This system represents how schools digitally manage:
- Student records
- Academic performance
- Attendance
- Promotions
- Report cards

It mirrors real student management software at a simplified level.

---
