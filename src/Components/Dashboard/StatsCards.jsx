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
        <div className="w-full flex flex-col font-light border border-white/10 rounded-2xl bg-[#111217] divide-y-2 divide-white/3">
            {stats.map((s) =>
                <div
                    key={s.title}
                    className="min-w-1 flex flex-col justify-between  text-sm px-6 py-7 ">

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