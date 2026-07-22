export default function Button({
    children,
    onClick,
    icon: Icon,
}) {
    return (
        <button
            onClick={onClick}
            className="flex items-center
        text-left
        rounded-lg
        px-3 py-3
        text-sm
        bg-slate-800 hover:bg-slate-700
        text-white
        transition
        duration-200
        hover:text-white
        "
        >
            {Icon && <Icon fontSize="small" className="mr-2" />}
            {children}
        </button>
    );
}
// hover:bg-white/5