import { CircleAlert, CircleCheckBig, Clock, X } from "lucide-react";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import getStatusSince from "../utilis/statusSince";

export default function WebsiteDetails({
    website,
    onClose,
}) {
    if (!website) return null;

    const getStatusIcon = (status) => {
        switch (status) {
            case "UP":
                return (
                    <CircleCheckBig className="w-4 h-4 text-green-400" />
                );

            case "DOWN":
                return (
                    <CircleAlert className="w-4 h-4 text-yellow-400" />
                );

            case "MAINTENANCE":
                return (
                    <Clock className="w-4 h-4 text-blue-400" />
                );

            default:
                return (
                    <CircleAlert className="w-4 h-4 text-gray-400" />
                );
        }
    };

    const Row = ({ label, value }) => (
        <div className="flex justify-between items-center py-2">
            <span className="text-gray-500">
                {label}
            </span>

            <span className="text-right">
                {value}
            </span>
        </div>
    );

    return (
        <div className="w-[1100px] max-w-[95vw] h-[84vh] bg-[#111217] rounded-2xl border border-white/10">

            {/* Header */}

            <div className="flex items-start justify-between px-7 py-6 border-b border-white/10">

                <div className="flex flex-col gap-2">

                    <h2 className="text-2xl font-light">
                        {website.url}
                    </h2>

                    <div className="flex items-center gap-2 text-sm text-gray-400">

                        {getStatusIcon(website.status)}

                        <span>
                            {website.status}
                        </span>

                        {website.statusSince && (
                            <>
                                <span>•</span>

                                <span>
                                    for{" "}
                                    {getStatusSince(
                                        new Date(
                                            website.statusSince
                                        )
                                    )}
                                </span>
                            </>
                        )}

                    </div>

                </div>

                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

            </div>

            {/* Performance */}

            <div className="px-7 py-6">

                <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">
                    Performance
                </h3>

                <div className="space-y-1">

                    <Row
                        label="Response Time"
                        value={
                            <span className="flex items-center gap-2">
                                <QueryBuilderIcon fontSize="small" />
                                {website.responseTime} ms
                            </span>
                        }
                    />

                    <Row
                        label="Last Checked"
                        value={
                            website.lastCheckedAt
                                ? getStatusSince(
                                    new Date(
                                        website.lastCheckedAt
                                    )
                                ) + " ago"
                                : "-"
                        }
                    />

                    <Row
                        label="Checks Stored"
                        value={
                            website.last14Checks?.length ?? 0
                        }
                    />

                </div>

            </div>

            {/* Status */}

            <div className="px-7 py-6 border-t border-white/10">

                <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">
                    Status
                </h3>

                <div className="space-y-1">

                    <Row
                        label="Current Status"
                        value={website.status}
                    />

                    <Row
                        label="Status Since"
                        value={
                            website.statusSince
                                ? getStatusSince(
                                    new Date(
                                        website.statusSince
                                    )
                                )
                                : "-"
                        }
                    />

                    <Row
                        label="Status Code"
                        value={
                            website.statusCode ?? "-"
                        }
                    />

                </div>

            </div>

            {/* Incident */}

            <div className="px-7 py-6 border-t border-white/10">

                <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">
                    Current Incident
                </h3>

                {website.errorCode || website.errorMessage ? (
                    <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">

                        {website.errorCode && (
                            <div className="text-sm text-yellow-300">
                                {website.errorCode}
                            </div>
                        )}

                        {website.errorMessage && (
                            <div className="mt-2 text-sm text-gray-300">
                                {website.errorMessage}
                            </div>
                        )}

                    </div>
                ) : (
                    <div className="text-gray-500 text-sm">
                        No active incident.
                    </div>
                )}

            </div>

        </div>
    );
}

// export default function WebsiteDetails({
//     website,
//     onClose,
// }) {
//     if (!website) return null;

//     return (
//         <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 w-[700px] max-w-[95vw]">

//             <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-semibold">
//                     Website Details
//                 </h2>

//                 <button
//                     onClick={onClose}
//                     className="text-white/50 hover:text-white"
//                 >
//                     ✕
//                 </button>
//             </div>

//             <div className="space-y-6">

//                 {/* URL */}
//                 <div>
//                     <div className="text-white/40 text-sm">
//                         URL
//                     </div>
//                     <div className="text-lg break-all">
//                         {website.url}
//                     </div>
//                 </div>

//                 {/* Status */}
//                 <div>
//                     <div className="text-white/40 text-sm">
//                         Current Status
//                     </div>

//                     <div className="mt-1">
//                         {website.status === "UP" ? (
//                             <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400">
//                                 LIVE
//                             </span>
//                         ) : (
//                             <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400">
//                                 DOWN
//                             </span>
//                         )}
//                     </div>
//                 </div>

//                 {/* Metrics */}
//                 <div className="grid grid-cols-3 gap-4">

//                     <div className="bg-slate-900 rounded-xl p-4">
//                         <div className="text-white/40 text-sm">
//                             Response Time
//                         </div>

//                         <div className="text-2xl font-bold">
//                             {website.responseTime} ms
//                         </div>
//                     </div>

//                     <div className="bg-slate-900 rounded-xl p-4">
//                         <div className="text-white/40 text-sm">
//                             Checks
//                         </div>

//                         <div className="text-2xl font-bold">
//                             {website.last14Checks?.length || 0}
//                         </div>
//                     </div>

//                     <div className="bg-slate-900 rounded-xl p-4">
//                         <div className="text-white/40 text-sm">
//                             Last Checked
//                         </div>

//                         <div className="text-lg font-medium">
//                             {new Date(
//                                 website.lastCheckedAt
//                             ).toLocaleString()}
//                         </div>
//                     </div>

//                 </div>

//                 {/* Error */}
//                 {(website.errorCode ||
//                     website.errorMessage) && (
//                         <div className="border border-red-500/20 bg-red-500/5 rounded-xl p-4">

//                             <div className="text-red-400 font-medium">
//                                 Current Incident
//                             </div>

//                             {website.errorCode && (
//                                 <div className="mt-2 text-sm">
//                                     Code: {website.errorCode}
//                                 </div>
//                             )}

//                             {website.errorMessage && (
//                                 <div className="mt-1 text-sm">
//                                     {website.errorMessage}
//                                 </div>
//                             )}
//                         </div>
//                     )}

//             </div>
//         </div>
//     );
// }
{/* Last Checks */ }
{/* <div>

                    <div className="text-white/40 text-sm mb-3">
                        Last 14 Checks
                    </div>

                    <div className="flex gap-2">
                        {website.last14Checks?.map(
                            (check, index) => (
                                <div
                                    key={index}
                                    className={`w-4 h-12 rounded-md
                                    ${check.status === "UP"
                                            ? "bg-green-500"
                                            : "bg-red-500"
                                        }`}
                                />
                            )
                        )}
                    </div>

                </div> */}
