import { formatCurrency } from "../scripts/utils.js";

function testFormatCurrency() {
  console.log('Testing formatCurrency...');

  // Test case 1: Zero cents
  if (formatCurrency(0) === '0.00') {
    console.log('✓ Test 1 passed: 0 cents -> $0.00');
  } else {
    console.log('✗ Test 1 failed: Expected "0.00", got', formatCurrency(0));
  }

  // Test case 2: 100 cents = $1.00
  if (formatCurrency(100) === '1.00') {
    console.log('✓ Test 2 passed: 100 cents -> $1.00');
  } else {
    console.log('✗ Test 2 failed: Expected "1.00", got', formatCurrency(100));
  }

  // Test case 3: 150 cents -> rounds to $2.00 (Math.round(1.5) = 2)
  if (formatCurrency(150) === '2.00') {
    console.log('✓ Test 3 passed: 150 cents -> $2.00');
  } else {
    console.log('✗ Test 3 failed: Expected "2.00", got', formatCurrency(150));
  }

  // Test case 4: 199 cents -> rounds to $2.00 (Math.round(1.99) = 2)
  if (formatCurrency(199) === '2.00') {
    console.log('✓ Test 4 passed: 199 cents -> $2.00');
  } else {
    console.log('✗ Test 4 failed: Expected "2.00", got', formatCurrency(199));
  }

  // Test case 5: 200 cents = $2.00
  if (formatCurrency(200) === '2.00') {
    console.log('✓ Test 5 passed: 200 cents -> $2.00');
  } else {
    console.log('✗ Test 5 failed: Expected "2.00", got', formatCurrency(200));
  }

  // Test case 6: 250 cents -> rounds to $3.00 (Math.round(2.5) = 3)
  if (formatCurrency(250) === '3.00') {
    console.log('✓ Test 6 passed: 250 cents -> $3.00');
  } else {
    console.log('✗ Test 6 failed: Expected "3.00", got', formatCurrency(250));
  }

  // Test case 8: Negative cents (should round negative)
  if (formatCurrency(-100) === '-1.00') {
    console.log('✓ Test 8 passed: -100 cents -> $-1.00');
  } else {
    console.log('✗ Test 8 failed: Expected "-1.00", got', formatCurrency(-100));
  }

  // Test case 9: 1 cent -> rounds to $0.00 (Math.round(0.01) = 0)
  if (formatCurrency(1) === '0.00') {
    console.log('✓ Test 9 passed: 1 cent -> $0.00');
  } else {
    console.log('✗ Test 9 failed: Expected "0.00", got', formatCurrency(1));
  }

  // Test case 10: 49 cents -> $0.00
  if (formatCurrency(49) === '0.00') {
    console.log('✓ Test 10 passed: 49 cents -> $0.00');
  } else {
    console.log('✗ Test 10 failed: Expected "0.00", got', formatCurrency(49));
  }

  // Test case 11: 50 cents -> $1.00 (rounds up)
  if (formatCurrency(50) === '1.00') {
    console.log('✓ Test 11 passed: 50 cents -> $1.00');
  } else {
    console.log('✗ Test 11 failed: Expected "1.00", got', formatCurrency(50));
  }

  // Test case 12: 99 cents -> $1.00
  if (formatCurrency(99) === '1.00') {
    console.log('✓ Test 12 passed: 99 cents -> $1.00');
  } else {
    console.log('✗ Test 12 failed: Expected "1.00", got', formatCurrency(99));
  }

  // Test case 13: 101 cents -> $1.00
  if (formatCurrency(101) === '1.00') {
    console.log('✓ Test 13 passed: 101 cents -> $1.00');
  } else {
    console.log('✗ Test 13 failed: Expected "1.00", got', formatCurrency(101));
  }

  // Test case 14: Large number, 100000 cents = $1000.00
  if (formatCurrency(100000) === '1000.00') {
    console.log('✓ Test 14 passed: 100000 cents -> $1000.00');
  } else {
    console.log('✗ Test 14 failed: Expected "1000.00", got', formatCurrency(100000));
  }

  // Test case 15: Fractional input (though cents should be integer, test robustness)
  if (formatCurrency(100.5) === '1.00') {
    console.log('✓ Test 15 passed: 100.5 cents -> $1.00');
  } else {
    console.log('✗ Test 15 failed: Expected "1.00", got', formatCurrency(100.5));
  }

  console.log('Testing complete.');
}

// Run the tests
testFormatCurrency();

