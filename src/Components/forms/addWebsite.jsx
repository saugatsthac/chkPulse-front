import { useState } from "react";
import api from "../../api/axios";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";

export default function CreateWebsite({
    setActiveProjects,
    activeProjectData,
    setProjectWebsites,
    onClose,
}) {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !url.trim()
        ) {
            setError("URL are required");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const normalizedUrl = url.startsWith("http")
                ? url
                : `https://${url}`;

            const res = await api.post("/projects/websites", {

                url: normalizedUrl,
                projectId: activeProjectData._id,
            });
            console.log(res)
            setProjectWebsites((prev) => ({
                ...prev,
                [activeProjectData._id]: [...prev[activeProjectData._id], res.data.website]
            })
            )
            setUrl("");

            onClose?.();
        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to create monitor"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-[#111217] border border-white/10 rounded-2xl p-6 w-[420px]"
        >
            <div className="flex items-center gap-2 mb-5">
                <AddIcon className="text-white/70" />
                <h2 className="text-lg font-light text-white/90">
                    Add Monitor
                </h2>
            </div>

            <div className="flex flex-col gap-3">


                <div className="flex flex-col gap-2">
                    <label className="text-sm text-white/50">
                        Website URL
                    </label>
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="bg-[#0d0f14] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30 text-white"
                    />
                </div>

                <span className="text-sm text-white/30 flex flex-col items-end w-full">
                    <span>you are currently adding this monitor to the project:</span>
                    <span className="text-base text-white/90 font-semibold">{activeProjectData?.name}</span>
                </span>
            </div>

            {error && (
                <p className="text-red-400 text-sm mt-3">
                    {error}
                </p>
            )}

            <div className="flex justify-end gap-3 mt-6">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-white/70"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-sm text-white flex items-center gap-2 disabled:opacity-50"
                >
                    {loading && (
                        <CircularProgress size={14} color="inherit" />
                    )}
                    {loading ? "Adding..." : "Add Monitor"}
                </button>
            </div>
        </form>
    );
}