// import Card from "./Card";
import { useState } from "react";
export default function DashboardLayout({ websites, url, setUrl,
    // search, setSearch,
    activeProjectName, handleAddWebsite, }) {

    // console.log("Card import:", Card);
    const online = websites.filter(w => w.status === "online").length;
    const offline = websites.filter(w => w.status === "offline").length;
    const [search, setSearch] = useState("");

    return (
        <div className="flex- bg-red-300">
            {/* MAIN */}

            {/* TOP BAR */}
            <div className="flex justify-between items-center mb-6">

                <div className="h-11 p-2 ">
                    <h2 className="text-2xl bg-red-300 font-bold">
                        {activeProjectName}
                    </h2>
                    <p className="text-slate-400 text-sm">
                        Monitoring dashboard
                    </p>
                </div>

                <div className="text-green-400 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Live
                </div>

            </div>


            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search websites..."
                className="w-full mb-6 bg-[#111827] border border-slate-800 rounded-xl px-4 py-3"
            />

            {/* STATS */}
            {/* <div className="grid grid-cols-3 gap-4 mb-8">

                <Card label="Total" value={websites.length} />
                <Card label="Online" value={online} color="text-green-400" />
                <Card label="Offline" value={offline} color="text-red-400" />

            </div> */}

            {/* LIST */}
            <div className="space-y-3">

                {websites.map((site) => (
                    <div
                        key={site._id}
                        className="bg-[#111827] border border-slate-800 rounded-2xl p-4 flex justify-between items-center hover:border-orange-500/30 transition"
                    >

                        <div>
                            <div className="font-medium">
                                {site.url}
                            </div>

                            <div className="text-sm text-slate-400">
                                Status:{" "}
                                <span className={
                                    site.status === "online"
                                        ? "text-green-400"
                                        : "text-red-400"
                                }>
                                    {site.status}
                                </span>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="text-white font-semibold">
                                {site.responseTime}ms
                            </div>
                            <div className="text-xs text-slate-400">
                                response
                            </div>
                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}