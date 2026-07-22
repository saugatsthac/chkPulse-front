export default function QuickActionButton({ children, onClick, icon: Icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center
        w-full text-left
        rounded-lg
        px-3 py-3
        text-sm
        text-gray-400
        hover:bg-white/5
        hover:text-white
      "
    >
      {Icon && <Icon fontSize="small" className="mr-2" />}
      {children}
    </button>
  );
}
