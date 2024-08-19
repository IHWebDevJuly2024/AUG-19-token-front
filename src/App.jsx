import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./context/auth.context";

function App() {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <h1>
              {user ? `Hello ${user.name}! Welcome home 🏠` : "This is home 🏠"}
            </h1>
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
