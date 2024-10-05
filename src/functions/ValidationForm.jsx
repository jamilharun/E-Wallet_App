import { luhnCheck } from "./LuhnCheck";

export const validateForm = (cardData) => {
    const { cardNumber, expirationDate, cvv } = cardData;

    // Validate card number using the Luhn algorithm
    if (!luhnCheck(cardNumber)) {
      alert("Invalid card number");
      return false;
    }

    // Validate expiration date (must be in MM/YY format and not expired)
    const currentDate = new Date();
    const [expMonth, expYear] = expirationDate.split("/");

    if (
      !expMonth ||
      !expYear ||
      isNaN(expMonth) ||
      isNaN(expYear) ||
      parseInt(expMonth) < 1 ||
      parseInt(expMonth) > 12 ||
      parseInt("20" + expYear) < currentDate.getFullYear() ||
      (parseInt("20" + expYear) === currentDate.getFullYear() &&
        parseInt(expMonth) < currentDate.getMonth() + 1)
    ) {
      alert("Invalid expiration date");
      return false;
    }

    // Validate CVV (should be 3 digits for most cards or 4 digits for American Express)
    if (cvv.length !== 3 && cvv.length !== 4) {
      alert("Invalid CVV");
      return false;
    }

    return true;
  };