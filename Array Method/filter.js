/**
 * FILTER: The Gatekeeper
 * Concept: Evaluates every item against a condition. Returns a NEW array containing
 * only the items that returned 'true'. Original array is UNCHANGED.
 */

// Imagine sorting a recycling bin
const trashBin = ['♻️ plastic', '🗑️ garbage', '♻️ paper', '🗑️ food waste'];

const recyclingBin = trashBin.filter((item) => item.includes('♻️'));

console.log('--- FILTER VISUALIZATION ---');
console.log('All Trash: ', trashBin);
console.log('Recycling: ', recyclingBin); // ['♻️ plastic', '♻️ paper']

// Real-World Example: Filtering a user database for active premium members
const users = [
  { name: 'Alice', status: 'active', tier: 'premium' },
  { name: 'Bob', status: 'inactive', tier: 'free' },
  { name: 'Charlie', status: 'active', tier: 'free' },
  { name: 'David', status: 'active', tier: 'premium' },
];

// Target: Active premium users only
const premiumAlertList = users.filter((user) => {
  return user.status === 'active' && user.tier === 'premium';
});

console.log('\n--- REAL WORLD FILTER ---');
console.log(premiumAlertList);
/* Output:
[
  { name: 'Alice', status: 'active', tier: 'premium' },
  { name: 'David', status: 'active', tier: 'premium' }
]
*/
