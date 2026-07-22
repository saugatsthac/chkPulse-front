import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AddProjectAndWebsites({ data }) {
  const MAX_WEBSITES = 5;

  const [projectName, setProjectName] = useState(data?.projectName || "");

  const [websites, setWebsites] = useState(Array(5).fill(""));
  const [color, setColor] = useState("#3b82f6");
  const [loading, setLoading] = useState(false);

  const COLORS = [
    "#3b82f6",
    "#ef4444",
    "#22c55e",
    "#f59e0b",
    "#a855f7",
    "#ec4899",
  ];

  function removeWebsite(index) {
    setWebsites((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="bg-[#111217] border border-white/10 rounded-2xl p-7 px-6 w-[60vw] flex flex-col">
      <h1 className="text-lg font-light text-white/90 w-full">
        Add project and websites
      </h1>
      <div className="flex w-full gap-2">
        <div className="flex flex-col items-baseline gap-2 mt-3.5 borderb pb-7 border-white/10 w-1/2">
          <h1 className="pl-1">Project name</h1>

          <input
            value={projectName}
            className="border border-white/15 rounded-lg p-2 w-3/4"
            onChange={(e) => setProjectName(e.target.value)}
          />
          <div className="flex gap-6 items-center text-right w-full justifybetween flex-wrap mt-3 px-2">
            <span>Pick color</span>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-6.5 h-6.5 rounded-full border transition
                    ${color === c ? "border-white scale-110" : "border-transparent"}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-3.5 w-1/2 h-[20vw]">
          <h2 className="pl-1">Website urls</h2>
          {/* <div className="scrollbar-gutter-stable gap-2 flex flex-col px-2 py-3 border border-white/10"> */}
          {websites.map((website, index) => (
            <div className="flex gap-2 items-center">
              <input
                key={index}
                value={website}
                className="p-2 border border-white/15 rounded-lg flex-1"
                onChange={(e) => updateWebsite(index, e.target.value)}
                placeholder="https://example.com"
                onChange={(e) => {
                  const updated = [...websites];
                  updated[index] = e.target.value;
                  setWebsites(updated);
                }}
              />
              {/* {website.length > 0 && <span>X</span>} */}
              {website && <DeleteIcon />}
            </div>
          ))}
          {/* </div> */}
        </div>
      </div>
      <button
        className="mt-7 border rounded-lg py-3 px-6 bg-white/10 border-transparent ml-auto text-right w-fit
        hover:bg-blue-600 transition-color duration-200"
        onClick={() => {}}
      >
        Save
        {/* Add Website */}
      </button>
    </div>
  );
}

//   => {
//     if (data?.websites?.length) {
//       return data.websites.map((site) => site.url);
//     }

//     return [""];
//   });

//   function updateWebsite(index, value) {
//     setWebsites((prev) => {
//       const next = [...prev];
//       next[index] = value;
//       return next;
//     });
//   }

//   function addWebsite() {
//     if (websites.length >= MAX_WEBSITES) return;

//     setWebsites((prev) => [...prev, ""]);
//   }
//   placeholder="Project name"
// <div key={index}>
{
  /* {websites.length < MAX_WEBSITES && ( */
}
{
  /* )} */
}
//   {websites.length > 1 && (
//     <button onClick={() => removeWebsite(index)}>Remove</button>
//   )}
// </div>
