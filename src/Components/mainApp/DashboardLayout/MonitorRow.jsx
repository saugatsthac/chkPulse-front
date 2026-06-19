import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';

export default function ({ w, index, isLast, onClick }) {
    function formatTimeAgo(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) return `${seconds}s ago`;
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    }

    function build30DayTimeline(website) {
        const days = [];
        console.log('build', website)
        // Start by assuming every day has current status
        for (let i = 0; i < 30; i++) {
            days.push({
                date: new Date(Date.now() - i * 86400000),
                status: website.status,
            });
        }

        const changes = [...website.statusChanges]
            .sort(
                (a, b) =>
                    new Date(b.changedAt) - new Date(a.changedAt)
            );

        for (const change of changes) {
            const changeDate = new Date(change.changedAt);

            for (const day of days) {
                if (day.date < changeDate) {
                    day.status = change.previousStatus;
                }
            }
        }

        return days.reverse();
    }

    function calculateUptimePercent(timeline) {
        const upDays = timeline.filter(d => d.status === "UP").length;
        return (upDays / timeline.length) * 100;
    }

    return (
        <div
            key={w._id}
            className={`w-full flex py-6 gap-2 overflow-hidden bg-gray-900/50 border rounded-2xl
            p-5
            cursor-pointer items-center text-lg
            transition-all duration-100 border-white/10`}
            onClick={onClick}
        >
            <div className={`h-full flex flex-col justify-between`}>
                <div className="flex">
                    <span className='text-base font-light'>
                        {w.url}
                    </span>
                    <span>

                    </span>
                </div>
                <span className="min-w-1/12 text-sm font-light text-gray-500 flex items-center justify-start gap-1" >
                    <QueryBuilderIcon fontSize='8' />
                    <span>
                        {w.responseTime} ms
                    </span>
                </span>
            </div>
            <div className="min-w-3/12 text-center flex gap-1 justify-center items-center">
                {w.last14Checks?.map((check, index) => (
                    <span
                        key={index}
                        className={`w - 1 h - 6 rounded - full inline - block ${check.status === "UP"
                            ? "bg-green-500"
                            : "bg-red-500"
                            } `}
                    />
                ))}
            </div>
        </div >
    )
}
{/* <div className="min-w-2/12 text-center"> {formatTimeAgo(w.lastCheckedAt)}
</div> */}
{/* <span className='w-fit ml-auto'>
                    {w.status === 'UP'
                        ? (<div className="text-green-400 text-sm flex items-center gap-2 animate-pulse
                                            bg-green-900/20 px-2 rounded-full">
                            <span className="w-2 h-2 bg-green-400 rounded-full " />
                            LIVE
                        </div>
                        ) : w.status === 'DOWN'
                            ? (<div className="text-red-900 text-sm flex items-center gap-2 animate-pulse
                                                bg-red-900/20 px-2 rounded-full">
                                <span className="w-2 h-2 bg-red-400 rounded-full " />

                                DOWN
                            </div>
                            ) : (<span>

                                UNKNOWN
                            </span>)}
                </span> */}
{/* % label */ }

{/* bar container */ }
{/* green uptime */ }
{/* red downtime */ }
{/* <div className="min-w-3/12 text-center">
                {(() => {
                    const timeline = build30DayTimeline(w);
                    const pct = calculateUptimePercent(timeline);

                    return (
                        <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>

                            <div style={{
                                flex: 1,
                                height: 6,
                                background: "#1f2937",
                                borderRadius: 4,
                                overflow: "hidden",
                                display: "flex"
                            }}>
                                <div
                                    style={{
                                        width: `${ pct }% `,
                                        background: "#22c55e",
                                        height: "100%"
                                    }}
                                />

                                <div
                                    style={{
                                        width: `${ 100 - pct }% `,
                                        background: "#ef4444",
                                        height: "100%"
                                    }}
                                />
                            </div>
                            <span style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 12,
                                minWidth: 50,
                                color: pct < 99 ? "#facc15" : "#9ca3af"
                            }}>
                                {pct.toFixed(1)}%
                            </span>
                        </div>
                    );
                })()}

            </div> */}
{/* </> */ }
// min-h-1/5 max-h-1/5
//                 ${index === 0 ? 'border-b' : ' '}
//                 ${isLast ? '' : 'border-b'}`
// }