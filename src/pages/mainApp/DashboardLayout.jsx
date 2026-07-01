import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import { ProjectHeader } from '../../Components/Dashboard/ProjectHeader';
import StatsCards from '../../Components/Dashboard/StatsCards'
import MonitorRow from '../../Components/Dashboard/MonitorRow';
import { StatusFilterButton } from '../../Components/Buttons/StatusFilterButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import ResponseTimeChart from '../../Components/Dashboard/ResponseTimeChart';
import WeeklyUptimeChart from '../../Components/Dashboard/WeeklyTimeChart';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';


export default function DashboardLayout({ setShowModal, setModalType, activeProjectData, projectWebsites, sidebarSelection,
    avgResponseTime, totalMonitors, openIncidents, setSelectedWebsite
}) {

    const [filterCondition, setFilterCondition] = useState('ALL')
    const filters = [
        { label: "All", value: "ALL" },
        { label: "Operational", value: "Operational" },
        { label: 'Issues', value: "ISSUES" },
        { label: 'Maintenance', value: "MAINTENANCE" }
    ];

    const [showOptions, setShowOptions] = useState(null)

    return (
        <div className="grow h-full min-h-0 flex flex-col items-start justify-start overflow-y-auto overflow-x-hidden 
        scrollbar-gutter-stable
        scrollbar-thumb-blue-900/10 
        scrollbar-thin

        px-6 py-7 gap-7 font-light">
            <div className=" w-full flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-light">
                        Monitors
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage your monitors and configure their settings.
                    </p>
                </div>

            </div>

            <StatsCards
                projectWebsites={projectWebsites}
                avgResponseTime={avgResponseTime}
                totalMonitors={totalMonitors}
                openIncidents={openIncidents}
            />

                                {projectWebsites.length > 0 &&
                <div className='flex gap-6 w-full'>


                        <div className='flex flex-col w-2/3 gap-7'>

                            <div className='bg-[#111217] min-h-70 rounded-2xl border border-white/10 p-6 py-7 text-base flex flex-col gap-7'>
                                <span>
                                    Reponse Time Chart
                                </span>
                                <div className='h-64'>
                                    <ResponseTimeChart />
                                </div>
                            </div>
                            <div className='flex w-full gap-6 items-start'>

                                <div className='flex flex-col w-full justify-start gap-3 bg-[#111217] px-6 py-7 rounded-2xl
                border border-white/10'>
                                    <div className="flex flex-col w-full items-end gap-3">
                                        <div className='flex w-full justify-between items-end'>
                                            <div className='text-base'>Monitors</div>

                                            <div className='flex gap-3 items-center'>

                                                <button className="rounded-xl px-4 py-2 bg-slate-800 hover:bg-slate-700 flex items-center gap-2
                    "
                                                >
                                                    <RefreshIcon />
                                                    <span className='font-ligh text-base'>
                                                        Refresh monitors
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className='flex gap-2 font-light text-base'>

                                            {filters.map(filter => (
                                                <StatusFilterButton
                                                    key={filter.value}
                                                    {...filter}
                                                    active={filterCondition === filter.value}
                                                    onClick={setFilterCondition}
                                                />
                                            ))}
                                        </div>
                                    </div >
                                    <div className='flex flex-col gap-3'>
                                        {projectWebsites.map((w, index) => (
                                            <MonitorRow
                                                key={w._id}
                                                w={w}
                                                setSelectedWebsite={setSelectedWebsite}
                                                setShowModal={setShowModal}
                                                setModalType={setModalType}
                                                showOptions={showOptions}
                                                setShowOptions={setShowOptions} />
                                        ))}
                                    </div>
                                </div >
                            </div >
                        </div>
                    <div className=' grow flex flex-col justify-start items-start gap-8'>
                        {/* <span className='px-6 py-7 text-lg tracking-tight w-full justify-end flex text-right border border-white/10 rounded-2xl bg-[#111217]'>
                            {activeProjectData?.name}<br />
                            have shared among too.<br />
                            have a share button to add usernames here.<br />
                            notification buttons here too.
                        </span> */}



                            <div className='border border-white/10 w-full h-70 rounded-2xl bg-[#111217] p-6 py-7 gap-7 flex flex-col'>
                                <span>
                                    Weekly Uptime Chart
                                </span>
                                <div className='h-full'>
                                    <WeeklyUptimeChart />
                                </div>
                            </div>
                    </div>
                </div> 
                            }
            
            
            </div >)
        }
        {/* <button className="rounded-xl px-4 py-2 bg-slate-800 hover:bg-slate-700 flex items-center gap-2
            "
            onClick={() => {
                setShowModal(true)
                setModalType('addWebsite')
            }}
        >
            <AddIcon />
            <span className='font-light text-'>
                Add Website
            </span>
        </button> */}
    {/* {projectWebsites.length > 0 ?? */}
        {/* {projectWebsites.length > 0 ?? */}
{/* } */}
{/* } */}
        // :
        // <div className="bg-[#111217] border border-white/10 rounded-2xl py-20 flex flex-col items-center w-full">

        //     <MonitorHeartIcon
        //         sx={{ fontSize: 60 }}
        //     />

        //     <div className="mt-5 text-xl">
        //         No websites
        //     </div>

        //     <div className="text-gray-500 mt-2">
        //         Add websites or services to monitor their uptime.
        //     </div>

        //     <button
        //         className="mt-8 bg-slate-800 hover:bg-slate-700 rounded-xl px-5 py-2 flex gap-2 items-center"
        //         >
        //         <AddIcon />
        //         Add Website
        //     </button>

        // </div>
{/* Manage your subscription and compare available plans. */}
{/* View and manage all of your website monitors in one place. */}
{/* {projectWebsites.length > 0 && */}
{/* } */}
// <div>
{/* <NotificationsActiveIcon
        sx={{ fontSize: 60 }}
    /> */}
{/* <button className="rounded-lg px-3 py-1 w-fit flex items-center gap-2
                    bg-slate-800/40 hover:bg-slate-800 cursor-pointer text-sm"
                        >
                            <RefreshIcon />
                            <span className='font-ligh'>
                                Refresh monitors
                            </span>
                            </button> */}
// onClick={() => {
//     setModalType("addNotificationChannel");
//     setShowModal(true);
// }}
{/* </div> */ }
{/* Add an email or Discord webhook to receive alerts. */ }
                        // :
                //         <div className='flex flex-col gap-6 rounded-2xl py-6 px-6 border-white/10 w-2/3 border bg-[#111217]
                // text-bas'>
                //             <span className='tracking-wid text-base'>No monitors to show. Create a project or add a monitor to your project.</span>
                //             <div className='flex gap-3 w-full'>
    
    
                //                 {!activeProjectData && <button className="rounded-xl px-4 py-2 bg-slate-800 hover:bg-slate-700 flex items-start gap-2
                //     "
                //                     onClick={() => {
                //                         setModalType('addWebsite')
                //                         setShowModal(true)
                //                     }}
                //                 >
                //                     <AddIcon />
                //                     <span className='font-ligh text-base'>
                //                         New project
                //                     </span>
                //                 </button>}
    
                //                 <button className="rounded-xl px-4 py-2 bg-slate-800 hover:bg-slate-700 flex items-start gap-2
                //     "
                //                     onClick={() => {
                //                         setModalType('addWebsite')
                //                         setShowModal(true)
                //                     }}
                //                 >
                //                     <AddIcon />
                //                     <span className='font-ligh text-base'>
                //                         Add monitor
                //                     </span>
                //                 </button>
                //             </div>
                //         </div>