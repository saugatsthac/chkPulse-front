import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import api from "../../api/axios";

import DeleteIcon from "@mui/icons-material/Delete";

const COLORS = [
  "#3b82f6",
  "#ef4444",
  "#22c55e",
  "#f59e0b",
  "#a855f7",
  "#ec4899",
];

export default function AddProjectAndWebsites({ data, onSubmit }) {
  console.log("data", data.websites);
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      color: "#3b82f6",
      websites: [{ url: "" }],
    },
  });

  useEffect(() => {
    if (!data) return;

    reset({
      name: data.name,
      color: data.color || "#3b82f6",
      websites: data.websites?.length
        ? data.websites.map((w) => ({
            url: w.url,
          }))
        : [{ url: "" }],
    });
  }, [data, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "websites",
  });

  const color = watch("color");

  async function submit(values) {
    const payload = {
      projectId: data?._id, // undefined when creating
      name: values.name,
      color: values.color,
      websites: values.websites.map((w) => w.url.trim()).filter(Boolean),
    };
    // await api.post("/projects/create-and-modify", payload);
    try {
      const response = await api.post("/projects/create-and-modify", payload);

      console.log(response.data);
      // console.log(payload);

      // Optional: notify the parent after a successful save
      onSubmit?.(response.data);
    } catch (err) {
      console.error(err);
    }
  } 

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="bg-[#111217] border border-white/10 rounded-2xl p-7 w-[60vw]"
    >
      <h1 className="text-xl font-medium mb-8">Add Project</h1>

      <div className="grid grid-cols-2 gap-10">
        <div>
          <label>Project Name</label>

          <input
            {...register("name", {
              required: "Project name is required",
            })}
            className="w-full mt-2 p-3 rounded-lg border border-white/15"
          />

          {errors.name && (
            <p className="text-red-400 text-sm mt-1">
              {errors.name.message}
            </p>
          )}

          <h3 className="mt-8 mb-3">Project Color</h3>

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

        <div>
          <div className="flex justify-between items-center mb-3">
            <h3>Website URLs</h3>

            {fields.length < 5 && (
              <button type="button" onClick={() => append({ url: "" })}>
                + Add
              </button>
            )}
          </div>

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

                      const duplicates = urls.filter((u) => u === value).length;

                      if (duplicates > 1) return "Duplicate URL";

                      return true;
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
