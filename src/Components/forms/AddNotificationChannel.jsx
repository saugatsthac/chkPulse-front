import EmailIcon from "@mui/icons-material/Email";
import DiscordIcon from "@mui/icons-material/SportsEsports";

export default function AddNotificationChannel({
    setModalType,
}) {
    return (
        <div className="w-[600px] bg-[#111217] rounded-2xl p-8">

            <h2 className="text-2xl font-light">
                Add Notification Channel
            </h2>

            <p className="text-gray-500 mt-2">
                Choose how you would like to receive alerts.
            </p>

            <div className="mt-8 flex flex-col gap-4">

                <button
                    onClick={() =>
                        setModalType("addEmailChannel")
                    }
                    className="border border-white/10 rounded-xl p-5 text-left hover:bg-slate-800 transition"
                >
                    <div className="flex gap-4 items-center">

                        <EmailIcon />

                        <div>

                            <div className="text-lg">
                                Email
                            </div>

                            <div className="text-gray-500 text-sm">
                                Receive alerts in your inbox.
                            </div>

                        </div>

                    </div>

                </button>

                <button
                    onClick={() =>
                        setModalType("addDiscordChannel")
                    }
                    className="border border-white/10 rounded-xl p-5 text-left hover:bg-slate-800 transition"
                >
                    <div className="flex gap-4 items-center">

                        <DiscordIcon />

                        <div>

                            <div className="text-lg">
                                Discord
                            </div>

                            <div className="text-gray-500 text-sm">
                                Send alerts to a Discord channel.
                            </div>

                        </div>

                    </div>

                </button>

            </div>

        </div>
    );
}