import { MenuItem } from "@headlessui/react";

export default function DropdownItem({
    children,
    onClick,
    danger = false,
    icon: Icon
}) {
    return (
        <MenuItem>
            <button
                onClick={onClick}
                className={`flex items-center gap-2
                    w-full rounded-lg px-3 py-2
                    text-left text-sm
                    transition-colors

                    ${danger
                        ? "text-red-400 data-focus:bg-red-500/10 data-focus:text-red-300"
                        : "text-gray-300 data-focus:bg-white/5 data-focus:text-white"}
                        `}
            >
                {Icon && <Icon fontSize='small' />}
                <span>
                    {children}
                </span>
            </button>
        </MenuItem>
    );
}