import { CircleAlert, CircleCheckBig, Clock, X } from "lucide-react";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import getStatusSince from "../utilis/statusSince";
import ResponseTimeChart from "./Charts/ResponseTimeChart";
import WeeklyUptimeChart from "./Charts/WeeklyTimeChart";

export default function WebsiteDetails({ website, onClose }) {
  if (!website) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case "UP":
        return <CircleCheckBig className="w-4 h-4 text-green-400" />;

      case "DOWN":
        return <CircleAlert className="w-4 h-4 text-yellow-400" />;

      case "MAINTENANCE":
        return <Clock className="w-4 h-4 text-blue-400" />;

      default:
        return <CircleAlert className="w-4 h-4 text-gray-400" />;
    }
  };
  const responseChartData =
    website.history?.map((item) => ({
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
      className="w-[1100px] max-w-[95vw] h-[84vh] bg-[#111217] rounded-2xl border border-white/10
     
        overflow-hidden"
    >
      <div
        className="w-full h-full overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-blue-900/10
               flex flex-col gap-7"
      >
        {/* Header */}

        <div className="flex items-start justify-between px-7 py-6 border-b border-white/10">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-light">{website.url}</h2>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              {getStatusIcon(website.status)}

              <span>{website.status}</span>

              {website.statusSince && (
                <>
                  <span>•</span>

                  <span>
                    for {getStatusSince(new Date(website.statusSince))}
                  </span>
                </>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Performance */}

        <div className="px-7 py-6">
          <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">
            Performance
          </h3>

          <div className="space-y-1">
            <Row
              label="Response Time"
              value={
                <span className="flex items-center gap-2">
                  <QueryBuilderIcon fontSize="small" />
                  {website.responseTime} ms
                </span>
              }
            />

            <Row
              label="Last Checked"
              value={
                website.lastCheckedAt
                  ? getStatusSince(new Date(website.lastCheckedAt)) + " ago"
                  : "-"
              }
            />

            <Row
              label="Checks Stored"
              value={website.last14Checks?.length ?? 0}
            />
          </div>
        </div>

        {/* Status */}

        <div className="px-7 py-6 border-t border-white/10">
          <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">
            Status
          </h3>

          <div className="space-y-1">
            <Row label="Current Status" value={website.status} />

            <Row
              label="Status Since"
              value={
                website.statusSince
                  ? getStatusSince(new Date(website.statusSince))
                  : "-"
              }
            />

            <Row label="Status Code" value={website.statusCode ?? "-"} />
          </div>
        </div>

        {/* Incident */}

        <div className="px-7 py-6 border-t border-white/10">
          <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">
            Current Incident
          </h3>

          {website.errorCode || website.errorMessage ? (
            <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
              {website.errorCode && (
                <div className="text-sm text-yellow-300">
                  {website.errorCode}
                </div>
              )}

              {website.errorMessage && (
                <div className="mt-2 text-sm text-gray-300">
                  {website.errorMessage}
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-500 text-sm">No active incident.</div>
          )}
        </div>
        <div className="min-h-80 p-6 py-7 w-2/3 border rounded-2xl ml-6 border-white/10">
          <ResponseTimeChart data={responseChartData} />
        </div>
        <div className="min-h-64 p-6 py-7 w-1/2 border rounded-2xl ml-6 border-white/10 mb-7">
          <WeeklyUptimeChart />
        </div>
      </div>
    </div>
  );
}
