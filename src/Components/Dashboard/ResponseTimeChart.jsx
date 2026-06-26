// components/dashboard/ResponseTimeChart.jsx

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

const sampleData = [
    { time: "12:00", response: 142 },
    { time: "12:05", response: 118 },
    { time: "12:10", response: 165 },
    { time: "12:15", response: 132 },
    { time: "12:20", response: 95 },
    { time: "12:25", response: 104 },
    { time: "12:30", response: 123 },
];

export default function ResponseTimeChart({
    data = sampleData,
    lineColor = "#22c55e",
}) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
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
                    dataKey="time"
                    stroke="#6b7280"
                    tickLine={false}
                    axisLine={false}
                    fontSize={12}
                />

                <YAxis
                    stroke="#6b7280"
                    tickLine={false}
                    axisLine={false}
                    fontSize={12}
                    unit="ms"
                />

                <Tooltip
                    cursor={{ stroke: "#ffffff20" }}
                    contentStyle={{
                        background: "#111217",
                        border: "1px solid rgba(255,255,255,.1)",
                        borderRadius: "12px",
                        color: "#fff",
                    }}
                    labelStyle={{ color: "#fff" }}
                />

                <Line
                    type="monotone"
                    dataKey="response"
                    stroke={lineColor}
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{
                        r: 5,
                        fill: lineColor,
                    }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}