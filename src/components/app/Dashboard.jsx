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
import { BsThreeDotsVertical } from "react-icons/bs";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";


export default function Dashboard() {  
  const navigate = useNavigate();
  gsap.registerPlugin(useGSAP);

  console.log(window.innerWidth);
  window.addEventListener('resize', () =>{console.log(window.innerWidth);});

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


  useEffect(() => {
    window.addEventListener("resize", updateDivSize);
    updateDivSize();
  }, []);


  useEffect(() => {
    setDashWidth( divSize.width - (divSize.width * 0.25));
    console.log( dashWidth );
  }, [divSize]);


  // animation block

  // to lelt
  const toTop = (loc) =>{
    gsap.fromTo(divRef.current, { 
      opacity: 1, y: 0  
    }, { 
      opacity: 0, y: -50, duration: 1, ease: 'power2.out', onComplete: ()=>{navigate(loc)}});
  }

  // top down
  useEffect(() => {
    // Animate the image, heading, and paragraph on component mount
    gsap.fromTo(divRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out'});
  }, []);



  return (
    <div className="appStackPages">
      <div 
      ref={divRef} 
      className="bg-white w-full h-full rounded-lg flex max-[400px]:flex-col max-[400px]:overflow-auto">
        
        {/* profile block */}
        <div className="flex flex-col w-1/4 max-[400px]:w-full">
          <div className="eWalletHeroLogo">
            <img 
              src={logo} 
              alt="cuteEWalletHeroLogo" />
            <h1>E-Wallet Hero</h1>
          </div>
          {/* profile */}
          <div className="flex flex-col items-center justify-center">
            <img 
              className="rounded-full w-28 pb-3 2xl:w-40 xl:w-36" 
              src={profilePic} 
              alt="" />
            <h1 className="text-xl font-medium 2xl:text-3xl xl:text-2xl">{state.user.username}</h1>
          </div>
          
          <div className="flex flex-col items-center justify-center pt-5">
            <p className="dashDisplayTitle">Card Number</p>
            <h1 className="dashDisplayData">{globalCardNumber.selectedCardNumber}</h1>
            <p className="dashDisplayTitle">Total Balance</p>
            <h1 className="dashDisplayData">
              ₱{computeTotalBalance().toFixed(2)}
              {/* <span className="text-sm font-medium "> Peso</span> */}
            </h1>
            <div className="cardInfoProfile">
              <div className="cardInfoRow">
                <p>Date:</p><p>12/12/2022</p>
              </div>
              <div className="cardInfoRow">
                <p>Status:</p><p className="text-green-500 font-semibold">Active</p>
              </div>
            </div>
            <div className="cardInfoProfile flex justify-between mt-5">
              <div 
              onClick={()=>{
                toTop("/appStack/sendingMoney")
                // navigate("/appStack/sendingMoney")
              }}
              className="cardButton">
                <CiCircleChevUp className="icons"/>
                <p>Send</p>
              </div>
              <div 
              onClick={() => toTop("/appStack/recieveMoney")}
              className="cardButton">
                <CiCircleChevDown className="icons"/>
                <p>Recieve</p>
              </div>

            </div>
          </div>
          <div></div>
        </div>
        
        {/* dashboard block */}
        <div className="max-[400px]:w-full max-[400px]:max-w-[400px]   " style={{width: divSize.width < 500 ? '' : dashWidth,}}>
          <div className="flex justify-between items-center p-5 lg:pb-2">
            <div>
              <h1 className="text-3xl font-medium xl:text-4xl">Dashboard</h1>
            </div>
            <div className="flex justify-between w-full">
              {/* utils functions */}
              <div className="headIcons">
                <CiSearch className="headUtils" />
                <CiBellOn className="headUtils max-[400px]:block opacity-0"/>
              </div>
              <div className="headIcons">
                <CiSun className="headUtils" />
                <CiCloudMoon className="headUtils"/>
                <BsThreeDotsVertical className="headUtils max-[400px]:block"/>
              </div>
            </div>
          </div>

          <div className="flex justify-between flex-col md:items-center p-5">
            {/* dashboard content */}
            {/* cards */}
            <div className="px-5 my-5 lg:my-0 max-[400px]:p-0 max-[400px]:my-0">
              <div className="">
                <div className="flex  justify-between items-end ">
                  <h1 className="text-2xl font-medium">Your Cards</h1>
                  <p 
                  onClick={() => { toTop("/appStack/viewCards")}}
                  className="text-sm font-medium hover:text-EWred ease-linear duration-200 md:mr-20 cursor-pointer 2xl:text-xl">View all Cards</p>
                </div>
                <div className={`flex justify-start items-center max-[400px]:items-start max-[400px]:overflow-x-auto`} style={{width: divSize.width < 500 ? '' : dashWidth,}}>
                  <DisplayCard/>
                  
                  <div 
                    onClick={() => {toTop("/appStack/addcard")}}
                    className="text-7xl max-[400px]:text-9xl max-[400px]:pt-4 text-EWdarkBlue hover:text-EWred ease-linear duration-200 cursor-pointer">
                    <CiSquarePlus/>
                  </div>

                </div>
              </div>
            </div>

            <div 
            className="flex xl:justify-between max-[400px]:flex-col " 
            style={{width: divSize.width < 500 ? '' : dashWidth,}}
            >
              <div>
                <div className="md:pr-5 md:w-500px " >
                  <div className="flex justify-between items-end ">
                    <h1 className="text-2xl font-medium">Transactions History</h1>
                    <p className="text-sm font-medium hover:text-EWred ease-linear duration-200 cursor-pointer">View all Transactions</p>
                  </div>
                  <div className="border-EWred border-4 rounded-lg overflow-auto max-[400px]:h-400px  ">
                    <DisplayTransaction/>
                  </div>
                </div>
              </div>

              <div className="lg:hidden 2xl:block">
                <div className="md:pr-5 ">
                  <div className="flex justify-between items-end">
                    <h1 className="text-2xl font-medium">Socials</h1>
                    <p className="text-sm font-medium hover:text-EWred ease-linear duration-200 cursor-pointer">View all Subscriptions</p>
                  </div>
                  <div className="">
                    <ViewSocials/>
                  </div>
                </div>
              </div>

              <div>
                <div className="md:pr-5 w-full">
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
    </div>
  )
}
