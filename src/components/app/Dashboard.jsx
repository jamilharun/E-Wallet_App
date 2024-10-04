// import React from 'react'
import { useContext } from "react";
import { CiSearch, CiBellOn, CiSun, CiCloudMoon, CiCircleChevUp, CiCircleChevDown, CiSquarePlus} from "react-icons/ci";
import { AuthContext } from "../../localStorage/userData";
import logo from "../../assets/cwhlogo.png";
import profilePic from "../../assets/cwhface.png";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {  
  const navigate = useNavigate();
  const {state} = useContext(AuthContext);
  return (
    <div className="h-screen w-full bg-EWpurple/50 px-5 py-2">
      <div className="bg-white w-full h-full rounded-lg flex">
        
        {/* profile block */}
        <div className="flex flex-col w-1/4">
          <div className="m-4 flex items-center">
            <img 
              className="w-16 rounded-3xl"
              src={logo} 
              alt="cuteEWalletHeroLogo" />
            <h1 className="text-xl font-medium pl-3">E-Wallet Hero</h1>
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
            <p className="text-sm font-medium">Total Balance</p>
            <h1 className="text-2xl font-medium text-EWdarkPurple">₱12,345.12 <span className="text-sm font-medium">Peso</span></h1>
            <div className="cardInfoProfile">
              <div className="cardInfoRow">
                <p>Date:</p><p>12/12/2022</p>
              </div>
              <div className="cardInfoRow">
                <p>Status:</p><p className="text-green-500">Active</p>
              </div>
            </div>
            <div className="cardInfoProfile flex justify-between mt-5">
              <div className="cardButton">
                <CiCircleChevUp className="mr-1 text-xl"/>
                <p className="text-sm">Send</p>
              </div>
              <div className="cardButton">
                <CiCircleChevDown className="mr-1 text-xl"/>
                <p className="text-sm">Recieve</p>
              </div>

            </div>
          </div>
          <div></div>
        </div>
        
        {/* dashboard block */}
        <div>
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
          <div className="px-5">
            <div >
              <h1 className="text-2xl font-medium">Your Cards</h1>

              {/* create card */}
              <div 
                onClick={() => {navigate("/addcard")}}
                className="text-7xl text-EWdarkBlue hover:text-EWred ease-linear duration-200 cursor-pointer">
                <CiSquarePlus/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
