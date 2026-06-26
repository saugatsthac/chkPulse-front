import { useState } from "react";
import api from "../../api/axios";

export default function DeleteProject({
    project,
    setProjects,
    onClose,
}) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);

            await api.delete(
                `/projects/${project._id}`
            );

            setProjects(prev =>
                prev.filter(
                    p => p._id !== project._id
                )
            );
            console.log('cleared.')
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#111827] border border-red-900/40 rounded-2xl p-6 w-[420px]">
            <h2 className="text-xl font-semibold text-red-400 mb-4">
                Delete Project
            </h2>

            <p className="text-white/70 mb-6">
                This will permanently delete
                <span className="font-semibold">
                    {" "}{project.name}
                </span>.
            </p>

            <div className="flex justify-end gap-3">
                <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg bg-slate-800"
                >
                    Cancel
                </button>

                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500"
                >
                    {loading
                        ? "Deleting..."
                        : "Delete"}
                </button>
            </div>
        </div>
    );
}