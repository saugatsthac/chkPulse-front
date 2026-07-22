import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            await api.post("/auth/forgot-password", {
                email,
            });

            setSuccess(true);
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.error ||
                "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center px-6">
            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-orange-500/20 blur-[180px]" />
                <div className="absolute bottom-[-200px] right-[-150px] w-[500px] h-[500px] bg-orange-600/10 blur-[180px]" />
            </div>

            <div className="w-full max-w-md relative z-10">

                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white">
                        ChkPulse
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Reset your password
                    </p>
                </div>

                {/* Card */}
                <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8 shadow-2xl">

                    <h2 className="text-2xl font-semibold text-white mb-3">
                        Forgot Password
                    </h2>

                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                        Enter the email associated with your account and we'll
                        send you a password reset link.
                    </p>

                    {success ? (
                        <div className="space-y-5">

                            <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-green-300 text-sm">
                                If an account with that email exists, we've sent
                                a password reset link.
                            </div>

                            <Link
                                to="/login"
                                className="block w-full text-center bg-orange-500 hover:bg-orange-400 text-white font-semibold py-3 rounded-xl transition"
                            >
                                Back to Login
                            </Link>

                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            <div>
                                <label className="block text-sm text-slate-300 mb-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="you@example.com"
                                    className="w-full rounded-xl bg-[#0B0F19] border border-slate-700 px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                                    required
                                />
                            </div>

                            {error && (
                                <div className="text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition"
                            >
                                {loading
                                    ? "Sending..."
                                    : "Send Reset Link"}
                            </button>

                            <div className="text-center text-sm">
                                <Link
                                    to="/login"
                                    className="text-orange-400 hover:text-orange-300"
                                >
                                    Back to Login
                                </Link>
                            </div>
                        </form>
                    )}

                </div>
            </div>
        </div>
    );
}