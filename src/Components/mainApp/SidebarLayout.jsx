import logo from '../../assets/logo.png'
import monitor from '../../assets/Curve.svg'
import name from '../../assets/Curve02.svg'
import DashboardIcon from '@mui/icons-material/Dashboard';
import MonitorIcon from '@mui/icons-material/Monitor';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsIcon from '@mui/icons-material/Settings';

export default function SidebarLayout({ activeProject, projects, activeProjectData, setActiveProjectData, setShowModal, sidebarSelection,
    setSidebarSelection, setModalType }) {
    console.log('here', projects)
    return (
        <div className="w-70 max-w-70 border-slate-800/30 text-white/90 h-full flex flex-col gap-7
        bg-[#111217] font-light border-r py-7 pb-0">
            <div className='w-full flex h-auto gap-2 px-4 justify-start'>
                <img src={monitor} alt='monitor' className='w-1/6' />
                <img src={name} alt='name' className='w-1/2' />

            </div>
            {/* text-lg  */}
            <div className="flex flex-col items-start w-full px-2">

                <button className={`flex gap-2 w-full px-2 py-2 transition-all duration-500
                ${sidebarSelection === 'monitors' ? 'bg-orange-900/30 rounded-lg' : ''}`}
                    onClick={() => {
                        setSidebarSelection('monitors')
                    }}>
                    <MonitorIcon fontSize='small' />
                    <span>
                        Monitors
                    </span>
                </button>

                {/* <button className={`flex gap-2 w-full px-3 py-2 pr-5 transition-all duration-500`}
                    onClick={() => {
                        setShowModal(true);
                        setModalType("addWebsite");

                    }}
                >
                    <AddBoxIcon />
                    Add Website
                </button> */}
                <button className={`flex gap-2 w-full px-2 py-2 pr-5 transition-all duration-500 mt-2
                ${sidebarSelection === 'incidents' ? 'bg-orange-900/30 rounded-lg' : ''}`}
                    onClick={() => {
                        setSidebarSelection('incidents')
                    }}>
                    <NotificationsNoneIcon fontSize='small' />
                    <span>
                        Incidents
                    </span>
                </button>
                {/* <button className={`flex gap-2 w-full px-3 py-2 pr-5 transition-all duration-500
                ${sidebarSelection === 'statusPages' ? 'bg-orange-900/30 rounded-lg' : ''}`}
                    onClick={() => {
                        setSidebarSelection('statusPages')
                    }}>
                    <MonitorHeartIcon />
                    <span>
                        Status Pages

                    </span>
                </button> */}

            </div>

            <div className="w-full grow flex flex-col items-start 
            min-h-0 pl-2 gap-1">
                <div className='flex w-full justify-between items-center'>

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
                    {console.log('print', projects)}
                    {projects?.map((p) => (
                        <div
                            key={p._id}
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
                </div>
                {/* </div> */}
            </div >
            {/* text-base */}



            <div className="border-t border-white/10 py-3 px-4 gap-1 flex flex-col mt-auto">
                <button className="font-light bg-none
            flex text-lg mt-auto gap-2 items-center
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
{/* <img src='/assets/ChatGPT Image Jun 11, 2026, 08_23_03 PM.png' /> */ }
{/* <img src={logo} alt='logo' /> */ }
{/* <button className={`flex gap-2 w-full p-3 transition-all duration-500
    ${sidebarSelection === 'dashboard' ? 'bg-orange-900/30 rounded-lg' : ''}`}
        onClick={() => {
            setSidebarSelection('dashboard')
        }}>
        <DashboardIcon />
        <span>

            Dashboard
        </span>
    </button> */}
{/* {activeProjectData &&  */ }
{/* <button className="font-light bg-none ml-auto mr-6
bg-slate-800/40 hover:bg-slate-800
rounded-2xl px-3 py-1 
flex w-fit text-lg 
transition-all duration-300" */}
{/* } */ }
{/* rounded-tl-xl 
rounded-br-xl  */}
{/* <div className='flex flex-col w-full'> */ }
{/* {`flex flex-col
cursor-pointer transition
`}
> */}
{/* <span>{p.color}</span> */ }
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