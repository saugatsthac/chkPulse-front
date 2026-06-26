import AddIcon from "@mui/icons-material/Add";
import NotificationChannelCard from "./NotificationChannelCard";
import EmptyNotificationState from "./EmptyNotificationState";
import NotificationRules from "./NotificationRules";

export default function NotificationsLayout({
    channels = [],
    setShowModal,
    setModalType,
}) {
    return (
        <div className="grow overflow-y-auto px-6 py-7">

            <div className="flex justify-between items-center mb-8">

                <div>
                    <h1 className="text-2xl font-light">
                        Notifications
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Configure where monitoring alerts are delivered.
                    </p>
                </div>

                <button
                    onClick={() => {
                        setModalType("addNotificationChannel");
                        setShowModal(true);
                    }}
                    className="rounded-xl px-4 py-2 bg-slate-800 hover:bg-slate-700 flex items-center gap-2"
                >
                    <AddIcon />
                    Add Channel
                </button>

            </div>

            {channels.length === 0 ? (
                <EmptyNotificationState
                    setShowModal={setShowModal}
                    setModalType={setModalType}
                />
            ) : (
                <>
                    <div className="flex flex-col gap-3">

                        {channels.map(channel => (
                            <NotificationChannelCard
                                key={channel._id}
                                channel={channel}
                            />
                        ))}

                    </div>

                    <NotificationRules />

                </>
            )}

        </div>
    );
}