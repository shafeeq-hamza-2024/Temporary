import { useState } from "react";
import { useResendVerification } from "../../hooks/useResendVerification";
import "../register/Registerform.css"; // reuse CSS

const ResendVerification = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);

    const resendMutation = useResendVerification();

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage(null);

        resendMutation.mutate(email, {
            onSuccess: (data) => {
                setMessage({ type: "success", text: data.message });
            },
            onError: (err) => {
                setMessage({
                    type: "danger",
                    text:
                        err.response?.data?.detail ||
                        "Something went wrong. Try again.",
                });
            },
        });
    };

    return (
        <div className="hero">
            <div className="overlay"></div>
            <div className="left-text">
                <img src="images/Logo-Color.png" alt="MyNeuron Logo" className="logo" />
                <h1>Connect | Collaborate | Create</h1>
                <p>
                    Connecting bright minds to advance health research & innovation
                </p>
            </div>

            <div className="form-box" style={{ textAlign: "center" }}>
                <h2>Resend Verification Email</h2>

                {message && (
                    <div className={`alert alert-${message.type} alert-dismissible fade show`}>
                        {message.text}
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setMessage(null)}
                        ></button>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Enter your registered email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button className="btn3" disabled={resendMutation.isPending}>
                        {resendMutation.isPending ? "Sending..." : "Resend Email"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResendVerification;
