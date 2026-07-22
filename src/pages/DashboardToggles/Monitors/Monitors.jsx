import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import { ProjectHeader } from "../../../Components/Dashboard/ProjectHeader";
import StatsCards from "../../../Components/Dashboard/StatsCards";
import MonitorRow from "./modals/WebsiteCardGrid";
import { StatusFilterButton } from "../../components/Buttons/StatusFilterButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import ResponseTimeChart from "./components/ResponseTimeChart";
import WeeklyUptimeChart from "./components/WeeklyTimeChart";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import Button from "../../components/Buttons/Button";

export default function DashboardLayout({
  setShowModal,
  setModalType,
  activeProjectData,
  projectWebsites,
  sidebarSelection,
  avgResponseTime,
  totalMonitors,
  openIncidents,
  setSelectedWebsite,
  // days30Uptime,
}) {
  const [filterCondition, setFilterCondition] = useState("ALL");
  const filters = [
    { label: "All", value: "ALL" },
    { label: "Operational", value: "Operational" },
    { label: "Issues", value: "ISSUES" },
    // { label: 'Maintenance', value: "MAINTENANCE" }
  ];

  const [showOptions, setShowOptions] = useState(null);
  const filteredWebsites = projectWebsites.filter((w) => {
    if (filterCondition === "ALL") return true;
    if (filterCondition === "Operational")
      return w.status === "Operational" || w.status === "UP";
    if (filterCondition === "ISSUES")
      return (
        w.status === "Issues" || w.status === "DOWN" || w.status === "UNKNOWN"
      );
    if (filterCondition === "MAINTENANCE") return w.status === "Maintenance";
  });

  const counts = projectWebsites.reduce(
    (acc, website) => {
      acc.ALL++;

      switch (website.status) {
        case "Operational":
        case "UP":
          acc.Operational++;
          break;
        case "DOWN":
        case "UNKNOWN":
        case "Issues":
          acc.ISSUES++;
          break;
        case "Maintenance":
          acc.MAINTENANCE++;
          break;
      }

      return acc;
    },
    {
      ALL: 0,
      Operational: 0,
      ISSUES: 0,
      MAINTENANCE: 0,
    },
  );

  return (
    <div
      className="grow h-full min-h-0 flex flex-col items-start justify-start overflow-y-auto overflow-x-hidden 
        scrollbar-gutter-stable
        scrollbar-thumb-blue-900/10 
        scrollbar-thin

        px-6 py-7 gap-7 font-light"
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-light">Monitors</h1>

        <p className="text-gray-500 mt-2">
          Manage your monitors and configure their settings.
        </p>
      </div>
      {/* <Button
                    icon={AddIcon}
                    onClick={() => {
                        setShowModal(true);
                        setModalType("addWebsite");
                    }}
                >
                    Add Website
                    </Button> */}

      <StatsCards
        projectWebsites={projectWebsites}
        avgResponseTime={avgResponseTime}
        totalMonitors={totalMonitors}
        openIncidents={openIncidents}
        // days30Uptime={days30Uptime}
      />

      <div className="flex flex-col gap-3 w-full">
        {/* <div className="flex gap-2 font-light text-base w-full justify-end">
          {filters.map((filter) => (
            <StatusFilterButton
              key={filter.value}
              {...filter}
              active={filterCondition === filter.value}
              onClick={setFilterCondition}
              length={counts[filter.value]}
            />
          ))}
        </div> */}
        <div className="grid grid-cols-3 gap-2">
          {filteredWebsites.map((w, index) => (
            <MonitorRow
              key={w._id}
              w={w}
              setSelectedWebsite={setSelectedWebsite}
              setShowModal={setShowModal}
              setModalType={setModalType}
              showOptions={showOptions}
              setShowOptions={setShowOptions}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
{
  /* <span className='px-6 py-7 text-lg tracking-tight w-full justify-end flex text-right border border-white/10 rounded-2xl bg-[#111217]'>
                            {activeProjectData?.name}<br />
                            have shared among too.<br />
                            have a share button to add usernames here.<br />
                            notification buttons here too.
                        </span> */
}

{
  /* <div className="border border-white/5 w-full h-70 rounded-2xl bg-[#111217] p-6 py-7 gap-7 flex flex-col">
            <span>Weekly Uptime Chart</span>
            <div className="h-full">
              <WeeklyUptimeChart />
            </div>
          </div> */
}
{
  /* </div> */
}
{
  /* </div> */
}
{
  /* )} */
}

{
  /* {Array.from({ length: emptyRows }).map((_, index) => (
                  <div
                    onClick={() => {
                      setShowModal(true);
                      setModalType("addWebsite");
                    }}
                    className={`w-full h-26 flex py-6 gap-2 
                                                bg-gray-900/50 
                                                border border-dashed
                                                 rounded-2xl group
                                        p-5 justify-start text-white/50 font-light text-base
                                        cursor-pointer items-center textlg
                                        transition-all duration-100 border-white/10`}
                    key={`empty-${index}`}
                  >
                    <AddIcon className="h-4! w-4!" />
                    <span className="text-base font-light">Add website</span>
                  </div>
                ))} */
}
