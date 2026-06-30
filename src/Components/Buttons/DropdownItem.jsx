import { MenuItem } from "@headlessui/react";

export default function DropdownItem({
    children,
    onClick,
    danger = false,
}) {
    return (
        <MenuItem>
            <button
                onClick={onClick}
                className={`
                    w-full rounded-lg px-3 py-2
                    text-left text-sm
                    transition-colors

                    ${danger
                        ? "text-red-400 data-focus:bg-red-500/10 data-focus:text-red-300"
                        : "text-gray-300 data-focus:bg-white/5 data-focus:text-white"}
                `}
            >
                {children}
            </button>
        </MenuItem>
    );
}