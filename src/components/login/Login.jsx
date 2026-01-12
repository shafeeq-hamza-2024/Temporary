import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { validateLogin } from "../../api/authApi";
import { useNavigate, useLocation } from "react-router";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const registration = params.get("registration");


  // -------------------------
  // LOGIN MUTATION
  // -------------------------
  const loginMutation = useMutation({
    mutationFn: validateLogin,
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      const role = data.user.role;

      // if (role === "speaker") {
      //   navigate("/user", { replace: true });
      // } else {
      //   navigate("/user", { replace: true });
      // }
      console.log("reg",registration)
      if (registration === "gatc") {

        navigate("/gatc2026", { replace: true });
        return;
      }

      // default redirect
      navigate("/user", { replace: true });
    },
    onError: (err) => {
      alert(err.response?.data?.detail || "Invalid email or password");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  /* ======================
     UI (OLD DESIGN)
     ====================== */
  return (
    <div className="hero">
      {/* Overlay */}
      <div className="overlay"></div>

      {/* Left Section */}
      <div className="left-text">
        <img
          src="/images/Logo-Color.png"
          alt="MyNeuron Logo"
          className="logo"
        />
        <h1>Connect | Collaborate | Create</h1>
        <p>
          Connecting bright minds to advance health research & innovation
        </p>
      </div>

      {/* Right Section (Login Form) */}
      <div className="form-box1">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn3"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Logging in..." : "Log in"}
          </button>

          <p className="login-link">
            Don’t have an account? <a href="/register">Register</a> :: <a href="/register?registration=gatc">GATC Registration</a>
          </p>
        </form>
      </div>
    </div>
  );
}
