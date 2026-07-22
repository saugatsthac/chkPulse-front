import { useState } from "react";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";

export default function AuthPage() {
  const [mode, setMode] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="w-full max-w-md p-6 bg-gray-900 rounded-2xl shadow-xl">
        <div className="flex justify-between mb-6">
          <button
            onClick={() => setMode("login")}
            className={`px-4 py-2 rounded ${
              mode === "login" ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setMode("signup")}
            className={`px-4 py-2 rounded ${
              mode === "signup" ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            Signup
          </button>
        </div>

        {mode === "login" ? <Login /> : <Signup />}
      </div>
    </div>
  );
}
