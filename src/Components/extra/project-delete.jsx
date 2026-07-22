import axios from "axios";
import { useState } from "react";

const ProjectDelete = ({ projectId, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/projects/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (onDelete) {
        onDelete(projectId);
      }
    } catch (error) {
      console.error(
        error.response?.data?.message || "Failed to delete project.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete Project"}
    </button>
  );
};

export default ProjectDelete;
