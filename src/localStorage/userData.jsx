import { createContext, useReducer, useEffect, useState } from "react";

// Initial state
export const initialState = {
  user: JSON.parse(localStorage.getItem("currentUser")) || null,
  isAuthenticated: !!localStorage.getItem("currentUser"),
  error: null,
  registeredUsers: JSON.parse(localStorage.getItem("registeredUsers")) || [], // Load registered users from localStorage
};

// Reducer to handle registration and login actions
const authReducer = (state, action) => {
  switch (action.type) {
    case "REGISTER":
      const updatedUsers = [...state.registeredUsers, action.payload];
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers)); // Store all registered users
      localStorage.setItem("currentUser", JSON.stringify(action.payload)); // Set current user as logged in
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
        registeredUsers: updatedUsers,
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("currentUser", JSON.stringify(action.payload)); // Persist logged-in user
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
        loggedIn: true,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: "Invalid credentials",
      };
    case "LOGOUT":
      localStorage.removeItem("currentUser"); // Remove logged-in user data
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
      };
    default:
      return state;
  }
};

// Create context
export const AuthContext = createContext();

// Auth provider component to wrap around your app
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const [globalCardNumber, setGlobalCardNumber] = useState({
    selectedCardNumber: null,
  });

  const setSelectedCardNumber = (cardNumber) => {
    setGlobalCardNumber({ selectedCardNumber: cardNumber });
  };

  // Use effect to load registered users on component mount (optional for initial fetch)
  useEffect(() => {
    const registeredUsers = localStorage.getItem("registeredUsers");

    if (registeredUsers) {
      dispatch({
        type: "SET_REGISTERED_USERS",
        payload: JSON.parse(registeredUsers),
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ state, dispatch, globalCardNumber, setSelectedCardNumber }}
    >
      {children}
    </AuthContext.Provider>
  );
};
