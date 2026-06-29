import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell,
} from "recharts";

const sampleData = [
    { day: "Mon", uptime: 100.0 },
    { day: "Tue", uptime: 99.98 },
    { day: "Wed", uptime: 99.94 },
    { day: "Thu", uptime: 100.0 },
    { day: "Fri", uptime: 99.87 },
    { day: "Sat", uptime: 99.99 },
    { day: "Sun", uptime: 100.0 },
];

import { CustomTooltip } from "./CustomTooltip";
export default function WeeklyUptimeChart({
    data = sampleData,
}) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{
                    top: 10,
                    right: 15,
                    left: -15,
                    bottom: 0,
                }}
            >
                <CartesianGrid
                    stroke="#ffffff10"
                    vertical={false}
                />

                <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />

                <YAxis
                    domain={[99.8, 100]}
                    ticks={[99.8, 99.9, 100]}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />

                <Tooltip
                    cursor={false}
                    formatter={(value) => [`${value}%`, "Uptime"]}
                    content={<CustomTooltip />}
                //     contentStyle={{
                //         background: "#111217",
                //         border: "1px solid rgba(255,255,255,.1)",
                //         borderRadius: "12px",
                // }}
                />

                <Bar
                    dataKey="uptime"
                    radius={[6, 6, 0, 0]}
                    barSize={24}
                    activeBar={false}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={index}
                            fill={
                                entry.uptime >= 99.99
                                    ? "#22c55e"
                                    : entry.uptime >= 99.95
                                        ? "#facc15"
                                        : "#ef4444"
                            }
                        />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}


// // Components/Dashboard/WeeklyUptimeChart.jsx

// import {
//     ResponsiveContainer,
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
// } from "recharts";

// const sampleData = [
//     { day: "Mon", uptime: 100 },
//     { day: "Tue", uptime: 99.98 },
//     { day: "Wed", uptime: 100 },
//     { day: "Thu", uptime: 99.85 },
//     { day: "Fri", uptime: 99.92 },
//     { day: "Sat", uptime: 100 },
//     { day: "Sun", uptime: 99.99 },
// ];

// export default function WeeklyUptimeChart({
//     data = sampleData,
// }) {
//     return (
//         <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//                 data={data}
//                 margin={{
//                     top: 5,
//                     right: 10,
//                     left: -20,
//                     bottom: 5,
//                 }}
//             >
//                 <CartesianGrid
//                     stroke="#ffffff10"
//                     vertical={false}
//                 />

//                 <XAxis
//                     dataKey="day"
//                     tick={{ fill: "#9ca3af", fontSize: 12 }}
//                     tickLine={false}
//                     axisLine={false}
//                 />

//                 <YAxis
//                     domain={[99, 100]}
//                     tick={{ fill: "#9ca3af", fontSize: 12 }}
//                     tickFormatter={(v) => `${v}%`}
//                     tickLine={false}
//                     axisLine={false}
//                 />

//                 <Tooltip
//                     formatter={(value) => [`${value}%`, "Uptime"]}
//                     contentStyle={{
//                         background: "#111217",
//                         border: "1px solid rgba(255,255,255,.1)",
//                         borderRadius: "12px",
//                     }}
//                 />

//                 <Bar
//                     dataKey="uptime"
//                     fill="#22c55e"
//                     radius={[8, 8, 0, 0]}
//                 />
//             </BarChart>
//         </ResponsiveContainer>
//     );
// }