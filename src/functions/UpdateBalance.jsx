export const updateBalance = (username, amount, cardNumber) => {
    // Get user data from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    console.log('Users:', users); // Debugging: log all users
    console.log('Username:', username); // Debugging: log the username
    // Find the user
    const userIndex = users.findIndex((user) => user.username === username);


    if (userIndex !== -1) {
      // Find the card by cardNumber
      const cardIndex = users[userIndex].cards.findIndex((card) => card.cardNumber === cardNumber);

      if (cardIndex !== -1) {
        // Update the card's balance
        users[userIndex].cards[cardIndex].balance += amount;
        localStorage.setItem("users", JSON.stringify(users));
      } else {
        console.log("Card not found");
      }
    } else {
      console.log("User not found");

      const newUser = {
        username: username,
        cards: [{
            cardNumber: cardNumber,
            balance: amount
        }]
    };
    users.push(newUser);
    }
};
