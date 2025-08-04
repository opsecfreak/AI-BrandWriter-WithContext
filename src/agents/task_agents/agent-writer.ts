import OpenAI from "openai";
import { socialMediaPrompt } from "../system-prompts/create-social-media";
import { socialMediaSchema } from "../schemas/social-media-schema";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createSocialMediaContent = async (prompt: string, brandContext?: any, platform?: string) => {
  try {
    console.log("Creating social media content for:", prompt);
    console.log("Brand context:", brandContext);
    
    // Build enhanced prompt with brand context
    let enhancedPrompt = `Content Request: ${prompt}\n\n`;
    
    if (brandContext && typeof brandContext === 'object') {
      enhancedPrompt += `BRAND CONTEXT:\n`;
      enhancedPrompt += `Business Name: ${brandContext.businessName || 'Not specified'}\n`;
      enhancedPrompt += `Industry: ${brandContext.industry || 'Not specified'}\n`;
      enhancedPrompt += `Target Audience: ${brandContext.targetAudience || 'General audience'}\n`;
      enhancedPrompt += `Brand Voice: ${brandContext.brandVoice || 'Professional'}\n`;
      enhancedPrompt += `Key Products/Services: ${brandContext.keyProducts || 'Not specified'}\n`;
      enhancedPrompt += `Brand Values: ${brandContext.brandValues || 'Not specified'}\n`;
      enhancedPrompt += `Unique Selling Points: ${brandContext.uniqueSellingPoints || 'Not specified'}\n`;
      enhancedPrompt += `Website: ${brandContext.website || 'Not provided'}\n`;
      if (brandContext.additionalContext) {
        enhancedPrompt += `Additional Context: ${brandContext.additionalContext}\n`;
      }
      enhancedPrompt += `\n`;
    } else if (brandContext && typeof brandContext === 'string') {
      enhancedPrompt += `Brand/Business: ${brandContext}\n`;
    }
    
    if (platform) {
      enhancedPrompt += `Platform Focus: ${platform}\n`;
    }
    
    enhancedPrompt += `\nPlease create engaging, brand-appropriate social media content that reflects the brand's voice and appeals to the target audience.`;
    
    console.log("Enhanced prompt:", enhancedPrompt);
    
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
    
    // Enhanced fallback content based on brand context
    const brandName = brandContext?.businessName || (typeof brandContext === 'string' ? brandContext : "Your Business");
    const industry = brandContext?.industry || "business";
    const voice = brandContext?.brandVoice || "professional";
    
    const fallbackContent = {
      content: {
        twitter: {
          text: `🚀 Exciting developments at ${brandName}! ${prompt.substring(0, 100)}... Our commitment to excellence in ${industry} drives everything we do. #Innovation #${industry.replace(/\s+/g, '')}`,
          hashtags: ["#Innovation", `#${industry.replace(/\s+/g, '')}`, "#Growth", "#Excellence"],
          engagement_hook: "What are your thoughts on this? Share your perspective below! 👇"
        },
        linkedin: {
          text: `I'm excited to share insights about ${prompt.substring(0, 150)}...\n\nAt ${brandName}, we're constantly pushing boundaries in the ${industry} space. This represents a significant opportunity for growth and innovation.\n\n#${industry.replace(/\s+/g, '')} #Innovation #BusinessGrowth`,
          hashtags: ["#Professional", `#${industry.replace(/\s+/g, '')}`, "#Innovation", "#Leadership"],
          engagement_hook: "How do you see this impacting the industry? I'd love to hear your insights."
        },
        instagram: {
          text: `✨ ${brandName} update! ✨\n\n${prompt.substring(0, 120)}...\n\nWe're passionate about bringing you the best in ${industry}! 💫\n\n#${brandName.replace(/\s+/g, '')} #${industry.replace(/\s+/g, '')} #Innovation #Quality`,
          hashtags: ["#Innovation", "#Quality", `#${industry.replace(/\s+/g, '')}`, "#Excellence"],
          engagement_hook: "Double tap if you're as excited as we are! ❤️ Tag someone who needs to see this!"
        }
      },
      strategy: {
        target_audience: brandContext?.targetAudience || "Business professionals and potential customers",
        content_pillars: ["Innovation", "Quality", "Excellence", industry],
        posting_schedule: `Optimal times for ${voice} brand: 9-10 AM, 2-3 PM, 7-8 PM`,
        engagement_tactics: ["Ask questions", "Use polls", "Share behind-the-scenes", "User-generated content"]
      }
    };
    
    console.log("Using enhanced fallback social media content:", fallbackContent);
    return fallbackContent;
  }
};
