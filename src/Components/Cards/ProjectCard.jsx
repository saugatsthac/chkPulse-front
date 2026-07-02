export default function ProjectCard({ p, isActive, setActiveProjectData }) {

    return (
        <div
            onClick={() => {
                setActiveProjectData(p)
            }}
            className={`flex gap1 w-full px-3 py-2 transition-all duration-300 flex-col cursor-pointer rounded-lg
                                ${isActive ? 'bg-white/10' : 'hover:bg-white/20'}`}
        >
            <span className="flex items-center gap-2">
                <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: p.color }}
                />
                <span>
                    {p.name}
                </span>
            </span>
            {/* <span className="text-sm text-white/80 w-full text-right">
                {p.description}
            </span> */}
        </div>


    )
}