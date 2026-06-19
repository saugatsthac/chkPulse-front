export default function WebsiteDetails({
    website,
    onClose,
}) {
    if (!website) return null;

    return (
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 w-[700px] max-w-[95vw]">

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                    Website Details
                </h2>

                <button
                    onClick={onClose}
                    className="text-white/50 hover:text-white"
                >
                    ✕
                </button>
            </div>

            <div className="space-y-6">

                {/* URL */}
                <div>
                    <div className="text-white/40 text-sm">
                        URL
                    </div>
                    <div className="text-lg break-all">
                        {website.url}
                    </div>
                </div>

                {/* Status */}
                <div>
                    <div className="text-white/40 text-sm">
                        Current Status
                    </div>

                    <div className="mt-1">
                        {website.status === "UP" ? (
                            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400">
                                LIVE
                            </span>
                        ) : (
                            <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400">
                                DOWN
                            </span>
                        )}
                    </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">

                    <div className="bg-slate-900 rounded-xl p-4">
                        <div className="text-white/40 text-sm">
                            Response Time
                        </div>

                        <div className="text-2xl font-bold">
                            {website.responseTime} ms
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-xl p-4">
                        <div className="text-white/40 text-sm">
                            Checks
                        </div>

                        <div className="text-2xl font-bold">
                            {website.last14Checks?.length || 0}
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-xl p-4">
                        <div className="text-white/40 text-sm">
                            Last Checked
                        </div>

                        <div className="text-lg font-medium">
                            {new Date(
                                website.lastCheckedAt
                            ).toLocaleString()}
                        </div>
                    </div>

                </div>

                {/* Error */}
                {(website.errorCode ||
                    website.errorMessage) && (
                        <div className="border border-red-500/20 bg-red-500/5 rounded-xl p-4">

                            <div className="text-red-400 font-medium">
                                Current Incident
                            </div>

                            {website.errorCode && (
                                <div className="mt-2 text-sm">
                                    Code: {website.errorCode}
                                </div>
                            )}

                            {website.errorMessage && (
                                <div className="mt-1 text-sm">
                                    {website.errorMessage}
                                </div>
                            )}
                        </div>
                    )}

                {/* Last Checks */}
                <div>

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

                </div>

            </div>
        </div>
    );
}