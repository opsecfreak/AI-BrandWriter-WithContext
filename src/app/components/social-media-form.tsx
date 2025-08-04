"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

const socialMediaFormSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(10, {
      message: "Content prompt must be at least 10 characters long",
    })
    .max(200, {
      message: "Content prompt must be at most 200 characters long",
    }),
  brand: z
    .string()
    .trim()
    .max(50, {
      message: "Brand name must be at most 50 characters long",
    })
    .optional(),
  platform: z
    .string()
    .optional(),
});

type SocialMediaInputType = z.infer<typeof socialMediaFormSchema>;

interface SocialMediaFormProps {
  onContentGenerated: (content: any) => void;
}

const SocialMediaForm: React.FC<SocialMediaFormProps> = ({ onContentGenerated }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SocialMediaInputType>({
    resolver: zodResolver(socialMediaFormSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<SocialMediaInputType> = async (data) => {
    setIsSubmitting(true);
    console.log("Submitting social media form data:", data);
    
    try {
      const response = await axios.post("/api/writer", data, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      });
      console.log("Social media content generated successfully:", response.data);
      onContentGenerated(response.data.data);
      reset();
    } catch (error) {
      console.error("Error generating social media content:", error);
      if (axios.isAxiosError(error)) {
        console.error("Response data:", error.response?.data);
        console.error("Response status:", error.response?.status);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg shadow-lg border border-purple-200">
      <h3 className="text-xl font-semibold text-purple-800 mb-4">
        🚀 Social Media Content Creator
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="prompt" className="block text-sm font-medium text-purple-700">
            Content Idea*
          </label>
          <textarea
            className="w-full px-3 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 resize-none text-gray-900"
            {...register("prompt")}
            placeholder="Describe what you want to post about..."
            rows={3}
          />
          {errors.prompt && (
            <p className="text-sm text-red-600 mt-1">{errors.prompt.message}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="brand" className="block text-sm font-medium text-purple-700">
              Brand/Business Name
            </label>
            <input
              className="w-full px-3 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 text-gray-900"
              {...register("brand")}
              type="text"
              placeholder="Your brand name (optional)"
            />
            {errors.brand && (
              <p className="text-sm text-red-600 mt-1">{errors.brand.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="platform" className="block text-sm font-medium text-purple-700">
              Platform Focus
            </label>
            <select
              className="w-full px-3 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 text-gray-900"
              {...register("platform")}
            >
              <option value="">All Platforms</option>
              <option value="twitter">Twitter/X</option>
              <option value="linkedin">LinkedIn</option>
              <option value="instagram">Instagram</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-center pt-2">
          <button 
            disabled={isSubmitting}
            className={`w-full py-3 px-6 rounded-md font-medium text-white transition duration-200 ${
              isSubmitting 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            }`}  
            type="submit"
          >
            {isSubmitting ? "✨ Creating Content..." : "🎯 Generate Social Media Content"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SocialMediaForm;
