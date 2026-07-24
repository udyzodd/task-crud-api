/**
 * REDUCE: The Blender
 * Concept: Distills an entire array down to one single value (a number, string, object, etc.).
 * Syntax: arr.reduce((accumulator, currentItem) => { ... }, initialValue)
 */

// Imagine a piggy bank starting with $0, adding coins one by one
const coins = [5, 10, 25, 10];

const totalSavings = coins.reduce((piggyBank, currentCoin) => {
  return piggyBank + currentCoin;
}, 0); // <-- 0 is the starting value (Initial Value)

console.log('--- REDUCE VISUALIZATION ---');
console.log('Coins:       ', coins);
console.log('Total Saved: ', totalSavings); // 50

// Real-World Example: Calculating a shopping cart total and grouping items
const shoppingCart = [
  { item: 'Shoes', price: 80, quantity: 1 },
  { item: 'Socks', price: 5, quantity: 3 },
  { item: 'Shirt', price: 25, quantity: 2 },
];

const checkoutTotal = shoppingCart.reduce((runningTotal, product) => {
  // Multiply price by quantity and add to the running total
  return runningTotal + product.price * product.quantity;
}, 0); // Start checkout at $0

console.log('\n--- REAL WORLD REDUCE ---');
console.log(`Your final bill is: $${checkoutTotal}`); // Output: $145
