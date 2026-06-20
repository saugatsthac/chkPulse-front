import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import { ProjectHeader } from './DashboardLayout/ProjectHeader';
import StatsCards from './DashboardLayout/StatsCards'
import MonitorRow from './DashboardLayout/MonitorRow';
import { StatusFilterButton } from './DashboardLayout/Buttons/StatusFilterButton';
import RefreshIcon from '@mui/icons-material/Refresh';


export default function DashboardLayout({ setShowModal, setModalType, activeProjectData, projectWebsites, sidebarSelection,
    avgResponseTime, totalMonitors, openIncidents, setSelectedWebsite
}) {

    const [filterCondition, setFilterCondition] = useState('UP')
    const filters = [
        { label: "All", value: "ALL" },
        { label: "Operational", value: "Operational" },
        { label: 'Issues', value: "ISSUES" },
        { label: 'Maintenance', value: "MAINTENANCE" }
        // { label: "Degraded", value: "DEGRADED" },
        // { label: "Down", value: "DOWN" },
    ];

    return (
        <div className="grow h-full min-h-0 flex items-start justify-start overflow-y-auto overflow-x-hidden scrollbar-thumb-blue-900/10 scrollbar-gutter-stable
        px-6 py-7 gap-6 font-light">

            {/* <ProjectHeader
                activeProjectData={activeProjectData}
                setShowModal={setShowModal}
                setModalType={setModalType}
            /> */}
            <div className='flex flex-col w-2/3 gap-7'>

                <div className='bg-[#111217] min-h-70 rounded-2xl border border-white/10 p-6'>
                    Reponse Time Chart</div>
                <div className='flex w-full gap-6 items-start'>

                    <div className='flex flex-col w-full justify-start gap-3 bg-[#111217] px-6 py-7 rounded-2xl
                border border-white/10'>
                        <div className="flex flex-col w-full items-end gap-3" >
                            <div className='flex w-full justify-end gap-2'>

                                <button className="rounded-lg px-3 py-1 w-fit flex items-center gap-2
                    bg-slate-800/40 hover:bg-slate-800 cursor-pointer text-sm"
                                >
                                    <RefreshIcon />
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
                                    index={index}
                                    isLast={index === projectWebsites.length - 1}
                                    onClick={() => {
                                        setSelectedWebsite(w);
                                        setModalType('websiteDetails')
                                        setShowModal(true)
                                    }} />
                            ))}
                        </div>
                    </div >
                </div >
            </div>
            <div className=' grow flex flex-col justify-start items-start gap-7'>
                <span className='px-6 py-7 text-xl tracking-tight w-full justify-end flex text-right border border-white/10 rounded-2xl bg-[#111217]'>
                    {activeProjectData?.name}<br />
                    have shared among too.<br />
                    have a share button to add usernames here.<br />
                    notification buttons here too.
                </span>

                <StatsCards
                    projectWebsites={projectWebsites}
                    avgResponseTime={avgResponseTime}
                    totalMonitors={totalMonitors}
                    openIncidents={openIncidents}
                />

                <div className='border border-white/10 w-full h-80 rounded-2xl bg-[#111217] p-6'>
                Weekly Uptime Chart
                </div>
            </div>

        </div >)
}
{/* <div className="flex items-start gap-3 w-full"> */ }

{/* <span className="text-lg flex items-center gap-3"> */ }
{/* <span className='border rounded-xl border-blue-900/80 px-1.5 items-center'>

        <span
            className="w-2 h-2 rounded-full inline-block"
            style={{ backgroundColor: activeProjectData?.color }}
        />
    </span> */}
{/* italic */ }
{/* # */ }
{/* Namey */ }
{/* </span> */ }
{/* </div> */ }
{/* <div className='flex'> */ }
{/* </div> */ }
{/* </div> */ }

{/* <div className='flex flex-col justify-between items-end text-xl font-light gap-1 w-full'> */ }

