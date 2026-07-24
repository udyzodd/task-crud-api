/**
 * JavaScript Array Methods: A Practical Guide & Sandbox
 * Run this file to see how arrays are manipulated in real-time.
 */

// =========================================================================
// 1. THE FILTER METHOD (Deep Dive)
// =========================================================================
// Unlike find(), which stops at the first match, filter() scans the entire
// array and returns a NEW array containing all elements that match the condition.

const users = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'user' },
  { id: 3, name: 'Charlie', role: 'admin' },
];

// Syntax: arr.filter(function(item, index, array) { ... })
const admins = users.filter(function (user) {
  // If this returns true, the user object is pushed to the new 'admins' array
  return user.role === 'admin';
});

console.log('--- 1. Filter Example ---');
console.log('Admins found:', admins);
// Output: [{ id: 1, name: 'Alice', role: 'admin' }, { id: 3, name: 'Charlie', ... }]

// =========================================================================
// 2. PRACTICAL SANDBOX (Testing the Cheat Sheet)
// =========================================================================

// --- To Add/Remove Elements ---
let fruits = ['apple', 'banana'];

fruits.push('orange'); // Adds to end -> ["apple", "banana", "orange"]
let last = fruits.pop(); // Removes from end -> "orange" (fruits is now ["apple", "banana"])
let first = fruits.shift(); // Removes from start -> "apple" (fruits is now ["banana"])
fruits.unshift('strawberry'); // Adds to start -> ["strawberry", "banana"]

// splice(start_index, delete_count, ...items_to_add)
// Modifies the array in-place. Let's replace 1 element at index 1
fruits.splice(1, 1, 'raspberry', 'blueberry');
console.log('\n--- 2. Add/Remove (After Splice) ---');
console.log(fruits); // ["strawberry", "raspberry", "blueberry"]

// slice(start, end) -> Extracts a section without mutating the original array
let favorites = fruits.slice(0, 2); // Indexes 0 and 1 (2 is non-inclusive)
console.log('Sliced favorites:', favorites); // ["strawberry", "raspberry"]

// --- To Search Among Elements ---
let numbers = [10, 20, 30, 40, 20];

console.log('\n--- 3. Searching ---');
console.log('Index of 20:', numbers.indexOf(20)); // 1 (first occurrence)
console.log('Last index of 20:', numbers.lastIndexOf(20)); // 4
console.log('Includes 30?:', numbers.includes(30)); // true
console.log(
  'Find first > 25:',
  numbers.find((num) => num > 25),
); // 30
console.log(
  'Find index of > 25:',
  numbers.findIndex((num) => num > 25),
); // 2

// --- To Iterate Over Elements ---
console.log('\n--- 4. Iterating with forEach ---');
fruits.forEach((fruit, index) => {
  console.log(`Fruit at index ${index} is ${fruit}`);
});

// --- To Transform the Array ---
console.log('\n--- 5. Transformations ---');

// map() creates a NEW array by doing something to every element
let upperFruits = fruits.map((fruit) => fruit.toUpperCase());
console.log('Mapped (Uppercase):', upperFruits);

// sort() sorts in-place. Note: Default sort treats elements as strings!
let scores = [40, 100, 1, 5];
scores.sort((a, b) => a - b); // Numeric sort formula
console.log('Sorted scores:', scores); // [1, 5, 40, 100]

// split and join (Converting between Strings and Arrays)
let namesString = 'John, Pete, Mary';
let namesArray = namesString.split(', '); // ["John", "Pete", "Mary"]
let joinedString = namesArray.join(' & '); // "John & Pete & Mary"

// reduce(accumulator, current_item) -> Derives a single value from an array
let totalScore = scores.reduce((sum, current) => sum + current, 0);
console.log('Reduced sum of scores:', totalScore); // 146

// --- Utility Checks ---
console.log('\n--- 6. Type Checking ---');
console.log('Is fruits an array?:', Array.isArray(fruits)); // true
console.log('Is a string an array?:', Array.isArray('hello')); // false

// =========================================================================
// 3. QUICK-REFERENCE SUMMARY TABLE
// =========================================================================
/*
| Method         | Mutates Original Array? | What does it return?                   |
|----------------|-------------------------|----------------------------------------|
| push / pop     | Yes                     | New length / Removed element           |
| shift / unshift| Yes                     | Removed element / New length           |
| splice         | Yes                     | Array of deleted elements              |
| slice          | No                      | New shallow-copied array segment       |
| concat         | No                      | New combined array                     |
| forEach        | No                      | undefined                              |
| map            | No                      | New transformed array                  |
| filter         | No                      | New filtered array                     |
| find / findIndex| No                     | Matching element / Matching index or -1|
| reduce         | No                      | Single accumulated value               |
| sort / reverse | Yes                     | The same array (mutated)               |
*/
