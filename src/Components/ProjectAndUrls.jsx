import logo from '../assets/logo.png'
import monitor from '../assets/Curve.svg'
import name from '../assets/Curve02.svg'
import DashboardIcon from '@mui/icons-material/Dashboard';
import MonitorIcon from '@mui/icons-material/Monitor';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import SettingsIcon from '@mui/icons-material/Settings';

export default function ProjectAndUrls({ activeProject, projects, activeProjectData, setActiveProjectData, setShowModal, sidebarSelection,
    setSidebarSelection, setModalType }) {
    console.log('here', projects)
    return (
        <div className="w-80 border-slate-800 pr-0 text-white/90 h-full flex flex-col gap-2 bg-blue-900/10 font-light">
            {/* <img src='/assets/ChatGPT Image Jun 11, 2026, 08_23_03 PM.png' /> */}
            <div className="flex flex-col items-start w-full p-4 pr-2.5 pb-0">
                <div className='w-full flex h-auto gap-2 py-4 pl-3 justify-start'>
                    {/* <img src={logo} alt='logo' /> */}
                    <img src={monitor} alt='monitor' className='w-1/6' />
                    <img src={name} alt='name' className='w-1/2' />

                </div>
                <button className={`flex gap-2 w-full p-3 transition-all duration-500
                ${sidebarSelection === 'dashboard' ? 'bg-orange-900/30 rounded-lg' : ''}`}
                    onClick={() => {
                        setSidebarSelection('dashboard')
                    }}>
                    <DashboardIcon />
                    <span>

                        Dashboard
                    </span>
                </button>
                <button className={`flex gap-2 w-full p-3 transition-all duration-500
                ${sidebarSelection === 'monitors' ? 'bg-orange-900/30 rounded-lg' : ''}`}
                    onClick={() => {
                        setSidebarSelection('monitors')
                    }}>
                    <MonitorIcon />
                    <span>
                        Monitors
                    </span>
                </button>
                <button className={`flex gap-2 w-full p-3 transition-all duration-500
                ${sidebarSelection === 'incidents' ? 'bg-orange-900/30 rounded-lg' : ''}`}
                    onClick={() => {
                        setSidebarSelection('incidents')
                    }}>
                    <NotificationsNoneIcon />
                    <span>
                        Incidents
                    </span>
                </button>
                <button className={`flex gap-2 w-full p-3 transition-all duration-500
                ${sidebarSelection === 'statusPages' ? 'bg-orange-900/30 rounded-lg' : ''}`}
                    onClick={() => {
                        setSidebarSelection('statusPages')
                    }}>
                    <MonitorHeartIcon />
                    <span>
                        Status Pages

                    </span>
                </button>

            </div>

            {/* rounded-tl-xl 
                    rounded-br-xl  */}
            <div className="w-full grow flex flex-col items-start text-lg pr-0 pb-0 min-h-0 p-4">

                {/* <div className='flex flex-col w-full'> */}
                <h2 className="text-xs mb-1 pl-3">PROJECTS</h2>
                <div className="
            flex flex-col
            w-full scrollbar-thin overflow-y-auto 
            [scrollbar-gutter:stable] 
            scrollbar-track-transparent
            scrollbar-thumb-slate-800/50 scrollbar-thumb-rounded-lg gap-1
            hover:scrollbar-thumb-slate-800/60">
                    {console.log('print', projects)}
                    {projects?.map((p) => (
                        <div
                            key={p._id}
                            onClick={() => { setActiveProjectData(p) }}
                            className={`flex gap1 w-full p-3 transition-all duration-300 flex-col cursor-pointer rounded-lg
                ${activeProjectData._id === p._id ? 'bg-white/20' : 'hover:bg-white/20'}`}
                        >
                            {/* {`flex flex-col
                            cursor-pointer transition
                           `}
                        > */}
                            {/* <span>{p.color}</span> */}
                            <span className="text-lg flex items-center gap-2">
                                <span
                                    className="w-2.5 h-2.5 rounded-full inline-block"
                                    style={{ backgroundColor: p.color }}
                                />
                                <span>
                                    {p.name}
                                </span>
                            </span>
                            <span className="text-sm text-white/80 w-full text-right">
                                {p.description}
                            </span>
                        </div>
                    ))}
                </div>
                <button className="font-light bg-none
            flex w-fit text-lg p-4 
            transition-all duration-300"
                    onClick={() => {
                        setShowModal(true);
                        setModalType("createProject");

                    }}>
                    Create Project
                </button>
                {/* </div> */}
            </div >
            <div className="border-t border-white/10 p-4 mt-auto">
                <button className="font-light bg-none
            flex text-lg mt-auto gap-2
            transition-all duration-300"
                    onClick={() => {
                        setShowModal(true);
                        setModalType("createProject");

                    }}>
                    <SettingsIcon />
                    <span>

                        Settings
                    </span>
                </button>
                <button className="font-light bg-none
            flex w-fit text-lg
            transition-all duration-300"
                    onClick={() => {
                        setShowModal(true);
                        setModalType("createProject");

                    }}>
                    Rajiv
                </button>

            </div>


        </div >)
}
{/* <div className="w-full flex flex-col pt-3 pl-2 justify-center">
    <div>
        <span className="text-3xl font-bold">pulse</span>
        <span className="text-3xl">watch</span>
    </div>
</div> */}
{/* Create New  */ }
{/* <div className="border rounded-2xl min-h-12 w-full">

</div> */}
{/* ${activeProjectData && activeProjectData._id === p._id
                ? "bg-slate-800"
                : "bg-slate-800/40 hover:bg-slate-800"
            } */}
// <div className="mt-6 text-xs text-slate-500">
//     v1.0 • Real-time monitoring
// </div>