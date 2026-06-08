import { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";
import ProjectAndUrls from "../Components/ProjectAndUrls";
import DashboardLayout from "../components/DashboardLayout";
import Modal1 from "../Components/Modal1";
import AddWebsite from "../Forms/AddWebsite";
import NewProject from "../Forms/NewProject";
import Main from "../Components/Main";
import api from "../api/axios";

export default function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [activeProjectData, setActiveProjectData] = useState(null);

    const loadProjects = async () => {
        try {
            const { data } = await api.get("/projects");
            setProjects(data);
            console.log("Fetched projects:", data);
            const initial = data?.[0];
            console.log("Initial active project:", initial);
            setActiveProjectData(initial);
        }
        catch (err) {
            console.error("Failed to load projects:", err);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);



    const [projectWebsites, setProjectWebsites] = useState({});

    const loadWebsites = async (projectId) => {
        if (!projectId) return;
        // if projectWebsites.has(projectId) return;
        if (projectWebsites[projectId]) return;
        const res = await fetch(
            `http://localhost:3000/projects/${projectId}/websites`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        const data = await res.json();

        setProjectWebsites(prev => ({
            ...prev,
            [projectId]: data
        }));
    };

    useEffect(() => {
        loadWebsites(activeProjectData?._id);
    }, [activeProjectData?._id]);

    useEffect(() => {
        console.log('projectWebsites', projectWebsites)
    }, [projectWebsites])

    useEffect(() => {
        const socket = io("http://localhost:3000", {
            auth: {
                token: localStorage.getItem("token")
            }
        });

        socket.on("websiteUpdate", (data) => {
            setProjectWebsites(prev => {
                const websites = prev[data.projectId] || [];

                return {
                    ...prev,
                    [data.projectId]: websites.map(w =>
                        w._id === data.websiteId
                            ? { ...w, ...data }
                            : w
                    )
                };
            });
        });

        return () => {
            socket.disconnect();
        };
    }, []);


    const [modalType, setModalType] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const onClose = () => {
        setShowModal(false);
        setModalType(null);
    };

    return (<div className="min-h-screen h-screen min-w-screen w-screen bg-[#0B0F19] text-white flex gap-2" >

        <ProjectAndUrls
            projects={projects}
            activeProjectData={activeProjectData}
            setActiveProjectData={setActiveProjectData}
            setModalType={setModalType}
            setShowModal={setShowModal}
        />

        <Main setShowModal={setShowModal} setModalType={setModalType}
            activeProjectData={activeProjectData}
            projectWebsites={projectWebsites[activeProjectData?._id] || []}
        />


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

            </Modal1>
        }

    </div>);
}
// const [websites, setWebsites] = useState([]);
// const [url, setUrl] = useState("");

// const loadWebsites = useCallback(async () => {
//     if (!activeProjectData?._id) return;

//     const res = await fetch(`http: //localhost:3000/projects/${activeProject._id}/websites`,
//         {
//             headers: {
//                 Authorization: `Bearer $ {localStorage.getItem("token")}`,
//             },
//         });

//     const data = await res.json();
//     setWebsites(data);
// }, [activeProjectData]);

// const visibleWebsites = websites.filter((w) =>
//     w.url.toLowerCase().includes(search.toLowerCase())
// );

// useEffect(() => {
//     console.log("Projects updated:", projects);
// }, [projects]);

// useEffect(() => {
//     loadProjects();
// }, []);

// useEffect(() => {
//     console.log('projects', projects);
// }, [projects])

// useEffect(() => {
//     loadWebsites();
//     localStorage.setItem("activeProject", activeProject);
// }, [activeProject]);

// useEffect(() => {
//     console.log("Active project data changed:", activeProjectData);
// }, [activeProjectData])

{/* <DashboardLayout
            websites={visibleWebsites}
            url={url}
            setUrl={setUrl}
            activeProjectName={activeProjectData?.name || "Workspace"}
            handleAddWebsite={handleAddWebsite}
        /> */}