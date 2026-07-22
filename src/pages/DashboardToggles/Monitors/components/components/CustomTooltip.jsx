export function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;

    return (
        <div className="bg-[#111217] border border-white/10 rounded-xl px-3 py-2 shadow-lg">
            <p className="text-gray-400 text-xs">{label}</p>

            <div className="my-2 h-px bg-white/10" />

            <div className="flex justify-between gap-6">
                <span className="text-gray-400 text-sm">Uptime</span>
                <span className="text-white font-medium">
                    {payload[0].value}%
                </span>
            </div>
        </div>
    );
}