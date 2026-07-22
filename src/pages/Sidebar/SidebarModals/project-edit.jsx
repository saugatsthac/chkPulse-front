import { useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "../../../api/axios";

import WebsiteFields from "./components/WebsiteFields";

export default function EditWebsites({
  projectWebsites,
  setProjectWebsites,
  onClose,
}) {
  console.log("projectWebsites22", projectWebsites);
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      websites: [{ url: "" }],
    },
  });

  useEffect(() => {
    if (!projectWebsites) return;

    reset({
      websites: projectWebsites?.length ? projectWebsites : [{ url: "" }],
    });
  }, [projectWebsites, reset]);

  async function handleSave(values) {
    try {
      const res = await api.patch(`/projects/${project._id}/websites`, {
        websites: values.websites.map((w) => w.url.trim()).filter(Boolean),
      });

      setProjectWebsites((prev) => ({
        ...prev,
        [project._id]: res.data.websites,
      }));

      onClose();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleSave)}
      className="bg-[#111827] border border-slate-800 rounded-2xl p-6 w-[500px]"
    >
      <h2 className="text-lg font-semibold mb-4">Edit Websites</h2>

      <WebsiteFields control={control} register={register} watch={watch} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-6 py-2 rounded-lg bg-blue-600 text-white"
      >
        {isSubmitting ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import api from "../../api/axios";

// const COLORS = [
//   "#3b82f6",
//   "#ef4444",
//   "#22c55e",
//   "#f59e0b",
//   "#a855f7",
//   "#ec4899",
// ];

// export default function EditProject({ project, setProjects, onClose }) {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     setValue,
//     formState: { isSubmitting, errors },
//   } = useForm({
//     defaultValues: {
//       name: "",
//       color: "#3b82f6",
//     },
//   });

//   useEffect(() => {
//     if (!project) return;

//     reset({
//       name: project.name,
//       color: project.color || "#3b82f6",
//     });
//   }, [project, reset]);

//   const color = watch("color");

//   const handleSave = async (values) => {
//     try {
//       const res = await api.patch(`/projects/${project._id}`, values);

//       setProjects((prev) =>
//         prev.map((p) => (p._id === project._id ? res.data.project : p)),
//       );

//       onClose();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(handleSave)}
//       className="bg-[#111827] border border-slate-800 rounded-2xl p-6 w-[420px]"
//     >
//       <h2 className="text-lg font-semibold mb-4">Edit Project</h2>

//       <input
//         {...register("name", {
//           required: "Project name is required",
//         })}
//         className="w-full mb-3 px-3 py-2 rounded-lg bg-[#0B1220] border border-slate-700"
//       />

//       <div className="flex gap-2 mb-4">
//         {COLORS.map((c) => (
//           <button
//             key={c}
//             type="button"
//             onClick={() => setValue("color", c)}
//             className={`w-8 h-8 rounded-full border-2
//                         ${color === c ? "border-white" : "border-transparent"}`}
//             style={{ backgroundColor: c }}
//           />
//         ))}
//       </div>

//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="w-full py-2 rounded-lg text-white"
//         style={{ backgroundColor: color }}
//       >
//         {isSubmitting ? "Saving..." : "Save Changes"}
//       </button>
//     </form>
//   );
// }
