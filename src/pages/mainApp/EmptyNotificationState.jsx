import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AddIcon from "@mui/icons-material/Add";

export default function EmptyNotificationState({
    setShowModal,
    setModalType,
}) {
    return (
        <div className="bg-[#111217] border border-white/10 rounded-2xl py-20 flex flex-col items-center">

            <NotificationsActiveIcon
                sx={{ fontSize: 60 }}
            />

            <div className="mt-5 text-xl">
                No notification channels
            </div>

            <div className="text-gray-500 mt-2">
                Add an email or Discord webhook to receive alerts.
            </div>

            <button
                className="mt-8 bg-slate-800 hover:bg-slate-700 rounded-xl px-5 py-2 flex gap-2 items-center"
                onClick={() => {
                    setModalType("addNotificationChannel");
                    setShowModal(true);
                }}
            >
                <AddIcon />
                Add Channel
            </button>

        </div>
    );
}