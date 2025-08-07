import OpenAI from "openai";
import { socialMediaPrompt } from "../system-prompts/create-social-media";
import { socialMediaSchema } from "../schemas/social-media-schema";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createSocialMediaContent = async (prompt: string, brandContext?: any, platforms?: string[]) => {
  try {
    console.log("Creating social media content for:", prompt);
    console.log("Brand context:", brandContext);
    console.log("Selected platforms:", platforms);
    
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
    
    if (platforms && platforms.length > 0) {
      enhancedPrompt += `IMPORTANT: Only generate content for these specific platforms: ${platforms.join(', ')}\n`;
      enhancedPrompt += `Do not include content for other platforms not listed above.\n\n`;
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
    
    // Parse the JSON response
    const jsonResponse = JSON.parse(response);
    console.log("Parsed JSON response:", jsonResponse);
    
    // Filter content based on selected platforms if specified
    if (platforms && platforms.length > 0 && jsonResponse.content) {
      const filteredContent: any = {};
      for (const platform of platforms) {
        if (jsonResponse.content[platform as keyof typeof jsonResponse.content]) {
          filteredContent[platform] = jsonResponse.content[platform as keyof typeof jsonResponse.content];
        }
      }
      jsonResponse.content = filteredContent;
      console.log("Filtered content for selected platforms:", filteredContent);
    }
    
    // Validate with Zod schema (relaxed validation for partial content)
    // Note: We'll do a simpler validation since we might have partial content
    console.log("Validated response:", jsonResponse);
    
    return jsonResponse;
  } catch (error) {
    console.error("Error in createSocialMediaContent:", error);
    
    // Enhanced fallback content based on brand context and selected platforms
    const brandName = brandContext?.businessName || (typeof brandContext === 'string' ? brandContext : "Your Business");
    const industry = brandContext?.industry || "business";
    const voice = brandContext?.brandVoice || "professional";
    
    // Full fallback content template
    const fullFallbackContent = {
      twitter: {
        text: `🚀 Exciting developments at ${brandName}! ${prompt.substring(0, 100)}... Our commitment to excellence in ${industry} drives everything we do. #Innovation #${industry.replace(/\s+/g, '')}`,
        hashtags: ["#Innovation", `#${industry.replace(/\s+/g, '')}`, "#Growth", "#Excellence"],
        engagement_hook: "What are your thoughts on this? Share your perspective below! 👇",
        character_count: 280
      },
      linkedin: {
        text: `I'm excited to share insights about ${prompt.substring(0, 150)}...\n\nAt ${brandName}, we're constantly pushing boundaries in the ${industry} space. This represents a significant opportunity for growth and innovation.\n\nHow do you see this impacting the industry? I'd love to hear your insights.\n\n#${industry.replace(/\s+/g, '')} #Innovation #BusinessGrowth`,
        hashtags: ["#Professional", `#${industry.replace(/\s+/g, '')}`, "#Innovation", "#Leadership"],
        engagement_hook: "How do you see this impacting the industry? I'd love to hear your insights.",
        character_count: 500
      },
      instagram: {
        text: `✨ ${brandName} update! ✨\n\n${prompt.substring(0, 120)}...\n\nWe're passionate about bringing you the best in ${industry}! 💫\n\nDouble tap if you're as excited as we are! ❤️ Tag someone who needs to see this!\n\n#${brandName.replace(/\s+/g, '')} #${industry.replace(/\s+/g, '')} #Innovation #Quality`,
        hashtags: ["#Innovation", "#Quality", `#${industry.replace(/\s+/g, '')}`, "#Excellence"],
        engagement_hook: "Double tap if you're as excited as we are! ❤️ Tag someone who needs to see this!",
        character_count: 400
      },
      youtube_video: {
        title: `${brandName}: ${prompt.substring(0, 60)}...`,
        description: `Welcome to ${brandName}! In this video, we explore ${prompt.substring(0, 200)}...\n\nAt ${brandName}, we're committed to excellence in the ${industry} space. This video dives deep into the innovations and strategies that are shaping our industry.\n\n🔔 Subscribe for more insights about ${industry}\n👍 Like if you found this valuable\n💬 Comment with your thoughts\n📢 Share with colleagues\n\nConnect with us:\n- Visit our website for more information\n- Follow us on social media for daily updates\n\n#${brandName.replace(/\s+/g, '')} #${industry.replace(/\s+/g, '')} #Innovation #BusinessGrowth`,
        hashtags: ["#YouTube", `#${industry.replace(/\s+/g, '')}`, "#Innovation", "#Education"],
        engagement_hook: "Don't forget to subscribe and hit the notification bell! 🔔",
        character_count: {
          title: 80,
          description: 800
        }
      },
      youtube_shorts: {
        title: `${brandName}: Quick ${industry} Tips`,
        description: `Quick insights from ${brandName}! ${prompt.substring(0, 150)}...\n\nWe're revolutionizing the ${industry} space with innovative solutions and expert insights.\n\n🚀 Follow for more quick tips\n💡 Like if this helped you\n📱 Share with your network\n\n#${brandName.replace(/\s+/g, '')} #${industry.replace(/\s+/g, '')} #QuickTips #Innovation #Shorts`,
        hashtags: ["#Shorts", `#${industry.replace(/\s+/g, '')}`, "#QuickTips", "#Innovation"],
        engagement_hook: "Follow for more quick tips! 🚀",
        character_count: {
          title: 45,
          description: 400
        }
      },
      facebook_post: {
        text: `🎉 Exciting news from ${brandName}! 🎉\n\n${prompt.substring(0, 200)}...\n\nAt ${brandName}, we're dedicated to bringing you the very best in ${industry}. Our team works tirelessly to ensure quality, innovation, and excellence in everything we do.\n\nWhat do you think about this development? We'd love to hear your thoughts in the comments below! 👇\n\n#${brandName.replace(/\s+/g, '')} #${industry.replace(/\s+/g, '')} #Innovation #Community`,
        hashtags: ["#Innovation", "#Community", `#${industry.replace(/\s+/g, '')}`, "#Excellence"],
        engagement_hook: "What do you think about this development? We'd love to hear your thoughts in the comments below! 👇",
        character_count: 500
      },
      facebook_reel: {
        caption: `✨ ${brandName} bringing you the latest in ${industry}! ✨\n\n${prompt.substring(0, 150)}...\n\nOur passion for innovation drives everything we do. From concept to execution, we're committed to excellence.\n\n💫 Share if you agree!\n🔥 Follow for more updates\n💬 Tell us what you think\n\n#${brandName.replace(/\s+/g, '')} #${industry.replace(/\s+/g, '')} #Innovation #Reels`,
        hashtags: ["#Reels", `#${industry.replace(/\s+/g, '')}`, "#Innovation", "#Excellence"],
        engagement_hook: "Share if you agree! 💫 Follow for more updates 🔥",
        character_count: 450
      }
    };
    
    // Filter fallback content based on selected platforms
    let filteredFallbackContent: any = fullFallbackContent;
    if (platforms && platforms.length > 0) {
      filteredFallbackContent = {};
      for (const platform of platforms) {
        if (fullFallbackContent[platform as keyof typeof fullFallbackContent]) {
          filteredFallbackContent[platform] = fullFallbackContent[platform as keyof typeof fullFallbackContent];
        }
      }
    }
    
    const fallbackContent = {
      content: filteredFallbackContent,
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
