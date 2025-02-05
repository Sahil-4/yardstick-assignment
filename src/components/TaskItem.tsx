import { Task } from "@/types";
import { useState } from "react";

const TaskItem = ({
  task,
  onEdit,
  onDelete,
  onComplete,
}: {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (_id: string) => void;
  onComplete: (_id: string) => void;
}) => {
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const [view, setView] = useState<"view" | "edit">("view");
  const [ttask, setTTask] = useState<Task>(task);

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete(task._id);
  };

  const handleSave = () => {
    onEdit(ttask);
    setView("view");
  };

  const handleCancel = () => {
    setTTask(task);
    setView("view");
  };

  const View = () => {
    return (
      <>
        <h2 className="text-lg font-bold text-white">{task.title}</h2>
        <p className="text-sm text-gray-300">{task.description}</p>
        <p className="text-sm text-yellow-400 mt-2">Expiring: {task.expiry}</p>

        <div className="flex gap-2 mt-3">
          <button
            onClick={handleComplete}
            disabled={isCompleted}
            className={`px-3 py-1 text-xs rounded transition ${
              isCompleted ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-400 text-white"
            }`}
          >
            {isCompleted ? "Completed" : "Mark Complete"}
          </button>
          <button
            onClick={() => setView("edit")}
            className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-400 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-400 transition"
          >
            Delete
          </button>
        </div>
      </>
    );
  };

  const Edit = () => {
    return (
      <>
        <input
          type="text"
          value={ttask.title}
          onChange={(e) => setTTask({ ...ttask, title: e.target.value })}
          className="w-full p-2 text-white bg-gray-700 border border-gray-500 rounded focus:outline-none"
        />
        <textarea
          value={ttask.description}
          onChange={(e) => setTTask({ ...ttask, description: e.target.value })}
          className="w-full p-2 mt-2 text-white bg-gray-700 border border-gray-500 rounded focus:outline-none"
        />
        <input
          type="datetime-local"
          value={ttask.expiry}
          onChange={(e) => setTTask({ ...ttask, expiry: e.target.value })}
          className="w-full p-2 mt-2 text-white bg-gray-700 border border-gray-500 rounded focus:outline-none"
        />

        <div className="flex gap-2 mt-3">
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-400 transition"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </>
    );
  };

  return (
    <div className={`p-4 border border-gray-700 rounded-lg bg-gray-800 shadow-lg ${isCompleted ? "opacity-50" : ""}`}>
      {view === "view" ? <View /> : <Edit />}
    </div>
  );
};

export default TaskItem;
