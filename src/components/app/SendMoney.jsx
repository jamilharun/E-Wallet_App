import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../localStorage/userData";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import happy from "../../assets/cuteEWalletHero.png";
import waitingReading from "../../assets/cwhwaitingreading.png";
import sad from "../../assets/cwhsad.png";
import logo from "../../assets/cwhlogo.png";
import { sampleUsers } from "../../localStorage/users";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function SendMoney() {
  const navigate = useNavigate();
  const { state, globalCardNumber } = useContext(AuthContext);
  gsap.registerPlugin(useGSAP);

  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  const [Activity, setActivity] = useState(null);

  const username = state.user.username;

  const [newTransaction, setNewTransaction] = useState({
    id: transactions.length + 1,
    type: "send",
    cardNumber: globalCardNumber.selectedCardNumber,
    amount: null,
    date: new Date(),
    sender: username,
    receiver: null,
    status: null,
    img: null,
  });

  const handleSendMoney = () => {
    console.log(newTransaction);

    if (
      newTransaction.cardNumber &&
      newTransaction.amount &&
      newTransaction.receiver
    ) {
      setNewTransaction((prevState) => ({
        ...prevState,
        status: "success",
      }));
    } else {
      setNewTransaction((prevState) => ({
        ...prevState,
        status: "Pending",
      }));
    }

    if (newTransaction.status === null) return setActivity("failed");

    console.log(newTransaction);

    setTimeout(() => {
      setActivity("success");
      const updatedTransactions = [...transactions, newTransaction];
      localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    }, 3000);
  };

  // animarion block
  const animateRef = useRef(null);
  const toRight = (loc) => {
    gsap.fromTo(
      animateRef.current,
      {
        opacity: 1,
        x: 0,
      },
      {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          navigate(loc);
        },
      }
    );
  };

  // top down
  useEffect(() => {
    // Animate the image, heading, and paragraph on component mount
    gsap.fromTo(
      animateRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="appStackPages">
      <div ref={animateRef} className="h-full flex justify-center items-center">
        {Activity === "loading" && (
          <div className="z-20 absolute w-screen h-screen backdrop-blur-sm flex justify-center items-center">
            <AiOutlineLoading3Quarters className="text-8xl animate-spin text-green-500" />
          </div>
        )}

        {Activity === "failed" && (
          <div
            role="button"
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setActivity(null);
              }
            }}
            onClick={() => {
              setActivity(null);
              // navigate('/appStack/dashboard');
            }}
            className="z-50 absolute w-screen h-screen backdrop-blur-sm flex justify-center items-center"
          >
            <div className=" md:w-1/4  rounded-lg flex flex-row justify-center">
              <img
                src={sad}
                alt=""
                className="max-[400px]:absolute max-[400px]:bottom-10"
              />
              <div className="z-10 bg-white h-full p-3 border-EWdarkBlue border-4 rounded-xl">
                <h1 className="text-8xl text-EWblue">Failed</h1>
                <p className="text-3xl text-EWdarkBlue">Somethings Wrong</p>
              </div>
            </div>
          </div>
        )}

        {Activity === "success" && (
          <div
            role="button"
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setActivity(null);
              }
            }}
            onClick={() => {
              setActivity(null);
              // navigate('/appStack/dashboard');
            }}
            className="z-50 absolute w-screen h-screen backdrop-blur-sm flex justify-center items-center"
          >
            <div className=" w-1/4 rounded-lg flex flex-row justify-center">
              <img
                src={happy}
                alt=""
                className="max-[400px]:absolute max-[400px]:bottom-0"
              />
              <div className="z-10 bg-white h-full p-3 border-EWdarkBlue border-4 rounded-xl">
                <h1 className="text-8xl text-EWred">Success</h1>
                <p className="text-3xl text-EWdarkBlue">
                  Sending Money Successful
                </p>
              </div>
            </div>
          </div>
        )}

        {Activity === "waiting" && (
          <div className="z-50 absolute w-screen h-screen backdrop-blur-sm flex justify-center items-center">
            <div className=" w-1/4 rounded-lg flex flex-row justify-center">
              <img
                src={waitingReading}
                alt="e-wallet hero waiting reading"
                className="max-[400px]:absolute max-[400px]:-bottom-20"
              />
              <div className="z-10 bg-white h-full p-3 border-EWdarkBlue border-4 rounded-xl min-w-96">
                <h1 className="text-5xl text-EWred">Waiting for Sender</h1>
                <p className="text-3xl text-EWdarkBlue">
                  Transaction ID: {newTransaction.id}
                </p>
                <p className="text-3xl text-EWdarkBlue">
                  Reciever name: {newTransaction.receiver}
                </p>
                <p className="text-3xl text-EWdarkBlue">
                  Card Num: {newTransaction.cardNumber}
                </p>
                <p className="text-3xl text-EWdarkBlue">
                  Amount: {newTransaction.amount}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white lg:w-1/4 md:w-1/2  rounded-lg flex flex-col">
          {/* E-Wallet Hero logo */}
          <div className="eWalletHeroLogo">
            <img src={logo} alt="cuteEWalletHeroLogo" />
            <h1>E-Wallet Hero</h1>
          </div>

          <div className="addCardContainer">
            <h1>Fund Transfer Form</h1>

            <div className="text-lg text-center ">
              <div>
                <p className=" w-1/2 ">User Name</p>
              </div>
              {/* <p className=" w-1/2 ">{newTransaction.cardNumber}</p> */}
              <select
                className="w-1/2"
                onChange={(e) => {
                  const selectedUser = sampleUsers.find(
                    (user) => user.id === parseInt(e.target.value)
                  );
                  console.log(selectedUser);

                  if (selectedUser) {
                    setNewTransaction((prevData) => ({
                      ...prevData,
                      receiver: selectedUser.name,
                      img: selectedUser.img,
                    }));
                  }
                }}
              >
                {sampleUsers.map((user, index) => {
                  return (
                    <option key={index} value={user.id}>
                      {user.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="text-lg text-center ">
              <p className=" w-1/2 ">Card No.</p>
              <p className=" w-1/2 ">{newTransaction.cardNumber}</p>
            </div>
            <div>
              <div>
                <p>Input amount</p>
              </div>
              <input
                type="text"
                placeholder="Enter amount"
                value={newTransaction.amount}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    amount: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="addCardMessage">
            <p>please fill in all fields!</p>
          </div>
          <div className="addCardButton">
            <div className="back">
              <button
                role="button"
                tabIndex="0"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    toRight("/appStack/dashboard");
                  }
                }}
                onClick={() => toRight("/appStack/dashboard")}
                className=" bg-gray-500 text-white px-4 py-2 rounded"
              >
                Back
              </button>
            </div>
            <div className="add">
              <button
                role="button"
                tabIndex="0"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setActivity("waiting");
                    handleSendMoney();
                  }
                }}
                onClick={() => {
                  setActivity("waiting");
                  handleSendMoney();
                }}
                className=" bg-EWpurple text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
            <div className="placeholder"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
