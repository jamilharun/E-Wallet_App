import { useContext, useState } from "react";
import logo from "../assets/cwhlogo.png";
import happy from "../assets/cuteEWalletHero.png";
import { AuthContext } from "../localStorage/userData";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../functions/ValidationForm";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function AddCard() {
    const navigate = useNavigate();
    const {state} = useContext(AuthContext);

    const [cardData, setCardData] = useState({
        cardNumber: "",
        expirationDate: "",
        cvv: "",
        cardholderName: state.user.username,
      });

    const [Activity, setActivity] = useState("success");
    const handleSubmit = () => {
        
        setActivity("loading");
        // Ensure all fields are filled
        if (!cardData.cardNumber || !cardData.expirationDate || !cardData.cvv || !cardData.cardholderName) {
          alert("Please fill in all fields");
          setActivity(null);
          return;
        }

        setTimeout(() => {
          if (!validateForm(cardData)) setActivity(null);
  
          const username = state.user.username;
  
          const existingCards = JSON.parse(localStorage.getItem(username)) || [];
  
          const newCard = {
            cardNumber: cardData.cardNumber,
            expirationDate: cardData.expirationDate,
            cvv: cardData.cvv,
            cardholderName: cardData.cardholderName,
          };
  
          const updatedCards = [...existingCards, newCard];
  
          localStorage.setItem(username, JSON.stringify(updatedCards));
  
          // upon successful submission, clear the form
          setCardData({
            cardNumber: "",
            expirationDate: "",
            cvv: "",
            cardholderName: "",
          });
          setActivity("success");
          // navigate('/appStack/dashboard');
        }, 3000);

    };
    

      return (
        <div className="appStackPages">
          <div className="h-full flex justify-center items-center">

            {
                Activity === "loading" &&
                    <div className="z-20 absolute w-screen h-screen backdrop-blur-sm flex justify-center items-center">
                        <AiOutlineLoading3Quarters className="text-8xl animate-spin text-green-500" />
                    </div>
            }

            {
                Activity === "success" &&
                    <div 
                    onClick={() => {
                      setActivity(null)
                      navigate('/appStack/dashboard');
                    }}
                    className="z-20 absolute w-screen h-screen backdrop-blur-sm flex justify-center items-center">
                        <div className=" w-1/4  rounded-lg flex flex-row">
                          <img src={happy} alt="" />
                          <div className="bg-white h-full p-3 border-EWdarkBlue border-4 rounded-xl">
                            <h1 className="text-8xl text-EWred">Success</h1>
                            <p className="text-3xl text-EWdarkBlue">your new Card is ready!! :DD</p>

                          </div>
                        </div>
                    </div>
            }

            <div className="bg-white w-1/4  rounded-lg flex flex-col">
              
              {/* E-Wallet Hero logo */}
              <div className="eWalletHeroLogo">
                <img 
                  src={logo} 
                  alt="cuteEWalletHeroLogo" />
                <h1 >E-Wallet Hero</h1>
              </div>
              
              <div className="addCardContainer">
                <h1>Add New Card</h1>
                <div >
                  <div>
                    <p>Card Number: </p>
                  </div>
                  <input 
                    type="text" 
                    placeholder="##### #### #### ####" 
                    value={cardData.cardNumber}
                    onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                  />
                </div>

                <div>
                  <div>
                    <p>Expiration Date: </p>
                  </div>
                  <input 
                    type="text" 
                    placeholder="MM/YY" 
                    value={cardData.expirationDate}
                    onChange={(e) => setCardData({ ...cardData, expirationDate: e.target.value })}
                  />
                </div>

                <div>
                  <div>
                    <p>CVV: </p>
                  </div>
                  <input 
                    type="text" 
                    placeholder="###" 
                    value={cardData.cvv}
                    onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                  />
                </div>

                <div>
                  <div>
                    <p>Cardholder&apos;s Name: </p>
                  </div>
                  <input 
                    readOnly
                    type="text" 
                    placeholder="Cardholder's Name" 
                    value={state.user.username}
                    onChange={(e) => setCardData({ ...cardData, cardholderName: e.target.value })}
                  />
                </div>
              </div>
              <div className="addCardMessage">
                <p>please fill in all fields!</p>
              </div>
              <div className="addCardButton">
                <div className="back">
                  <button onClick={()=>navigate('/appStack/dashboard')} className=" bg-gray-500 text-white px-4 py-2 rounded">Back</button>
                </div>
                <div className="add">
                  <button onClick={handleSubmit} className=" bg-EWpurple text-white px-4 py-2 rounded">Add Card</button>
                </div>
                <div className="placeholder">
                  
                </div>
              </div>
            </div>
          </div>

        </div>
      );
  
}
