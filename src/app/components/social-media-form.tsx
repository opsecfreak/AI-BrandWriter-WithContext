"use client";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { socialMediaFormSchema, type SocialMediaFormData } from "@/agents/schemas/social-media-schema";
import axios from "axios";

interface SocialMediaFormProps {
  onContentGenerated: (content: any) => void;
  selectedBrandId?: string;
}

const SocialMediaForm: React.FC<SocialMediaFormProps> = ({ onContentGenerated, selectedBrandId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<SocialMediaFormData>({
    resolver: zodResolver(socialMediaFormSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [brandContexts, setBrandContexts] = useState<any[]>([]);

  // Set selected brand when prop changes
  useEffect(() => {
    if (selectedBrandId) {
      setValue("target_audience", ""); // Reset to use brand context
    }
  }, [selectedBrandId, setValue]);

  // Load available brand contexts
  useEffect(() => {
    const loadBrandContexts = async () => {
      try {
        const response = await axios.get("/api/brand-context");
        setBrandContexts(response.data.data || []);
      } catch (error) {
        console.error("Error loading brand contexts:", error);
      }
    };
    loadBrandContexts();
  }, []);

  const onSubmit: SubmitHandler<SocialMediaFormData> = async (data) => {
    setIsSubmitting(true);
    console.log("Submitting social media form data:", data);
    
    try {
      const submitData = {
        ...data,
        brandContextId: selectedBrandId || undefined
      };
      
      const response = await axios.post("/api/writer", submitData, {
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
          <label htmlFor="topic" className="block text-sm font-medium text-purple-700">
            Topic/Subject*
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 text-gray-900"
            {...register("topic")}
            placeholder="What's your content about? (e.g., New product launch, Industry insights)"
          />
          {errors.topic && (
            <p className="text-sm text-red-600 mt-1">{errors.topic.message}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="tone" className="block text-sm font-medium text-purple-700">
              Tone*
            </label>
            <select
              className="w-full px-3 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 text-gray-900"
              {...register("tone")}
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="humorous">Humorous</option>
              <option value="inspirational">Inspirational</option>
              <option value="educational">Educational</option>
            </select>
            {errors.tone && (
              <p className="text-sm text-red-600 mt-1">{errors.tone.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="target_audience" className="block text-sm font-medium text-purple-700">
              Target Audience
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 text-gray-900"
              {...register("target_audience")}
              placeholder="Who is this for? (leave blank to use brand context)"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="key_message" className="block text-sm font-medium text-purple-700">
            Key Message
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 text-gray-900"
            {...register("key_message")}
            placeholder="Main message you want to convey"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="call_to_action" className="block text-sm font-medium text-purple-700">
              Call to Action
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 text-gray-900"
              {...register("call_to_action")}
              placeholder="What should people do? (e.g., Visit our website, Contact us)"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="hashtags" className="block text-sm font-medium text-purple-700">
              Hashtags
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 text-gray-900"
              {...register("hashtags")}
              placeholder="#innovation #technology #business"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="additional_context" className="block text-sm font-medium text-purple-700">
            Additional Context
          </label>
          <textarea
            className="w-full px-3 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 resize-none text-gray-900"
            {...register("additional_context")}
            placeholder="Any additional information, specific requirements, or context..."
            rows={3}
          />
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
