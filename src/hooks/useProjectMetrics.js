import { useMemo } from "react";

export default function useProjectMetrics(projectWebsites) {
  const avgResponseTime = useMemo(() => {
    if (!projectWebsites.length) return 0;

    return (
      projectWebsites.reduce((sum, w) => sum + (w.responseTime || 0), 0) /
      projectWebsites.length
    );
  }, [projectWebsites]);

  const totalMonitors = useMemo(() => {
    return projectWebsites.length;
  }, [projectWebsites]);

  const openIncidents = useMemo(() => {
    if (!projectWebsites.length) return undefined;
    return projectWebsites.filter((w) => w.status !== "UP").length;
  }, [projectWebsites]);

  const days30Uptime = useMemo(() => {
    if (!projectWebsites.length) return undefined;
    return (
      projectWebsites.reduce(
        (sum, w) => sum + (Number(w.days30Uptime) || 0),
        0,
      ) / projectWebsites.length
    );
  }, [projectWebsites]);

  // const averageReponseTime=useMemo(()=>{
  //       if (!projectWebsites.length) return undefined;

  //       return(

  //       )
  // })

  console.log("hey", days30Uptime);
  return {
    avgResponseTime,
    totalMonitors,
    openIncidents,
    days30Uptime,
  };
}
