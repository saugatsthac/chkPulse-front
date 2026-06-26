import { useState } from "react";
import api from "../../api/axios";

export default function EditProject({
    project,
    setProjects,
    onClose,
}) {
    const [name, setName] = useState(project?.name || "");
    const [description, setDescription] = useState(
        project?.description || ""
    );
    const [color, setColor] = useState(project?.color);
    const [loading, setLoading] = useState(false);

    const COLORS = [
        "#3b82f6",
        "#ef4444",
        "#22c55e",
        "#f59e0b",
        "#a855f7",
        "#ec4899",
    ];

    const handleSave = async () => {
        try {
            setLoading(true);

            const res = await api.patch(
                `/projects/${project._id}`,
                {
                    name,
                    description,
                    color,
                }
            );

            setProjects(prev =>
                prev.map(p =>
                    p._id === project._id
                        ? res.data.project
                        : p
                )
            );

            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 w-[420px]">
            <h2 className="text-lg font-semibold mb-4">
                Edit Project
            </h2>

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mb-3 px-3 py-2 rounded-lg bg-[#0B1220] border border-slate-700"
            />

            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mb-4 px-3 py-2 rounded-lg bg-[#0B1220] border border-slate-700 h-24"
            />

            <div className="flex gap-2 mb-4">
                {COLORS.map(c => (
                    <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={`w-8 h-8 rounded-full border-2
                        ${color === c
                                ? "border-white"
                                : "border-transparent"
                            }`}
                        style={{ backgroundColor: c }}
                    />
                ))}
            </div>

            <button
                onClick={handleSave}
                disabled={loading}
                className="w-full py-2 rounded-lg text-white"
                style={{ backgroundColor: color }}
            >
                {loading ? "Saving..." : "Save Changes"}
            </button>
        </div>
    );
}