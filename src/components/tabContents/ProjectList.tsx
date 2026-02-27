"use client";
import { useState, useEffect } from "react";

export default function ProjectList() {
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    status: "Active",
    priority: "Medium",
    progress: "WIP",
    dueDate: "",
  });
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const fetchProjects = () => {
    fetch("http://localhost:3001/projects")
      .then((res) => res.json())
      .then(setProjects);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setIsEditing(false);
    setFormData({
      name: "",
      status: "Active",
      priority: "Medium",
      progress: "WIP",
      dueDate: "",
    });
    setSelectedId(null);
    setShowFormModal(true);
  };

  const openEditModal = (project: any) => {
    setIsEditing(true);
    setFormData({
      name: project.name,
      status: project.status,
      priority: project.priority,
      progress: project.progress,
      dueDate: project.dueDate ? project.dueDate.slice(0, 10) : "",
    });
    setSelectedId(project.id);
    setShowFormModal(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && selectedId) {
      await fetch(`http://localhost:3001/projects/${selectedId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } else {
      await fetch("http://localhost:3001/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    }
    setShowFormModal(false);
    fetchProjects();
  };

  const handleDelete = async () => {
    if (selectedId) {
      await fetch(`http://localhost:3001/projects/${selectedId}`, {
        method: "DELETE",
      });
      setShowDeleteModal(false);
      fetchProjects();
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Add Button */}
      <button
        onClick={openAddModal}
        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        + Add Project
      </button>

      {/* Table */}
      <div className="bg-white shadow-sm rounded-xl overflow-hidden border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b text-left">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-600">Project</th>
              <th className="px-6 py-3 font-medium text-gray-600">Status</th>
              <th className="px-6 py-3 font-medium text-gray-600">Priority</th>
              <th className="px-6 py-3 font-medium text-gray-600">Progress</th>
              <th className="px-6 py-3 font-medium text-gray-600">Due Date</th>
              <th className="px-6 py-3 font-medium text-gray-600 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {projects.map((project: any) => (
              <tr key={project.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-black">
                  {project.name}
                </td>
                <td className="px-6 py-4 text-black">{project.status}</td>
                <td className="px-6 py-4 text-black">{project.priority}</td>
                <td className="px-6 py-4 text-black">{project.progress}</td>
                <td className="px-6 py-4 text-black">
                  {project.dueDate
                    ? new Date(project.dueDate).toLocaleDateString()
                    : ""}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => openEditModal(project)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedId(project.id);
                      setShowDeleteModal(true);
                    }}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FORM MODAL */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 space-y-4">
            <h2 className="text-xl text-black font-semibold">
              {isEditing ? "Edit Project" : "Add Project"}
            </h2>

            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div className="mb-2">
                <label
                  htmlFor="username"
                  className="block mb-2.5 text-sm font-medium text-gray-900"
                >
                  Project Name
                </label>
                <input
                  type="text"
                  placeholder="Project Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="username"
                  className="block mb-2.5 text-sm font-medium text-gray-900"
                >
                  Set Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg"
                >
                  <option>Active</option>
                  <option>Completed</option>
                  <option>On Hold</option>
                </select>
              </div>

              <div className="mb-2">
                <label
                  htmlFor="username"
                  className="block mb-2.5 text-sm font-medium text-gray-900"
                >
                  Set Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                  className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <div className="mb-2">
                <label
                  htmlFor="username"
                  className="block mb-2.5 text-sm font-medium text-gray-900"
                >
                  Set Progrerss
                </label>
                <select
                  value={formData.progress}
                  onChange={(e) =>
                    setFormData({ ...formData, progress: e.target.value })
                  }
                  className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg"
                >
                  <option>WIP</option>
                  <option>On Hold</option>
                  <option>Done</option>
                </select>
              </div>

              <div className="mb-2">
                <label
                  htmlFor="username"
                  className="block mb-2.5 text-sm font-medium text-gray-900"
                >
                  Set Deadline
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                  className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="px-4 py-2 border border-black rounded-lg text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  {isEditing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold text-red-600">
              Delete Project
            </h2>
            <p className="text-gray-600">
              Are you sure you want to delete this project?
            </p>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
