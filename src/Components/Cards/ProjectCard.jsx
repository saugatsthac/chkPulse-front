import OpenInFullIcon from "@mui/icons-material/OpenInFull";

export default function ProjectCard({
  p,
  isActive,
  setActiveProjectData,
  length,
  setShowModal,
  setModalType,
}) {
  return (
    <div
      onClick={() => {
        setActiveProjectData(p);
      }}
      className={`flex gap1 w-full px-3 py-3 transition-all duration-300 flex-col cursor-pointer rounded-xl group border
                                ${isActive ? "bg-white/10 border-white/10" : "hover:bg-white/20 border-transparent"}`}
    >
      <span className="flex items-center gap-4 pl-2 pr-2">
        <span
          className="w-3.5 h-3 rounded-full"
          style={{ backgroundColor: p.color }}
        />
        <div className="flex w-full justify-between items-center">
          <span>
            {p.name}
            {p.length}
          </span>
          <button
            onClick={() => {
              setShowModal(true);
              setModalType("addProjectAndWebsite");
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <OpenInFullIcon fontSize="" />
          </button>
        </div>
      </span>
      {/* <span className="text-sm text-white/80 w-full text-right">
                {p.description}
            </span> */}
    </div>
  );
}
