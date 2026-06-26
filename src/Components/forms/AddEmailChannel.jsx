import { useState } from "react";

export default function AddEmailChannel({
    onClose,
}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    return (
        <div className="w-[600px] bg-[#111217] rounded-2xl p-8">

            <h2 className="text-2xl font-light">
                Add Email Channel
            </h2>

            <div className="mt-8 flex flex-col gap-6">

                <div>

                    <label className="text-sm text-gray-400">
                        Channel Name
                    </label>

                    <input
                        className="mt-2 w-full bg-slate-900 rounded-xl p-3"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        placeholder="Personal Email"
                    />

                </div>

                <div>

                    <label className="text-sm text-gray-400">
                        Email Address
                    </label>

                    <input
                        className="mt-2 w-full bg-slate-900 rounded-xl p-3"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        placeholder="example@email.com"
                    />

                </div>

                <div className="flex justify-end gap-3">

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
    );
}