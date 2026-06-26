import { useState } from "react";
import api from "../../api/axios";

export default function AddProject({ setProjects, onClose }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");
    const [type, setType] = useState("general");
    const [color, setColor] = useState("#3b82f6");
    const [loading, setLoading] = useState(false);

    const COLORS = [
        "#3b82f6", "#ef4444", "#22c55e",
        "#f59e0b", "#a855f7", "#ec4899"
    ];

    const TYPES = [
        { label: "General", value: "general" },
        { label: "Backend APIs", value: "backend" },
        { label: "Frontend Apps", value: "frontend" },
        { label: "Infrastructure", value: "infra" }
    ];

    const handleCreate = async () => {
        if (!name.trim()) return;

        setLoading(true);

        try {
            const res = await api.post("/projects", {
                name,
                description,
                color,
                tag,
                type
            });

            if (res.data?.success) {
                setProjects(prev => [...prev, res.data.project]);

                setName("");
                setDescription("");
                setTag("");
                setType("general");
                setColor("#3b82f6");
            }

        } catch (err) {
            console.error("Create project error:", err?.response?.data || err.message);
        } finally {
            setLoading(false);
            onClose?.();
        }
    };

    return (
        <div className="w-full h-full flex items-center justify-center bg-black/40">
            <div className="bg-[#111217] border border-white/10 rounded-2xl p-6 w-[440px]">

                <h2 className="text-white text-lg font-light mb-6">
                    Create Project
                </h2>

                {/* NAME */}
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Project name (e.g. Backend APIs)"
                    className="w-full mb-3 px-4 py-3 rounded-xl bg-[#0B0F14] border border-white/10 text-white outline-none focus:border-white/30"
                />

                {/* DESCRIPTION */}
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description (optional)"
                    className="w-full mb-3 px-4 py-3 rounded-xl bg-[#0B0F14] border border-white/10 text-white outline-none focus:border-white/30 resize-none h-24"
                />

                {/* TAG */}
                <input
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Tag (e.g. production, side-project)"
                    className="w-full mb-4 px-4 py-3 rounded-xl bg-[#0B0F14] border border-white/10 text-white outline-none focus:border-white/30"
                />

                {/* TYPE */}
                <div className="mb-4">
                    <label className="text-xs text-white/40 mb-2 block">
                        Project Type
                    </label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#0B0F14] border border-white/10 text-white outline-none"
                    >
                        {TYPES.map(t => (
                            <option key={t.value} value={t.value}>
                                {t.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* COLOR */}
                <div className="flex gap-2 mb-6 flex-wrap">
                    {COLORS.map((c) => (
                        <button
                            key={c}
                            type="button"
                            onClick={() => setColor(c)}
                            className={`w-8 h-8 rounded-full border transition
                                ${color === c ? "border-white scale-110" : "border-transparent"}`}
                            style={{ backgroundColor: c }}
                        />
                    ))}
                </div>

                {/* SUBMIT */}
                <button
                    onClick={handleCreate}
                    disabled={loading || !name.trim()}
                    style={{
                        backgroundColor: loading || !name.trim() ? "#1f2937" : color
                    }}
                    className="w-full py-3 rounded-xl font-medium text-white transition"
                >
                    {loading ? "Creating..." : "Create Project"}
                </button>

            </div>
        </div>
    );
}