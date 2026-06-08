import { useState } from "react";
import api from "../api/axios";

export default function AddProject({ setProjects }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        if (!name.trim()) return;

        setLoading(true);

        try {
            const res = await api.post("/projects", {
                name,
                description,
            });

            if (res.data?.success) {
                setName("");
                setDescription("");
                // console.log('new', [res.data.project])
                // optionally update UI state here
                setProjects(prev => [...prev, res.data.project]);
            } else {
                console.error("Something went wrong");
            }

        } catch (err) {
            console.error("Create project error:", err?.response?.data || err.message);
        } finally {
            console.log("Done");
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 w-[420px]">

                <h2 className="text-white text-lg font-semibold mb-4">
                    Create Project
                </h2>

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Project name (e.g. Backend APIs)"
                    className="w-full mb-3 px-3 py-2 rounded-lg bg-[#0B1220] border border-slate-700 text-white outline-none focus:border-blue-500"
                />

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description (optional)"
                    className="w-full mb-4 px-3 py-2 rounded-lg bg-[#0B1220] border border-slate-700 text-white outline-none focus:border-blue-500 resize-none h-24"
                />

                <button
                    onClick={handleCreate}
                    disabled={loading || !name.trim()}
                    className={`w-full py-2 rounded-lg font-medium transition
                        ${loading || !name.trim()
                            ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-500 text-white"
                        }`}
                >
                    {loading ? "Creating..." : "Create Project"}
                </button>
            </div>
        </div>
    );
}