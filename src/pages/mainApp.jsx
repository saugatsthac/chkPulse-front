import { useState, useEffect, useCallback, useMemo } from "react";
import { io } from "socket.io-client";
import useProjects from "../hooks/useProjects";
import useProjectWebsites from "../hooks/useProjectWebsites";
import useProjectMetrics from "../hooks/useProjectMetrics";
import SidebarLayout from "../Components/mainApp/SidebarLayout";
import DashboardLayout from "../Components/mainApp/DashboardLayout";
import NewProject from "../Components/mainApp/SidebarLayoutForms/newProject";
import AddWebsite from "../Components/mainApp/SidebarLayoutForms/AddWebsite";
import Modal1 from "../Components/Modal1";
import EditProject from '../Components/mainApp/DashboardLayoutForms/EditProject'
import NotificationSettings from '../Components/mainApp/DashboardLayoutForms/NotifySettings'
import DeleteProject from '../Components/mainApp/DashboardLayoutForms/DeleteProject'
import WebsiteDetails from "../Components/mainApp/WebsiteDetails";

export default function Main() {
    const {
        projects,
        setProjects,
        activeProjectData,
        setActiveProjectData,
    } = useProjects();

    const { projectWebsites
    } = useProjectWebsites(activeProjectData?._id);

    const {
        avgResponseTime,
        totalMonitors,
        openIncidents,
    } = useProjectMetrics(projectWebsites);

    const [sidebarSelection, setSidebarSelection] = useState('monitors')
    const [selectedWebsite, setSelectedWebsite] = useState(null);


    const [modalType, setModalType] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const onClose = () => {
        setShowModal(false);
        setModalType(null);
    };

    return (
        <div className="min-h-screen h-screen min-w-screen w-screen bg-[#0a0b0d] text-white flex overflow-hidden
        font-light text-sm">

            <SidebarLayout
                projects={projects}
                activeProjectData={activeProjectData}
                setActiveProjectData={setActiveProjectData}
                sidebarSelection={sidebarSelection}
                setSidebarSelection={setSidebarSelection}
                setModalType={setModalType}
                setShowModal={setShowModal}
            />

            {sidebarSelection === 'monitors' &&
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
                />}


            {showModal &&
                <Modal1 onClose={onClose}>
                    {modalType === "createProject" &&
                        <NewProject
                            setProjects={setProjects}
                            onClose={onClose}

                        />
                    }

                    {modalType === "addWebsite" &&
                        <AddWebsite
                            activeProjectData={activeProjectData}
                            onClose={onClose}
                        />
                    }
                    {modalType === "editProject" &&
                        <EditProject
                            activeProjectData={activeProjectData}
                            onClose={onClose}
                        />
                    }
                    {modalType === "notifySettings" &&
                        <NotificationSettings
                            activeProjectData={activeProjectData}
                            onClose={onClose}
                        />
                    }
                    {modalType === "deleteProject" &&
                        <DeleteProject
                            project={activeProjectData}
                            setProjects={setProjects}
                            onClose={onClose}
                        />
                    }
                    {modalType === "websiteDetails" &&
                        <WebsiteDetails
                            website={selectedWebsite}
                            onClose={onClose}
                        // project={activeProjectData}
                        // setProjects={setProjects}
                        // onClose={onClose}
                        />
                    }



                </Modal1>
            }

        </div>);
}