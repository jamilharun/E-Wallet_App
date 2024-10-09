// import React from 'react'

import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import hero from "../../assets/cuteEWalletHero.png";
export default function Welcome() {
  const navigate = useNavigate();
  gsap.registerPlugin(useGSAP);

  const containerRef = useRef(null);

  useEffect(() => {
    // Animate the image, heading, and paragraph on component mount
    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        y: -50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      }
    );
  }, []);

  const handleNavigate = () => {
    // Animate elements before navigating
    gsap.to(containerRef.current, {
      opacity: 0,
      x: 50,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => navigate("/auth"), // Navigate after animation is complete
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      console.log("Enter or Space key pressed");

      handleNavigate();
    }
  };

  return (
    <div className="landingPages  ">
      <div className="h-3/5 max-[400px]:h-1/4 max-[400px]:pt-10 text-center flex flex-col justify-center items-center">
        <h1 className="text-3xl py-3 2xl:text-6xl xl:text-5xl">Welcome</h1>
        <h1 className="text-4xl font-semibold">
          To <span className="text-5xl">E-Wallet Hero</span>
        </h1>

        <p className="hidden max-[400px]:block text-lg">
          where managing your money is simple and secure.
        </p>
      </div>
      <div className="">
        <img className="hidden max-[400px]:block" src={hero} alt="" />

        <div
          tabIndex="0"
          role="button"
          onKeyDown={handleKeyDown}
          className="cursor-pointer text-center bg-EWred py-4 mx-40 rounded-md 2xl:text-3xl xl:text-lg max-[400px]:w-full max-[400px]:mx-0 max-[400px]:rounded-full "
          onClick={handleNavigate}
        >
          <p>Lets Get Started</p>
        </div>
      </div>
      <div>
        <div></div>
      </div>
    </div>
  );
}
