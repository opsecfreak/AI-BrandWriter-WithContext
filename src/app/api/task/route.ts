import { createTaskAgent } from "@/agents/task_agents/agent-task";
import prisma from "@/lib/prisma";
import { jsonResponse, jsonResponseError } from "@/utils/helpers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    console.log("Received body:", body);
    
    if (!body || !body.task) {
      return jsonResponseError(400);
    }
    
    const { task, description } = body;
    console.log("Processing task:", task, "with description:", description);
    
    const newTask = await createTaskAgent(task);
    if(!newTask) {
      return jsonResponseError(500);
    }

    type Subtask = {
      title: string;
      priority: string
      estimatedTime: string;
    };
    
    const sub = newTask.map((subtask: Subtask) => ({
      title: subtask.title,
      priority: subtask.priority,
      estimatedTime: subtask.estimatedTime
    }));

    console.log("Mapped subtasks:", sub);

    const tasks = await prisma.task.create({
        data: {
            title: task,
            description: description || null, // Handle optional description
            subtasks: {
                createMany: {
                    data: sub
                }
            }
        },
        include: {
            subtasks: true  // Include the created subtasks in the response
        }
    });

    console.log("Task created successfully:", tasks);
    
    // Return the created task with subtasks
    return NextResponse.json({
      data: tasks,
      status: 200
    }, { status: 200 });
  } catch (error) {
    console.error("Error creating task:", error);
    return jsonResponseError(500);
  }
};
