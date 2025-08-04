import OpenAI from "openai";
import { socialMediaPrompt } from "../system-prompts/create-social-media";
import { socialMediaSchema } from "../schemas/social-media-schema";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createSocialMediaContent = async (prompt: string, brand?: string, platform?: string) => {
  try {
    console.log("Creating social media content for:", prompt);
    
    // Enhance the user prompt with context
    const enhancedPrompt = `
    Brand/Business: ${brand || "Generic Business"}
    Platform Focus: ${platform || "All platforms"}
    Content Request: ${prompt}
    
    Please create engaging social media content based on this request.
    `;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: socialMediaPrompt
        },
        {
          role: "user",
          content: enhancedPrompt
        }
      ],
      temperature: 0.8, // Higher creativity for social media content
    });
    
    const response = completion.choices[0].message.content;
    console.log("Raw OpenAI response:", response);
    
    if (!response) {
      throw new Error("No output received from OpenAI");
    }
    
    // TODO: Save to AgentReply table after Prisma regeneration
    
    // Parse the JSON response
    const jsonResponse = JSON.parse(response);
    console.log("Parsed JSON response:", jsonResponse);
    
    // Validate with Zod schema
    const validatedResponse = socialMediaSchema.parse(jsonResponse);
    console.log("Validated response:", validatedResponse);
    
    return validatedResponse;
  } catch (error) {
    console.error("Error in createSocialMediaContent:", error);
    
    // Fallback content
    const fallbackContent = {
      content: {
        twitter: {
          text: `🚀 Exciting news! ${prompt.substring(0, 100)}... #Innovation #Business`,
          hashtags: ["#Business", "#Innovation", "#Growth"],
          engagement_hook: "What are your thoughts on this? Let us know in the comments!"
        },
        linkedin: {
          text: `I'm excited to share insights about ${prompt.substring(0, 150)}...\n\nThis represents a significant opportunity for growth and innovation in our industry.`,
          hashtags: ["#Professional", "#Business", "#Innovation"],
          engagement_hook: "How do you see this impacting your industry? Share your perspective below."
        },
        instagram: {
          text: `✨ ${prompt.substring(0, 100)}...\n\n#VisualStory #Brand #Inspiration`,
          hashtags: ["#Inspiration", "#Brand", "#Creative"],
          engagement_hook: "Double tap if you agree! 💫"
        }
      },
      strategy: {
        target_audience: "Business professionals and potential customers",
        content_pillars: ["Innovation", "Value", "Engagement"],
        posting_schedule: "Best times: 9-10 AM, 2-3 PM, 7-8 PM",
        engagement_tactics: ["Ask questions", "Use polls", "Share behind-the-scenes"]
      }
    };
    
    console.log("Using fallback social media content:", fallbackContent);
    return fallbackContent;
  }
};
