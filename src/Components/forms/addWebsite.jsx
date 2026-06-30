import { useState } from "react";
import api from "../../api/axios";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";

export default function CreateWebsite({
    setActiveProjects,
    activeProjectData,
    setProjectWebsites,
    // loadWebsites,
    onClose,
}) {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !url.trim()) {
            setError("Name and URL are required");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const normalizedUrl = url.startsWith("http")
                ? url
                : `https://${url}`;

            const res = await api.post("/projects/websites", {
                name,
                url: normalizedUrl,
                projectId: activeProjectData._id,
            });
            console.log(res)
            setProjectWebsites((prev) => ({
                ...prev,
                [activeProjectData._id]: [...prev[activeProjectData._id], res.data.website]
            })
            )
            setName("");
            setUrl("");

            // await loadWebsites?.();
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
                        Monitor Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Main API / Landing Page"
                        className="bg-[#0d0f14] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30 text-white"
                    />
                </div>

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
// import { useState } from "react";
// import api from "../../../api/axios"; // adjust path

// export default function AddWebsite({
//     activeProjectData,
//     projectId,
//     loadWebsites,
//     onClose,
// }) {
//     const [url, setUrl] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     const createWebsite = async (e) => {
//         e.preventDefault();

//         if (!url.trim()) {
//             setError("Please enter a URL");
//             return;
//         }

//         try {
//             setLoading(true);
//             setError("");

//             await api.post("/projects/websites", {
//                 url,
//                 projectId: activeProjectData?._id,
//             });
//             //when projectId is sent to add website, the project model on the backend adds the website to the project, so we just need to reload the websites after adding a new one.
//             setUrl("");

//             if (loadWebsites) {
//                 await loadWebsites();
//             }

//             if (onClose) {
//                 onClose();
//             }
//         } catch (err) {
//             setError(
//                 err.response?.data?.message ||
//                 "Failed to add website"
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleAddWebsite = async () => {
//         const res = await fetch("http://localhost:3000/websites", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${localStorage.getItem("token")}`
//             },
//             body: JSON.stringify({ url }),
//         });

//         const data = await res.json();
//         console.log(data);

//         setUrl("");
//         loadWebsites(); // refresh list

//     };

//     return (
//         <form
//             onSubmit={createWebsite}
//             className="bg-[#111827] border border-slate-800 rounded-2xl p-6 w-[450px]"
//         >
//             <h2 className="text-xl font-semibold mb-4">
//                 Add Website
//             </h2>

//             <div className="flex flex-col gap-2">
//                 <label className="text-sm text-slate-400">
//                     Website URL
//                 </label>

//                 <input
//                     type="url"
//                     placeholder="https://example.com"
//                     value={url}
//                     onChange={(e) => setUrl(e.target.value)}
//                     className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-slate-500"
//                 />
//                 <div>{activeProjectData?.name}</div>
//             </div>

//             {error && (
//                 <p className="text-red-400 text-sm mt-2">
//                     {error}
//                 </p>
//             )}

//             <div className="flex justify-end gap-3 mt-6">
//                 <button
//                     type="button"
//                     onClick={onClose}
//                     className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition"
//                 >
//                     Cancel
//                 </button>

//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-500 transition disabled:opacity-50"
//                 >
//                     {loading ? "Adding..." : "Add Website"}
//                 </button>
//             </div>
//         </form>
//     );
// }