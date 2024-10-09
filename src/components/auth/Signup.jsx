// import React from 'react'

import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useContext, useEffect, useRef, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AuthContext } from "../../localStorage/userData";

export default function Signup() {
  gsap.registerPlugin(useGSAP);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);

  const signupRef = useRef(null);
  const swapRef = useRef(null);
  const loadingRef = useRef(null);
  const loadingIconRef = useRef(null);

  const handleRegister = () => {
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      if (registerData.password && registerData.username) {
        dispatch({
          type: "REGISTER",
          payload: {
            username: registerData.username,
            password: registerData.password,
          },
        });
        setIsSuccess(true);
        setIsLoading(false);
        // setTimeout(() => {navigate('/auth/login')})
      } else {
        setIsLoading(false);
        setIsSuccess(false);
      }
    }, 3000);
  };

  useEffect(() => {
    // animate loading
    // for some reason cause warns in the console due to
    // loadingRef and loadingIconRef are not displaying at start
    // but still works
    gsap.fromTo(
      loadingRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      }
    );
    gsap.to(loadingIconRef.current, {
      rotate: 360,
      duration: 1,
      repeat: -1,
      ease: "linear",
    });
  }, [isLoading]);

  useEffect(() => {
    // Animate the image, heading, and paragraph on component mount

    gsap.fromTo(
      signupRef.current,
      {
        opacity: 0,
        x: 50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
      }
    );
    gsap.fromTo(
      swapRef.current,
      {
        opacity: 0,
        x: 50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.5,
      }
    );
  }, []);

  const hanndleSwap = () => {
    // Animate elements before swapping
    gsap.to(signupRef.current, {
      opacity: 0,
      x: 50,
      duration: 0.8,
      ease: "power2.inOut",
      delay: 0.5,
    });
    gsap.to(swapRef.current, {
      opacity: 0,
      x: 50,
      duration: 0.8,
      ease: "power2.inOut",
      delay: 1,
      onComplete: () => navigate("/auth/login"), // Navigate after animation is complete
    });
  };

  return (
    <div>
      {isSuccess ? (
        <div
          ref={swapRef}
          role="button"
          tabIndex="0"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              hanndleSwap();
            }
          }}
          onClick={() => {
            hanndleSwap();
          }}
          className="pt-10 text-center h-1/4 flex flex-col justify-center items-center"
        >
          <p className="text-3xl 2xl:text-4xl">Registration Successful</p>
          <CiCircleCheck className="text-9xl text-green-500 my-5" />
          <p className="2xl:text-xl">click to login your Account</p>
        </div>
      ) : (
        <div>
          {isLoading ? (
            <div
              ref={loadingRef}
              className="pt-10 absolute bg-white/30 flex backdrop-blur-sm z-10 h-full w-full flex-col text-center items-center 
                             "
            >
              <div ref={loadingIconRef}>
                <AiOutlineLoading3Quarters className="text-9xl text-green-500" />
              </div>
              <p className="text-3xl">Loading...</p>
              <p className="text-xl">please wait</p>
            </div>
          ) : null}
          <div
            ref={signupRef}
            className=" flex flex-col justify-center items-center"
          >
            <p className="text-lg 2xl:text-2xl">
              please Please Fill in your credentials
            </p>
            <div className="lanInpCon">
              <p>UserName:</p>
              <input
                required
                type="text"
                name="UserName"
                value={registerData.username}
                onChange={(e) =>
                  setRegisterData({ ...registerData, username: e.target.value })
                }
                id="User"
                className="inpAuth"
              />
            </div>
            <div className="lanInpCon">
              <p>Password:</p>
              <input
                required
                type="password"
                name="Password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
                id="Pass"
                className="inpAuth"
              />
            </div>
            <div className="lanInpCon">
              <p>re-write Password:</p>
              <input
                required
                type="password"
                name="Password"
                value={registerData.confirmPassword}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    confirmPassword: e.target.value,
                  })
                }
                id="RePass"
                className="inpAuth"
              />
            </div>
            <div
              role="button"
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleRegister();
                }
              }}
              onClick={handleRegister}
              className="bg-EWpurple py-3 cursor-pointer hover:bg-EWblue ease-linear duration-300 px-10 mt-3 rounded-lg 2xl:text-2xl"
            >
              <p>Register</p>
            </div>
            {isSuccess === false && (
              <p>Registration failed. Please try again.</p>
            )}{" "}
            {/* Failure message */}
          </div>
          <div
            ref={swapRef}
            className="flex justify-center items-center "
            role="button"
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                hanndleSwap();
              }
            }}
            onClick={() => {
              hanndleSwap();
            }}
          >
            <div className="w-1/2 mt-2">
              <p className="2xl:text-xl cursor-pointer text-sm hover:text-EWblue ease-linear duration-200">
                you have a account?
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
