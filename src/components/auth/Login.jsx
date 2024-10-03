import { useContext, useEffect, useRef, useState } from 'react'

import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { AuthContext } from '../../localStorage/userData';
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export default function Login() {
    const navigate = useNavigate();
    gsap.registerPlugin(useGSAP);

    const {state, dispatch} = useContext(AuthContext);

    // console.log(state)

    const loginRef = useRef(null);
    const swapRef = useRef(null);
    const loadingRef = useRef(null);
    const loadingIconRef = useRef(null);

    // const stateData = useRef(state);
    // const [stateData, setStateData] = useState(state)
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const stateData = state //not not be neessary but a meens to lot loss the data

    // console.log(stateData);
    
    const handleLogin = () => {
        setIsLoading(true);

        setTimeout(() => {
          // Simulating a login attempt with hardcoded credentials
          const user = stateData.registeredUsers.find(
            (user) => user.username === loginData.username && user.password === loginData.password
          );

          console.log(user);
        //   console.log(loginData);
          

          if (user) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: user });
            // navigate('/appStack');  // Redirect to dashboard on success
          } else {
            dispatch({ type: 'LOGIN_FAILURE' });
          }
          setIsLoading(false);
        }, 1000);  // Simulate network delay
    };

    // useEffect(() => {
        // }, [stateData.loggedIn]);
        
    useEffect(() => {
        console.log(stateData);
        
        if (stateData.loggedIn) {
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
                onComplete: () => navigate('/appStack')
            });
        }   
    }, [stateData.loggedIn]);


    useEffect(() => {
        // animate loading 
        // for some reason cause warns in the console due to 
        // loadingRef and loadingIconRef are not displaying at start
        // but still works
        gsap.fromTo(loadingRef.current, { 
            opacity: 0, 
        }, { 
            opacity: 1, 
            duration: 1, 
            ease: 'power2.out' 
        });
        gsap.to(loadingIconRef.current, {
            rotate: 360,
            duration: 1,
            repeat: -1,
            ease: "linear",
        });
    }, [isLoading]);

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
        <div>
            {
                isLoading ? (
                    <div 
                    ref={loadingRef}
                    className="pt-10 absolute bg-white/30 flex backdrop-blur-sm z-10 h-full w-full flex-col text-center items-center 
                    ">
                        <div ref={loadingIconRef}>
                            <AiOutlineLoading3Quarters className="text-9xl text-green-500" />
                        </div>
                        <p className="text-3xl">Loading...</p>
                        <p className="text-xl">please wait</p>
                    </div>
                ) : null
            }
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
                    value={loginData.username}
                    onChange={e => setLoginData({...loginData, username: e.target.value})}
                    className="inpAuth"/>
                </div>
                <div className="lanInpCon">
                    <p>Password:</p>
                    <input 
                    required 
                    type="password" 
                    name="Password" 
                    id="Pass" 
                    value={loginData.password}
                    onChange={e => setLoginData({...loginData, password: e.target.value})}
                    className="inpAuth"/>
                </div>
                <div 
                onClick={handleLogin}
                className="cursor-pointer bg-EWpurple py-3 hover:bg-EWblue ease-linear duration-300 px-10 mt-3 rounded-lg">
                    <p>Login</p>
                </div>

                {/* Show loading message */}
                {isLoading && <p>Loading...</p>}

                {/* Show success or error message based on login state */}
                {/* {state.isAuthenticated && <p>Login successful! Redirecting...</p>} */}
                {state.error && <p className="text-red-500">{state.error}</p>}
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
