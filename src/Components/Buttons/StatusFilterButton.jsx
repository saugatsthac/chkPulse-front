export function StatusFilterButton({
    label,
    value,
    active,
    onClick,
}) {
    const styles = {
        ALL: active
            ? "bg-white/20 border-white/50"
            : "border-white/20 hover:bg-white/10",

        Operational: active
            ? "bg-green-500/20 border-green-500/50"
            : "border-green-500/20 hover:bg-green-500/10",

        ISSUES: active
            ? "bg-red-500/20 border-red-500/50"
            : "border-red-500/20 hover:bg-red-500/10",

        MAINTENANCE: active
            ? "bg-blue-500/20 border-blue-500/50"
            : "border-blue-500/20 hover:bg-blue-500/10",
    };
    return (
        <button
            onClick={() => onClick(value)}
            className={`
                px-4 rounded-xl border py-1 text-sm
                transition-all duration-200
                ${styles[value]}
            `}
        >
            {label}
        </button>
    );
}