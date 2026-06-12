export default function ProjectAndUrls({ activeProject, projects, activeProjectData, setActiveProjectData, setShowModal, setModalType }) {
    console.log('here', projects)
    return (
        <div className="w-98 border-slate-800 p-4 pr-0 text-white/90 h-full flex flex-col gap-2">
            {/* <div className="w-full flex flex-col pt-3 pl-2 justify-center">
                <div>
                    <span className="text-3xl font-bold">pulse</span>
                    <span className="text-3xl">watch</span>
                </div>
            </div> */}
            {/* Create New  */}
            {/* <div className="border rounded-2xl min-h-12 w-full">

            </div> */}

            <div className="mt2 ml-auto
            border border-white/10 
            flex flex-col 
            rounded-tl-xl rounded-br-xl 
            p-2 grow w-full scrollbar-thin overflow-y-auto 
            gap-2 pr-2.5
            [scrollbar-gutter:stable] 
            scrollbar-track-transparent
            scrollbar-thumb-slate-800/50 scrollbar-thumb-rounded-lg
            hover:scrollbar-thumb-slate-800/60">

                {console.log('print', projects)}
                {projects?.map((p) => (
                    <div
                        key={p._id}
                        onClick={() => { setActiveProjectData(p) }}
                        className={`flex flex-col
                            px-3 py-4 rounded-xl cursor-pointer transition min-h-[12vh]
                            ${activeProjectData && activeProjectData._id === p._id
                                ? "bg-slate-800"
                                : "bg-slate-800/40 hover:bg-slate-800"
                            }`}
                    >
                        <span className="text-lg">
                            {p.name}
                        </span>
                        <span className="text-sm text-white/80 w-full text-right">
                            {p.description}
                        </span>
                    </div>
                ))}
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



        </div>)
}
// <div className="mt-6 text-xs text-slate-500">
//     v1.0 • Real-time monitoring
// </div>