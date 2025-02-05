"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Task } from "@/types";

const TaskItem = dynamic(() => import("@/components/TaskItem"), { ssr: false });

const ViewAllTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const editTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
    // update(updatedTask);
  };

  const deleteTask = (_id: string) => {
    setTasks(tasks.filter((task) => task._id !== _id));
    // delete(_id);
  };

  const markComplete = (_id: string) => {
    console.log(`Task ${_id} marked as completed`);
    // completed(_id);
  };

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-white max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-yellow-400 text-center mb-6">View All Tasks</h1>
      <div className="mt-6 space-y-4">
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} onEdit={editTask} onDelete={deleteTask} onComplete={markComplete} />
        ))}
      </div>
    </div>
  );
};

export default ViewAllTasks;
