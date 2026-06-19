export default function Main({ setShowModal, setModalType, activeProjectData, projectWebsites }) {
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
    return (
        <div className="grow h-full flex flex-col items-start justify-start gap-3 py-4 pr-4">
            <div className="w-full flex items-end">
                <div className="flex gap-3 text-4xl items-center justify-between w-full">

                    <div className="flex items-baseline gap-8">
                        <div className="flex">
                            <span className="font-bold">pulse</span>
                            <span className="tracking-tight">watch</span>
                        </div>
                        <span className="text-3xl font-light">
                            .{activeProjectData?.name}
                        </span>
                    </div>

                    {activeProjectData && <button className=" mt-1 font-light bg-none ml-auto mr-6
        bg-slate-800/40 hover:bg-slate-800 
        rounded-2xl px-7 py-3 ml-aut 
        flex justify-en w-fit text-lg 
        transition-all duration-300"
                        onClick={() => {
                            setShowModal(true);
                            setModalType("addWebsite");

                        }}
                    >
                        Add Website
                    </button>}
                </div>
                <button className="mt1 ml-auto font-light bg-none 
            bg-slate-800/40 hover:bg-slate-800 
            rounded-2xl px-7 py-3 
            flex w-fit text-lg 
            transition-all duration-300"
                    onClick={() => {
                        setShowModal(true);
                        setModalType("createProject");

                    }}>
                    Create Project
                </button>
            </div>
            {/* <div className="flex w-full items-end border border-white/30">

            </div> */}
            {/* Create New  */}
            {/* {console.log('projectWebsites', projectWebsites)} */}
            {/* border border-white/20 rounded-tr-xl rounded-bl-xl */}
            {/* p-4  */}
            <div className="w-full grow flex flex-col justify-start gap-2
            overflow-y-auto scrollbar-gutter-stable scrollbar-track-transparent scrollbar-thumb-300
            pr-2">
                {projectWebsites.map((w) => (
                    <div className="w-full 
                    p-4 border cursor-pointer rounded-tr-xl rounded-bl-xl border-white/10 hover:border-white/50 
                    transition-all duration-100"
                        key={w._id}>

                        <div className="flex flex-col text-white/80">
                            {/* {console.log('hey', w)} */}
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
                                            {/* <span className=''>
                                                </span> */}
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
                            {/* <span className="w-full text-right">{w.lastCheckedAt}</span> */}
                            <span className="w-full text-right text-sm">Last checked: {formatTimeAgo(w.lastCheckedAt)}
                            </span>
                        </div>
                    </div>
                ))}
                {/* <div className="w-full min-h-1/2 border cursor-pointer rounded-tr-xl rounded-bl-xl opacity-30">
                </div>
                </div>
                <div className="w-full min-h-1/2 border cursor-pointer rounded-tr-xl rounded-bl-xl opacity-30">
                </div>
                <div className="w-full min-h-1/2 border cursor-pointer rounded-tr-xl rounded-bl-xl opacity-30">
                </div> */}
            </div>
        </div >)
}
{/* <div className="text-center">
    <h1 className="text-4xl font-bold text-white mb-4">Welcome to PulseWatch</h1>
    <p className="text-lg text-slate-400">Select a project to get started or create a new one.</p>
</div> */}
{/* <div className="w-full flex items-center justify-between pt-3 pl-2 pr-4">
                <button className>Add Website</button>
            </div> */}