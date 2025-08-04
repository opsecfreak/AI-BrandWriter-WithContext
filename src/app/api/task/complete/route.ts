// Import Prisma client for database operations
import prisma from "@/lib/prisma";
// Import Next.js response utility for API routes
import { NextResponse } from "next/server";
// Import Zod for runtime type validation and schema definition
import { z } from "zod";

/**
 * PATCH endpoint to update a subtask's completion status
 * Route: /api/task/complete
 * Method: PATCH
 * Body: { id: string, complete: boolean }
 */
export const PATCH = async (request: Request) => {
  // Parse the JSON body from the incoming request
  const body = await request.json();
  
  // Log the received request body for debugging purposes
  console.log("Received PATCH request with body:", body);
  
  // Early validation: check if request body exists
  if (!body) {
    return NextResponse.json(
      {
        message: "Invalid request body",
        status: 400,
      },
      { status: 400 }
    );
  }
  
  // Define Zod schema for request validation
  // Ensures the request contains required fields with correct types
  const schema = z.object({
    id: z.string().describe("ID of the subtask to update"),
    complete: z.boolean().describe("Completion status of the subtask"),
  });
  
  // Validate the request body against the schema
  // safeParse returns success/error without throwing exceptions
  const parsedBody = schema.safeParse(body);
  
  // Handle validation failure - return 400 with error details
  if (!parsedBody.success) {
    return NextResponse.json(
      {
        message: "Invalid request body schema",
        status: 400,
      },
      { status: 400 }
    );
  }
  
  // Extract validated data from the parsed body
  // This ensures type safety and data integrity
  // Extract validated data from the parsed body
  // This ensures type safety and data integrity
  const { id, complete } = parsedBody.data;

  try {
    // First, check if the subtask exists in the database
    // This prevents silent failures when trying to update non-existent records
    const existingSubtask = await prisma.subtask.findUnique({
      where: { id }
    });

    // If subtask doesn't exist, return 404 with clear error message
    // This provides better UX than a generic 500 error
    if (!existingSubtask) {
      return NextResponse.json(
        {
          message: "Subtask not found",
          status: 404,
        },
        { status: 404 }
      );
    }

    // Update the subtask's completion status in the database
    // Using the validated data to ensure data integrity
    const sub = await prisma.subtask.update({
      where: { id },
      data: { completed: complete },
    });

    // Return success response with the updated subtask data
    // Include status in both body and HTTP status for consistency
    return NextResponse.json(
      {
        data: sub,
        status: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log any unexpected errors for debugging and monitoring
    console.error("Error updating subtask:", error);
    
    // Return generic 500 error response for any database or system errors
    // Don't expose internal error details to the client for security
    return NextResponse.json(
      {
        message: "Failed to update subtask",
        status: 500,
      },
      { status: 500 }
    );
  }
};
