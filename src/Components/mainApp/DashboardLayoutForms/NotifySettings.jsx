import { useState } from "react";

export default function NotificationSettings({
    onClose,
}) {
    const [emailAlerts, setEmailAlerts] =
        useState(true);

    const [downAlerts, setDownAlerts] =
        useState(true);

    const [recoveryAlerts, setRecoveryAlerts] =
        useState(true);

    const handleSave = () => {
        console.log({
            emailAlerts,
            downAlerts,
            recoveryAlerts,
        });

        onClose();
    };

    return (
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 w-[450px]">
            <h2 className="text-xl font-semibold mb-6">
                Notification Settings
            </h2>

            <div className="space-y-4">

                <label className="flex justify-between items-center">
                    <span>Email Alerts</span>
                    <input
                        type="checkbox"
                        checked={emailAlerts}
                        onChange={() =>
                            setEmailAlerts(v => !v)
                        }
                    />
                </label>

                <label className="flex justify-between items-center">
                    <span>Website Down</span>
                    <input
                        type="checkbox"
                        checked={downAlerts}
                        onChange={() =>
                            setDownAlerts(v => !v)
                        }
                    />
                </label>

                <label className="flex justify-between items-center">
                    <span>Website Recovery</span>
                    <input
                        type="checkbox"
                        checked={recoveryAlerts}
                        onChange={() =>
                            setRecoveryAlerts(v => !v)
                        }
                    />
                </label>

            </div>

            <button
                onClick={handleSave}
                className="w-full mt-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
            >
                Save Settings
            </button>
        </div>
    );
}