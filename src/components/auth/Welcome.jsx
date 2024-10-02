// import React from 'react'

import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
export default function Welcome() {
    const navigate = useNavigate();
    gsap.registerPlugin(useGSAP);

    const containerRef = useRef(null);

    useEffect(() => {
        // Animate the image, heading, and paragraph on component mount
        gsap.fromTo(containerRef.current, { 
            opacity: 0, 
            y: -50 
        }, { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: 'power2.out' 
        });
    }, []);

    const handleNavigate = () => {
        // Animate elements before navigating
        gsap.to(containerRef.current, {
          opacity: 0,
          x: 50,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => navigate('/auth') // Navigate after animation is complete
        });
    };

  return (
    <div ref={containerRef} className="landingPages ">
        <div className="h-3/5 text-center flex flex-col justify-center items-center">
            <h1 className="text-3xl py-3">Welcome</h1>
            <h1 className="text-3xl">To <span className="text-4xl">E-Wallet Hero</span></h1>
        </div>
        <div className="">
            <div 
            className="cursor-pointer text-center bg-EWred py-4 mx-40 rounded-md "
            onClick={handleNavigate}
            >
                <p>Lets Get Started</p>
            </div>
        </div>
        <div>
            <div></div>
        </div>
    </div>
  )
}
