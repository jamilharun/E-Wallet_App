import { useContext, useEffect, useRef, useState } from "react";
import logo from "../../assets/cwhlogo.png";
import sad from "../../assets/cwhcrying.png";
import shock from "../../assets/cwhshock.png";
import { AuthContext } from "../../localStorage/userData";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiLocationArrow1, CiSquarePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function ViewCard() {
    const navigate = useNavigate();
    const {state} = useContext(AuthContext);

    gsap.registerPlugin(useGSAP);

    const username = state.user.username;

    const existingCards = JSON.parse(localStorage.getItem(username)) || [];

    const [forDeletion, setForDeletion] = useState(null);

    const [onPopup, setOnPopup] = useState({
        activate: false,
        option: null,
        index: null,
        loading: false
    });

    const [editCardData, setEditCardData] = useState({
        cardNumber: null,
        expirationDate: "",
        cvv: "",
        cardholderName: username,
    })

    
    const deleteCard = () => {
        setOnPopup((prevState) => ({
            ...prevState,
            loading: true,
          }));

        setTimeout(() => {
            const updatedCards = existingCards.filter((card) => card.cardNumber !== forDeletion);

            localStorage.setItem(username, JSON.stringify(updatedCards));

            console.log(`Card ending with ${forDeletion} deleted successfully.`);

            setOnPopup({ activate: false, option: null, index: null,  loading: false });

            setEditCardData({
            cardNumber: "",
            expirationDate: "",
            cvv: "",
            cardholderName: username,
            });

        }, 2000); 
    };

    const handleEditSubmit = () => {
        if (!editCardData.cardNumber || !editCardData.expirationDate || !editCardData.cvv) {
          alert("Please fill in all fields");
          return;
        }

        console.log(editCardData);
        
      
        setTimeout(() => {
            const username = state.user.username;
            const existingCards = JSON.parse(localStorage.getItem(username)) || [];
          
            // Find the card by its unique identifier (e.g., cardNumber) and update its values
            const updatedCards = existingCards.map((card) => 
              card.cardNumber === editCardData.cardNumber ? editCardData : card
            );
          
            console.log(updatedCards);
            
            // Save updated cards to localStorage
            localStorage.setItem(username, JSON.stringify(updatedCards));
          
            // Optionally, reset the form and UI
            setEditCardData({
              cardNumber: "",
              expirationDate: "",
              cvv: "",
              cardholderName: username,
            });
          
            console.log("Card updated successfully.");

            setOnPopup({ activate: false, option: null, index: null,  loading: false });
            
        }, 2000);
      };

      // animarion block
    const animateRef = useRef(null)
    const toleft = (loc) =>{
      gsap.fromTo(animateRef.current, { 
        opacity: 1, x: 0  
      }, { 
        opacity: 0, x: 50, duration: 1, ease: 'power2.out', onComplete: ()=>{navigate(loc)}});
    }

    // top down
    useEffect(() => {
      // Animate the image, heading, and paragraph on component mount
      gsap.fromTo(animateRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1, ease: 'power2.out'});
    }, []);

  return (
    <div className="appStackPages">
        <div ref={animateRef} className="h-full flex justify-center items-center">
            
            {/* loading */}
            {
                onPopup.activate && onPopup.loading &&
                    <div className="z-20 absolute w-screen h-screen backdrop-blur-sm flex justify-center items-center">
                        <AiOutlineLoading3Quarters className="text-8xl animate-spin text-green-500" />
                    </div>
            }

            {/* popup */}
            {
                onPopup.activate && onPopup.option === "edit" &&
                    <div className="z-10 absolute w-screen h-screen backdrop-blur-sm flex justify-center items-center">

                        
                        <div className="bg-white w-1/4 h-1/4 rounded-lg border-EWred border-4 flex">
                            <img 
                            className="w-1/2 "
                            src={shock} 
                            alt="E-Wallet hero is shock" />
                            <div className="pt-3 px-3 text-xl h-full flex flex-col justify-between ">
                                <p>are you sure you want to proceed and edit this card?</p>
                                <div className="flex justify-between items-end ">
                                    <button 
                                    className="bg-EWblue text-white px-2 py-1 rounded-t-lg"
                                    onClick={() => {
                                        setOnPopup({activate: false, option: null, index: null, loading: false})
                                        setEditCardData({
                                            cardNumber: null,
                                            expirationDate: "",
                                            cvv: "",
                                            cardholderName: username,
                                        })
                                    }}>cancel</button>
                                    <button 
                                    className="bg-EWred text-white px-2 py-1 rounded-t-lg"
                                    onClick={() => {
                                        // deleteCard(); 
                                        setOnPopup((prevState)=>({...prevState, loading: true}))
                                        handleEditSubmit();
                                    }}>Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
            }
            {
                onPopup.activate && onPopup.option === "delete" &&
                    <div className="z-10 absolute w-screen h-screen backdrop-blur-sm flex justify-center items-center">

                        
                        <div className="bg-white w-1/4 h-1/4 rounded-lg border-EWred border-4 flex">
                            <img 
                            className="w-1/2 "
                            src={sad} 
                            alt="E-Wallet hero is sad" />
                            <div className="pt-3 px-3 text-xl h-full flex flex-col justify-between ">
                                <p>are you sure you want to delete this card? {forDeletion}</p>
                                <div className="flex justify-between items-end ">
                                    <button 
                                    className="bg-EWblue text-white px-2 py-1 rounded-t-lg"
                                    onClick={() => setOnPopup({activate: false, option: null, index: null, loading: false})}>cancel</button>
                                    <button 
                                    className="bg-EWred text-white px-2 py-1 rounded-t-lg"
                                    onClick={() => {
                                        deleteCard(); 
                                        setOnPopup((prevState)=>({...prevState, loading: true}))
                                    }}>delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
            }

            
            <div className="bg-white md:w-1/2 max-h-full rounded-lg flex flex-col">
                <div className="flex justify-between">
                    <div className="eWalletHeroLogo">
                        <img 
                        src={logo} 
                        alt="cuteEWalletHeroLogo" />
                        <h1 >E-Wallet Hero</h1>
                    </div>
                    <div className="flex justify-center items-center gap-3 text-4xl text-EWdarkPurple pr-5">
                        <CiSquarePlus     
                        onClick={()=>{toleft("/appStack/addcard")}}
                        className="hover:text-EWred ease-linear duration-150"/>
                        <CiLocationArrow1 
                        onClick={()=>{toleft("/appStack/dashboard")}}
                        className="hover:text-EWred ease-linear duration-150"/>
                        
                    </div>
                </div>

                <div  className="flex flex-col space-y-2 overflow-y-auto">
                {
                    existingCards &&
                    existingCards.map((card, index) => {
                        return (
                            <div key={index}>
                                <div className="flex max-[400px]:flex-col ">
                                    <div className="w-10 h-10 flex justify-center items-center p-0 m-0 mt-2 ml-2 max-[400px]:hidden">
                                        <p className=" text-xl font-semibold ">{index + 1}</p>
                                    </div>
                                    <div className="max-[400px]:flex max-[400px]:justify-center">
                                        <div className="cardDesign">
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
                                        </div>

                                    </div>
                                    <div className="flex justify-between w-full">
                                        <div className="">
                                            <p className='text-sm p-2 font-medium'>Card Number: {card.cardNumber}</p>
                                            <p className="text-sm p-2 font-medium">Expiration Date: {card.expirationDate}</p>
                                            <p className="text-sm p-2 font-medium">Cardholder Name: {card.cardholderName}</p>
                                            <p className="text-sm p-2 font-medium">CVV: {card.cvv}</p>
                                        </div>
                                        <div className=" flex justify-end items-end p-2 gap-3">
                                            {
                                                onPopup.activate && onPopup.index === index ?
                                                <div 
                                                onClick={()=>{
                                                    setOnPopup({activate: false, option: null, index: null, loading: false})
                                                    setEditCardData({
                                                        cardNumber: "",
                                                        expirationDate: "",
                                                        cvv: "",
                                                    })
                                                }}
                                                className="bg-EWdarkBlue cursor-pointer p-2 rounded-2xl text-sm font-bold text-white hover:bg-EWred ease-linear duration-200">
                                                    Close
                                                </div> :
                                                <div 
                                                onClick={()=>{setOnPopup((prevState)=>({...prevState,activate: true,  index: index}))}}
                                                className="bg-EWblue cursor-pointer p-2 rounded-2xl text-sm font-bold text-white hover:bg-EWred ease-linear duration-200">
                                                    Edit
                                                </div>
                                            }
                                            
                                            <div 
                                            onClick={()=>{
                                                setOnPopup((prevState)=>({...prevState, activate: true, option: "delete"}))
                                                setForDeletion(card.cardNumber)
                                            }}
                                            className="bg-EWpurple cursor-pointer p-2 rounded-2xl text-sm font-bold text-white hover:bg-EWred ease-linear duration-200">
                                                Delete
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {
                                    onPopup.activate && onPopup.index === index &&
                                    <div  className="cardEdit">
                                        <h1>Please enter new details:</h1>
                                        <div>
                                            <div>
                                                <p>Card Number:</p>
                                                <input 
                                                    readOnly
                                                    type="text" 
                                                    placeholder="Card Number"
                                                    value={card.cardNumber}/>
                                            </div>
                                            <div>
                                                <p>Expiration Date:</p>
                                                <input 
                                                type="text" 
                                                placeholder="Expiration Date" 
                                                value={editCardData.expirationDate}
                                                onChange={(e) => setEditCardData({...editCardData, expirationDate: e.target.value})}/>
                                            </div>
                                            <div>
                                                <p>Cardholder Name:</p>
                                                <input 
                                                readOnly
                                                type="text" 
                                                placeholder="Cardholder Name" 
                                                value={card.cardholderName}/>
                                            </div>
                                            <div>
                                                <p>CVV:</p>
                                                <input 
                                                type="text" 
                                                placeholder="CVV" 
                                                value={editCardData.cvv}
                                                onChange={(e) => setEditCardData({...editCardData, cvv: e.target.value})}/>
                                            </div>
                                        </div>
                                        <button 
                                        className="mt-5 w-full bg-EWpurple p-2 rounded-2xl text-sm font-bold text-white hover:bg-EWred ease-linear duration-200"
                                        onClick={()=>{
                                            setOnPopup((prevState)=>({...prevState, option: "edit"}))
                                            setEditCardData((prevData)=>({...prevData, cardNumber: card.cardNumber}))
                                        }}>Submit</button>
                                    </div>
                                }

                            </div>
                        )
                    })
                }
                </div>
            
            </div>
        </div>
    </div>
  )
}


