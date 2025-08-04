import prisma from "@/lib/prisma";
import { jsonResponse, jsonResponseError } from "@/utils/helpers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("=== Simple Task API Route Called ===");
  
  try {
    const body = await request.json();
    console.log("✅ Request body parsed:", body);
    
    if (!body || !body.task) {
      console.log("❌ Invalid body or missing task field");
      return jsonResponseError(400);
    }
    
    const { task, description } = body;
    console.log("✅ Extracted data - Task:", task, "Description:", description);
    
    // Test Prisma connection
    console.log("🔄 Testing Prisma connection...");
    await prisma.$connect();
    console.log("✅ Prisma connected successfully");
    
    // Create simple fallback subtasks without AI
    const fallbackSubtasks = [
      {
        title: `Research: ${task.substring(0, 30)}...`,
        priority: "medium",
        estimatedTime: "30 minutes"
      },
      {
        title: `Plan execution strategy`,
        priority: "high",
        estimatedTime: "15 minutes"
      },
      {
        title: `Execute the main task`,
        priority: "high",
        estimatedTime: "1 hour"
      }
    ];

    console.log("✅ Using fallback subtasks:", fallbackSubtasks);

    console.log("🔄 Creating task in database...");
    const tasks = await prisma.task.create({
        data: {
            title: task,
            description: description || null,
            subtasks: {
                createMany: {
                    data: fallbackSubtasks
                }
            }
        },
        include: {
            subtasks: true
        }
    });

    console.log("✅ Task created successfully:", tasks);
    
    await prisma.$disconnect();
    
    return NextResponse.json({
      data: tasks,
      status: 200,
      message: "Task created successfully (using fallback subtasks)"
    }, { status: 200 });
    
  } catch (error) {
    console.error("❌ Error in simple task API:", error);
    console.error("❌ Error stack:", error instanceof Error ? error.stack : 'No stack trace');
    
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.error("❌ Error disconnecting Prisma:", disconnectError);
    }
    
    return NextResponse.json({
      message: "Failed to create task",
      error: error instanceof Error ? error.message : "Unknown error",
      status: 500
    }, { status: 500 });
  }
};
