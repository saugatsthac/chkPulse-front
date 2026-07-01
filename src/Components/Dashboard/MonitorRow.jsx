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
    const protocol = w.url.startsWith("https://")
        ? "https://"
        : w.url.startsWith("http://")
            ? "http://"
            : "";

    const domain = w.url.replace(/^https?:\/\//, "");


    return (
        <div
            className={`w-full flex py-6 gap-2 bg-gray-900/50 border rounded-2xl group
            p-5 justify-between
            cursor-pointer items-center text-lg
            transition-all duration-100 border-white/3`}
            onClick={() => {
                setSelectedWebsite(w);
                setModalType('websiteDetails')
                setShowModal(true)
            }}
        >
            {console.log("Rendering:", w.url)}
            <div className={`h-full flex flex-col justify-center gap-1 w-full`}>
                <div className="flex gap-5 items-center">
                    <div className="flex items-baseline gap-2">
                        <span className='text-sm text-white/20 group-hover:text-white transition-all duration-300'>
                            {protocol}
                        </span>
                        <span className='text-lg font-semibold text-white/80'>
                            {domain}
                        </span>
                        {/* <span className='text-lg font-light'>
                            {w.url}
                        </span> */}
                    </div>
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
                {w.errorCode && w.errorMessage && (
                    <div className="mt-6 min-w-1/12 w-full bg-red-500/20 text-sm font-light text-white/60 items-start justify-start gap-1
                rounded-lg p-3 py-4 flex flex-col mlauto">

                        <span>ERROR CODE: {w.errorCode}</span>
                        <span>ERROR MESSAGE: {w.errorMessage}</span>
                    </div>
                )}
            </div>
        </div >
    )
}
export default React.memo(MonitorRow)