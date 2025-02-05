"use server";

import { connect as connectToDatabase } from "@/lib/db";
import Task from "@/models/task";

export async function getTasks() {
  await connectToDatabase();
  const tasks = await Task.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(tasks));
}

export async function addTask(title: string, description: string, expiry: string) {
  await connectToDatabase();
  const task = await Task.create({ title, description, expiry });
  return JSON.parse(JSON.stringify(task));
}

export async function updateTask(_id: string, title: string, description: string, expiry: string) {
  await connectToDatabase();
  const task = await Task.findByIdAndUpdate(_id, { title, description, expiry }).lean();
  return JSON.parse(JSON.stringify(task));
}

export async function markTaskCompleted(_id: string) {
  await connectToDatabase();
  await Task.findByIdAndUpdate(_id, { isCompleted: true });
}

export async function deleteTask(_id: string) {
  await connectToDatabase();
  await Task.findByIdAndDelete(_id);
}
