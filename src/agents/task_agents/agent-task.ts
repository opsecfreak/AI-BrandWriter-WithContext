import { Agent, run } from "@openai/agents";
import { systemTaskPrompt } from "../system-prompts/create-task";
import {  taskSchema } from "../schemas/taskschema";


const agentTask = new Agent({
  name: "task-agent",
  model: "gpt-4.1-mini",
  instructions: systemTaskPrompt,

});

export const createTaskAgent = async (task: string) => {
  const response = await run(agentTask, task);
  if (!response.finalOutput) {
    throw new Error("No output received from agent");
  }
    console.log("Agent response:", response.finalOutput);
  // Parse the JSON response
  const jsonResponse = JSON.parse(response.finalOutput);
  
  // Validate with Zod schema (using the taskSchema that expects { tasks: [...] })
  const validatedResponse = taskSchema.parse(jsonResponse);
  
  // Return just the tasks array
  return validatedResponse.tasks;
};
