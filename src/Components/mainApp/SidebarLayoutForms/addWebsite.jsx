import { useState } from "react";
import api from "../../../api/axios"; // adjust path

export default function AddWebsite({
    activeProjectData,
    projectId,
    loadWebsites,
    onClose,
}) {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const createWebsite = async (e) => {
        e.preventDefault();

        if (!url.trim()) {
            setError("Please enter a URL");
            return;
        }

        try {
            setLoading(true);
            setError("");

            await api.post("/projects/websites", {
                url,
                projectId: activeProjectData?._id,
            });
            //when projectId is sent to add website, the project model on the backend adds the website to the project, so we just need to reload the websites after adding a new one.
            setUrl("");

            if (loadWebsites) {
                await loadWebsites();
            }

            if (onClose) {
                onClose();
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to add website"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleAddWebsite = async () => {
        const res = await fetch("http://localhost:3000/websites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ url }),
        });

        const data = await res.json();
        console.log(data);

        setUrl("");
        loadWebsites(); // refresh list

    };

    return (
        <form
            onSubmit={createWebsite}
            className="bg-[#111827] border border-slate-800 rounded-2xl p-6 w-[450px]"
        >
            <h2 className="text-xl font-semibold mb-4">
                Add Website
            </h2>

            <div className="flex flex-col gap-2">
                <label className="text-sm text-slate-400">
                    Website URL
                </label>

                <input
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-slate-500"
                />
                <div>{activeProjectData?.name}</div>
            </div>

            {error && (
                <p className="text-red-400 text-sm mt-2">
                    {error}
                </p>
            )}

            <div className="flex justify-end gap-3 mt-6">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-500 transition disabled:opacity-50"
                >
                    {loading ? "Adding..." : "Add Website"}
                </button>
            </div>
        </form>
    );
}