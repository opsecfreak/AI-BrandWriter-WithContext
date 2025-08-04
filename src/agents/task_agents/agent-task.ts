import { Agent, run } from "@openai/agents";
import { systemTaskPrompt } from "../system-prompts/create-task";
import {  taskSchema } from "../schemas/taskschema";


const agentTask = new Agent({
  name: "task-agent",
  model: "gpt-4o-mini",
  instructions: systemTaskPrompt,
});

export const createTaskAgent = async (task: string) => {
  try {
    console.log("Creating task agent for:", task);
    
    const response = await run(agentTask, task);
    console.log("Raw agent response:", response);
    
    if (!response.finalOutput) {
      throw new Error("No output received from agent");
    }
    
    console.log("Agent final output:", response.finalOutput);
    
    // Parse the JSON response
    const jsonResponse = JSON.parse(response.finalOutput);
    console.log("Parsed JSON response:", jsonResponse);
    
    // Validate with Zod schema (using the taskSchema that expects { tasks: [...] })
    const validatedResponse = taskSchema.parse(jsonResponse);
    console.log("Validated response:", validatedResponse);
    
    // Return just the tasks array
    return validatedResponse.tasks;
  } catch (error) {
    console.error("Error in createTaskAgent:", error);
    
    // Fallback: return a simple task breakdown if the agent fails
    const fallbackTasks = [
      {
        title: `Start working on: ${task}`,
        priority: "high" as const,
        estimatedTime: "30 minutes"
      },
      {
        title: "Break down the task into smaller steps",
        priority: "medium" as const,
        estimatedTime: "15 minutes"
      },
      {
        title: "Complete the main task",
        priority: "high" as const,
        estimatedTime: "1 hour"
      }
    ];
    
    console.log("Using fallback tasks:", fallbackTasks);
    return fallbackTasks;
  }
};
