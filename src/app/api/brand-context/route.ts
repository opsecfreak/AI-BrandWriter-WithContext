import { jsonResponseError } from "@/utils/helpers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("=== Brand Context API Route Called ===");
  
  try {
    const body = await request.json();
    console.log("✅ Request body parsed:", body);
    
    if (!body || !body.businessName) {
      console.log("❌ Invalid body or missing business name");
      return jsonResponseError(400);
    }
    
    // TODO: Add Prisma calls after regenerating client
    console.log("🔄 Brand context would be saved to database");
    
    // For now, return a mock response
    const mockBrandContext = {
      id: "temp-" + Date.now(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    console.log("✅ Mock brand context created:", mockBrandContext);
    
    return NextResponse.json({
      data: mockBrandContext,
      status: 200,
      message: "Brand context saved successfully (mock)"
    }, { status: 200 });
    
  } catch (error) {
    console.error("❌ Error in brand context API:", error);
    
    return NextResponse.json({
      message: "Failed to save brand context",
      error: error instanceof Error ? error.message : "Unknown error",
      status: 500
    }, { status: 500 });
  }
};

export const GET = async () => {
  console.log("=== Get Brand Context API Route Called ===");
  
  try {
    // TODO: Add Prisma calls after regenerating client
    console.log("✅ Mock brand contexts retrieved");
    
    return NextResponse.json({
      data: [],
      status: 200,
      message: "Brand contexts retrieved successfully (mock)"
    }, { status: 200 });
    
  } catch (error) {
    console.error("❌ Error retrieving brand contexts:", error);
    
    return NextResponse.json({
      message: "Failed to retrieve brand contexts",
      error: error instanceof Error ? error.message : "Unknown error",
      status: 500
    }, { status: 500 });
  }
};
