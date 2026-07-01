import { Children } from "react";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Transition, // <-- Import Transition
} from "@headlessui/react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function SidebarDisclosure({
    icon: Icon,
    title,
    selected,
    onClick,
    children,
}) {
    const hasChildren = Children.count(children) > 0;

    const buttonClasses = `
        w-full flex items-center justify-between
        rounded-xl px-4 py-3
        transition-all duration-200
        ${selected
            ? "bg-blue-500/15 text-blue-400 border border-blue-500/20"
            : "text-gray-400 hover:text-white border border-transparent hover:bg-white/5"
        }
    `;

    // If no children, render a standard button (no disclosure behavior)
    if (!hasChildren) {
        return (
            <button onClick={onClick} className={buttonClasses}>
                <div className="flex items-center gap-3">
                    <Icon fontSize="small" />
                    <span>{title}</span>
                </div>
            </button>
        );
    }

    return (
        <Disclosure defaultOpen={selected}>
            {({ open }) => (
                <>
                    <DisclosureButton onClick={onClick} className={buttonClasses}>
                        <div className="flex items-center gap-3">
                            <Icon fontSize="small" />
                            <span>{title}</span>
                        </div>
                        <KeyboardArrowDownIcon
                            className={` transition-all duration-200 ${open ? "rotate-180" : ""}`}
                        />
                    </DisclosureButton>

                    {/* Wrap in Transition for Headless UI v1 */}
                    <Transition
                        enter="transition duration-200 ease-out"
                        enterFrom="transform opacity-0 -translate-y-2"
                        enterTo="transform opacity-100 translate-y-0"
                        leave="transition duration-150 ease-out"
                        leaveFrom="transform opacity-100 translate-y-0"
                        leaveTo="transform opacity-0 -translate-y-2"
                    >
                        <DisclosurePanel className="ml-9 mt-1 flex flex-col gap-1 origin-top">
                            {children}
                        </DisclosurePanel>
                    </Transition>
                </>
            )}
        </Disclosure>
    );
}