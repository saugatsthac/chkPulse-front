import { useState, useEffect, useCallback, useMemo } from "react";
import { io } from "socket.io-client";
import useProjects from "../hooks/useProjects";
import useProjectWebsites from "../hooks/useProjectWebsites";
import useProjectMetrics from "../hooks/useProjectMetrics";
import SidebarLayout from "./mainApp/SidebarLayout";
import DashboardLayout from "./mainApp/DashboardLayout";
import NewProject from "../Components/forms/newProject";
import AddWebsite from "../Components/forms/addWebsite";
import Modal1 from "../Components/Modal1";
import EditProject from "../Components/forms/EditProject";
import NotificationSettings from "../Components/forms/NotifySettings";
import DeleteProject from "../Components/forms/DeleteProject";
import WebsiteDetails from "../Components/WebsiteDetails";
import NotificationsLayout from "./mainApp/NotificationsLayout";
import AddNotificationChannel from "../Components/forms/AddNotificationChannel";
import AddEmailChannel from "../Components/forms/AddEmailChannel";
import AddDiscordChannel from "../Components/forms/AddDiscordChannel";
import BillingLayout from "./mainApp/Billing";
import DeleteMonitorModal from "../Components/forms/DeleteWebsite";
import AddProjectAndWebsites from "../Components/forms/add-project-and-websites";

export default function Main() {
  const { projects, setProjects, activeProjectData, setActiveProjectData } =
    useProjects();

  const { projectWebsites, setProjectWebsites } = useProjectWebsites(
    activeProjectData?._id,
  );

  const {
    avgResponseTime,
    totalMonitors,
    openIncidents,
    // days30Uptime
  } = useProjectMetrics(projectWebsites);

  const [sidebarSelection, setSidebarSelection] = useState("monitors");
  const [selectedWebsite, setSelectedWebsite] = useState(null);

  useEffect(() => console.log(selectedWebsite), [selectedWebsite]);

  const [modalType, setModalType] = useState("addWebsite");
  const [showModal, setShowModal] = useState(true);

  const onClose = () => {
    setShowModal(false);
    setModalType(null);
  };

  return (
    <div
      className="min-h-screen h-screen min-w-screen w-screen bg-[#0a0b0d] text-white flex overflow-hidden
        font-light text-sm"
    >
      {/* <div className="relative h-full w-15"> */}

      <SidebarLayout
        projects={projects}
        activeProjectData={activeProjectData}
        setActiveProjectData={setActiveProjectData}
        sidebarSelection={sidebarSelection}
        setSidebarSelection={setSidebarSelection}
        setModalType={setModalType}
        setShowModal={setShowModal}
      />
      {/* </div> */}
      {/* {console.log("days:", days30Uptime)} */}

      {sidebarSelection === "monitors" && (
        <DashboardLayout
          activeProjectData={activeProjectData}
          projectWebsites={projectWebsites || []}
          sidebarSelection={sidebarSelection}
          setSelectedWebsite={setSelectedWebsite}
          avgResponseTime={avgResponseTime}
          totalMonitors={totalMonitors}
          openIncidents={openIncidents}
          // days30Uptime={days30Uptime}
          setShowModal={setShowModal}
          setModalType={setModalType}
        />
      )}
      {sidebarSelection === "notifications" && (
        <NotificationsLayout
          setShowModal={setShowModal}
          setModalType={setModalType}
        />
      )}

      {sidebarSelection === "billing" && <BillingLayout />}

      {showModal && (
        <Modal1 onClose={onClose}>
          {modalType === "addProjectAndWebsite" && (
            <AddProjectAndWebsites
              activeProjectData={activeProjectData}
              onClose={onClose}
              setProjectWebsites={setProjectWebsites}
            />
          )}

          {modalType === "createProject" && (
            <NewProject setProjects={setProjects} onClose={onClose} />
          )}

          {modalType === "addWebsite" && (
            <AddWebsite
              activeProjectData={activeProjectData}
              onClose={onClose}
              setProjectWebsites={setProjectWebsites}
            />
          )}
          {modalType === "editProject" && (
            <EditProject
              activeProjectData={activeProjectData}
              onClose={onClose}
            />
          )}
          {modalType === "notifySettings" && (
            <NotificationSettings
              activeProjectData={activeProjectData}
              onClose={onClose}
            />
          )}
          {modalType === "deleteProject" && (
            <DeleteProject
              project={activeProjectData}
              setProjects={setProjects}
              onClose={onClose}
            />
          )}
          {modalType === "websiteDetails" && (
            <WebsiteDetails
              website={selectedWebsite}
              onClose={onClose}
              // project={activeProjectData}
              // setProjects={setProjects}
              // onClose={onClose}
            />
          )}
          {modalType === "addNotificationChannel" && (
            <AddNotificationChannel setModalType={setModalType} />
          )}

          {modalType === "addEmailChannel" && (
            <AddEmailChannel onClose={onClose} />
          )}

          {modalType === "addDiscordChannel" && (
            <AddDiscordChannel onClose={onClose} />
          )}
          {modalType === "deleteWebsite" && (
            <DeleteMonitorModal
              selectedWebsite={selectedWebsite}
              setProjectWebsites={setProjectWebsites}
              onCancel={onClose}
            />
          )}
        </Modal1>
      )}
    </div>
  );
}
// <DashboardLayout
//     activeProjectData={activeProjectData}
//     projectWebsites={projectWebsites || []}
//     sidebarSelection={sidebarSelection}
//     setSelectedWebsite={setSelectedWebsite}
//     avgResponseTime={avgResponseTime}
//     totalMonitors={totalMonitors}
//     openIncidents={openIncidents}
//     setShowModal={setShowModal}
//     setModalType={setModalType}
// />}
