import logo from '../assets/logo.png'
import monitor from '../assets/Curve.svg'
import name from '../assets/Curve02.svg'
import DashboardIcon from '@mui/icons-material/Dashboard';
import MonitorIcon from '@mui/icons-material/Monitor';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import SettingsIcon from '@mui/icons-material/Settings';

export default function ProjectAndUrls({ activeProject, projects, activeProjectData, setActiveProjectData, setShowModal,
    setSidebarSelection, setModalType }) {
    console.log('here', projects)
    return (
        <div className="w-80 border-slate-800 pr-0 text-white/90 h-full flex flex-col gap-2 bg-blue-900/10 font-light">
            {/* <img src='/assets/ChatGPT Image Jun 11, 2026, 08_23_03 PM.png' /> */}
            <div className="w-full flex flex-col items-start text-lg p-4 gap-3">
                <div className="flex flex-col items-start w-full">
                    <div className='w-full flex h-auto gap-2 py-8 pt-4 p-4 justify-center'>
                        {/* <img src={logo} alt='logo' /> */}
                        <img src={monitor} alt='monitor' className='w-1/5' />
                        <img src={name} alt='name' className='w-1/2' />

                    </div>
                    <button className='flex gap-2'
                        onClick={() => {
                            setSidebarSelection('dashboard')
                        }}>
                        <DashboardIcon />
                        <span>

                            Dashboard
                        </span>
                    </button>
                    <button className='flex gap-2'
                        onClick={() => {
                            setSidebarSelection('monitors')
                        }}>
                        <MonitorIcon />
                        <span>
                            Monitors
                        </span>
                    </button>
                    <button className='flex gap-2'>
                        <NotificationsNoneIcon />
                        <span>
                            Incidents
                        </span>
                    </button>
                    <button className='flex gap-2'>
                        <MonitorHeartIcon />
                        <span>
                            Status Pages

                        </span>
                    </button>

                </div>


                <div className='flex flex-col'>
                    <h2 className="text-xs mb-1">PROJECTS</h2>
                    <div className="
            flex flex-col 
            rounded-tl-xl rounded-br-xl 
            w-full scrollbar-thin overflow-y-auto 
            pr-2.5
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
                            cursor-pointer transition
                            `}
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
                    <button className="font-light bg-none
            flex w-fit text-lg 
            transition-all duration-300"
                        onClick={() => {
                            setShowModal(true);
                            setModalType("createProject");

                        }}>
                        Create Project
                    </button>
                </div>
            </div>
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