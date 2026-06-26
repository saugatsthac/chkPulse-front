import logo from '../../assets/logo.png'
import monitor from '../../assets/Curve.svg'
import name from '../../assets/Curve02.svg'
import DashboardIcon from '@mui/icons-material/Dashboard';
import MonitorIcon from '@mui/icons-material/Monitor';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
// import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
// import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CreditCardIcon from "@mui/icons-material/CreditCard";
// import SettingsIcon from "@mui/icons-material/Settings";

export default function SidebarLayout({ activeProject, projects, activeProjectData, setActiveProjectData, setShowModal, sidebarSelection,
    setSidebarSelection, setModalType }) {
    return (
        <div className="min-w-80 max-w-80 border-slate-800/30 text-white/90 h-full flex flex-col gap-7
        bg-[#111217] font-light border-r py-7 pb-0">
            <div className='w-full flex h-auto gap-2 px-4 justify-start'>
                <img src={monitor} alt='monitor' className='w-1/6' />
                <img src={name} alt='name' className='w-1/2' />

            </div>
            <div className="w-full px-3 mt-6 flex flex-col gap-2">

                {/* Monitors */}
                <button
                    onClick={() => setSidebarSelection("monitors")}
                    className={`
            w-full flex items-center gap-3 rounded-xl px-4 py-3
            transition-all duration-200 cursor-pointer
            ${sidebarSelection === "monitors"
                            ? "bg-blue-500/15 text-blue-400 border border-blue-500/20 shadow-sm"
                            : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"}
        `}
                >
                    <MonitorHeartIcon fontSize="small" />
                    <span>Monitors</span>
                </button>

                {/* Notifications */}
                <button
                    onClick={() => setSidebarSelection("notifications")}
                    className={`
            w-full flex items-center gap-3 rounded-xl px-4 py-3
            transition-all duration-200 cursor-pointer
            ${sidebarSelection === "notifications"
                            ? "bg-blue-500/15 text-blue-400 border border-blue-500/20 shadow-sm"
                            : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"}
        `}
                >
                    <NotificationsActiveIcon fontSize="small" />
                    <span>Notifications</span>
                </button>

                {/* Billing */}
                <button
                    onClick={() => setSidebarSelection("billing")}
                    className={`
            w-full flex items-center gap-3 rounded-xl px-4 py-3
            transition-all duration-200 cursor-pointer
            ${sidebarSelection === "billing"
                            ? "bg-blue-500/15 text-blue-400 border border-blue-500/20 shadow-sm"
                            : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"}
        `}
                >
                    <CreditCardIcon fontSize="small" />
                    <span>Billing</span>
                </button>

                <div className="h-px bg-white/10 my-3" />

                {/* Settings */}
                <button
                    onClick={() => {
                        setSidebarSelection("settings");
                    }}
                    className={`
            w-full flex items-center gap-3 rounded-xl px-4 py-3
            transition-all duration-200 cursor-pointer
            ${sidebarSelection === "settings"
                            ? "bg-blue-500/15 text-blue-400 border border-blue-500/20 shadow-sm"
                            : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"}
        `}
                >
                    <SettingsIcon fontSize="small" />
                    <span>Settings</span>
                </button>
            </div>
            {/* <div className='w-full px-4 flex flex-col justify-start'>
                <button className='cursor-pointer w-fit'
                    onClick={() => setSidebarSelection('monitors')}>Monitors</button>
                <button className=' w-fit'
                    onClick={() => setSidebarSelection('notifications')}>Notifications</button>
                <button className='w-fit'
                    onClick={() => setSidebarSelection('billing')}>Billing</button>
                <button className="font-light bg-none
            flex text- mt-auto gap-2 items-center
            transition-all duration-300"
                    onClick={() => {
                        setShowModal(true);
                        setModalType("createProject");

                    }}>
                    <SettingsIcon fontSize='small' />
                    <span>

                        Settings
                    </span>
                </button>
            </div> */}
            {sidebarSelection === 'monitors' &&
                <div className="w-full grow flex flex-col items-start 
            min-h-0 pl-2 gap-1">
                    <div className='flex w-full justify-between items-baseline'>

                        <h2 className="text-xs pl-1">PROJECTS</h2>
                        <button className="font-light bg-none ml-auto cursor-pointer py-2 rounded-lg
            flex w-fit px-4 hover:bg-white/10
            transition-all duration-300 mr-5"
                            onClick={() => {
                                setShowModal(true);
                                setModalType("createProject");

                            }}>
                            + New Project
                        </button>
                    </div>
                    <div className="grow
            flex flex-col pr-2
            w-full scrollbar-thin overflow-y-auto 
            scrollbar-gutter-stable 
            scrollbar-track-transparent
            scrollbar-thumb-slate-800/50 scrollbar-thumb-rounded-lg gap-1
            hover:scrollbar-thumb-slate-800/60">
                        {projects?.map((p) => (
                            <div
                                key={p?._id}
                                onClick={() => { setActiveProjectData(p) }}
                                className={`flex gap1 w-full px-3 py-2 transition-all duration-300 flex-col cursor-pointer rounded-lg
                                ${activeProjectData._id === p._id ? 'bg-white/10' : 'hover:bg-white/20'}`}
                            >
                                <span className="flex items-center gap-2">
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
                    </div >
                </div>}



            <div className="border-t border-white/10 py-3 px-4 gap-1 flex flex-col mt-auto">

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