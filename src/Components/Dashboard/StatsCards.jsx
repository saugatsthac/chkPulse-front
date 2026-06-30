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
            value: "99.9%",
            subtitle: "Last 30 days",
            class: "text-green-700"
        },
        {
            title: "AVG RESPONSE",
            value: `${Math.round(avgResponseTime)}ms`,
            subtitle: "Across active monitors",
            class: avgResponseTime < 300
                ? "text-green-500"
                : avgResponseTime < 800
                    ? "text-lime-500"
                    : avgResponseTime < 1500
                        ? "text-yellow-500"
                        : avgResponseTime < 3000
                            ? "text-orange-500"
                            : "text-red-500",
        },
        {
            title: "OPEN INCIDENTS",
            value: openIncidents,
            class: `${openIncidents == 0 ? 'text-green-500' : 'text-red-500'}`
        },
    ];

    return (
        <div className="w-3/3 flex font-light divide-y-2 divide-white/3 gap-3 mb-8">
            {stats.map((s) =>
                <div
                    key={s.title}
                    className="min-w-1 flex flex-col flex-1 justify-start text-sm px-6 py-7 border border-white/10 rounded-2xl
                    bg-[#111217]">

                    <span className="tracking-wide text-left opacity-80">
                        {s.title}
                    </span>

                    <div className={`flex flex-col ${s.class}`}>
                        <span className="text-5xl font-bold leading-none tracking-tighter">
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