export default function () {
    return (
        <div className="w-1/2 min-h-[20vh] border border-white/10 rounded-lg p-3">
            <h3>Recent Incidents</h3>

            {recentIncidents.length === 0 ? (
                <div className="text-white/40 text-sm mt-2">
                    No incidents
                </div>
            ) : (
                recentIncidents.map((w) => (
                    <div
                        key={w._id}
                        className="py-2 border-b border-white/10 cursor-pointer"
                        onClick={() => {
                            // later: expand website dashboard view
                            setSelectedWebsiteId(w._id);
                        }}
                    >
                        <div className="font-medium">{w.url}</div>

                        <div className="text-red-400 text-sm">
                            {w.errorMessage}
                        </div>

                        {w.errorCode && (
                            <div className="text-xs text-white/50">
                                {w.errorCode}
                            </div>
                        )}

                        <div className="text-xs text-white/40">
                            {formatTimeAgo(w.lastCheckedAt)}
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}