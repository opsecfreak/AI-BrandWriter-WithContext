import { createSocialMediaContent } from "@/agents/task_agents/agent-writer";
import { jsonResponseError } from "@/utils/helpers";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const POST = async (request: NextRequest) => {
  console.log("=== Social Media Content API Route Called ===");
  
  try {
    const body = await request.json();
    console.log("✅ Request body parsed:", body);
    
    if (!body || !body.topic) {
      console.log("❌ Invalid body or missing topic field");
      return jsonResponseError(400);
    }
    
    const { 
      topic, 
      tone, 
      target_audience, 
      key_message, 
      call_to_action, 
      hashtags, 
      additional_context,
      brandContextId 
    } = body;
    
    console.log("✅ Extracted social media form data");
    
    // Fetch brand context from database if provided
    let brandContext = null;
    if (brandContextId) {
      console.log("� Fetching brand context from database...");
      brandContext = await prisma.brandContext.findUnique({ 
        where: { id: brandContextId } 
      });
      console.log("✅ Brand context fetched:", brandContext?.businessName);
    }
    
    // Create prompt string from form data
    const promptText = `Topic: ${topic}
${tone ? `Tone: ${tone}` : ''}
${target_audience ? `Target Audience: ${target_audience}` : ''}
${key_message ? `Key Message: ${key_message}` : ''}
${call_to_action ? `Call to Action: ${call_to_action}` : ''}
${hashtags ? `Hashtags: ${hashtags}` : ''}
${additional_context ? `Additional Context: ${additional_context}` : ''}`;
    
    console.log("🔄 Calling createSocialMediaContent...");
    const socialMediaContent = await createSocialMediaContent(promptText, brandContext);
    console.log("✅ createSocialMediaContent completed");
    
    if (!socialMediaContent) {
      console.log("❌ Invalid response from createSocialMediaContent");
      return jsonResponseError(500);
    }

    // Save to database as AgentReply
    console.log("💾 Saving social media generation to database...");
    const agentReply = await prisma.agentReply.create({
      data: {
        agentType: "writer",
        userPrompt: promptText,
        openaiResponse: JSON.stringify(socialMediaContent),
        processedOutput: JSON.stringify(socialMediaContent),
        brandContextId: brandContextId || null,
        // Note: These fields will be available after Prisma regeneration
        ...(typeof (prisma.agentReply as any).fields?.topic !== 'undefined' && {
          topic,
          tone,
          targetAudience: target_audience,
          keyMessage: key_message,
          callToAction: call_to_action,
          hashtags,
          additionalContext: additional_context
        })
      }
    });
    
    console.log("✅ Social media generation saved with ID:", agentReply.id);

    console.log("✅ Social media content created successfully");
    
    // Return the created content
    return NextResponse.json({
      data: socialMediaContent,
      generationId: agentReply.id,
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
