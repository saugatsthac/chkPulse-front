import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import DropdownItem from "../../components/Buttons/DropdownItem";

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
          <Menu>
            <MenuButton className="text-white/30 hover:text-white flex items-center justify-center p-1 rounded-lg hover:bg-white/5 transition-colors outline-none">
              {/* onClick={() => {
              setShowModal(true);
              setModalType("addProjectAndWebsite");
            }} */}
              {/* <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"> */}
              {/* <OpenInFullIcon fontSize="" /> */}
              <MoreVertIcon />
              {/* </button> */}
            </MenuButton>
            <MenuItems
              anchor="bottom end"
              className="mt-2 w-44 origin-top-right rounded-xl border border-white/10 bg-[#0f1117] shadow-[0_10px_30px_rgba(0,0,0,0.45)]
                backdrop-blur-xl p-1 focus:outline-none z-50"
            >
              <DropdownItem
                onClick={() => {
                  // setSelectedWebsite(w);
                  setModalType("renameProject");
                  setShowModal(true);
                }}
              >
                Rename
              </DropdownItem>
              <DropdownItem
                onClick={(e) => {
                  // setSelectedWebsite(w);
                  setModalType("editProject");
                  setShowModal(true);
                }}
              >
                Edit monitors
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  // setSelectedWebsite(w);
                  setModalType("deleteProject");
                  setShowModal(true);
                }}
                danger
              >
                Delete Project
              </DropdownItem>
            </MenuItems>
          </Menu>
        </div>
      </span>
      {/* <span className="text-sm text-white/80 w-full text-right">
                {p.description}
            </span> */}
    </div>
  );
}
