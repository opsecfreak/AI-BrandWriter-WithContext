import { jsonResponseError } from "@/utils/helpers";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const POST = async (request: NextRequest) => {
  console.log("=== Brand Context API Route Called ===");
  
  try {
    const body = await request.json();
    console.log("✅ Request body parsed:", body);
    
    if (!body || !body.businessName) {
      console.log("❌ Invalid body or missing business name");
      return jsonResponseError(400);
    }
    
    console.log("� Saving brand context to database...");
    
    // Save to database using Prisma
    const brandContext = await prisma.brandContext.create({
      data: {
        businessName: body.businessName,
        industry: body.industry || null,
        targetAudience: body.targetAudience || null,
        brandVoice: body.brandVoice || null,
        keyProducts: body.keyProducts || null,
        brandValues: body.brandValues || null,
        competitors: body.competitors || null,
        uniqueSellingPoints: body.uniqueSellingPoints || null,
        brandColors: body.brandColors || null,
        brandKeywords: body.brandKeywords || null,
        website: body.website || null,
        socialMediaHandles: body.socialMediaHandles || null,
        additionalContext: body.additionalContext || null
      }
    });
    
    console.log("✅ Brand context saved to database with ID:", brandContext.id);
    
    return NextResponse.json({
      data: brandContext,
      status: 200,
      message: "Brand context saved successfully"
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
    console.log("📖 Retrieving brand contexts from database...");
    
    // Retrieve from database using Prisma
    const brandContexts = await prisma.brandContext.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    console.log(`✅ Retrieved ${brandContexts.length} brand contexts from database`);
    
    return NextResponse.json({
      data: brandContexts,
      status: 200,
      message: "Brand contexts retrieved successfully"
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

export const PUT = async (request: NextRequest) => {
  console.log("=== Update Brand Context API Route Called ===");
  
  try {
    const body = await request.json();
    console.log("✅ Request body parsed:", body);
    
    if (!body || !body.id || !body.businessName) {
      console.log("❌ Invalid body, missing ID or business name");
      return jsonResponseError(400);
    }
    
    console.log("🔄 Updating brand context in database...");
    
    // Update in database using Prisma
    const brandContext = await prisma.brandContext.update({
      where: {
        id: body.id
      },
      data: {
        businessName: body.businessName,
        industry: body.industry || null,
        targetAudience: body.targetAudience || null,
        brandVoice: body.brandVoice || null,
        keyProducts: body.keyProducts || null,
        brandValues: body.brandValues || null,
        competitors: body.competitors || null,
        uniqueSellingPoints: body.uniqueSellingPoints || null,
        brandColors: body.brandColors || null,
        brandKeywords: body.brandKeywords || null,
        website: body.website || null,
        socialMediaHandles: body.socialMediaHandles || null,
        additionalContext: body.additionalContext || null
      }
    });
    
    console.log("✅ Brand context updated in database with ID:", brandContext.id);
    
    return NextResponse.json({
      data: brandContext,
      status: 200,
      message: "Brand context updated successfully"
    }, { status: 200 });
    
  } catch (error) {
    console.error("❌ Error updating brand context:", error);
    
    return NextResponse.json({
      message: "Failed to update brand context",
      error: error instanceof Error ? error.message : "Unknown error",
      status: 500
    }, { status: 500 });
  }
};
