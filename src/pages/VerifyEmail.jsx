import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

export default function VerifyEmail() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!token) {
            setStatus("error");
            setMessage("Invalid verification link.");
            return;
        }

        const verify = async () => {
            try {
                const { data } = await api.get(
                    `/auth/verify/${token}`
                );

                setStatus("success");
                setMessage(data.message);

                setTimeout(() => {
                    navigate("/dashboard");
                }, 2000);
            } catch (err) {
                setStatus("error");
                setMessage(
                    err.response?.data?.message ||
                    "Verification failed."
                );
            }
        };

        verify();
    }, [token, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950">
            <div className="w-full max-w-md rounded-xl bg-gray-900 p-8 shadow-lg text-center">
                {status === "loading" && (
                    <>
                        <h1 className="text-3xl font-bold text-white mb-4">
                            Verifying...
                        </h1>

                        <p className="text-gray-400">
                            Please wait while we verify your
                            email.
                        </p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <h1 className="text-3xl font-bold text-green-400 mb-4">
                            Email Verified
                        </h1>

                        <p className="text-gray-300">
                            {message}
                        </p>

                        <p className="mt-4 text-gray-500">
                            Redirecting...
                        </p>
                    </>
                )}

                {status === "error" && (
                    <>
                        <h1 className="text-3xl font-bold text-red-400 mb-4">
                            Verification Failed
                        </h1>

                        <p className="text-gray-300">
                            {message}
                        </p>

                        <button
                            onClick={() =>
                                navigate("/verify-email")
                            }
                            className="mt-6 w-full rounded bg-blue-600 py-3 text-white hover:bg-blue-700"
                        >
                            Back
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}