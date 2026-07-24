/**
 * MAP: The Transformer
 * Concept: Takes an array, applies a function to EVERY item, and returns a NEW array.
 * Original array is UNCHANGED.
 */

// Imagine a factory assembly line where every raw item gets packaged
const rawProducts = ['🍎', '🥔', '🍋'];

// Syntax: arr.map((item, index, array) => { ... })
const packagedProducts = rawProducts.map((item) => item + '📦');

console.log('--- MAP VISUALIZATION ---');
console.log('Original: ', rawProducts); // ['🍎', '🥔', '🍋']
console.log('Mapped:   ', packagedProducts); // ['🍎📦', '🥔📦', '🍋📦']

// Real-World Example: Extracting and formatting data from an API response
const inventory = [
  { name: 'Laptop', price: 1000 },
  { name: 'Phone', price: 500 },
  { name: 'Tablet', price: 300 },
];

// Let's create an array of just the prices, but with a 10% tax added
const pricesWithTax = inventory.map((product) => {
  return {
    item: product.name,
    totalPrice: product.price * 1.1,
  };
});

console.log('\n--- REAL WORLD MAP ---');
console.log(pricesWithTax);
/* Output:
[
  { item: 'Laptop', totalPrice: 1100 },
  { item: 'Phone', totalPrice: 550 },
  { item: 'Tablet', totalPrice: 330 }
]
*/
