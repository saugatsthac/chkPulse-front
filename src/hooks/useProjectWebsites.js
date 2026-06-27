import { useState, useEffect } from "react";
import api from "../api/axios";
import { io } from "socket.io-client";

export default function useProjectWebsites(projectId) {
    const [projectWebsites, setProjectWebsites] = useState({});

    const loadWebsites = async (projectId) => {
        if (!projectId) return;
        if (projectWebsites[projectId]) return;

        try {
            const { data } = await api.get(
                `/projects/${projectId}/websites`
            );

            const websitesWithHistory = data.map((website) => ({
                ...website,
                // statusChanges:
                //     data.statusChanged?.[website._id] || []
            }));

            setProjectWebsites((prev) => ({
                ...prev,
                [projectId]: websitesWithHistory,
            }));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadWebsites(projectId);
    }, [projectId]);

    useEffect(() => {
        console.log('Project Websites', projectWebsites)
    }, [projectWebsites]);


    useEffect(() => {
        const socket = io(import.meta.env.VITE_API_URL, {
            auth: {
                token: localStorage.getItem("token"),
            },
        });
        
        socket.on("websiteUpdate", (data) => {
            setProjectWebsites((prev) => {
                const websites = prev[data.projectId] || [];

                return {
                    ...prev,
                    [data.projectId]: websites.map((w) =>
                        w._id === data.websiteId
                            ? { ...w, ...data }
                            : w
                    ),
                };
            });
        });

        return () => socket.disconnect();
    }, []);

    return {
        projectWebsites:
            projectWebsites[projectId] || [],
    };
}