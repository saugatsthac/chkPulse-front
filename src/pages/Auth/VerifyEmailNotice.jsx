import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function VerifyEmailNotice() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const resendEmail = async () => {
        try {
            setLoading(true);

            const { data } = await api.post(
                "/auth/resend-verification"
            );

            setMessage(data.message);
        } catch (err) {
            setMessage(
                err.response?.data?.message ||
                "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    const checkVerification = async () => {
        try {
            const { data } = await api.get("/auth/me");

            if (data.user.isVerified) {
                navigate("/dashboard");
            } else {
                setMessage("Your email hasn't been verified yet.");
            }
        } catch {
            navigate("/login");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950">
            <div className="w-full max-w-md rounded-xl bg-gray-900 p-8 shadow-lg">
                <h1 className="text-3xl font-bold text-white mb-4">
                    Verify your email
                </h1>

                <p className="text-gray-400 mb-6">
                    We've sent a verification email to your
                    email address.
                </p>

                <p className="text-gray-400 mb-8">
                    Click the link in the email before
                    continuing to PulseWatch.
                </p>

                {message && (
                    <div className="mb-4 rounded bg-gray-800 p-3 text-sm text-white">
                        {message}
                    </div>
                )}

                <button
                    onClick={resendEmail}
                    disabled={loading}
                    className="w-full rounded bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading
                        ? "Sending..."
                        : "Resend verification email"}
                </button>

                <button
                    onClick={checkVerification}
                    className="mt-4 w-full rounded border border-gray-700 py-3 text-white hover:bg-gray-800"
                >
                    I've verified my email
                </button>

                <button
                    onClick={logout}
                    className="mt-4 w-full text-red-400 hover:text-red-300"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}