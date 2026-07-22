import { useState, useEffect, useCallback, useMemo } from "react";
import { io } from "socket.io-client";
import useProjects from "../hooks/useProjects";
import useProjectWebsites from "../hooks/useProjectWebsites";
import useProjectMetrics from "../hooks/useProjectMetrics";
import SidebarLayout from "./Sidebar/Sidebar";
import DashboardLayout from "./DashboardToggles/Monitors/Monitors";
import Modal1 from "./components/Modal";
import NotificationSettings from "./DashboardToggles/Notify/NotifyModals/NotifySettings";
import DeleteProject from "./Sidebar/SidebarModals/project-delete";
import WebsiteDetails from "./DashboardToggles/Monitors/modals/WebsiteDetails";
import NotificationsLayout from "./DashboardToggles/Notify/NotificationsLayout";
import AddNotificationChannel from "./DashboardToggles/Notify/NotifyModals/AddNotificationChannel";
import AddEmailChannel from "./DashboardToggles/Notify/NotifyModals/AddEmailChannel";
import AddDiscordChannel from "./DashboardToggles/Notify/NotifyModals/AddDiscordChannel";
import BillingLayout from "./DashboardToggles/Billing/Billing";
import DeleteMonitorModal from "./DashboardToggles/Monitors/modals/website-delete";
import AddProjectAndWebsites from "./Sidebar/SidebarModals/project-create-with-websites";
import ProjectRename from "./Sidebar/SidebarModals/project-rename";
import EditProject from "./Sidebar/SidebarModals/project-edit";
// import ProjectDelete from "../extra/project-delete";
// import NewProject from "../extra/project-create";
// import ProjectEdit from "../Components/Forms/WebsiteFields";
// import WebsiteFields from "../Components/Forms/WebsiteFields";

export default function Main() {
  const { projects, setProjects, activeProjectData, setActiveProjectData } =
    useProjects();

  const { projectWebsites, setProjectWebsites } = useProjectWebsites(
    activeProjectData?._id,
  );

  const { avgResponseTime, totalMonitors, openIncidents } =
    useProjectMetrics(projectWebsites);

  const [sidebarSelection, setSidebarSelection] = useState("monitors");
  const [selectedWebsite, setSelectedWebsite] = useState(null);

  const [modalType, setModalType] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const onClose = () => {
    setShowModal(false);
    setModalType(null);
  };

  (useEffect) => (console.log(selectedWebsite), [selectedWebsite]);

  return (
    <div
      className="min-h-screen h-screen min-w-screen w-screen bg-[#0a0b0d] text-white flex overflow-hidden
        font-light text-sm"
    >
      <SidebarLayout
        projects={projects}
        activeProjectData={activeProjectData}
        setActiveProjectData={setActiveProjectData}
        sidebarSelection={sidebarSelection}
        setSidebarSelection={setSidebarSelection}
        setModalType={setModalType}
        setShowModal={setShowModal}
      />

      {sidebarSelection === "monitors" && (
        <DashboardLayout
          activeProjectData={activeProjectData}
          projectWebsites={projectWebsites || []}
          sidebarSelection={sidebarSelection}
          setSelectedWebsite={setSelectedWebsite}
          avgResponseTime={avgResponseTime}
          totalMonitors={totalMonitors}
          openIncidents={openIncidents}
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
              onClose={onClose}
              setProjectWebsites={setProjectWebsites}
            />
          )}

          {modalType === "renameProject" && (
            <ProjectRename project={activeProjectData} onClose={onClose} />
          )}

          {modalType === "editProject" && (
            <EditProject projectWebsites={projectWebsites} />
          )}

          {modalType === "deleteWebsite" && (
            <DeleteMonitorModal
              selectedWebsite={selectedWebsite}
              setProjectWebsites={setProjectWebsites}
              onCancel={onClose}
            />
          )}
          {modalType === "deleteProject" && (
            <DeleteProject
              project={activeProjectData}
              setProjects={setProjects}
              onClose={onClose}
            />
          )}
          {modalType === "notifySettings" && (
            <NotificationSettings
              activeProjectData={activeProjectData}
              onClose={onClose}
            />
          )}
          {modalType === "websiteDetails" && (
            <WebsiteDetails
              selectedWebsite={selectedWebsite}
              onClose={onClose}
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
        </Modal1>
      )}
    </div>
  );
}

//   console.log(projects);
// console.log(activeProjectData?._id);
// console.log("projectWebsites1", projectWebsites);
// useEffect(() => {
//   (console.log(selectedWebsite, "projectWebsites", projectWebsites),
//     [selectedWebsite, projectWebsites]);
// const websitesInProject = projectWebsites[activeProjectData._id];
// console.log("websitesInProject", websitesInProject);
// }, [projects]);
// const websitesInProject = projectWebsites.map((website) => {
//   url: website.url;
// });
{
  /* {console.log("activeProjectDataId", activeProjectData._id)} */
}
// projectWebsites={projectWebsites}
// import EditProject from "../extra/EditProject";
// import AddWebsite from "../Components/forms/addWebsite";
// days30Uptime
// days30Uptime={days30Uptime}
{
  /* {modalType === "addWebsite" && (
  <AddWebsite
    activeProjectData={activeProjectData}
    onClose={onClose}
    setProjectWebsites={setProjectWebsites}
  />
)} */
}
{
  /* {modalType === "createProject" && (
  <NewProject setProjects={setProjects} onClose={onClose} />
)} */
}
{
  /* {modalType === "editProject" && (
  <ProjectEdit
    project={{
      ...activeProjectData,
      websites: projectWebsites,
    }}
    onClose={onClose}
  />
)} */
}
{
  /* <div className="relative h-full w-15"> */
}
{
  /* </div> */
}
{
  /* {console.log("days:", days30Uptime)} */
}
// onUpdated={loadWebsites}
// onUpdated={loadProjects}
{
  /* {modalType === "deleteProject" && (
  <ProjectDelete
    projectId={activeProjectData?._id}
    onDelete={() => {
      onClose();
      loadProjects();
    }}
  />
)} */
}
{
  /* {modalType === "editProject" && (
<EditProject
  activeProjectData={activeProjectData}
  onClose={onClose}
/>
)} */
}
// project={activeProjectData}
// setProjects={setProjects}
// onClose={onClose}
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
