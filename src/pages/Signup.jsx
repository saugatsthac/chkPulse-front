// import { useState } from "react";

// export default function Signup() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const handleSignup = async (e) => {
//         e.preventDefault();

//         const res = await fetch("http://localhost:3000/signup", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email, password }),
//         });
//         if (!res.ok) {
//             const errData = await res.json();
//             throw new Error(errData.error || 'Signup failed');
//         }
//         const data = await res.json();
//         console.log(data);
//         alert("Account created");
//     };

//     return (
//         <form onSubmit={handleSignup} className="space-y-4">
//             <h2 className="text-xl font-semibold">Signup</h2>

//             <input
//                 className="w-full p-2 rounded bg-gray-800"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//             />

//             <input
//                 className="w-full p-2 rounded bg-gray-800"
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />

//             <button
//                 type="submit"
//                 className="w-full bg-green-600 p-2 rounded hover:bg-green-700"
//             >
//                 Create account
//             </button>
//         </form>
//     );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../api/axios'

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // const handleSignup = async (e) => {
    //     e.preventDefault();

    //     setLoading(true);
    //     setError("");

    //     try {
    //         const res = await fetch("http://localhost:3000/auth/signup", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 email,
    //                 password,
    //             }),
    //         });

    //         const data = await res.json();

    //         if (!res.ok) {
    //             setError(data.error || "Signup failed");
    //             return;
    //         }

    //         alert("Account created successfully");

    //         navigate("/login");
    //     } catch (err) {
    //         console.error(err);
    //         setError("Unable to connect to server");
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const handleSignup = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const { data } = await api.post("/auth/signup", {
                email,
                password,
            });

            alert("Account created successfully");
            navigate("/login");
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.error ||
                "Signup failed"
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center px-6">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-orange-500/20 blur-[180px]" />
                <div className="absolute bottom-[-200px] right-[-150px] w-[500px] h-[500px] bg-orange-600/10 blur-[180px]" />
            </div>
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white">
                        ChkPulse
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Create your monitoring account
                    </p>
                </div>

                {/* Card */}
                <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8 shadow-2xl">

                    <h2 className="text-2xl font-semibold text-white mb-6">
                        Create Account
                    </h2>

                    <form
                        onSubmit={handleSignup}
                        className="space-y-5"
                    >

                        <div>
                            <label className="block text-sm text-slate-300 mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                className="w-full rounded-xl bg-[#0B0F19] border border-slate-700 px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-slate-300 mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Choose a secure password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
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
                                ? "Creating Account..."
                                : "Create Account"}
                        </button>

                    </form>

                    <div className="text-center mt-6 text-sm text-slate-400">

                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="text-orange-400 hover:text-orange-300"
                        >
                            Login
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}