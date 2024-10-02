import { useEffect, useRef } from 'react'

import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
export default function Login() {
    const navigate = useNavigate();
    gsap.registerPlugin(useGSAP);

    const loginRef = useRef(null);
    const swapRef = useRef(null);

    useEffect(() => {
        // Animate the image, heading, and paragraph on component mount
        gsap.fromTo(loginRef.current, { 
            opacity: 0, 
            x: 50 
        }, { 
            opacity: 1, 
            x: 0, 
            duration: 1, 
            ease: 'power2.out' 
        });
        gsap.fromTo(swapRef.current, { 
            opacity: 0, 
            x: 50 
        }, { 
            opacity: 1, 
            x: 0, 
            duration: 1, 
            ease: 'power2.out', 
            delay: 0.5 
        });
    }, []);
    
    const hanndleSwap = () => {
        // Animate elements before swapping
        gsap.to(loginRef.current, {
          opacity: 0,
          x: 50,
          duration: 0.8,
          ease: 'power2.inOut',
          delay: 0.5 ,
        });
        gsap.to(swapRef.current, {
          opacity: 0,
          x: 50,
          duration: 0.8,
          ease: 'power2.inOut',
          delay: 1 ,
          onComplete: () => navigate('/auth/signup') // Navigate after animation is complete
        });
    };
    
  return (
    <div >
        <div 
        ref={loginRef}
        className=" flex flex-col justify-center items-center">
            <p className="text-lg">please input your credentials</p>
            <div className="lanInpCon">
                <p>UserName:</p>
                <input 
                required
                type="text" 
                name="UserName" 
                id="User" 
                className="inpAuth"/>
            </div>
            <div className="lanInpCon">
                <p>Password:</p>
                <input 
                required 
                type="password" 
                name="Password" 
                id="Pass" 
                className="inpAuth"/>
            </div>
            <div className="bg-EWpurple py-3 hover:bg-EWblue ease-linear duration-300 px-10 mt-3 rounded-lg">
                <p>Login</p>
            </div>
        </div>
        <div
        ref={swapRef}
        className="flex justify-center items-center "
        onClick={() => {hanndleSwap()}}
        >
            <div className="w-1/2 mt-2">
                <p className="cursor-pointer text-sm hover:text-EWblue ease-linear duration-200">do not have a account?</p>
            </div>
        </div>
        
    </div>
  )
}
