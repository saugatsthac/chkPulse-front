import logo from '../../assets/logo.png'
import monitor from '../../assets/Curve.svg'
import name from '../../assets/Curve02.svg'
import DashboardIcon from '@mui/icons-material/Dashboard';
import MonitorIcon from '@mui/icons-material/Monitor';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
// import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import QuickActionButton from "../../Components/Buttons/QuickActionButton";
// import SidebarButton from "../../Components/Buttons/SidebarButton";
import SidebarDisclosure from "../../Components/Buttons/SidebarDisclosure";
import ProjectCard from "../../Components/Cards/ProjectCard";
import { useState } from "react";


export default function SidebarLayout({ activeProject, projects, activeProjectData, setActiveProjectData, setShowModal, sidebarSelection,
    setSidebarSelection, setModalType }) {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="min-w-80 max-w-80 border-slate-800/30 text-white/90 h-full flex flex-col gap-4
        bg-[#111217] font-light border-r py-7 pb-0">
            <div className='w-full flex h-auto gap-2 px-4 justify-start'>
                <img src={monitor} alt='monitor' className='w-1/6' />
                <img src={name} alt='name' className='w-1/2' />

            </div>
            <div className="w-full px-3 mt6 flex flex-col gap-1">
                <SidebarDisclosure
                    key={sidebarSelection === "monitors" ? "open" : "closed"}
                    icon={MonitorHeartIcon}
                    title="Monitors"
                    selected={sidebarSelection === "monitors"}
                    onClick={() => setSidebarSelection("monitors")}
                >
                    <QuickActionButton
                        icon={AddIcon}
                        onClick={() => {
                            setShowModal(true);
                            setModalType("createProject");
                        }}
                    >
                        Add Project
                    </QuickActionButton>

                    <QuickActionButton
                        icon={AddIcon}
                        onClick={() => {
                            setShowModal(true);
                            setModalType("addWebsite");
                        }}
                    >
                        Add Website
                    </QuickActionButton>
                </SidebarDisclosure>

                <SidebarDisclosure
                    icon={NotificationsActiveIcon}
                    title="Notifications"
                    onClick={() => setSidebarSelection("notifications")}
                    selected={sidebarSelection === "notifications"} />

                <SidebarDisclosure
                    icon={CreditCardIcon}
                    title="Billing"
                    onClick={() => setSidebarSelection("billing")}
                    selected={sidebarSelection === "billing"} />

                <SidebarDisclosure
                    icon={SettingsIcon}
                    title="Settings"
                    onClick={() => setSidebarSelection("settings")}
                    selected={sidebarSelection === "settings"} />
            </div>

            <div className="h-px bg-white/10 my3" />
            {sidebarSelection === 'monitors' &&
                <div className="w-full grow flex flex-col items-start 
                min-h-0 pl-2 gap-2 border-white/20">

                    <h2 className="text-xs pl-7 text-white/60">PROJECTS</h2>
                    <div className="grow
            flex flex-col pr-2
            w-full scrollbar-thin overflow-y-auto 
            scrollbar-gutter-stable 
            scrollbar-track-transparent
            scrollbar-thumb-slate-800/50 scrollbar-thumb-rounded-lg gap-1
            hover:scrollbar-thumb-slate-800/60">
                        {projects?.map((p) => (
                            <ProjectCard
                                key={p?._id}
                                p={p}
                                setActiveProjectData={setActiveProjectData}
                                isActive={activeProjectData && activeProjectData._id === p._id}
                            />

                        ))}
                    </div >
                </div>
            }



            <div className="border-t border-white/10 py-3 px-4 gap-1 flex flex-col mt-auto">
                <QuickActionButton onClick={() => {
                    setShowModal(true);
                    setModalType("createProject");

                }}>
                    Rajiv
                </QuickActionButton>
                <QuickActionButton onClick={() => {
                    logout()
                }}>
                    Logout
                </QuickActionButton>

            </div>


        </div >)
}
{/* <button className="font-light bg-none
flex w-fit text-lg
transition-all duration-300"
>
    Rajiv
</button> */}
{/* <button className="font-light bg-none
flex w-fit text-lg
transition-all duration-300"
>
    Logout
</button> */}
{/* <div className='flex w-full justify-between items-center'> */ }
{/* </div> */ }
{/* onClick={() => { setActiveProjectData(p) }}
 activeProjectData={activeProjectData} */}
// import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
// import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
// import SettingsIcon from "@mui/icons-material/Settings";
// import logout from "../../utilis/logout"
{/* <button className="
                        rounded-xl px-4 py-2 bg-slate-800 hover:bg-slate-700 flex items-start gap-2 
                        mr-2 text-base
            "
                            onClick={() => {
                                setShowModal(true);
                                setModalType("createProject");

                            }}>
                            <AddIcon />
                            <span className='font-light text-base'>

                                Add project
                            </span>
                        </button> */}
{/* + */ }