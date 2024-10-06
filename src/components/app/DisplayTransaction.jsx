import { useContext, useState } from "react";
import { AuthContext } from "../../localStorage/userData";

export default function DisplayTransaction() {
  const [filter, setFilter] = useState("all");
  const {state, globalCardNumber} = useContext(AuthContext);

  const username = state.user.username;

  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  // console.log(transactions);
  
    
  return (
    <div className="border-EWred border-4 rounded-lg w-full">
        <div className="flex justify-end items-end rounded-b-lg ">
          <p 
          onClick={()=>{setFilter("all")}} 
          className={` px-2 ${filter === "all" ? "bg-EWpurple" : "bg-EWred"}`}>All</p>
          <p 
          onClick={()=>{setFilter("Pending")}} 
          className={` px-2 ${filter === "Pending" ? "bg-EWpurple" : "bg-EWred"}`}>Pending</p>
          <p 
          onClick={()=>{setFilter("success")}} 
          className={`px-2 ${filter === "success" ? "bg-EWpurple" : "bg-EWred"}`}>Success</p>
        </div>
        <div className="overflow-y-auto transactcola " >
          <div className="flex justify-between items-center px-2 py-2">
            <p className="truncate w-14 font-medium p-1">Pic</p>
            <p className="truncate w-20 font-medium p-1">Card Number</p>
            <p className="truncate w-20 font-medium p-1">Sender</p>
            <p className="truncate w-20 font-medium p-1">Receiver</p>
            <p className="truncate w-20 font-medium p-1">Amount</p>
            <p className="truncate w-20 font-medium p-1">Type</p>
            <p className="truncate w-20 font-medium p-1">Status</p>
            <p className="truncate w-20 font-medium p-1">Date</p>
          </div>
        {
            transactions
              .filter((transaction) => {
                // Apply the filter based on the selected filter
                if (filter === "all") return true;  // Show all if filter is "all"
                return transaction.status === filter;
              })
              .map((transaction, index) => {
                // Check if the transaction belongs to the current user and selected card
                if (transaction.receiver === username && 
                    transaction.cardNumber === globalCardNumber.selectedCardNumber) {
                  return (
                    <div key={index} className="flex justify-between items-center px-2 py-2">
                      {/* <p>{index }</p> */}
                      <img className="w-14 h-14 rounded-full" src={transaction.img} alt="" />
                      <p className="truncate w-20 font-medium p-1">{transaction.cardNumber}</p>
                      <p className="truncate w-20 font-medium p-1">{transaction.sender}</p>
                      <p className="truncate w-20 font-medium p-1">{transaction.receiver}</p>
                      <p className="truncate w-20 font-medium p-1">{transaction.amount}</p>
                      <p className="truncate w-20 font-medium p-1">{transaction.type}</p>
                      <p className="truncate w-20 font-medium p-1">{transaction.status}</p>
                      <p className="truncate w-20 font-medium p-1">{new Date(transaction.date).toLocaleString()}</p>
                    </div>
                  );
                }
                return null; // Don't render anything if the condition doesn't match
              })
          }
        </div>
    </div>
  )
}
