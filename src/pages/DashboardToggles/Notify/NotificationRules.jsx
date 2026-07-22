export default function NotificationRules() {
    return (
        <div className="bg-[#111217] border border-white/10 rounded-2xl p-6 mt-6">

            <h2 className="text-lg mb-5">
                Default Notification Rules
            </h2>

            <div className="space-y-4">

                <label className="flex gap-3">
                    <input type="checkbox" defaultChecked />
                    Notify when monitor goes DOWN
                </label>

                <label className="flex gap-3">
                    <input type="checkbox" defaultChecked />
                    Notify when monitor RECOVERS
                </label>

                <label className="flex gap-3">
                    <input type="checkbox" />
                    Notify on slow response times
                </label>

            </div>

            <div className="mt-8">

                <div className="text-gray-500 mb-2">
                    Cooldown
                </div>

                <select className="bg-slate-900 border border-white/10 rounded-lg px-3 py-2">

                    <option>
                        5 minutes
                    </option>

                    <option>
                        15 minutes
                    </option>

                    <option>
                        30 minutes
                    </option>

                    <option>
                        1 hour
                    </option>

                </select>

            </div>

        </div>
    );
}