import { useEffect } from "react";
export default function ({ avgResponseTime, totalMonitors, openIncidents, projectWebsites }) {

    const stats = [
        {
            title: "MONITORS",
            value: totalMonitors,
        },
        {
            title: "OVERALL UPTIME",
            // value: `${overallUptime.toFixed(2)}%`,
            subtitle: "Last 30 days",
        },
        {
            title: "AVG RESPONSE",
            value: `${Math.round(avgResponseTime)}ms`,
            subtitle: "Across active monitors",
        },
        {
            title: "OPEN INCIDENTS",
            value: openIncidents,
        },
    ];

    return (
        <div className="w-full flex flex-col gap-7 font-light">
            {stats.map((s) =>
                <div className="min-w-1 flex flex-col justify-between border border-white/10 rounded-2xl text-sm px-6 py-7 bg-[#111217]">

                    <span className="tracking-wide text-left opacity-80">
                        {s.title}
                    </span>

                    <div className="flex flex-col">
                        <span className="text-5xl font-bold leading-none">
                            {s.value}
                        </span>

                        {s.rightLabel && (
                            <span className="text-4xl leading-tight opacity-80">
                                {s.rightLabel}
                            </span>
                        )}
                    </div>

                    {s.subtitle && (
                        <span className="mt-2 opacity-70">
                            {s.subtitle}
                        </span>
                    )}
                </div>)}
        </div>
    )
}
// const recentIncidents = projectWebsites
//     .filter(w => w.errorCode || w.errorMessage || w.status === "DOWN")
//     .sort((a, b) => b.lastCheckedAt - a.lastCheckedAt);

// const overallUptime =
//     projectWebsites.length === 0
//         ? 0
//         : projectWebsites.reduce((sum, website) => {
//             const timeline = build30DayTimeline(website);
//             return sum + calculateUptimePercent(timeline);
//         }, 0) / projectWebsites.length;

// useEffect(() => {
//     console.log('incidents', recentIncidents)
// }, [recentIncidents])
// console.log('yellow')
{/* <div className="min-w-1/5 aspect-square flex-col border border-white/10 rounded-2xl text-sm flex p-6 bg-blue-900/10">
    <span className='text-left tracking-wide'>
        OVERALL UPTIME
    </span>
    <span className="text-5xl font-bold">
        {overallUptime.toFixed(2)}%
    </span>
    <span className='mt-1'>Last 30 days</span>
</div>
<div className="min-w-1/5 aspect-square flex-col border border-white/10 rounded-2xl text-sm flex p-6 bg-blue-900/10">
    <span>
        MONITORS
    </span>
    <span className='text-5xl font-bold'>
        {totalMonitors}
    </span>
</div>
<div className="min-w-1/5 aspect-square border border-white/10 rounded-2xl text-sm flex p-6 bg-blue-900/10
            flex-col">
    <span className=''>
        AVG RESPONSE
    </span>
    <span className='text-5xl font-bold flex flex-col'>
        <span>
            {Math.round(avgResponseTime)}
        </span>
        <span className='leading-9 text-4xl'>ms
        </span>
    </span>
    <span className='mt-2.5'>
        Across active monitors
    </span>
</div>
<div className="min-w-1/5 aspect-square border border-white/10 rounded-2xl text-sm flex p-6 bg-blue-900/10
            flex-col">
    <span>
        OPEN INCIDENTS
    </span>
    <span className='text-5xl font-bold'>
        {openIncidents}
    </span>
</div> */}