import { createSocialMediaContent } from "@/agents/task_agents/agent-writer";
import { jsonResponseError } from "@/utils/helpers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("=== Social Media Content API Route Called ===");
  
  try {
    const body = await request.json();
    console.log("✅ Request body parsed:", body);
    
    if (!body || !body.prompt) {
      console.log("❌ Invalid body or missing prompt field");
      return jsonResponseError(400);
    }
    
    const { prompt, brand, platform } = body;
    console.log("✅ Extracted data - Prompt:", prompt, "Brand:", brand, "Platform:", platform);
    
    console.log("🔄 Calling createSocialMediaContent...");
    const socialMediaContent = await createSocialMediaContent(prompt, brand, platform);
    console.log("✅ createSocialMediaContent completed, result:", socialMediaContent);
    
    if (!socialMediaContent) {
      console.log("❌ Invalid response from createSocialMediaContent:", socialMediaContent);
      return jsonResponseError(500);
    }

    console.log("✅ Social media content created successfully");
    
    // Return the created content
    return NextResponse.json({
      data: socialMediaContent,
      status: 200,
      message: "Social media content created successfully"
    }, { status: 200 });
    
  } catch (error) {
    console.error("❌ Error in social media API route:", error);
    console.error("❌ Error stack:", error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json({
      message: "Failed to create social media content",
      error: error instanceof Error ? error.message : "Unknown error",
      status: 500
    }, { status: 500 });
  }
};
