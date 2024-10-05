import { useContext, useState } from 'react'
import { AuthContext } from '../../localStorage/userData';
// import cardDesign from "../../assets/cwhface.png";

export default function DisplayCard() {
    const {state} = useContext(AuthContext);

    const username = state.user.username;

    const existingCards = JSON.parse(localStorage.getItem(username)) || [];

    const [selectedCardIndex, setSelectedCardIndex] = useState(0);

    const handleCardSelect = (index) => {
        // Set the clicked card as the selected card
        // console.log(index);
        setSelectedCardIndex(index);
      };
    
  return (
    <div className='overflow-x-scroll flex space-x-4'>
       
       {
        existingCards &&
         existingCards.map((card, index) => {
            const isSelected = index == selectedCardIndex;

            return (
            <div
            className={`cardDesign ${isSelected ? 'highlight' : ''}`} 
            onClick={() => handleCardSelect(index)}
            key={index}>
                <p className='text-md font-medium'>E-Wallet Hero</p>
                <p className='texxl font-medium'>{card.cardNumber}</p>
                <div className='flex justify-between'>
                    
                    <div>
                        <p className='text-xs'>cardholderName</p>
                        <p className='text-sm font-medium'>{card.cardholderName}</p>
                    </div>
                    <div >
                        <p className='text-xs'>Expiration Date</p>
                        <p className='text-sm font-medium'>{card.expirationDate}</p>
                    </div>
                </div>
                {/* <p>CVV: {card.cvv}</p> */}
            </div>
            )
         })
       }
    </div>
  )
}
