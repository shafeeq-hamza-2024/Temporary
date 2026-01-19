import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { validateLogin } from "../../api/authApi";
import { useNavigate, useLocation } from "react-router";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showResend, setShowResend] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const registration = params.get("registration");

  const [message, setMessage] = useState({
    type: "", // success | danger
    text: "",
  });

  // -------------------------
  // LOGIN MUTATION
  // -------------------------
  const loginMutation = useMutation({
    mutationFn: validateLogin,
    onSuccess: (data) => {
      if (!data.access) {
        setMessage({
          type: "danger",
          text: "Login failed. Please verify your email.",
        });
        return;
      }

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage({
        type: "success",
        text: "Login successful! Redirecting...",
      });

      setTimeout(() => {
        if (registration === "gatc") {
          navigate("/gatc2026", { replace: true });
        } else {
          navigate("/user", { replace: true });
        }
      }, 800);
    },


    onError: (err) => {
      const status = err.response?.status;
      const detail = err.response?.data?.detail;

      if (status === 403) {
        setMessage({
          type: "danger",
          text: detail || "Please verify your email before logging in.",
        });
        setShowResend(true);   // 👈 SHOW RESEND LINK
      } else if (status === 404) {
        setMessage({
          type: "danger",
          text: "Account not found.",
        });
        setShowResend(false);
      } else {
        setMessage({
          type: "danger",
          text: "Invalid email or password.",
        });
        setShowResend(false);
      }
    },



  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setShowResend(false);
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
        {message.text && (
          <div
            className={`alert alert-${message.type} alert-dismissible fade show`}
            role="alert"
          >
            {message.text}
            <button
              type="button"
              className="btn-close"
              onClick={() => setMessage({ type: "", text: "" })}
            ></button>
          </div>
        )}
        {showResend && (
          <p style={{ marginTop: "10px", fontSize: "14px" }}>
            Didn’t receive the verification email?{" "}
            <a href="/resend-verification" style={{ fontWeight: "bold" }}>
              Resend verification
            </a>
          </p>
        )}



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
            Don’t have an account? <a href="/register">Register</a>
            {/* :: <a href="/register?registration=gatc">GATC Registration</a> */}
          </p>

          <div className="login-link">
            
            <label>
              
              <a href="/Terms&Conditions">Terms & Conditions</a> and{" "}
              <a href="/PrivacyPolicy">Privacy Policy</a>.
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
