import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import EditNotificationsIcon from '@mui/icons-material/EditNotifications';
import DeleteIcon from '@mui/icons-material/Delete';

export function ProjectHeader({ activeProjectData, setModalType, setShowModal }) {
    return (
        <div className="flex flex-col items-start gap-7 w-full bg-[#111217] rounded-2xl px-6 py-7
        border border-white/10">

            <span className="text-lg flex items-center gap-3">
                <span
                    className="w-3 h-3 rounded-full inline-block"
                    style={{ backgroundColor: activeProjectData?.color }}
                />
                <span className='text-5xl font-bold italic tracking-tight'>
                    {/* # */}
                    {/* Namey */}
                    {activeProjectData?.name}
                </span>
            </span>
        </div>
    )
}
{/* <div className='flex gap-2 grow justify-between w-full'> */ }
{/* <div className='flex gap-2'>

                    <button className="rounded-lg px-3 py-1.5 w-fit flex items-center gap-2 mb-2
                    bg-slate-800/40 hover:bg-slate-800"
                        onClick={() => {
                            setModalType('editProject')
                            setShowModal(true)
                        }}>
                        <EditIcon />
                        <span className='font-ligh'>
                            Edit Project
                        </span>
                    </button>
                    <button className="rounded-lg px-3 py-1.5 w-fit flex items-center gap-2 mb-2
                    bg-slate-800/40 hover:bg-slate-800"
                        onClick={() => {
                            setModalType('notifySettings')
                            setShowModal(true)
                        }}>
                        <EditNotificationsIcon />
                        <span className='font-ligh'>
                            Notify Settings
                        </span>
                    </button>
                    <button className="rounded-lg px-3 py-1.5 w-fit flex items-center gap-2 mb-2
                    bg-slate-800/40 hover:bg-slate-800"
                        onClick={() => {
                            setModalType('deleteProject')
                            setShowModal(true)
                        }}>
                        <DeleteIcon />
                        <span className='font-ligh'>
                            Delete Project
                        </span>
                    </button>
                </div> */}

{/* </div> */ }
