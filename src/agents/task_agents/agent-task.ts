import OpenAI from "openai";
import { systemTaskPrompt } from "../system-prompts/create-task";
import { taskSchema } from "../schemas/taskschema";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createTaskAgent = async (task: string) => {
  try {
    console.log("Creating task agent for:", task);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemTaskPrompt
        },
        {
          role: "user",
          content: task
        }
      ],
      temperature: 0.7,
    });
    
    const response = completion.choices[0].message.content;
    console.log("Raw OpenAI response:", response);
    
    if (!response) {
      throw new Error("No output received from OpenAI");
    }
    
    console.log("OpenAI response content:", response);
    
    // Parse the JSON response
    const jsonResponse = JSON.parse(response);
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
