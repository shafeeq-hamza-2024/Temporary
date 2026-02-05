import React, { useState } from "react";
import "./RegisterForm.css";
import { useLocation } from "react-router";

import { useRegister } from "../../hooks/useRegister";
import { useResendVerification } from "../../hooks/useResendVerification";
import { Link } from "react-router";

const RegisterForm = () => {
  const { mutate: registerUser, isLoading } = useRegister();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const registration = params.get("registration");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: resendEmail, isPending: resendLoading } =
    useResendVerification();

  const [showResend, setShowResend] = useState(false);


  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    middle_name: "", // ✅ ADDED
    last_name: "",
    password: "",
    confirm_password: "",
  });

  const [message, setMessage] = useState({
    type: "", // success | danger
    text: "",
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitting) return; // 🛑 prevent double submit

    setMessage({ type: "", text: "" });
    setIsSubmitting(true);

    if (formData.password !== formData.confirm_password) {
      setMessage({
        type: "danger",
        text: "Passwords do not match",
      });
      setIsSubmitting(false);
      return;
    }

    registerUser(formData, {
      onSuccess: (data) => {
        setMessage({
          type: "success",
          text: data?.detail ||
            "Registration successful! We’ve sent a verification email. Please verify your account.",
        });

        if (data?.resend) {
          setShowResend(true);
        }

        setIsSubmitting(false);
      },



      onError: (err) => {
        setMessage({
          type: "danger",
          text:
            err?.response?.data?.email?.[0] ||
            err?.response?.data?.detail ||
            "Registration failed. Please try again.",
        });

        setIsSubmitting(false);
      },
    });
  };

  const handleResend = () => {
    resendEmail(formData.email, {
      onSuccess: () => {
        setMessage({
          type: "success",
          text: "Verification email resent successfully 📧",
        });
      },
      onError: (err) => {
        setMessage({
          type: "danger",
          text:
            err?.response?.status === 429
              ? "Please wait a moment before requesting another email."
              : err?.response?.data?.detail ||
              "Failed to resend verification email",
        });
      },

    });
  };




  return (
    <div className="hero">
      <div className="overlay"></div>

      <div className="left-text">
        <img src="/images/Logo-Color.png" alt="MyNeuron Logo" className="logo" />
        <h1>Connect | Collaborate | Create</h1>
        <p>
          Connecting bright minds to advance health research & innovation
        </p>
      </div>

      <div className="form-box">
        <h2>Registration</h2>

        {isSubmitting && !message.text && (
          <div className="alert alert-info">
            Please wait… sending verification email 📧
          </div>
        )}

        {/* {showResend && (
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <p style={{ fontSize: "14px", marginBottom: "5px" }}>
              Didn’t receive the email?
            </p>

            <button
              type="button"
              className="btn btn-link"
              onClick={handleResend}
              disabled={resendLoading}
            >
              {resendLoading ? "Resending..." : "Resend verification email"}
            </button>
          </div>
        )} */}



        {message.text && (
          <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
            {message.text}
            <button
              type="button"
              className="btn-close"
              onClick={() => setMessage({ type: "", text: "" })}
            ></button>
          </div>
        )}


        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="form-group">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Middle Name */}
          <div className="form-group">
            <input
              type="text"
              name="middle_name"
              placeholder="Middle Name (optional)"
              value={formData.middle_name}
              onChange={handleChange}
            />
          </div>

          {/* Last Name */}
          <div className="form-group">
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Terms */}
          <div className="checkbox">
            <input type="checkbox" required />
            <label>
              By creating an account, I agree to the{" "}
              <a href="/Terms&Conditions">Terms & Conditions</a> and{" "}
              <a href="/PrivacyPolicy">Privacy Policy</a>.
            </label>
          </div>

          <button
            type="submit"
            className="btn3"
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading
              ? "Creating account & sending email..."
              : "Sign Up"}
          </button>


          <p className="login-link">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
