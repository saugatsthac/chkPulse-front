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
            // key={w._id}
            className={`w-full flex py-6 gap-2 bg-gray-900/50 border rounded-2xl
            p-5 justify-between
            cursor-pointer items-center text-lg
            transition-all duration-100 border-white/10`}
            onClick={() => {
                setSelectedWebsite(w);
                setModalType('websiteDetails')
                setShowModal(true)
            }}
        // onClick={onClick}
        // key={index}
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
                            {/* <CheckCircleIcon fontSize='small' color='success' /> */}
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
                    <div className="relative ml-auto">

                        <button className="">
                            <MoreVertIcon onClick={(e) => {
                                e.stopPropagation()
                                setShowOptions(
                                    showOptions === w._id ? null : w._id
                                );
                            }} />
                        </button>
                        {showOptions === w._id &&
                            <div className="absolute right-6 top-0 border rounded-2xl">
                                <button className="px-3 py-2 text-left">Edit</button>
                                <button className="px-3 py-2 text-left"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setSelectedWebsite(w)
                                        setModalType('deleteWebsite')
                                        setShowModal(true)
                                    }}>Delete</button>
                            </div>}
                    </div>
                </div>
                <span className="min-w-1/12 text-sm font-light text-gray-500 flex items-center justify-start gap-1" >
                    <QueryBuilderIcon fontSize='8' />
                    <span>
                        {w.responseTime} ms
                    </span>
                </span>
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
            </div>
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
        </div >
    )
}
export default React.memo(MonitorRow)
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