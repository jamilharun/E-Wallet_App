// import React from 'react'
import { Route, Routes } from "react-router-dom";
import Landing from "../components/auth/Landing";
// import Login from "../components/auth/Login";

export default function AuthStack() {
  return (
    <Routes>
      <Route path="/*" element={<Landing />} />
    </Routes>
  );
}
