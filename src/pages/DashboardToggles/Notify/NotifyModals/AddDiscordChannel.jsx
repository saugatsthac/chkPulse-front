import { useState } from "react";

export default function AddDiscordChannel({
onClose,
}) {
const [name, setName] = useState("");
const [webhook, setWebhook] = useState("");

return (
<div className="w-[600px] bg-[#111217] rounded-2xl p-8">

    <h2 className="text-2xl font-light">
        Add Discord Channel
    </h2>

    <div className="mt-8 flex flex-col gap-6">

        <div>

            <label className="text-sm text-gray-400">
                Channel Name
            </label>

            <input className="mt-2 w-full bg-slate-900 rounded-xl p-3" value={name} onChange={(e)=>
            setName(e.target.value)
            }
            placeholder="Development Server"
            />

        </div>

        <div>

            <label className="text-sm text-gray-400">
                Discord Webhook URL
            </label>

            <textarea className="mt-2 w-full bg-slate-900 rounded-xl p-3 h-28 resize-none" value={webhook}
                onChange={(e)=>
                            setWebhook(e.target.value)
                        }
                        placeholder="https://discord.com/api/webhooks/..."
                    />

                </div>

                <div className="flex justify-between">

                    <button
                        className="px-5 py-2 rounded-xl bg-slate-800"
                    >
                        Test Connection
                    </button>

                    <div className="flex gap-3">

                        <button
                            onClick={onClose}
                            className="px-5 py-2 rounded-xl bg-slate-800"
                        >
                            Cancel
                        </button>

                        <button
                            className="px-5 py-2 rounded-xl bg-blue-600"
                        >
                            Save
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}