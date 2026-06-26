// Components/Dashboard/WeeklyUptimeChart.jsx

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

const sampleData = [
    { day: "Mon", uptime: 100 },
    { day: "Tue", uptime: 99.98 },
    { day: "Wed", uptime: 100 },
    { day: "Thu", uptime: 99.85 },
    { day: "Fri", uptime: 99.92 },
    { day: "Sat", uptime: 100 },
    { day: "Sun", uptime: 99.99 },
];

export default function WeeklyUptimeChart({
    data = sampleData,
}) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 10,
                    left: -20,
                    bottom: 5,
                }}
            >
                <CartesianGrid
                    stroke="#ffffff10"
                    vertical={false}
                />

                <XAxis
                    dataKey="day"
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                />

                <YAxis
                    domain={[99, 100]}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                    tickFormatter={(v) => `${v}%`}
                    tickLine={false}
                    axisLine={false}
                />

                <Tooltip
                    formatter={(value) => [`${value}%`, "Uptime"]}
                    contentStyle={{
                        background: "#111217",
                        border: "1px solid rgba(255,255,255,.1)",
                        borderRadius: "12px",
                    }}
                />

                <Bar
                    dataKey="uptime"
                    fill="#22c55e"
                    radius={[8, 8, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}