export const luhnCheck = (cardNumber) => {
  let sum = 0;
  let shouldDouble = false;

  // Loop through card number digits starting from the right
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i]);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0; // Valid if the sum is a multiple of 10
};
