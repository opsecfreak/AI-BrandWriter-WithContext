import { z } from "zod";

export const taskSchema = z.object({
  tasks: z.array(z.object({
    title: z.string().describe("Action-oriented task title"),
    priority: z.enum(["low", "medium", "high"]).describe("Task priority"),
    estimatedTime: z.string().describe("Estimated time to complete the task")
  }))
});

export const subTasktSchema = z.object({
     title: z.string().describe("Action-oriented task title"),
    priority: z.enum(["low", "medium", "high"]).describe("Task priority"),
    estimatedTime: z.string().describe("Estimated time to complete the task")

})