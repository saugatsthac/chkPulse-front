import { useState, useEffect } from "react";
import api from "../api/axios";

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [activeProjectData, setActiveProjectData] = useState(null);

  const loadProjects = async () => {
    try {
      const { data } = await api.get("/projects");
      setProjects(data);

      if (data?.length) {
        setActiveProjectData(data[0]);
      }
    } catch (err) {
      console.error("Failed to load projects:", err);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // useEffect(() => {
  //     console.log('Projects:', projects, 'Active Project:', activeProjectData)
  // }, [projects]);

  return {
    projects,
    setProjects,
    activeProjectData,
    setActiveProjectData,
  };
}
