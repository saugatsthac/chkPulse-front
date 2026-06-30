import React from "react";
import { useState } from "react";
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { CircleCheckBig } from 'lucide-react';
import { CircleAlert } from 'lucide-react';
import { Clock } from 'lucide-react';
import getStatusSince from '../../utilis/statusSince';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@headlessui/react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import DropdownItem from "../Buttons/DropdownItem";

function MonitorRow({ w,
    // index, isLast, 
    setShowModal, setModalType, setSelectedWebsite, showOptions, setShowOptions }) {

    const getStatusIcon = (status) => {
        switch (status) {
            case 'UP': return <CircleCheckBig className="w-4 h-4 text-green-400" />;
            case 'DOWN': return <CircleAlert className="w-4 h-4 text-yellow-400" />;
            case 'MAINTEINANCE': return <Clock className="w-4 h-4 text-blue-400" />;
        }
    };


    return (
        <div
            className={`w-full flex py-6 gap-2 bg-gray-900/50 border rounded-2xl
            p-5 justify-between
            cursor-pointer items-center text-lg
            transition-all duration-100 border-white/10`}
            onClick={() => {
                setSelectedWebsite(w);
                setModalType('websiteDetails')
                setShowModal(true)
            }}
        >
            {console.log("Rendering:", w.url)}
            <div className={`h-full flex flex-col justify-center gap-1 w-full`}>
                <div className="flex gap-5 items-center">
                    <span className='text-lg font-light'>
                        {w.url}
                    </span>
                    <span className='flex items-center gap-1'>

                        <span>
                            {getStatusIcon(w.status)}
                        </span>
                        <span className="text-sm text-gray-400 capitalize">{w.status}</span>
                        <span className='text-sm flex gap-1 items-center text-gray-500'>
                            <span>
                                {w.statusSince
                                    ? w.status === "UP"
                                        ? "for"
                                        : "for"
                                    : ""}
                            </span>
                            <span>
                                {w.statusSince
                                    ? getStatusSince(new Date(w.statusSince)) :
                                    ''}
                            </span>
                        </span>
                    </span>

                    <div
                        className="relative ml-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Menu>
                            <MenuButton
                                className="flex items-center justify-center p-1 rounded-lg hover:bg-white/5 transition-colors outline-none">
                                <MoreVertIcon />
                            </MenuButton>

                            <MenuItems
                                anchor="bottom end"
                                className="mt-2 w-44 origin-top-right rounded-xl border border-white/10 bg-[#0f1117] shadow-[0_10px_30px_rgba(0,0,0,0.45)]
                backdrop-blur-xl p-1 focus:outline-none z-50">

                                <DropdownItem onClick={() => { }}>
                                    Edit
                                </DropdownItem >
                                <DropdownItem onClick={() => {
                                    setSelectedWebsite(w);
                                    setModalType("deleteWebsite");
                                    setShowModal(true);

                                }} danger>
                                    Delete
                                </DropdownItem >

                            </MenuItems>

                        </Menu>
                    </div>

                </div>
                <span className="min-w-1/12 text-sm font-light text-gray-500 flex items-center justify-start gap-1" >
                    <QueryBuilderIcon fontSize='8' />
                    <span>
                        {w.responseTime} ms
                    </span>
                </span>
            </div>
        </div >
    )
}
export default React.memo(MonitorRow)
{/* <div className="relative ml-auto"
                    > */}
{/* </div> */ }
// key={w._id}
// onClick={onClick}
// key={index}
{/* <CheckCircleIcon fontSize='small' color='success' /> */ }
{/* <button className=""> */ }
{/* <Button> */ }
{/* absolute right-6 top-0 border rounded-2xl */ }
{/* absolute right-0 top-8
w-40
bg-[#111217]
border border-white/10
rounded-xl
shadow-2xl
overflow-hidden
z-50 */}
{/* <Button className="">

    <MoreVertIcon onClick={(e) => {
        e.stopPropagation()
        setShowOptions(
            showOptions === w._id ? null : w._id
        );
    }} />
</Button> */}

{/* {showOptions === w._id && */ }
{/* <DropdownItem onClick={() => { }}> */ }
{/* <MenuItem>
        {({ focus }) => (
            <button
                className={`
w-full rounded-lg px-3 py-2
text-left text-sm
transition-colors
${focus
                        ? "bg-white/5 text-white"
                        : "text-gray-300"
                    }
`}
            >
                Edit
            </button>
        )}
    </MenuItem> */}

