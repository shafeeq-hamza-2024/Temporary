import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useResetPassword } from "../../hooks/useResetPassword";
import "../login/Login.css";

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const navigate = useNavigate();
    const resetMutation = useResetPassword();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!token) {
            setMessage({
                type: "danger",
                text: "Invalid or missing reset token.",
            });
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage({
                type: "danger",
                text: "Passwords do not match.",
            });
            return;
        }
        resetMutation.mutate(
            {
                token,
                new_password: newPassword,
                confirm_password: confirmPassword,
            },
            {
                onSuccess: () => {
                    setMessage({
                        type: "success",
                        text: "Password reset successful! Redirecting...",
                    });

                    setTimeout(() => {
                        navigate("/login");
                    }, 1500);
                },
                onError: (err) => {
                    const detail = err.response?.data?.detail;

                    setMessage({
                        type: "danger",
                        text: detail || "Something went wrong.",
                    });
                },
            }
        );
    };

    return (
        <div className="hero">
            <div className="overlay"></div>

            <div className="left-text">
                <img src="/images/Logo-Color.png" alt="MyNeuron Logo" className="logo" />
                <h1>Reset Your Password</h1>
                <p>Create a new secure password to continue</p>
            </div>

            <div className="form-box">
                <h2>Set New Password</h2>

                {message.text && (
                    <div className={`alert alert-${message.type}`} role="alert">
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn3"
                        disabled={resetMutation.isPending}
                    >
                        {resetMutation.isPending ? "Resetting..." : "Reset Password"}
                    </button>

                    <p className="login-link">
                        Back to <a href="/login">Login</a>
                    </p>
                </form>
            </div>
        </div>
    );
}