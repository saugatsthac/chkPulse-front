export function StatusFilterButton({
    label,
    value,
    active,
    onClick,
    // color
}) {
    const styles = {
        ALL: active
            ? "bg-white/20 border-white/50"
            : "border-white/20 hover:bg-white/10",
        UP: active
            ? "bg-green-500/20 border-green-500/50"
            : "border-green-500/20 hover:bg-green-500/10",

        DEGRADED: active
            ? "bg-yellow-500/20 border-yellow-500/50"
            : "border-yellow-500/20 hover:bg-yellow-500/10",

        DOWN: active
            ? "bg-red-500/20 border-red-500/50"
            : "border-red-500/20 hover:bg-red-500/10"
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
// <button
//     onClick={() => onClick(value)}
//     className={`
//         px-3 py-1 rounded-md text-sm
//         transition-all duration-200
//         border
//         ${active
//             ? color.active
//             : color.inactive
//         }
//     `}
// >
//     {label}
// </button>