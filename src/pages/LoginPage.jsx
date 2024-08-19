import { useState, useContext } from "react";
import "./FormStyles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const { verifyUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = { email, password };

    axios
      .post(`${API_URL}/auth/login`, user)
      .then((response) => {
        console.log("User is logged in!", response);
        const authToken = response.data.authToken;

        localStorage.setItem("Authorization", authToken);
        verifyUser();
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error.response.data.message);

        setTimeout(() => {
          setErrorMessage(null);
        }, 10000);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <button type="submit">Log In</button>
      <p className="error">{errorMessage}</p>
    </form>
  );
}

export default LoginPage;
