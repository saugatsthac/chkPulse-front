import React from "react";
import { useState } from "react";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { CircleCheckBig } from "lucide-react";
import { CircleAlert } from "lucide-react";
import { Clock } from "lucide-react";
import getStatusSince from "../../utilis/statusSince";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button } from "@headlessui/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import DropdownItem from "../Buttons/DropdownItem";
import ResponseTimeChart from "../Charts/ResponseTimeChart";

function MonitorRow({
  w,
  // index, isLast,
  setShowModal,
  setModalType,
  setSelectedWebsite,
  showOptions,
  setShowOptions,
}) {
  const getStatusIcon = (status) => {
    switch (status) {
      case "UP":
        return <CircleCheckBig className="w-4 h-4 text-green-400" />;
      case "DOWN":
        return <CircleAlert className="w-4 h-4 text-yellow-400" />;
      case "MAINTEINANCE":
        return <Clock className="w-4 h-4 text-blue-400" />;
    }
  };
  const protocol = w.url.startsWith("https://")
    ? "HTTPS://"
    : w.url.startsWith("http://")
      ? "HTTP://"
      : "";

  const domain = w.url.replace(/^https?:\/\//, "");

  const responseChartData =
    w.history?.map((item) => ({
      time: new Date(item.statusChangedAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      response: item.responseTime,
    })) ?? [];

  const Row = ({ label, value }) => (
    <div className="flex justify-between items-center py-2">
      <span className="text-gray-500">{label}</span>

      <span className="text-right">{value}</span>
    </div>
  );

  return (
    <div
      className={`flex py-7 gap-2 bg-gray-900/50 border rounded-2xl group
            p-5 justify-between
            cursor-pointer items-start text-lg
            transition-all duration-100 border-white/3`}
      onClick={() => {
        setSelectedWebsite(w);
        setModalType("websiteDetails");
        setShowModal(true);
      }}
    >
      {/* {console.log("Rendering:", w.url)} */}
      <div className={`h-full flex flex-col justify-st gap-3 w-full`}>
        <div className="flex gap-5 items-start">
          <div className="flex flex-col items-baseline gap-2">
            <span className="text-lg font-light text-white/80">{domain}</span>
            {/* <span className='text-lg font-light'>
                            {w.url}
                            </span> */}
            <span className="text-sm text-white/20 grouphover:text-white transition-all duration-200">
              {protocol}
            </span>
          </div>

          <div
            className="relative ml-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Menu>
              <MenuButton className="text-white/30 hover:text-white flex items-center justify-center p-1 rounded-lg hover:bg-white/5 transition-colors outline-none">
                <MoreVertIcon />
              </MenuButton>

              <MenuItems
                anchor="bottom end"
                className="mt-2 w-44 origin-top-right rounded-xl border border-white/10 bg-[#0f1117] shadow-[0_10px_30px_rgba(0,0,0,0.45)]
                backdrop-blur-xl p-1 focus:outline-none z-50"
              >
                {/* 
                                <DropdownItem onClick={() => { }}>
                                    Edit
                                </DropdownItem > */}
                <DropdownItem
                  onClick={() => {
                    setSelectedWebsite(w);
                    setModalType("deleteWebsite");
                    setShowModal(true);
                  }}
                  danger
                >
                  Delete
                </DropdownItem>
              </MenuItems>
            </Menu>
          </div>
        </div>

        <span className="flex items-center gap-1 bg-green-300/20 rounded-lg w-full p-3">
          <span>{getStatusIcon(w.status)}</span>
          <span className="text-sm text-gray-400 capitalize">{w.status}</span>
          <span className="text-sm flex gap-1 items-center text-gray-500">
            <span>
              {w.statusSince ? (w.status === "UP" ? "for" : "for") : ""}
            </span>
            <span>
              {w.statusSince ? getStatusSince(new Date(w.statusSince)) : ""}
            </span>
          </span>
        </span>
        <div className="w-full flex gap-1">
          <span
            className="min-w-1/12 w-1/2 rounded-xl text-sm font-light text-gray-500 flex flex-col items-center 
            bg-white/5 justify-center py-6 gap-"
          >
            {/* <QueryBuilderIcon fontSize="8" /> */}
            <span>Response time</span>
            <span className="text-4xl tracking-tight">{w.responseTime} ms</span>
          </span>
          <span
            className="min-w-1/12 w-1/2 rounded-xl text-sm font-light text-gray-500 flex flex-col items-center 
        bg-white/5 justify-center py-6 gap-"
          >
            {/* <QueryBuilderIcon fontSize="8" /> */}
            <span>30 Days Uptime</span>
            <span className="text-4xl tracking-tight">{w.days30Uptime} %</span>
          </span>
        </div>
        <div className="h-60 mt-6 mb5 flex flex-col gap-2">
          <span className="text-xs text-white/20 font-light mb-2">
            RESPONSE TIME CHART
          </span>
          <ResponseTimeChart data={responseChartData} />
        </div>
        {w.errorCode && w.errorMessage && (
          <div
            className="mt-6 min-w-1/12 w-full bg-red-500/20 text-sm font-light text-white/60 items-start justify-start gap-1
                rounded-lg p-3 py-4 flex flex-col mlauto"
          >
            <span>ERROR CODE: {w.errorCode}</span>
            <span>ERROR MESSAGE: {w.errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
export default React.memo(MonitorRow);
