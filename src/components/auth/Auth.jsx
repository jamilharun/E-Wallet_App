import { useEffect } from 'react'
import { useRef } from 'react'

import { Route, Routes } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Login from './Login';
import Signup from './Signup';
export default function Auth() {
  // const navigate = useNavigate();
    gsap.registerPlugin(useGSAP);

    const authHeader = useRef(null);

    useEffect(() => {
        // Animate the image, heading, and paragraph on component mount
    gsap.fromTo(authHeader.current, { 
            opacity: 0, 
            y: -50 
        }, { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: 'power2.out' 
        });
    }, []);

  return (
    <div ref={authHeader} className="landingPages ">
        <div className="text-center h-1/4 flex justify-center items-center">
            <p className="text-4xl">E-Wallet Hero</p>
        </div>
        <Routes>
          <Route path="/*" element={<Login/>} />
          <Route path="/signup" element={<Signup />}/>
          
      </Routes>
    </div>
  )
}
