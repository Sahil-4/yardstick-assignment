import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    expiry: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Task = models.Task || model("Task", TaskSchema);

export default Task;
