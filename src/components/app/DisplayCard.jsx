import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../localStorage/userData';
// import cardDesign from "../../assets/cwhface.png";

export default function DisplayCard() {
    const {state, setSelectedCardNumber } = useContext(AuthContext);

    const username = state.user.username;

    const existingCards = JSON.parse(localStorage.getItem(username)) || [];

    const [selectedCardIndex, setSelectedCardIndex] = useState(null);

    const handleCardSelect = (index, cardNumber) => {
        setSelectedCardIndex(index);
        
        setSelectedCardNumber(cardNumber);
      };

    const defaultCard = () => {
        if (existingCards) {
            if (!selectedCardIndex) {
                handleCardSelect(0, existingCards[0].cardNumber);
            }
        }
    }

    useEffect(() => {   
        defaultCard();
    }, []);
    
  return (
    <div className='md:overflow-x-auto  flex space-x-4 '>
       
       {
        existingCards && 
         existingCards.map((card, index) => {
            const isSelected = index == selectedCardIndex;

            if (username === card.cardholderName ) {
                return (
                    <div
                    className={`cardDesign ${isSelected ? 'highlight' : ''}`} 
                    role="button"
                    tabIndex="0"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            handleCardSelect(index, card.cardNumber);
                        }
                    }}
                    onClick={() => handleCardSelect(index, card.cardNumber)}
                    key={index}>
                        <p className='xl:text-lg font-medium 2xl:text-xl'>E-Wallet Hero</p>
                        <p className='xl:text-xl font-medium 2xl:text-xl'>{card.cardNumber}</p>
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
                    </div>
                )
            }
            
            
         })
       }
    </div>
  )
}
