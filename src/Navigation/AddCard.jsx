import { useState } from "react";

export default function AddCard({ onAddCard, goBack }) {
    const [cardData, setCardData] = useState({
        cardNumber: "",
        expirationDate: "",
        cvv: "",
        cardholderName: "",
      });

    const handleSubmit = () => {
        // Ensure all fields are filled
        if (!cardData.cardNumber || !cardData.expirationDate || !cardData.cvv || !cardData.cardholderName) {
          alert("Please fill in all fields");
          return;
        }
        onAddCard(cardData); // Add card to localStorage and state
        goBack(); // Go back to the dashboard
      };

      return (
        <div>
          <h1 className="text-2xl font-medium">Add New Card</h1>
          <input 
            type="text" 
            placeholder="Card Number" 
            value={cardData.cardNumber}
            onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
            className="mb-2"
          />
          <input 
            type="text" 
            placeholder="Expiration Date" 
            value={cardData.expirationDate}
            onChange={(e) => setCardData({ ...cardData, expirationDate: e.target.value })}
            className="mb-2"
          />
          <input 
            type="text" 
            placeholder="CVV" 
            value={cardData.cvv}
            onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
            className="mb-2"
          />
          <input 
            type="text" 
            placeholder="Cardholder's Name" 
            value={cardData.cardholderName}
            onChange={(e) => setCardData({ ...cardData, cardholderName: e.target.value })}
            className="mb-2"
          />
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Add Card</button>
          <button onClick={goBack} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">Back</button>
        </div>
      );
  
}
