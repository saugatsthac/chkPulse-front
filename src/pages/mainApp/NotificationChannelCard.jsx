import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function NotificationChannelCard({
    channel,
}) {
    return (
        <div className="bg-[#111217] border border-white/10 rounded-2xl p-5 flex justify-between">

            <div>

                <div className="text-lg">
                    {channel.name}
                </div>

                <div className="text-sm text-gray-500 mt-1">
                    {channel.type}
                </div>

                <div className="text-sm text-gray-400">
                    {channel.value}
                </div>

            </div>

            <div className="flex items-center gap-4">

                <span
                    className={`text-sm ${
                        channel.enabled
                            ? "text-green-400"
                            : "text-gray-500"
                    }`}
                >
                    {channel.enabled
                        ? "Enabled"
                        : "Disabled"}
                </span>

                <button>
                    <MoreVertIcon />
                </button>

            </div>

        </div>
    );
}