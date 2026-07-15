import monitor from "../../assets/Curve.svg";
import name from "../../assets/Curve02.svg";

import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

import QuickActionButton from "../../Components/Buttons/QuickActionButton";
import SidebarDisclosure from "../../Components/Buttons/SidebarDisclosure";
import ProjectCard from "../../Components/Cards/ProjectCard";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import DropdownItem from "../../Components/Buttons/DropdownItem";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";

export default function SidebarLayout({
  activeProject,
  projects,
  activeProjectData,
  setActiveProjectData,
  setShowModal,
  sidebarSelection,
  setSidebarSelection,
  setModalType,
}) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const [expand, setExpand] = useState(false);

  return (
    <div
      className="min-w-80 max-w-80 h-full flex flex-col gap-4
            bg-[#111217] border-r border-slate-800/30
            text-white/90 font-light py-7 pb-0"
    >
      {/* Logo */}
      <div className="w-full flex gap-2 px-4">
        <img src={monitor} alt="monitor" className="w-1/6" />
        <img src={name} alt="name" className="w-1/2" />
      </div>

      {/* Navigation */}
      <div className="w-full px-3 mt-6 flex flex-col gap-1 pr-4.5">
        <SidebarDisclosure
          icon={MonitorHeartIcon}
          title="Monitors"
          selected={sidebarSelection === "monitors"}
          expand={expand}
          setExpand={setExpand}
          onClick={() => {
            setSidebarSelection("monitors");
          }}
        >
          <QuickActionButton>All monitors</QuickActionButton>
          <QuickActionButton>Incidents</QuickActionButton>
          <QuickActionButton>Uptime history</QuickActionButton>
          <QuickActionButton>Status pages</QuickActionButton>
        </SidebarDisclosure>

        <SidebarDisclosure
          icon={NotificationsActiveIcon}
          title="Notifications"
          selected={sidebarSelection === "notifications"}
          onClick={() => setSidebarSelection("notifications")}
        />
      </div>

      {/* Divider */}
      <motion.div layout="position" className="h-px bg-white/10" />

      {/* Projects */}
      <AnimatePresence mode="wait">
        {projects.length > 0 && sidebarSelection === "monitors" && (
          <motion.div
            key="projects"
            layout="position"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="w-full grow flex flex-col items-start min-h-0 pl-2 gap-2"
          >
            <h2 className="text-xs pl-5 text-white/60">PROJECTS</h2>

            <div
              className="
                            grow
                            w-full
                            pl-1
                            pr-2
                            flex flex-col
                            overflow-y-auto
                            scrollbar-thin
                            scrollbar-gutter-stable
                            scrollbar-track-transparent
                            scrollbar-thumb-slate-800/50
                            hover:scrollbar-thumb-slate-800/60
                            gap-1"
            >
              {projects?.map((p) => (
                <ProjectCard
                  key={p._id}
                  p={p}
                  isActive={activeProjectData?._id === p._id}
                  setActiveProjectData={setActiveProjectData}
                  length={projects[activeProjectData?._id]?.length()}
                  setShowModal={setShowModal}
                  setModalType={setModalType}
                />
              ))}
              {/* {console.log(
                "carrot",
                projects[activeProjectData?._id]?.length(),
              )} */}
              {projects.length < 5 && (
                <QuickActionButton
                  icon={AddIcon}
                  onClick={() => {
                    setShowModal(true);
                    setModalType("addProjectAndWebsite");
                  }}
                >
                  Add Project
                </QuickActionButton>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* flex flex-col gap-1 */}
      {/* Footer */}
      <motion.div
        layout="position"
        className="relative border-t border-white/10 py-2 px-2 mt-auto"
      >
        <Menu>
          <MenuButton className="relative text-left p-3">Rajiv</MenuButton>
          <MenuItems
            anchor="bottom start"
            className="w-44 origin-top-right rounded-xl border border-white/10 bg-[#0f1117] shadow-[0_10px_30px_rgba(0,0,0,0.45)]
                backdrop-blur-xl p-1 focus:outline-none z-50"
          >
            <DropdownItem
              icon={CreditCardIcon}
              title=""
              selected={sidebarSelection === "billing"}
              onClick={() => setSidebarSelection("billing")}
            >
              {" "}
              Billing
            </DropdownItem>

            <DropdownItem
              icon={SettingsIcon}
              title=""
              selected={sidebarSelection === "settings"}
              onClick={() => setSidebarSelection("settings")}
            >
              Settings
            </DropdownItem>
            <DropdownItem
              icon={LogoutIcon}
              onClick={() => {
                logout();
              }}
            >
              Logout
            </DropdownItem>
          </MenuItems>
        </Menu>
      </motion.div>
    </div>
  );
}

{
  /* <QuickActionButton
    onClick={() => {
        setShowModal(true);
        setModalType("createProject");
    }}
> */
}

{
  /* </QuickActionButton> */
}

{
  /* <QuickActionButton onClick={logout}>
        Logout
    </QuickActionButton> */
}
// */
// import logo from '../../assets/logo.png'
// import monitor from '../../assets/Curve.svg'
// import name from '../../assets/Curve02.svg'
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import MonitorIcon from '@mui/icons-material/Monitor';
// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
// // import AddBoxIcon from '@mui/icons-material/AddBox';
// import SettingsIcon from '@mui/icons-material/Settings';
// import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import AddIcon from '@mui/icons-material/Add';
// import {useNavigate} from "react-router-dom";
// import QuickActionButton from "../../Components/Buttons/QuickActionButton";
// // import SidebarButton from "../../Components/Buttons/SidebarButton";
// import SidebarDisclosure from "../../Components/Buttons/SidebarDisclosure";
// import ProjectCard from "../../Components/Cards/ProjectCard";
// import {useState} from "react";
// import {motion} from "motion/react";

// export default function SidebarLayout({activeProject, projects, activeProjectData, setActiveProjectData, setShowModal, sidebarSelection,
//     setSidebarSelection, setModalType }) {
//     const navigate = useNavigate();

//     const logout = () => {
//         localStorage.removeItem("token");
//         navigate("/");
//     };

//     return (
//         <div layout className="min-w-80 max-w-80 border-slate-800/30 text-white/90 h-full flex flex-col gap-4
//         bg-[#111217] font-light border-r py-7 pb-0">
//             <div className='w-full flex h-auto gap-2 px-4 justify-start'>
//                 <img src={monitor} alt='monitor' className='w-1/6' />
//                 <img src={name} alt='name' className='w-1/2' />

//             </div>
//             <div layout className="w-full px-3 mt6 flex flex-col gap-1">
//                 <SidebarDisclosure
//                     key={sidebarSelection === "monitors" ? "open" : "closed"}
//                     icon={MonitorHeartIcon}
//                     title="Monitors"
//                     selected={sidebarSelection === "monitors"}
//                     onClick={() => setSidebarSelection("monitors")}
//                 >
//                     <QuickActionButton
//                         icon={AddIcon}
//                         onClick={() => {
//                             setShowModal(true);
//                             setModalType("createProject");
//                         }}
//                     >
//                         Add Project
//                     </QuickActionButton>

//                     <QuickActionButton
//                         icon={AddIcon}
//                         onClick={() => {
//                             setShowModal(true);
//                             setModalType("addWebsite");
//                         }}
//                     >
//                         Add Website
//                     </QuickActionButton>
//                 </SidebarDisclosure>

//                 <SidebarDisclosure
//                     icon={NotificationsActiveIcon}
//                     title="Notifications"
//                     onClick={() => setSidebarSelection("notifications")}
//                     selected={sidebarSelection === "notifications"} />

//                 <SidebarDisclosure
//                     icon={CreditCardIcon}
//                     title="Billing"
//                     onClick={() => setSidebarSelection("billing")}
//                     selected={sidebarSelection === "billing"} />

//                 <SidebarDisclosure
//                     icon={SettingsIcon}
//                     title="Settings"
//                     onClick={() => setSidebarSelection("settings")}
//                     selected={sidebarSelection === "settings"} />
//             </div>

//             <motion.div layout className="h-px bg-white/10 my3" />
//             {sidebarSelection === 'monitors' &&
//                 <motion.div layout className="w-full grow flex flex-col items-start
//                 min-h-0 pl-2 gap-2 border-white/20">

//                     <h2 className="text-xs pl-7 text-white/60">PROJECTS</h2>
//                     <div className="grow
//             flex flex-col pr-2
//             w-full scrollbar-thin overflow-y-auto
//             scrollbar-gutter-stable
//             scrollbar-track-transparent
//             scrollbar-thumb-slate-800/50 scrollbar-thumb-rounded-lg gap-1
//             hover:scrollbar-thumb-slate-800/60">
//                         {projects?.map((p) => (
//                             <ProjectCard
//                                 key={p?._id}
//                                 p={p}
//                                 setActiveProjectData={setActiveProjectData}
//                                 isActive={activeProjectData && activeProjectData._id === p._id}
//                             />

//                         ))}
//                     </div >
//                 </motion.div>
//             }

//             <motion.div layout className="border-t border-white/10 py-3 px-4 gap-1 flex flex-col mt-auto">
//                 <QuickActionButton onClick={() => {
//                     setShowModal(true);
//                     setModalType("createProject");

//                 }}>
//                     Rajiv
//                 </QuickActionButton>
//                 <QuickActionButton onClick={() => {
//                     logout()
//                 }}>
//                     Logout
//                 </QuickActionButton>

//             </motion.div>

//         </div >)
// }
{
  /* <button className="font-light bg-none
flex w-fit text-lg
transition-all duration-300"
>
    Rajiv
</button> */
}
{
  /* <button className="font-light bg-none
flex w-fit text-lg
transition-all duration-300"
>
    Logout
</button> */
}
{
  /* <div className='flex w-full justify-between items-center'> */
}
{
  /* </div> */
}
{
  /* onClick={() => { setActiveProjectData(p) }}
 activeProjectData={activeProjectData} */
}
// import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
// import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
// import SettingsIcon from "@mui/icons-material/Settings";
// import logout from "../../utilis/logout"
{
  /* <button className="
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
                        </button> */
}
{
  /* + */
}
