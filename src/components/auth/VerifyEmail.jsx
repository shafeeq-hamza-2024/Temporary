import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useVerifyEmail } from "../../hooks/useVerifyEmail";
import "../register/RegisterForm.css"; // ✅ reuse same CSS

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate, isPending } = useVerifyEmail();

  const [status, setStatus] = useState("verifying");
  const token = new URLSearchParams(location.search).get("token");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    mutate(token, {
      onSuccess: () => setStatus("success"),
      onError: () => setStatus("error"),
    });
  }, [token, mutate]);

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

      <div className="form-box" style={{ textAlign: "center" }}>
        {(status === "verifying" || isPending) && (
          <>
            <h2>Verifying your email…</h2>
            <p style={{ marginTop: "10px", fontSize: "0.95rem" }}>
              Please wait while we confirm your email address 📧
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <h2>Email verified successfully 🎉</h2>
            <p style={{ margin: "15px 0", fontSize: "0.95rem" }}>
              Your account is now active. You can log in.
            </p>
            {/* <button className="btn3" onClick={() => (window.location.href = "http://localhost:5173/login")}>
              Go to Login
            </button> */}
            <button className="btn3" onClick={() => (window.location.href = "https://www.myneuronworld.com/login")}>
              Go to Login
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <h2>Verification failed ❌</h2>
            <p style={{ margin: "15px 0", fontSize: "0.95rem" }}>
              The verification link is invalid or expired.
            </p>
            {/* <button className="btn3" onClick={() => (window.location.href = "http://localhost:5173/register")}>
              Register again
            </button> */}
            <button className="btn3" onClick={() => (window.location.href = "https://www.myneuronworld.com/register")}>
              Register again
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
