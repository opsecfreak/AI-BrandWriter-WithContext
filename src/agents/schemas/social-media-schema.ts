import { z } from "zod";

export const socialMediaSchema = z.object({
  content: z.object({
    twitter: z.object({
      text: z.string().describe("Twitter post content"),
      hashtags: z.array(z.string()).describe("Relevant hashtags for Twitter"),
      engagement_hook: z.string().describe("Engagement strategy for Twitter")
    }).optional(),
    linkedin: z.object({
      text: z.string().describe("LinkedIn post content"),
      hashtags: z.array(z.string()).describe("Professional hashtags for LinkedIn"),
      engagement_hook: z.string().describe("Professional engagement strategy")
    }).optional(),
    instagram: z.object({
      text: z.string().describe("Instagram caption content"),
      hashtags: z.array(z.string()).describe("Visual hashtags for Instagram"),
      engagement_hook: z.string().describe("Visual storytelling engagement")
    }).optional()
  }),
  strategy: z.object({
    target_audience: z.string().describe("Description of target audience"),
    content_pillars: z.array(z.string()).describe("Main content themes"),
    posting_schedule: z.string().describe("Optimal posting times and frequency"),
    engagement_tactics: z.array(z.string()).describe("Tactics to increase engagement")
  })
});

export type SocialMediaContent = z.infer<typeof socialMediaSchema>;
