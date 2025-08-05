import { z } from "zod";

// Individual platform schemas with character limits
const TwitterSchema = z.object({
  text: z.string().max(280, "Twitter text must be 280 characters or less"),
  hashtags: z.array(z.string()),
  engagement_hook: z.string(),
  character_count: z.number().max(280)
});

const LinkedInSchema = z.object({
  text: z.string().max(3000, "LinkedIn text must be 3000 characters or less"),
  hashtags: z.array(z.string()),
  engagement_hook: z.string(),
  character_count: z.number().max(3000)
});

const InstagramSchema = z.object({
  text: z.string().max(2200, "Instagram caption must be 2200 characters or less"),
  hashtags: z.array(z.string()),
  engagement_hook: z.string(),
  character_count: z.number().max(2200)
});

const YouTubeVideoSchema = z.object({
  title: z.string().max(100, "YouTube video title must be 100 characters or less"),
  description: z.string().max(5000, "YouTube video description must be 5000 characters or less"),
  hashtags: z.array(z.string()),
  engagement_hook: z.string(),
  character_count: z.object({
    title: z.number().max(100),
    description: z.number().max(5000)
  })
});

const YouTubeShortsSchema = z.object({
  title: z.string().max(100, "YouTube Shorts title must be 100 characters or less"),
  description: z.string().max(5000, "YouTube Shorts description must be 5000 characters or less"),
  hashtags: z.array(z.string()),
  engagement_hook: z.string(),
  character_count: z.object({
    title: z.number().max(100),
    description: z.number().max(5000)
  })
});

const FacebookPostSchema = z.object({
  text: z.string().max(63206, "Facebook post text must be 63206 characters or less"),
  hashtags: z.array(z.string()),
  engagement_hook: z.string(),
  character_count: z.number().max(63206)
});

const FacebookReelSchema = z.object({
  caption: z.string().max(2200, "Facebook reel caption must be 2200 characters or less"),
  hashtags: z.array(z.string()),
  engagement_hook: z.string(),
  character_count: z.number().max(2200)
});

// Main schema
export const socialMediaSchema = z.object({
  content: z.object({
    twitter: TwitterSchema,
    linkedin: LinkedInSchema,
    instagram: InstagramSchema,
    youtube_video: YouTubeVideoSchema,
    youtube_shorts: YouTubeShortsSchema,
    facebook_post: FacebookPostSchema,
    facebook_reel: FacebookReelSchema
  }),
  strategy: z.object({
    target_audience: z.string().describe("Description of target audience"),
    content_pillars: z.array(z.string()).describe("Main content themes"),
    posting_schedule: z.string().describe("Optimal posting times and frequency"),
    engagement_tactics: z.array(z.string()).describe("Tactics to increase engagement")
  })
});

export const socialMediaFormSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
  tone: z.enum(["professional", "casual", "humorous", "inspirational", "educational"]),
  target_audience: z.string().optional(),
  key_message: z.string().optional(),
  call_to_action: z.string().optional(),
  hashtags: z.string().optional(),
  additional_context: z.string().optional()
});

export type SocialMediaContent = z.infer<typeof socialMediaSchema>;
export type SocialMediaFormData = z.infer<typeof socialMediaFormSchema>;