{/* <div className="border border-white/10 rounded-2xl w-full font-light  
                    flex flex-col overflow-hidden p-6 gap-4"> */}
{/* </div> */ }
{/* <h2 className='pl-3 text-2xl font-light'>Monitors</h2> */ }
// onClick={() => {
//     setModalType('editProject')
//     setShowModal(true)
// }}
{/* <div className="w-full flex justify-between border-b border-white/10 gap-2 py-1
bg-blue-900/20">
<span className="min-w-3/12 text-left px-3">MONITOR STATUS</span>
<span className="min-w-3/12 text-center">UPTIME (30 DAYS)</span>
<span className="min-w-1/12 text-center">RESPONSE</span>
<span className="min-w-3/12 text-center">LAST 14 CHECKS</span>
<span className="min-w-2/12 text-center">CHECKED</span>
</div> */}
{/* border border-green-500/20 */ }
{/* <button
    className=
    {`   px-8 py-1.5 rounded-xl
transition-all duration-300
hover:bg-green-500/20
hover:border-green-500/40
hover:shadow-[0_0_12px_rgba(34,197,94,0.15)]
${filterCondition === 'UP' ? 'bg-green-500/20  ' : ''}

`}
    onClick={() => setFilterCondition('UP')} */}
{/* > */ }
{/* 
    bg-green-500/10
    text-green-400 */}
{/* Live */ }
{/* Up */ }
{/* bg-yellow-500/10
text-yellow-400 */}
{/* </button>

<button
    className=
    {`px-8 py-1.5 rounded-xl
border border-yellow-500/20
transition-all duration-200
hover:bg-yellow-500/20
hover:border-yellow-500/40
hover:shadow-[0_0_12px_rgba(239,68,68,0.15)]
${filterCondition === 'Degraded' ? 'bg-yellow-500/23 border ' : ''}

`}
    onClick={() => setFilterCondition('Degraded')}

>
    Degraded
</button> */}
{/* bg-red-500/10
text-red-400 */}
{/* border border-red-500/20 */ }
{/* <button
    className=
    {`    px-8 py-1.5 rounded-xl
transition-all duration-200
hover:bg-red-500/20
hover:border-red-500/40
hover:shadow-[0_0_12px_rgba(239,68,68,0.15)]
${filterCondition === 'DOWN' ? 'bg-red-500/20' : 'border-white/10 border'}


`}
onClick={() => setFilterCondition('DOWN')}
>
    Down
</button> */}
{/* <button>All</button> */ }
{/* <div className='flex gap-2 flexcol w-full'>
    <button className='border rounded-lg px-2'>Live</button>
    <button>Down</button>
</div> */}
{/* <div className="w-full min-h-[20vh] flex gap-2">


    <div className="w-1/2 border border-white/10 rounded-lg p-3">Notifications</div>
</div> */}
// const website = projectWebsites[projectId]?.find(
//     w => w._id === websiteId
// );

// const timeline = website
//     ? build30DayTimeline(website)
//     : [];
{/* </div> */ }
{/* </div > */ }
{/* min-h-[50vh] */ }
{/* border-b border-white/10 */ }
{/* overflow-auto */ }
{/* <div className="w-full flex items-end">
                <div className="flex gap-3 text-4xl items-center justify-between py-2 pl-4 w-full bg-blue-900/10 px-1 borderb border-white/10">
                    <h1 className="tracking-tight text-3xl font-semibold text-white/92">{capitalize(sidebarSelection)}</h1>
                </div>

            </div> */}


{/* <div className= w-full "> */ }

{/* <RefreshIcon />  */ }
{/* <div className='flex gap-5 borde rounded-2xl px-2 items-center border-white/5'> */ }
{/* <button className='flex items-center gap-2 border rounded-2xl px-2 py-1 border-white/20 cursor-pointer
                    hover:border-white'>
                    <span className='text-4xl'>
                    Edit
                    </span>
                    </button> */}

{/* <MoreVertIcon
                        className='hover:bg-white/5 min-h-8 min-w-8 hover:rounded-xl transition-all duration-500 bg-transparent' /> */}
{/* <EditIcon fontSize='12px'
                            className='border rounded-lg p-2' /> */}
{/* <div className="p-4 w-full flex flex-col gap-2"> */ }


// const recentIncidents = projectWebsites
//     .filter(w => w.errorCode || w.errorMessage || w.status === "DOWN")
//     .sort((a, b) => b.lastCheckedAt - a.lastCheckedAt);