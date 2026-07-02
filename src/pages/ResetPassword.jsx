import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api/axios";

export default function ResetPassword() {
    const { token } = useParams();
    if (!token) {
        return (
            <div className="text-red-400 text-center">
                Invalid reset link
            </div>
        );
    }
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        setLoading(true);

        try {
            console.log('got here.')
            await api.post(`/auth/reset-password/${token}`, {
                password,
            });
            setSuccess(true);
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.error ||
                "Reset link is invalid or has expired."
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

            <div className="relative z-10 w-full max-w-md">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white">
                        chkPulse
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Create a new password
                    </p>
                </div>

                <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8 shadow-2xl">

                    <h2 className="text-2xl font-semibold text-white mb-3">
                        Reset Password
                    </h2>

                    <p className="text-slate-400 text-sm mb-6">
                        Choose a strong password for your account.
                    </p>

                    {success ? (
                        <div className="space-y-5">

                            <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-green-300 text-sm">
                                Your password has been updated successfully.
                            </div>

                            <button
                                onClick={() => navigate("/login")}
                                className="w-full bg-orange-500 hover:bg-orange-400 text-white font-semibold py-3 rounded-xl transition"
                            >
                                Continue to Login
                            </button>

                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            <div>
                                <label className="block text-sm text-slate-300 mb-2">
                                    New Password
                                </label>

                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Enter a new password"
                                    className="w-full rounded-xl bg-[#0B0F19] border border-slate-700 px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-slate-300 mb-2">
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    placeholder="Confirm your password"
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
                                    ? "Updating Password..."
                                    : "Reset Password"}
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