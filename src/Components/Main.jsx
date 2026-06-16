import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect } from 'react';

export default function Main({ setShowModal, setModalType, activeProjectData, projectWebsites, sidebarSelection,
    avgResponseTime, totalMonitors, openIncidents
}) {
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
    const capitalize = (str) =>
        str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
    const recentIncidents = projectWebsites
        .filter(w => w.errorCode || w.errorMessage || w.status === "DOWN")
        .sort((a, b) => b.lastCheckedAt - a.lastCheckedAt);

    function calculateUptimePercent(timeline) {
        const upDays = timeline.filter(d => d.status === "UP").length;
        return (upDays / timeline.length) * 100;
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
    // const website = projectWebsites[projectId]?.find(
    //     w => w._id === websiteId
    // );

    // const timeline = website
    //     ? build30DayTimeline(website)
    //     : [];
    const overallUptime =
        projectWebsites.length === 0
            ? 0
            : projectWebsites.reduce((sum, website) => {
                const timeline = build30DayTimeline(website);
                return sum + calculateUptimePercent(timeline);
            }, 0) / projectWebsites.length;

    useEffect(() => {
        console.log('incidents', recentIncidents)
    }, [recentIncidents])
    console.log('yellow')
    return (
        <div className="grow h-full flex flex-col items-start justify-start gap-">
            <div className="w-full flex items-end">
                <div className="flex gap-3 text-4xl items-center justify-between py-2 pl-4 w-full bg-blue-900/10 px-1 borderb border-white/10">
                    <h1 className="tracking-tight text-3xl font-semibold text-white/92">{capitalize(sidebarSelection)}</h1>
                    <div className="flex items-center gap-3">

                        <div className='flex gap-5 border rounded-2xl px-2 items-center border-white/5'>
                            <span className="text-lg flex items-center gap-2">
                                <span
                                    className="w-2.5 h-2.5 rounded-full inline-block"
                                    style={{ backgroundColor: activeProjectData?.color }}
                                />
                                <span>
                                    {activeProjectData?.name}
                                </span>
                            </span>

                            <MoreVertIcon
                                className='hover:bg-white/5 min-h-8 min-w-8 hover:rounded-xl transition-all duration-500 bg-transparent' />
                        </div>
                        <button className="text-lg font-light rounded-2xl px-3 py-1
                                        flex items-center gap-1 bg-slate-800/40 hover:bg-slate-800">
                            <RefreshIcon /> refresh</button>
                        {activeProjectData && <button className="font-light bg-none ml-auto mr-6
bg-slate-800/40 hover:bg-slate-800
        rounded-2xl px-3 py-1 
        flex w-fit text-lg 
        transition-all duration-300"
                            onClick={() => {
                                setShowModal(true);
                                setModalType("addWebsite");

                            }}
                        >
                            Add Website
                        </button>}
                    </div>
                </div>

            </div>


            <div className="overflow-y-auto overflow-x-hidden w-full scrollbar-thumb-blue-900/10 scrollbar-gutter-stable">
                <div className="p-4 w-full flex flex-col gap-2">

                    <div className="w-full flex gap-2 font-light">

                        <div className="aspect-square flex-1 flex-col border border-white/10 rounded-2xl text-sm flex justify-center items-center bg-blue-900/10">
                            <span>
                                OVERALL UPTIME
                            </span>
                            <span className="text-2xl">
                                {overallUptime.toFixed(2)}%
                            </span>
                        </div>
                        <div className="aspect-square flex-1 flex-col border border-white/10 rounded-2xl text-sm flex justify-center items-center bg-blue-900/10">
                            <span>
                                MONITORS
                            </span>
                            <span className='text-2xl'>
                                {totalMonitors}
                            </span>
                        </div>
                        <div className="aspect-square flex-1 border border-white/10 rounded-2xl text-sm flex justify-center items-center bg-blue-900/10
                        flex-col">
                            <span className=''>
                                AVG RESPONSE
                            </span>
                            <span className='text-2xl'>
                                {Math.round(avgResponseTime)} ms
                            </span>
                            <span>
                                Across active monitors
                            </span>
                        </div>
                        <div className="aspect-square flex-1 border border-white/10 rounded-2xl text-sm flex justify-center items-center bg-blue-900/10
                        flex-col">
                            <span>
                                OPEN INCIDENTS
                            </span>
                            <span className='text-2xl'>
                                {openIncidents}
                            </span>
                        </div>
                    </div>


                    <h2>MONITORS</h2>
                    <div className="border border-white/10 rounded-lg min-h-[50vh] w-full font-light bg-blue-900/10
                    flex flex-col">

                        {/* border-b border-white/10 */}
                        <div className="w-full flex justify-between border-b border-white/10 gap-2
                         bg-blue-900/20">
                            <span className="min-w-3/12 text-center">MONITOR STATUS</span>
                            <span className="min-w-3/12 text-center">UPTIME (30 DAYS)</span>
                            <span className="min-w-1/12 text-center">RESPONSE</span>
                            <span className="min-w-3/12 text-center">LAST 14 CHECKS</span>
                            <span className="min-w-2/12 text-center">CHECKED</span>
                        </div>
                        <div className='grow flex flex-col overflow-auto'>
                            {projectWebsites.map((w) => (
                                <div className="w-full flex py-4 gap-2 overflow-hidden
                    cursor-pointer min-h-1/5 max-h-1/5 items-center
                    transition-all duration-100"
                                    key={w._id}>

                                    <div className="min-w-3/12 h-full pl-3 flex flex-col justify-between">
                                        <span>
                                            {w.url}
                                        </span>
                                        <span className='ml-auto'>
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
                                        </span>
                                    </div>
                                    <div className="min-w-3/12 text-center">
                                        {(() => {
                                            const timeline = build30DayTimeline(w);
                                            const pct = calculateUptimePercent(timeline);

                                            return (
                                                <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>

                                                    {/* % label */}

                                                    {/* bar container */}
                                                    <div style={{
                                                        flex: 1,
                                                        height: 6,
                                                        background: "#1f2937",
                                                        borderRadius: 4,
                                                        overflow: "hidden",
                                                        display: "flex"
                                                    }}>
                                                        {/* green uptime */}
                                                        <div
                                                            style={{
                                                                width: `${pct}%`,
                                                                background: "#22c55e",
                                                                height: "100%"
                                                            }}
                                                        />

                                                        {/* red downtime */}
                                                        <div
                                                            style={{
                                                                width: `${100 - pct}%`,
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

                                    </div>
                                    < div className="min-w-1/12 text-center" > {w.responseTime} ms
                                    </div>
                                    <div className="min-w-3/12 text-center flex gap-1 justify-center items-center">
                                        {w.last14Checks?.map((check, index) => (
                                            <span
                                                key={index}
                                                className={`w-1 h-6 rounded-full inline-block ${check.status === "UP"
                                                    ? "bg-green-500"
                                                    : "bg-red-500"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <div className="min-w-2/12 text-center"> {formatTimeAgo(w.lastCheckedAt)}
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                    <div className="w-full flex gap-2">
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

                        <div className="w-1/2 min-h-[20vh] border border-white/10 rounded-lg p-3">Notifications</div>
                    </div>
                </div>
            </div >
        </div >)
}