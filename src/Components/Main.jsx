import RefreshIcon from '@mui/icons-material/Refresh';

export default function Main({ setShowModal, setModalType, activeProjectData, projectWebsites, sidebarSelection,
    avgResponseTime, totalMonitors, openIncidents
}) {
    function formatTimeAgo(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) return `${seconds}s ago`;
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    }
    const capitalize = (str) =>
        str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
    return (
        <div className="grow h-full flex flex-col items-start justify-start gap-">
            <div className="w-full flex items-end">
                <div className="flex gap-3 text-4xl items-center justify-between py-2 w-full bg-blue-900/10 px-1 borderb border-white/10">
                    <h1 className="tracking-tigh text-3xl font-light">{capitalize(sidebarSelection)}</h1>
                    <div className="flex items-center gap-3">

                        {/* border rounded-2xl 
                        border-white/10" */}
                        {/* border
               border-white/10 */}
                        <span className="text-3xl font-light 
                            px-3 py-1">.{activeProjectData?.name}</span>
                        <button className="text-lg font-light rounded-2xl px-3 py-1
                                        flex items-center gap-1 bg-slate-800/40 hover:bg-slate-800">
                            <RefreshIcon /> refresh</button>
                        {activeProjectData && <button className="font-light bg-none ml-auto mr-6
bg-slate-800/40 hover:bg-slate-800
        rounded-2xl px-3 py-1 
        flex w-fit text-lg 
        transition-all duration-300"
                            onClick={() => {
                                setShowModal(true);
                                setModalType("addWebsite");

                            }}
                        >
                            Add Website
                        </button>}
                    </div>
                </div>

            </div>


            <div className="overflow-y-auto overflow-x-hidden w-full scrollbar-thumb-blue-900/10 scrollbar-gutter-stable">
                <div className="p-4 w-full flex flex-col gap-2">

                    <div className="w-full flex gap-2 font-light">

                        <div className="aspect-square flex-1 border border-white/10 rounded-2xl text-sm flex justify-center items-start bg-blue-900/10">OVERALL UPTIME</div>
                        <div className="aspect-square flex-1 flex-col border border-white/10 rounded-2xl text-sm flex justify-center items-center bg-blue-900/10">
                            <span>
                                MONITORS
                            </span>
                            <span className='text-2xl'>
                                {totalMonitors}
                            </span>
                        </div>
                        <div className="aspect-square flex-1 border border-white/10 rounded-2xl text-sm flex justify-center items-center bg-blue-900/10
                        flex-col">
                            <span className=''>
                                AVG RESPONSE
                            </span>
                            <span className='text-2xl'>
                                {Math.round(avgResponseTime)} ms
                            </span>
                            <span>
                                Across active monitors
                            </span>
                        </div>
                        <div className="aspect-square flex-1 border border-white/10 rounded-2xl text-sm flex justify-center items-center bg-blue-900/10
                        flex-col">
                            <span>
                                OPEN INCIDENTS
                            </span>
                            <span className='text-2xl'>
                                {openIncidents}
                            </span>
                        </div>
                    </div>


                    <h2>MONITORS</h2>
                    <div className="border border-white/10 rounded-lg min-h-[50vh] w-full font-light bg-blue-900/10">

                        {/* border-b border-white/10 */}
                        <div className="w-full flex justify-between border-b border-white/10
                         bg-blue-900/20">
                            <span className="min-w-1/5 text-center">MONITOR STATUS</span>
                            <span className="min-w-1/5 text-center">UPTIME (30 DAYS)</span>
                            <span className="min-w-1/5 text-center">RESPONSE</span>
                            <span className="min-w-1/5 text-center">LAST 14 CHECKS</span>
                            <span className="min-w-1/5 text-center">CHECKED</span>
                        </div>
                        {projectWebsites.map((w) => (
                            <div className="w-full flex 
                    cursor-pointer 
                    transition-all duration-100"
                                key={w._id}>

                                <div className="min-w-1/5 text-center">{w.url}
                                </div>
                                <div className="min-w-1/5 text-center">
                                </div>
                                <div className="min-w-1/5 text-center">{w.responseTime} ms
                                </div>
                                <div className="min-w-1/5 text-center">
                                </div>
                                <div className="min-w-1/5 text-center"> {formatTimeAgo(w.lastCheckedAt)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="w-full flex gap-2">
                        <div className="w-1/2 min-h-[20vh] border border-white/10 rounded-lg flex flex-col p-3">
                            <h3>Recent Incidents</h3></div>
                        <div className="w-1/2 min-h-[20vh] border border-white/10 rounded-lg p-3">Notifications</div>
                    </div>
                </div>
            </div>
        </div >)
}
{/* <div className="flex items-baseline gap-8">
    <div className="flex">
        <span className="font-bold">pulse</span>
        <span className="tracking-tight">watch</span>
    </div>
</div> */}
{/* <div className="flex w-full items-end border border-white/30">

</div> */}
{/* Create New  */ }
{/* {console.log('projectWebsites', projectWebsites)} */ }
{/* border border-white/20 rounded-tr-xl rounded-bl-xl */ }
{/* p-4  */ }
{/* <div className="w-full grow flex flex-col justify-start gap-2
overflow-y-auto scrollbar-gutter-stable scrollbar-track-transparent scrollbar-thumb-300
pr-2"> */}
{/* p-4  */ }
{/* border  */ }
{/* rounded-tr-xl rounded-bl-xl border-white/10 hover:border-white/50  */ }
{/* <div className="min-w-1/5 text-center">
</div> */}

{/* {console.log('hey', w)} */ }
{/* <span className=''>
                </span> */}
{/* <span className="w-full text-right">{w.lastCheckedAt}</span> */ }
{/* <div className="flex flex-col text-white/80">
<div className="flex justify-between items-center">
    <span className='text-xl'>{w.url}</span>
    {w.status === 'UP'
        ? (<div className="text-green-400 text-sm flex items-center gap-2">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        Live
        </div>
        ) : w.status === 'DOWN'
        ? (<div className="text-red-900 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />

                DOWN
            </div>
            ) : (<span>

                UNKNOWN
            </span>)}

</div>
<span className="mb-2">
    {w.responseTime}ms
</span>
<span>{w.errorCode}</span>
<span>{w.errorMessage}</span>
<span className="w-full text-right text-sm">Last checked: {formatTimeAgo(w.lastCheckedAt)}
</span>
</div> */}
{/* </div> */ }
{/* <div className="w-full min-h-1/2 border cursor-pointer rounded-tr-xl rounded-bl-xl opacity-30">
</div>
</div>
<div className="w-full min-h-1/2 border cursor-pointer rounded-tr-xl rounded-bl-xl opacity-30">
</div>
<div className="w-full min-h-1/2 border cursor-pointer rounded-tr-xl rounded-bl-xl opacity-30">
</div> */}
{/* <div className="text-center">
    <h1 className="text-4xl font-bold text-white mb-4">Welcome to PulseWatch</h1>
    <p className="text-lg text-slate-400">Select a project to get started or create a new one.</p>
</div> */}
{/* <div className="w-full flex items-center justify-between pt-3 pl-2 pr-4">
                <button className>Add Website</button>
            </div> */}