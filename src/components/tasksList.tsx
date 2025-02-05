"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import * as Action from "@/actions";
import { Task } from "@/types";

const TaskItem = dynamic(() => import("@/components/TaskItem"), { ssr: false });

const ViewAllTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fn = async () => {
      const data = await Action.getTasks();
      console.log(data);
      setTasks(data);
    };
    fn();
  }, []);

  const editTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
    Action.updateTask(updatedTask._id, updatedTask.title, updatedTask.description, updatedTask.expiry.toString());
  };

  const deleteTask = (_id: string) => {
    setTasks(tasks.filter((task) => task._id !== _id));
    Action.deleteTask(_id);
  };

  const markComplete = (_id: string) => {
    console.log(`Task ${_id} marked as completed`);
    Action.markTaskCompleted(_id);
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
