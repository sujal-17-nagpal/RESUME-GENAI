import React, { useState } from "react";
import "../auth.form.scss";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loading, handleLogin, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(email,password)
      await handleLogin({ email, password });
      navigate("/");
    } catch (error) {
      alert("Login failed. Please check your credentials and try again.");
    }
  }

  if (loading) {
    return (
      <main>
        <div className="form-container">
          <h1>Loading...</h1>
        </div>
      </main>
    );
  }

  // if (user) {
  //   navigate("/");
  // }

  return (
    <main>
      <div className="form-container">
        <h1>login</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
          </div>

          <button className="button primary-button">Login</button>
        </form>

        <p>
          Already have an account ??<Link to={"/register"}>Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
