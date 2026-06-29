import { Trash2 } from "lucide-react";
import { useState } from "react";
import api from "../../api/axios";

export default function DeleteMonitorModal({
    selectedWebsite,
    onCancel,
    setProjectWebsites
    // onDelete,
    // deleting = false,
}) {
    const [deleting, setDeleting] = useState(false);
    const projectId = selectedWebsite.projectId
    const handleDelete = async () => {
        try {
            setDeleting(true);
            await api.delete(`projects/websites/${selectedWebsite._id}`);
            // Remove from state
            // setProjectWebsites(prev =>
            //     prev.filter(site => site._id !== selectedWebsite._id)
            // );
            // console.log(typeof setProjectWebsites);
            setProjectWebsites(prev => {
                console.log("prev:", prev);
                console.log("projectId:", projectId);
                console.log("prev[projectId]:", prev[projectId]);

                return {
                    ...prev,
                    [projectId]: prev[projectId]
                        .filter(website => website._id !== selectedWebsite._id)
                }
            }
            );
            // prev.filter(
            //     website => website._id !== selectedWebsite._id

            // prev => {
            //     console.log("prev:", prev);
            //     console.log("projectId:", selectedWebsite.projectId);
            //     console.log("value:", prev[selectedWebsite.projectId]);
            // return prev;

            // Close modal
            // setShowModal(false);

        } catch (err) {
            console.error(err);
        } finally {
            setDeleting(false);
            onCancel();
        }
    };
    // console.log(selectedWebsite._id)
    // console.log(projectId)
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-gray-900 p-8 shadow-2xl">

                <div className="flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                        <Trash2 className="h-8 w-8 text-red-400" />
                    </div>
                </div>

                <h2 className="mt-6 text-center text-2xl font-semibold text-white">
                    Delete Monitor
                </h2>

                <p className="mt-3 text-center text-gray-400">
                    Are you sure you want to permanently delete this monitor?
                </p>

                <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                    <p className="font-medium text-white break-all">
                        {selectedWebsite?.url}
                    </p>

                    <p className="mt-3 text-sm text-gray-400">
                        Deleting this monitor will permanently remove:
                    </p>

                    <ul className="mt-3 space-y-2 text-sm text-gray-300">
                        <li>• The monitor</li>
                        <li>• Uptime history</li>
                        <li>• Response time history</li>
                    </ul>
                </div>

                <p className="mt-5 text-center text-sm text-gray-500">
                    This action cannot be undone.
                </p>

                <div className="mt-8 flex gap-3">
                    <button
                        onClick={onCancel}
                        disabled={deleting}
                        className="flex-1 rounded-xl border border-white/10 bg-gray-800 py-3 text-white transition hover:bg-gray-700 disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="flex-1 rounded-xl bg-red-600 py-3 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {deleting ? "Deleting..." : "Delete Monitor"}
                    </button>
                </div>

            </div>
        </div>
    );
}