import { useState } from "react";
import "./FormStyles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // in this function we are going to create the object of the user to send it to the backend
    const newUser = {
      name,
      email,
      password,
    };
    //  This is the same as the following code:
    /*
    const newUser = {
      name: name,
      email: email,
      password: password
    }
    */
    // we are using AXIOS to create a request (remember to install axios) AND send the data to the server
    axios
      .post(`${API_URL}/auth/signup`, newUser)
      .then((response) => {
        console.log("User created!", response);
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error.response.data.message);

        setTimeout(() => {
          setErrorMessage(null);
        }, 10000);
      });

    console.log(newUser);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

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

      <button type="submit">Sign Up</button>
      <p className="error">{errorMessage}</p>
    </form>
  );
}

export default SignupPage;
