// import { useState } from "react";
// // import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate(); // ← ADD THIS


//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {

//             const res = await fetch("http://localhost:3000/login", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ email, password }),
//             });

//             const data = await res.json();

//             if (data.token) {
//                 localStorage.setItem("token", data.token);
//                 alert("Login successful");
//                 navigate("/dashboard");

//             } else {
//                 alert("Login failed:" + data.error);
//             }
//         }
//         catch (error) {
//             console.error("Login error:", error);
//             alert("Server error.")
//         }
//     }

//     return (
//         <form onSubmit={handleLogin} className="space-y-4">
//             <h2 className="text-xl font-semibold">Login</h2>

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
//                 className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700"
//             >
//                 Login
//             </button>
//         </form>
//     );
// }
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from '../../api/axios'

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        //     try {
        //         const res = await fetch("http://localhost:3000/auth/login", {
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

        //         if (data.token) {
        //             localStorage.setItem("token", data.token);
        //             navigate("/dashboard");
        //         } else {
        //             setError(data.error || "Invalid credentials");
        //         }
        //     } catch (err) {
        //         console.error(err);
        //         setError("Unable to connect to server");
        //     } finally {
        //         setLoading(false);
        //     }
        // };
        try {
            const { data } = await api.post("/auth/login", {
                email,
                password,
            });
            console.log(data);
            if (data.token) {
                localStorage.setItem("token", data.token);
                if (data.user.isVerified) {
                    navigate("/dashboard");
                } else {
                    navigate("/verify-email");
                }
                // navigate("/dashboard");
            } else {
                setError(data.error || "Invalid credentials");
            }
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.error ||
                "Unable to connect to server"
            );
        } finally {
            setLoading(false);
        }
    }
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
                        Welcome back
                    </p>
                </div>

                {/* Card */}
                <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8 shadow-2xl">

                    <h2 className="text-2xl font-semibold text-white mb-6">
                        Login
                    </h2>

                    <form
                        onSubmit={handleLogin}
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

                        <div>
                            <label className="block text-sm text-slate-300 mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="••••••••"
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
                                ? "Signing In..."
                                : "Login"}
                        </button>
                    </form>

                    <div className="flex justify-between mt-5 text-sm">

                        {/* <button
                            className="text-slate-400 hover:text-white transition"
                        >
                            Forgot password?
                        </button> */}

                        <Link
                            to="/forgot-password"
                            className="text-slate-400 hover:text-white transition"
                        >
                            Forgot password?
                        </Link>

                        <Link
                            to="/signup"
                            className="text-orange-400 hover:text-orange-300"
                        >
                            Create account
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}