import { useMemo } from "react";

export default function useProjectMetrics(projectWebsites) {
    const avgResponseTime = useMemo(() => {
        if (!projectWebsites.length) return 0;

        return (
            projectWebsites.reduce(
                (sum, w) => sum + (w.responseTime || 0),
                0
            ) / projectWebsites.length
        );
    }, [projectWebsites]);

    const totalMonitors = useMemo(() => {
        return projectWebsites.length;
    }, [projectWebsites]);

    const openIncidents = useMemo(() => {
        if (!projectWebsites.length) return undefined;
        return projectWebsites.filter(
            (w) => w.status !== "UP"
        ).length;
    }, [projectWebsites]);

    return {
        avgResponseTime,
        totalMonitors,
        openIncidents,
    };
}