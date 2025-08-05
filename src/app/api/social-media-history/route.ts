import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (request: NextRequest) => {
  console.log("=== Social Media History API Route Called ===");
  
  try {
    const { searchParams } = new URL(request.url);
    const brandId = searchParams.get('brandId');
    
    console.log("📖 Retrieving social media history from database...");
    
    // Build query based on whether brandId is provided
    const whereClause = brandId 
      ? { 
          agentType: "writer", 
          brandContextId: brandId 
        }
      : { 
          agentType: "writer" 
        };

    // Retrieve social media generations from database
    const socialMediaHistory = await prisma.agentReply.findMany({
      where: whereClause,
      include: {
        brandContext: {
          select: {
            id: true,
            businessName: true,
            industry: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50 // Limit to last 50 generations
    });
    
    console.log(`✅ Retrieved ${socialMediaHistory.length} social media generations from database`);
    
    // Group by brand for better organization
    const groupedByBrand = socialMediaHistory.reduce((acc, item) => {
      const brandName = item.brandContext?.businessName || 'No Brand Context';
      const brandId = item.brandContext?.id || 'no-brand';
      
      if (!acc[brandId]) {
        acc[brandId] = {
          brandName,
          brandId,
          industry: item.brandContext?.industry || null,
          generations: []
        };
      }
      
      acc[brandId].generations.push({
        id: item.id,
        // Note: topic, tone, targetAudience, keyMessage will be available after Prisma regeneration
        topic: (item as any).topic || null,
        tone: (item as any).tone || null,
        userPrompt: item.userPrompt,
        createdAt: item.createdAt,
        targetAudience: (item as any).targetAudience || null,
        keyMessage: (item as any).keyMessage || null,
        processedOutput: item.processedOutput ? JSON.parse(item.processedOutput) : null
      });
      
      return acc;
    }, {} as Record<string, any>);
    
    return NextResponse.json({
      data: Object.values(groupedByBrand),
      status: 200,
      message: "Social media history retrieved successfully"
    }, { status: 200 });
    
  } catch (error) {
    console.error("❌ Error retrieving social media history:", error);
    
    return NextResponse.json({
      message: "Failed to retrieve social media history",
      error: error instanceof Error ? error.message : "Unknown error",
      status: 500
    }, { status: 500 });
  }
};

export const DELETE = async (request: NextRequest) => {
  console.log("=== Delete Social Media Generation API Route Called ===");
  
  try {
    const { searchParams } = new URL(request.url);
    const generationId = searchParams.get('id');
    
    if (!generationId) {
      return NextResponse.json({
        message: "Generation ID is required",
        status: 400
      }, { status: 400 });
    }
    
    console.log("🗑️ Deleting social media generation from database...");
    
    await prisma.agentReply.delete({
      where: {
        id: generationId,
        agentType: "writer"
      }
    });
    
    console.log("✅ Social media generation deleted successfully");
    
    return NextResponse.json({
      status: 200,
      message: "Social media generation deleted successfully"
    }, { status: 200 });
    
  } catch (error) {
    console.error("❌ Error deleting social media generation:", error);
    
    return NextResponse.json({
      message: "Failed to delete social media generation",
      error: error instanceof Error ? error.message : "Unknown error",
      status: 500
    }, { status: 500 });
  }
};
