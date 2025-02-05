"use client";

import { useState } from "react";
import { TaskNew } from "@/types";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [expiryTime, setExpiryTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !expiryDate || !expiryTime) return;
    const task: TaskNew = {
      title,
      description,
      expiry: new Date(`${expiryDate} ${expiryTime}`),
    };

    console.log(task);
    // create(task);
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg w-full max-w-md mx-auto my-3 shadow-lg">
      <h2 className="text-xl font-bold text-yellow-400 mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-400"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-400"
          rows={4}
        />
        <div className="flex gap-2">
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="flex-1 p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-400"
          />
          <input
            type="time"
            value={expiryTime}
            onChange={(e) => setExpiryTime(e.target.value)}
            className="flex-1 p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-400"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddTask;
