// import React from 'react'
import { Route, Routes} from "react-router-dom";
import Dashboard from "../components/app/Dashboard";
import AddCard from "./AddCard";
import ViewCard from "../components/app/ViewCard";

export default function AppStack() {
  return (
    <Routes>
        <Route path="/*" element={<Dashboard />} />
        <Route path="/addCard" element={<AddCard />} />
        <Route path="/viewCards/*" element={<ViewCard />} />
    </Routes>
  )
}
