import { useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "../../../api/axios";
import WebsiteFields from "./components/WebsiteFields";

const COLORS = [
  "#3b82f6",
  "#ef4444",
  "#22c55e",
  "#f59e0b",
  "#a855f7",
  "#ec4899",
];

export default function AddProjectAndWebsites({
  data,
  onSubmit,
  onClose,
  setProjectWebsites,
  // projectWebsites,
}) {
  console.log("data", data);
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      color: "#3b82f6",
      websites: [{ url: "" }],
    },
  });

  const color = watch("color");

  async function submit(values) {
    try {
      const response = await api.post("/projects", {
        name: values.name,
        color: values.color,
        websites: values.websites.map((w) => w.url.trim()).filter(Boolean),
      });

      if (responseData.removedWebsiteIds.length > 0) {
        setProjectWebsites((prev) => ({
          ...prev,
          [responseData.project._id]: prev[responseData.project._id].filter(
            (website) => !responseData.removedWebsiteIds.includes(website._id),
          ),
        }));
      }
      if (responseData.addedWebsites.length > 0) {
        setProjectWebsites((prev) => ({
          ...prev,
          [responseData.project._id]: [
            ...prev[responseData.project._id],
            ...responseData.addedWebsites,
          ],
        }));
      }
      console.log("received", responseData);
      onClose();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="bg-[#111217] border border-white/10 rounded-2xl px-6 py-7 w-[60vw]"
    >
      <h1 className="text-xl font-medium mb-8">Add Project</h1>

      <div className="grid grid-cols-2 gap10 divide-x divide-white/10">
        <div className="pr-6">
          <label className="pl-1">Project Name</label>

          <input
            {...register("name", {
              required: "Project name is required",
            })}
            className="w-full mt-2 p-3 rounded-lg border border-white/15"
          />

          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
          )}

          <h3 className="mt-8 mb-3 pl-1">Project Color</h3>

          <div className="flex gap-3">
            {COLORS.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() =>
                  reset({
                    ...watch(),
                    color: c,
                  })
                }
                className={`w-8 h-8 rounded-full border-2 ${
                  color === c ? "border-white scale-110" : "border-transparent"
                }`}
                style={{
                  background: c,
                }}
              />
            ))}
          </div>
        </div>
        <div className="pl-6">
          <WebsiteFields control={control} register={register} watch={watch} />
        </div>
      </div>
      <div className="flex justify-end mt-10">
        <button
          disabled={isSubmitting}
          className="bg-blue-600 px-6 py-3 rounded-lg"
        >
          {isSubmitting ? "Saving..." : "Save Project"}
        </button>
      </div>
    </form>
  );
}
// const payload = {
//   // projectId: data?._id, // undefined when creating
//   name: values.name,
//   color: values.color,
//   websites: values.websites.map((w) => w.url.trim()).filter(Boolean),
// };
// const response = await api.post("/projects/create-and-modify", payload);
// const responseData = response.data;
