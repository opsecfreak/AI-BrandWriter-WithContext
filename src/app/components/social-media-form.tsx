"use client";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { socialMediaFormSchema, type SocialMediaFormData, PLATFORM_OPTIONS, type PlatformType } from "@/agents/schemas/social-media-schema";
import axios from "axios";

interface BrandContext {
  id: string;
  businessName: string;
  industry: string | null;
  createdAt: string;
}

interface SocialMediaFormProps {
  onContentGenerated: (content: any) => void;
}

const SocialMediaForm: React.FC<SocialMediaFormProps> = ({ onContentGenerated }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<SocialMediaFormData>({
    resolver: zodResolver(socialMediaFormSchema),
    defaultValues: {
      platforms: ["twitter", "linkedin", "instagram"] // Default to first 3 platforms
    }
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [brandContexts, setBrandContexts] = useState<BrandContext[]>([]);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Set<PlatformType>>(
    new Set(["twitter", "linkedin", "instagram"])
  );

  const selectedBrandId = watch("brand_context_id");

  // Load available brand contexts
  useEffect(() => {
    const loadBrandContexts = async () => {
      try {
        const response = await axios.get("/api/brand-context");
        setBrandContexts(response.data.data || []);
      } catch (error) {
        console.error("Error loading brand contexts:", error);
      } finally {
        setLoadingBrands(false);
      }
    };
    loadBrandContexts();
  }, []);

  // Handle platform selection
  const handlePlatformToggle = (platform: PlatformType) => {
    const newSelection = new Set(selectedPlatforms);
    if (newSelection.has(platform)) {
      newSelection.delete(platform);
    } else {
      newSelection.add(platform);
    }
    setSelectedPlatforms(newSelection);
    setValue("platforms", Array.from(newSelection));
  };

  // Select all platforms
  const selectAllPlatforms = () => {
    const allPlatforms = PLATFORM_OPTIONS.map(p => p.value);
    setSelectedPlatforms(new Set(allPlatforms));
    setValue("platforms", allPlatforms);
  };

  // Clear all platforms
  const clearAllPlatforms = () => {
    setSelectedPlatforms(new Set());
    setValue("platforms", []);
  };

  const onSubmit: SubmitHandler<SocialMediaFormData> = async (data) => {
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
      reset({
        platforms: ["twitter", "linkedin", "instagram"]
      });
      setSelectedPlatforms(new Set(["twitter", "linkedin", "instagram"]));
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

  const selectedBrand = brandContexts.find(brand => brand.id === selectedBrandId);
  
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg shadow-lg border border-purple-200">
      <h3 className="text-xl font-semibold text-purple-800 mb-4">
        🚀 Social Media Content Creator
      </h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Brand Context Selection - Required */}
        <div className="space-y-2">
          <label htmlFor="brand_context_id" className="block text-sm font-medium text-purple-700">
            Brand Context* 
            <span className="text-xs text-gray-500 ml-1">(Required for content generation)</span>
          </label>
          {loadingBrands ? (
            <div className="w-full px-3 py-2 border border-purple-300 rounded-md bg-gray-50 text-gray-500">
              Loading brands...
            </div>
          ) : brandContexts.length === 0 ? (
            <div className="w-full px-3 py-2 border border-red-300 rounded-md bg-red-50 text-red-600">
              No brand contexts found. Please create a brand context first.
            </div>
          ) : (
            <select
              className="w-full px-3 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 text-gray-900"
              {...register("brand_context_id")}
            >
              <option value="">Select a brand...</option>
              {brandContexts.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.businessName} {brand.industry && `(${brand.industry})`}
                </option>
              ))}
            </select>
          )}
          {errors.brand_context_id && (
            <p className="text-sm text-red-600 mt-1">{errors.brand_context_id.message}</p>
          )}
          {selectedBrand && (
            <div className="mt-2 p-2 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-700">
                ✅ Selected: <strong>{selectedBrand.businessName}</strong>
                {selectedBrand.industry && ` • ${selectedBrand.industry}`}
              </p>
            </div>
          )}
        </div>

        {/* Platform Selection - Required */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-purple-700">
              Target Platforms* 
              <span className="text-xs text-gray-500 ml-1">(Select platforms to reduce token usage)</span>
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={selectAllPlatforms}
                className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={clearAllPlatforms}
                className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
              >
                Clear All
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {PLATFORM_OPTIONS.map((platform) => (
              <label
                key={platform.value}
                className={`flex items-center p-3 border rounded-lg cursor-pointer transition duration-200 ${
                  selectedPlatforms.has(platform.value)
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-gray-300 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-25"
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={selectedPlatforms.has(platform.value)}
                  onChange={() => handlePlatformToggle(platform.value)}
                />
                <span className="text-lg mr-2">{platform.icon}</span>
                <span className="text-sm font-medium">{platform.label}</span>
                {selectedPlatforms.has(platform.value) && (
                  <span className="ml-auto text-purple-500">✓</span>
                )}
              </label>
            ))}
          </div>
          
          {selectedPlatforms.size > 0 && (
            <div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">
                📊 Selected {selectedPlatforms.size} platform{selectedPlatforms.size !== 1 ? 's' : ''} • 
                Lower token usage = faster generation & lower costs
              </p>
            </div>
          )}
          
          {errors.platforms && (
            <p className="text-sm text-red-600 mt-1">{errors.platforms.message}</p>
          )}
        </div>

        {/* Topic Field */}
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
        
        {/* Tone and Target Audience */}
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
              placeholder="Override brand's target audience (optional)"
            />
          </div>
        </div>
        
        {/* Key Message */}
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
        
        {/* Call to Action and Hashtags */}
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
        
        {/* Additional Context */}
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
        
        {/* Submit Button */}
        <div className="flex justify-center pt-2">
          <button 
            disabled={isSubmitting || brandContexts.length === 0}
            className={`w-full py-3 px-6 rounded-md font-medium text-white transition duration-200 ${
              isSubmitting || brandContexts.length === 0
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            }`}  
            type="submit"
          >
            {isSubmitting 
              ? "✨ Creating Content..." 
              : brandContexts.length === 0
              ? "⚠️ Create Brand Context First"
              : `🎯 Generate Content for ${selectedPlatforms.size} Platform${selectedPlatforms.size !== 1 ? 's' : ''}`
            }
          </button>
        </div>
      </form>
    </div>
  );
};

export default SocialMediaForm;
