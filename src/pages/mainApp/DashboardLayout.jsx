import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import { ProjectHeader } from '../../Components/Dashboard/ProjectHeader';
import StatsCards from '../../Components/Dashboard/StatsCards'
import MonitorRow from '../../Components/Dashboard/MonitorRow';
import { StatusFilterButton } from '../../Components/Buttons/StatusFilterButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';

export default function DashboardLayout({ setShowModal, setModalType, activeProjectData, projectWebsites, sidebarSelection,
    avgResponseTime, totalMonitors, openIncidents, setSelectedWebsite
}) {

    const [filterCondition, setFilterCondition] = useState('UP')
    const filters = [
        { label: "All", value: "ALL" },
        { label: "Operational", value: "Operational" },
        { label: 'Issues', value: "ISSUES" },
        { label: 'Maintenance', value: "MAINTENANCE" }
    ];

    return (
        <div className="grow h-full min-h-0 flex items-start justify-start overflow-y-auto overflow-x-hidden scrollbar-thumb-blue-900/10 scrollbar-gutter-stable
        px-6 py-7 gap-6 font-light">

            {projectWebsites.length > 0 ?
                <div className='flex flex-col w-2/3 gap-7'>

                    <div className='bg-[#111217] min-h-70 rounded-2xl border border-white/10 p-6'>
                        Reponse Time Chart</div>
                    <div className='flex w-full gap-6 items-start'>

                        <div className='flex flex-col w-full justify-start gap-3 bg-[#111217] px-6 py-7 rounded-2xl
                border border-white/10'>
                            <div className="flex flex-col w-full items-end gap-3">
                                <div className='flex w-full justify-between items-center'>
                                    <div className=''>Monitors</div>

                                    <div className='flex gap-3 items-center'>
                                        <button className="rounded-lg px-3 py-1 w-fit flex items-center gap-2
                    bg-slate-800/40 hover:bg-slate-800 cursor-pointer text-sm"
                                            onClick={() => {
                                                setShowModal(true)
                                                setModalType('addWebsite')
                                            }}
                                        >
                                            <AddIcon />
                                            <span className='font-ligh'>
                                                Add monitor
                                            </span>
                                        </button>
                                        <button className="rounded-lg px-3 py-1 w-fit flex items-center gap-2
                    bg-slate-800/40 hover:bg-slate-800 cursor-pointer text-sm"
                                        >
                                            <RefreshIcon />
                                            <span className='font-ligh'>
                                                Refresh monitors
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div className='flex gap-2 font-light'>

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
                                        // index={index}
                                        // isLast={index === projectWebsites.length - 1}
                                        setSelectedWebsite={setSelectedWebsite}
                                        setShowModal={setShowModal}
                                        setModalType={setModalType} />
                                ))}
                            </div>
                        </div >
                    </div >
                </div>
                :
                <div className='flex flex-col gap-6 rounded-2xl py-6 px-6 border-white/10 w-2/3 border bg-[#111217]
                text-bas'>
                    <span className='tracking-wid'>No monitors to show. Create a project or add a monitor to your project.</span>
                    <div className='flex gap-3 w-full'>

                        {!activeProjectData && <button className="rounded-lg px-3 py-1 pr-5 w-fit flex items-center gap-2
                    bg-slate-800/40 hover:bg-slate-800 cursor-pointer text-sm"
                            onClick={() => {
                                setModalType('addWebsite')
                                setShowModal(true)
                            }}
                        >
                            <AddIcon />
                            <span className='font-ligh text-base'>
                                New project
                            </span>
                        </button>}
                        <button className="rounded-lg px-3 py-1 pr-5 w-fit flex items-center gap-2
                    bg-slate-800/40 hover:bg-slate-800 cursor-pointer text-sm"
                            onClick={() => {
                                setModalType('addWebsite')
                                setShowModal(true)
                            }}
                        >
                            <AddIcon />
                            <span className='font-ligh text-base'>
                                Add monitor
                            </span>
                        </button>
                        {/* <button className="rounded-lg px-3 py-1 w-fit flex items-center gap-2
                    bg-slate-800/40 hover:bg-slate-800 cursor-pointer text-sm"
                        >
                            <RefreshIcon />
                            <span className='font-ligh'>
                                Refresh monitors
                            </span>
                        </button> */}
                    </div>
                </div>
            }
            <div className=' grow flex flex-col justify-start items-start gap-7'>
                <span className='px-6 py-7 text-lg tracking-tight w-full justify-end flex text-right border border-white/10 rounded-2xl bg-[#111217]'>
                    {activeProjectData?.name}<br />
                    have shared among too.<br />
                    have a share button to add usernames here.<br />
                    notification buttons here too.
                </span>

                {projectWebsites.length > 0 &&
                    <StatsCards
                        projectWebsites={projectWebsites}
                        avgResponseTime={avgResponseTime}
                        totalMonitors={totalMonitors}
                        openIncidents={openIncidents}
                    />}

                {projectWebsites.length > 0 &&
                    <div className='border border-white/10 w-full h-80 rounded-2xl bg-[#111217] p-6'>
                        Weekly Uptime Chart
                    </div>}
            </div>

        </div >)
}