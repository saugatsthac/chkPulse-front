import CheckIcon from "@mui/icons-material/Check";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

export default function BillingLayout() {
    // overflow-y-auto
    // scrollbar-thumb-slate-600/40 hover:scrollbar-thumb-slate-500/50
    return (
        <div className="grow overflow-y-auto px-6 py-7 scrollbar-gutter-stable gap-8 flex flex-col
scrollbar-thin
scrollbar-track-transparent
scrollbar-thumb-white/10
hover:scrollbar-thumb-white/20"
        >

            <div className="mb8">
                <h1 className="text-3xl font-light">
                    Billing
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage your subscription and compare available plans.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-6">

                {/* Starter */}

                <div className="rounded-2xl border-2 border-blue-500 bg-[#111217] p-8 flex flex-col">

                    <div className="flex justify-between items-center">

                        <div>

                            <div className="text-2xl font-light">
                                Starter
                            </div>

                            <div className="text-gray-500 mt-1">
                                Perfect for personal projects.
                            </div>

                        </div>

                        <span className="rounded-full bg-blue-500/20 text-blue-400 px-3 py-1 text-sm">
                            Current Plan
                        </span>

                    </div>

                    <div className="mt-8">

                        <div className="text-5xl font-light">
                            Free
                        </div>

                        <div className="text-gray-500 mt-2">
                            Forever
                        </div>

                    </div>

                    <div className="mt-10 flex flex-col gap-4">

                        <Feature text="Up to 5 monitors" />
                        <Feature text="30 second checks" />
                        <Feature text="Email notifications" />
                        <Feature text="Discord notifications" />
                        <Feature text="Basic uptime statistics" />

                    </div>

                    <button
                        disabled
                        className="mt-auto rounded-xl bg-slate-800 py-3 text-gray-400 cursor-default"
                    >
                        Current Plan
                    </button>

                </div>

                {/* Professional */}

                <div className="rounded-2xl border border-white/10 bg-[#111217] p-8 flex flex-col">

                    <div className="flex justify-between items-center">

                        <div>

                            <div className="flex items-center gap-2">

                                <WorkspacePremiumIcon />

                                <span className="text-2xl font-light">
                                    Professional
                                </span>

                            </div>

                            <div className="text-gray-500 mt-1">
                                Built for businesses and production workloads.
                            </div>

                        </div>

                    </div>

                    <div className="mt-8">

                        <div className="text-5xl font-light">
                            $9
                            <span className="text-xl text-gray-500">
                                /month
                            </span>
                        </div>

                    </div>

                    <div className="mt-10 flex flex-col gap-4">

                        <Feature text="100 monitors" />
                        <Feature text="10 second checks" />
                        <Feature text="Unlimited notifications" />
                        <Feature text="SMS support" />
                        <Feature text="Public status pages" />
                        <Feature text="Advanced uptime analytics" />
                        <Feature text="Priority support" />

                    </div>

                    <button
                        className="rounded-xl bg-blue-600 hover:bg-blue-500 transition py-3 mt-10"
                    >
                        Upgrade
                    </button>

                </div>

            </div>

            <div className="mt8 rounded-2xl border border-white/10 bg-[#111217] p-6 w-[49%]">

                <h2 className="text-xl font-light">
                    Usage
                </h2>

                <div className="mt-5 space-y-5">

                    <UsageBar
                        title="Monitors"
                        current={3}
                        max={5}
                    />

                    <UsageBar
                        title="Notification Channels"
                        current={2}
                        max={5}
                    />

                </div>

            </div>

        </div>
    );
}

function Feature({ text }) {
    return (
        <div className="flex gap-3 items-center">

            <CheckIcon
                fontSize="small"
                className="text-green-400"
            />

            <span>{text}</span>

        </div>
    );
}

function UsageBar({
    title,
    current,
    max,
}) {
    const percent = (current / max) * 100;

    return (
        <div>

            <div className="flex justify-between text-sm mb-2">

                <span>{title}</span>

                <span className="text-gray-500">
                    {current} / {max}
                </span>

            </div>

            <div className="h-2 rounded-full bg-slate-800 overflow-hidden">

                <div
                    className="h-full rounded-full bg-blue-500"
                    style={{
                        width: `${percent}%`,
                    }}
                />

            </div>

        </div>
    );
}