{/* <MenuItem>
        {({ focus }) => (
            <button
                onClick={() => {
                    setSelectedWebsite(w);
                    setModalType("deleteWebsite");
                    setShowModal(true);
                }}
                className={`
w-full rounded-lg px-3 py-2
text-left text-sm
transition-colors
${focus
                        ? "bg-red-500/10 text-red-300"
                        : "text-red-400"
                    }
`}
            >
                Delete
            </button>
        )}
    </MenuItem> */}
{/* } */ }
//                         <div className="absolute right-0 top-8
// w-44
// rounded-xl
// border border-white/10
// bg-[#0f1117]
// backdrop-blur-xl
// shadow-[0_10px_30px_rgba(0,0,0,0.45)]
// overflow-hidden
// z-50
//                         ">
//                             <button className="
//                               w-full
//             px-4 py-3
//             text-left text-sm
//             text-gray-300
//             hover:bg-white/5
//             transition-colors">Edit</button>
//                             <button className="
//                               w-full
//                               px-4 py-3
//             text-left text-sm
//             text-red-400
//             hover:bg-red-500/10
//             transition-colors
//                             "
//                                 onClick={(e) => {
//                                     e.stopPropagation()
//                                     setSelectedWebsite(w)
//                                     setModalType('deleteWebsite')
//                                     setShowModal(true)
//                                 }}>Delete</button>
//                         </div>
{/* px-3 py-2 text-left */ }
{/* px-3 py-2 text-left */ }
{/* <div className='text-sm text-gray-500 flex gap-1'>
<span>
{w.statusSince
    ? w.status === "UP"
        ? "UP since"
        : "DOWN since"
    : ""}

</span>
{w.statusSince
? getStatusSince(new Date(w.statusSince)) :
''}
</div> */}
{/* <div className="text-center flex gap-1 justify-center items-center">
<div className="min-w-2/12 text-center"> {formatTimeAgo(w.lastCheckedAt)}
</div>
{w.last14Checks?.map((check, index) => (
<span
key={index}
className={`w-1 h-6 rounded-full inline-block ${check.status === "UP"
    ? "bg-green-500"
    : "bg-red-500"
    } `}
/>
))}
</div> */}
{/* <span className='w-fit ml-auto'>
                    {w.status === 'UP'
                        ? (<div className="text-green-400 text-sm flex items-center gap-2 animate-pulse
                                            bg-green-900/20 px-2 rounded-full">
                            <span className="w-2 h-2 bg-green-400 rounded-full " />
                            LIVE
                        </div>
                        ) : w.status === 'DOWN'
                            ? (<div className="text-red-900 text-sm flex items-center gap-2 animate-pulse
                                                bg-red-900/20 px-2 rounded-full">
                                <span className="w-2 h-2 bg-red-400 rounded-full " />

                                DOWN
                            </div>
                            ) : (<span>

                                UNKNOWN
                            </span>)}
                </span> */}
{/* % label */ }

{/* bar container */ }
{/* green uptime */ }
{/* red downtime */ }
{/* <div className="min-w-3/12 text-center">
                {(() => {
                    const timeline = build30DayTimeline(w);
                    const pct = calculateUptimePercent(timeline);

                    return (
                        <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>

                            <div style={{
                                flex: 1,
                                height: 6,
                                background: "#1f2937",
                                borderRadius: 4,
                                overflow: "hidden",
                                display: "flex"
                            }}>
                                <div
                                    style={{
                                        width: `${ pct }% `,
                                        background: "#22c55e",
                                        height: "100%"
                                    }}
                                />

                                <div
                                    style={{
                                        width: `${ 100 - pct }% `,
                                        background: "#ef4444",
                                        height: "100%"
                                    }}
                                />
                            </div>
                            <span style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 12,
                                minWidth: 50,
                                color: pct < 99 ? "#facc15" : "#9ca3af"
                            }}>
                                {pct.toFixed(1)}%
                            </span>
                        </div>
                    );
                })()}

            </div> */}
{/* </> */ }
// min-h-1/5 max-h-1/5
//                 ${index === 0 ? 'border-b' : ' '}
//                 ${isLast ? '' : 'border-b'}`
// }