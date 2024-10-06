// import React from 'react'
import { useContext, useEffect, useRef, useState } from "react";
import { CiSearch, CiBellOn, CiSun, CiCloudMoon, CiCircleChevUp, CiCircleChevDown, CiSquarePlus} from "react-icons/ci";
import { AuthContext } from "../../localStorage/userData";
import logo from "../../assets/cwhlogo.png";
import profilePic from "../../assets/cwhface.png";
import { useNavigate } from "react-router-dom";
import DisplayCard from "./DisplayCard";
import DisplayTransaction from "./DisplayTransaction";
import DisplaySubs from "./DisplaySubs";
import ViewSocials from "./ViewSocials";
export default function Dashboard() {  
  const navigate = useNavigate();
  const {state, globalCardNumber} = useContext(AuthContext);

  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  
  const username = state.user.username;
  
  const divRef = useRef(null); // Reference to the div
  const [divSize, setDivSize] = useState({ width: 0, height: 0 });
  const [dashWidth, setDashWidth] = useState(null);
  const updateDivSize = () => {
    if (divRef.current) {
      setDivSize({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight,
      });
    }
  };

  // total balance
  const computeTotalBalance = () => {
    let totalBalance = 0;

    // Loop through each transaction and accumulate the amount if the conditions are met
    transactions.forEach((transaction) => {
      if (transaction.receiver === username && 
          transaction.cardNumber === globalCardNumber.selectedCardNumber &&
          transaction.status === "success") {
        totalBalance += parseFloat(transaction.amount); // Make sure amount is treated as a number
      }
    });    
    return totalBalance;
  };

  const getTotalbalance = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    console.log(users);
    
    const userIndex = users.findIndex((user) => user.username === username);

    if (userIndex !== -1) {
      // Find the card by cardNumber
      const cardIndex = users[userIndex].cards.findIndex((card) => card.cardNumber === globalCardNumber.selectedCardNumber);
      console.log(cardIndex);
      return cardIndex.balance;
    } else {
      console.log("User not found");
      return 0;
    }
  };
  getTotalbalance()


  useEffect(() => {
    window.addEventListener("resize", updateDivSize);
    updateDivSize();
  }, []);


  useEffect(() => {
    setDashWidth( divSize.width - (divSize.width * 0.25));
    console.log( dashWidth );
  }, [divSize]);

  return (
    <div className="appStackPages">
      <div 
      ref={divRef} 
      className="bg-white w-full h-full rounded-lg flex">
        
        {/* profile block */}
        <div className="flex flex-col w-1/4">
          <div className="eWalletHeroLogo">
            <img 
              src={logo} 
              alt="cuteEWalletHeroLogo" />
            <h1>E-Wallet Hero</h1>
          </div>
          {/* profile */}
          <div className="flex flex-col items-center justify-center">
            <img 
              className="rounded-full w-28 pb-3" 
              src={profilePic} 
              alt="" />
            <h1 className="text-xl font-medium">{state.user.username}</h1>
          </div>
          
          <div className="flex flex-col items-center justify-center pt-5">
            <p className="text-sm font-medium">Card Number</p>
            <h1 className="text-2xl font-medium text-EWdarkPurple">{globalCardNumber.selectedCardNumber}</h1>
            <p className="text-sm font-medium">Total Balance</p>
            <h1 className="text-2xl font-medium text-EWdarkPurple">
              ₱{computeTotalBalance().toFixed(2)}
              <span className="text-sm font-medium"> Peso</span>
            </h1>
            <div className="cardInfoProfile">
              <div className="cardInfoRow">
                <p>Date:</p><p>12/12/2022</p>
              </div>
              <div className="cardInfoRow">
                <p>Status:</p><p className="text-green-500">Active</p>
              </div>
            </div>
            <div className="cardInfoProfile flex justify-between mt-5">
              <div 
              onClick={()=>{navigate("/appStack/sendingMoney")}}
              className="cardButton">
                <CiCircleChevUp className="mr-1 text-xl"/>
                <p className="text-sm">Send</p>
              </div>
              <div 
              onClick={() => navigate("/appStack/recieveMoney")}
              className="cardButton">
                <CiCircleChevDown className="mr-1 text-xl"/>
                <p className="text-sm">Recieve</p>
              </div>

            </div>
          </div>
          <div></div>
        </div>
        
        {/* dashboard block */}
        <div >
          <div className="flex justify-between items-center p-5">
            <div>
              <h1 className="text-3xl font-medium">Dashboard</h1>
            </div>
            <div className="flex justify-between">
              {/* utils functions */}
              <div className="headIcons">
                <CiSearch className="headUtils" />
                <CiBellOn className="headUtils"/>
              </div>
              <div className="headIcons">
                <CiSun className="headUtils" />
                <CiCloudMoon className="headUtils"/>
              </div>
            </div>
          </div>

          {/* dashboard content */}
          {/* cards */}
          <div className="px-5 my-5">
            <div className="">
              <div className="flex  justify-between items-end">
                <h1 className="text-2xl font-medium">Your Cards</h1>
                <p 
                onClick={() => {navigate("/appStack/viewCards")}}
                className="text-sm font-medium hover:text-EWred ease-linear duration-200 cursor-pointer">View all Cards</p>
              </div>
              <div className={`flex justify-start items-center `} style={{width: dashWidth}}>
                <DisplayCard/>
                
                {/* create card */}
                <div 
                  onClick={() => {navigate("/appStack/addcard")}}
                  className="text-7xl text-EWdarkBlue hover:text-EWred ease-linear duration-200 cursor-pointer">
                  <CiSquarePlus/>
                </div>

              </div>
            </div>
          </div>

          <div className="flex justify-between " style={{width: dashWidth}}>
            {/* transactions history */}
            <div>
              <div className="px-5 " >
                <div className="flex justify-between items-end">
                  <h1 className="text-2xl font-medium">Transactions History</h1>
                  <p className="text-sm font-medium hover:text-EWred ease-linear duration-200 cursor-pointer">View all Transactions</p>
                </div>
                <div>
                  <DisplayTransaction/>
                </div>
              </div>
            </div>
            {/* socials */}
            <div>
              <div className="px-5 ">
                <div className="flex justify-between items-end">
                  <h1 className="text-2xl font-medium">Socials</h1>
                  <p className="text-sm font-medium hover:text-EWred ease-linear duration-200 cursor-pointer">View all Subscriptions</p>
                </div>
                <div className="">
                  <ViewSocials/>
                </div>
              </div>
            </div>

            {/* subscriptions */}
            <div>
              <div className="px-5 w-full">
                <div className="flex justify-between items-end">
                  <h1 className="text-2xl font-medium">Subscriptions</h1>
                  <p className="text-sm font-medium hover:text-EWred ease-linear duration-200 cursor-pointer">View all Subscriptions</p>
                </div>
                <div className="">
                  <DisplaySubs/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
