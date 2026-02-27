"use client";
import { useState } from "react";

export default function ProjectDetails() {
  const [project, setProject] = useState<{
    name: string;
    status: string;
    priority: string;
    dueDate: string;
    tasks: Task[];
  }>({
    name: "Website Redesign",
    status: "Active",
    priority: "High",
    dueDate: "2026-12-20",
    tasks: [
      {
        id: 1,
        title: "Design Homepage",
        status: "WIP",
        assignedTo: "John",
        progress: 60,
      },
      {
        id: 2,
        title: "Setup Backend",
        status: "Pending",
        assignedTo: "Sarah",
        progress: 20,
      },
    ],
  });

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditProject, setShowEditProject] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const [taskForm, setTaskForm] = useState({
    title: "",
    status: "Pending",
    assignedTo: "",
    progress: 0,
  });

  type Task = {
    id: number;
    title: string;
    status: string;
    assignedTo: string;
    progress: number;
  };

  /* ================= OPEN MODALS ================= */

  const openAddTask = () => {
    setEditingTask(null);
    setTaskForm({
      title: "",
      status: "Pending",
      assignedTo: "",
      progress: 0,
    });
    setShowTaskModal(true);
  };

  const openEditTask = (task: Task) => {
    setEditingTask(task);
    setTaskForm({
      title: task.title,
      status: task.status,
      assignedTo: task.assignedTo,
      progress: task.progress,
    });
    setShowTaskModal(true);
  };
  /* ================= SAVE TASK ================= */

  const handleSaveTask = () => {
    if (editingTask) {
      setProject({
        ...project,
        tasks: project.tasks.map((t) =>
          t.id === editingTask.id ? { ...taskForm, id: t.id } : t,
        ),
      });
    } else {
      setProject({
        ...project,
        tasks: [...project.tasks, { ...taskForm, id: Date.now() }],
      });
    }

    setShowTaskModal(false);
  };

  /* ================= DELETE TASK ================= */

  const confirmDelete = (task: Task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const handleDeleteTask = () => {
    if (!taskToDelete) return;

    setProject({
      ...project,
      tasks: project.tasks.filter((t) => t.id !== taskToDelete.id),
    });

    setShowDeleteModal(false);
  };

  return (
    <div className="p-6 space-y-8">
      {/* ================= SECTION A: PROJECT INFO ================= */}
      <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {project.name}
            </h2>

            <div className="flex flex-wrap gap-3 mt-3">
              <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                {project.status}
              </span>

              <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-700">
                {project.priority}
              </span>

              <span className="text-sm text-gray-500">
                Due: {project.dueDate}
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowEditProject(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Edit Project
          </button>
        </div>
      </div>

      {/* ================= SECTION B: TASK LIST ================= */}
      <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">Tasks</h3>

          <button
            onClick={openAddTask}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Add Task
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b text-left">
              <tr>
                <th className="px-4 py-3 text-black">Task</th>
                <th className="px-4 py-3 text-black">Status</th>
                <th className="px-4 py-3 text-black">Assigned To</th>
                <th className="px-4 py-3 text-black">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {project.tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-4 font-medium text-gray-800">
                    {task.title}
                  </td>

                  <td className="px-4 py-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                      {task.status}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-gray-700">{task.assignedTo}</td>

                  <td className="px-4 py-4 space-x-3">
                    <button
                      onClick={() => openEditTask(task)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(task)}
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
      </div>

      {/* ================= ADD / EDIT TASK MODAL ================= */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {editingTask ? "Edit Task" : "Add Task"}
            </h2>

            <input
              type="text"
              placeholder="Task Title"
              value={taskForm.title}
              onChange={(e) =>
                setTaskForm({ ...taskForm, title: e.target.value })
              }
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg"
            />

            <select
              value={taskForm.status}
              onChange={(e) =>
                setTaskForm({ ...taskForm, status: e.target.value })
              }
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg"
            >
              <option>Pending</option>
              <option>WIP</option>
              <option>Done</option>
            </select>

            <input
              type="text"
              placeholder="Assign To"
              value={taskForm.assignedTo}
              onChange={(e) =>
                setTaskForm({ ...taskForm, assignedTo: e.target.value })
              }
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg"
            />

            <input
              type="date"
              value={project.dueDate}
              onChange={(e) =>
                setProject({ ...project, dueDate: e.target.value })
              }
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg"
            />

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowTaskModal(false)}
                className="px-4 py-2 border rounded-lg text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTask}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= DELETE CONFIRM MODAL ================= */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold text-red-600">Delete Task</h2>
            <p className="text-gray-600">
              Are you sure you want to delete this task?
            </p>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteTask}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      {showEditProject && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Edit Project
            </h2>

            <input
              type="text"
              value={project.name}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg"
              placeholder="Project Name"
            />

            <select
              value={project.status}
              onChange={(e) =>
                setProject({ ...project, status: e.target.value })
              }
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg"
            >
              <option>Active</option>
              <option>Completed</option>
              <option>On Hold</option>
            </select>

            <select
              value={project.priority}
              onChange={(e) =>
                setProject({ ...project, priority: e.target.value })
              }
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <input
              type="date"
              value={project.dueDate}
              onChange={(e) =>
                setProject({ ...project, dueDate: e.target.value })
              }
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg"
            />

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowEditProject(false)}
                className="px-4 py-2 border rounded-lg text-black"
              >
                Cancel
              </button>

              <button
                onClick={() => setShowEditProject(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
