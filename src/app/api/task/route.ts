import { createTaskAgent } from "@/agents/task_agents/agent-task";
import prisma from "@/lib/prisma";
import { jsonResponse, jsonResponseError } from "@/utils/helpers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("=== API Route /api/task POST called ===");
  
  try {
    const body = await request.json();
    console.log("✅ Request body parsed:", body);
    
    if (!body || !body.task) {
      console.log("❌ Invalid body or missing task field");
      return jsonResponseError(400);
    }
    
    const { task, description } = body;
    console.log("✅ Extracted data - Task:", task, "Description:", description);
    
    // Test if we can import and use Prisma
    console.log("🔄 Testing Prisma connection...");
    await prisma.$connect();
    console.log("✅ Prisma connected successfully");
    
    console.log("🔄 Calling createTaskAgent...");
    const newTask = await createTaskAgent(task);
    console.log("✅ createTaskAgent completed, result:", newTask);
    
    if(!newTask || !Array.isArray(newTask)) {
      console.log("❌ Invalid response from createTaskAgent:", newTask);
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

    console.log("✅ Mapped subtasks:", sub);

    console.log("🔄 Creating task in database...");
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

    console.log("✅ Task created successfully:", tasks);
    
    await prisma.$disconnect();
    
    // Return the created task with subtasks
    return NextResponse.json({
      data: tasks,
      status: 200
    }, { status: 200 });
  } catch (error) {
    console.error("❌ Error in API route:", error);
    console.error("❌ Error stack:", error instanceof Error ? error.stack : 'No stack trace');
    
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.error("❌ Error disconnecting Prisma:", disconnectError);
    }
    
    return jsonResponseError(500);
  }
};
