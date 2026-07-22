import { useFieldArray } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import QuickActionButton from "../../../components/Buttons/QuickActionButton";

export default function WebsiteFields({ control, register, watch }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "websites",
  });

  return (
    <div className="pl6">
      <h2 className="mb-2">Website URLs</h2>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <input
              {...register(`websites.${index}.url`, {
                validate: (value) => {
                  if (!value.trim()) return true;

                  try {
                    new URL(value);
                  } catch {
                    return "Invalid URL";
                  }

                  const urls = watch("websites")
                    .map((w) => w.url.trim())
                    .filter(Boolean);

                  const duplicates = urls.filter(
                    (u) => u === value.trim(),
                  ).length;

                  return duplicates > 1 ? "Duplicate URL" : true;
                },
              })}
              className="flex-1 p-3 rounded-lg border border-white/15"
              placeholder="https://example.com"
            />

            <button type="button" onClick={() => remove(index)}>
              <DeleteIcon />
            </button>
          </div>
        ))}
      </div>

      {fields.length < 5 && (
        <div className="mt-3 flex justify-end">
          <QuickActionButton type="button" onClick={() => append({ url: "" })}>
            + Add
          </QuickActionButton>
        </div>
      )}
    </div>
  );
}
// import { useEffect, useState } from "react";
// import axios from "axios";

// const ProjectEdit = ({ project, onClose, onUpdated }) => {
//   const [name, setName] = useState("");
//   const [websites, setWebsites] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!project) return;

//     setName(project.name);
//     setWebsites(project.websites || []);
//   }, [project]);

//   const handleUrlChange = (index, value) => {
//     const updated = [...websites];
//     updated[index].url = value;
//     setWebsites(updated);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const token = localStorage.getItem("token");

//       await axios.put(
//         `${import.meta.env.VITE_API_URL}/projects/${project._id}`,
//         {
//           name,
//           websites,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       onUpdated?.();
//       onClose?.();
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-4 px-6 py-7 w-fit bg-[#111217] rounded-xl flex gap-1 flex-col"
//     >
//       {/* <div> */}
//       {/* <div className="flex gap-1 items-baseline text-lg">
//         <span>Project Name:</span>
//         <span className="textlg font-semibold">{name}</span>
//       </div> */}

//       {/* <input
//           className="border p-2 w-full"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         /> */}
//       {/* </div> */}
//       {/* <label>Website {index + 1}</label> */}

//       <div className="flex flex-col gap-1">
//         {websites.map((website, index) => (
//           <input
//             key={website._id}
//             placeholder={`Website ${index + 1}`}
//             className="border p-2 w-[30vw] border-white/20 rounded"
//             value={website.url}
//             onChange={(e) => handleUrlChange(index, e.target.value)}
//           />
//         ))}
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         className="bg-blue-600 text-white px-4 py-2 rounded ml-auto hover:bg-blue-700"
//       >
//         {loading ? "Saving..." : "Save Changes"}
//       </button>
//     </form>
//   );
// };

// export default ProjectEdit;
