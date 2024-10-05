 const cardReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_CARD':
        // Get the userId (or unique identifier for the logged-in user)
        const { userId, cardData } = action.payload;
  
        // Retrieve existing cards for the user from localStorage
        const existingCards = JSON.parse(localStorage.getItem(userId)) || [];
  
        // Add the new card to the existing cards
        const updatedCards = [...existingCards, cardData];
  
        // Save the updated cards for the specific user in localStorage
        localStorage.setItem(userId, JSON.stringify(updatedCards));
  
        return updatedCards;
  
      case 'REMOVE_CARD':
        const { userId: removeUserId, cardNumber } = action.payload;
  
        // Retrieve existing cards for the user
        const cardsToRemove = JSON.parse(localStorage.getItem(removeUserId)) || [];
  
        // Filter out the card that matches the card number
        const filteredCards = cardsToRemove.filter((card) => card.cardNumber !== cardNumber);
  
        // Update localStorage with the filtered list for the specific user
        localStorage.setItem(removeUserId, JSON.stringify(filteredCards));
  
        return filteredCards;
  
      case 'VIEW_CARDS':
        const { userId: viewUserId } = action.payload;
  
        // Retrieve cards for the specific user from localStorage
        const userCards = JSON.parse(localStorage.getItem(viewUserId));
  
        // If there are cards in localStorage for the user, return them
        if (userCards) {
          return userCards;
        }
  
        return state;
  
      default:
        return state;
    }
  };
  