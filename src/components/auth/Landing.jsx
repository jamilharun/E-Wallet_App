import { Route, Routes } from "react-router-dom";
import hero from "../../assets/cuteEWalletHero.png";
import Welcome from "./Welcome";
// import Login from "./Login";
// import Signup from "./Signup";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import Auth from "./Auth";
// import Auth from "./Auth";

export default function Landing() {
  gsap.registerPlugin(useGSAP);

  const imageRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    // Animate the image, heading, and paragraph on component mount
    gsap.fromTo(imageRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' });
    gsap.fromTo(headingRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.5 });
    gsap.fromTo(paragraphRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 1 });
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="bg-EWpurple w-full flex flex-col justify-center items-center">
        <img
        ref={imageRef}
        src={hero} 
        alt="hero" 
        className="w-1/2" />
        <h1
        ref={headingRef} 
        className="text-2xl text-center py-5">
          E-Wallet Hero always got you back
        </h1>
        <p
        ref={paragraphRef} 
        className="w-3/4 text-center">
          Welcome to E-Wallet Hero, Welcome to [Your E-Wallet Name], where managing your money is simple and secure.
        </p>
      </div>
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/auth/*" element={<Auth/>} />
        {/* <Route path="/login" element={<Login/>} /> */}
        {/* <Route path="/signup" element={<Signup/>} /> */}
      </Routes>
    </div>
  )
}