"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

const brandContextSchema = z.object({
  businessName: z
    .string()
    .trim()
    .min(2, {
      message: "Business name must be at least 2 characters long",
    })
    .max(100, {
      message: "Business name must be at most 100 characters long",
    }),
  industry: z
    .string()
    .trim()
    .max(50, {
      message: "Industry must be at most 50 characters long",
    })
    .optional(),
  targetAudience: z
    .string()
    .trim()
    .max(200, {
      message: "Target audience description must be at most 200 characters long",
    })
    .optional(),
  brandVoice: z
    .string()
    .optional(),
  keyProducts: z
    .string()
    .trim()
    .max(300, {
      message: "Key products description must be at most 300 characters long",
    })
    .optional(),
  brandValues: z
    .string()
    .trim()
    .max(300, {
      message: "Brand values must be at most 300 characters long",
    })
    .optional(),
  uniqueSellingPoints: z
    .string()
    .trim()
    .max(300, {
      message: "Unique selling points must be at most 300 characters long",
    })
    .optional(),
  website: z
    .string()
    .trim()
    .url({ message: "Please enter a valid website URL" })
    .optional()
    .or(z.literal("")),
  additionalContext: z
    .string()
    .trim()
    .max(1000, {
      message: "Additional context must be at most 1000 characters long",
    })
    .optional(),
});

type BrandContextInputType = z.infer<typeof brandContextSchema>;

interface BrandContextFormProps {
  onBrandSaved: (brandId: string) => void;
  existingBrand?: any;
}

const BrandContextForm: React.FC<BrandContextFormProps> = ({ onBrandSaved, existingBrand }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BrandContextInputType>({
    resolver: zodResolver(brandContextSchema),
    defaultValues: existingBrand || {},
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<BrandContextInputType> = async (data) => {
    setIsSubmitting(true);
    console.log("Submitting brand context data:", data);
    
    try {
      const response = await axios.post("/api/brand-context", data, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });
      console.log("Brand context saved successfully:", response.data);
      onBrandSaved(response.data.data.id);
      if (!existingBrand) {
        reset();
      }
    } catch (error) {
      console.error("Error saving brand context:", error);
      if (axios.isAxiosError(error)) {
        console.error("Response data:", error.response?.data);
        console.error("Response status:", error.response?.status);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg shadow-lg border border-blue-200">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-2">🏢</span>
        <h3 className="text-xl font-semibold text-blue-800">
          {existingBrand ? "Update Brand Context" : "Setup Your Brand Context"}
        </h3>
      </div>
      <p className="text-sm text-blue-600 mb-6">
        Tell us about your business to create more personalized social media content
      </p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="businessName" className="block text-sm font-medium text-blue-700">
              Business Name*
            </label>
            <input
              className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-900"
              {...register("businessName")}
              type="text"
              placeholder="Your business name"
            />
            {errors.businessName && (
              <p className="text-sm text-red-600 mt-1">{errors.businessName.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="industry" className="block text-sm font-medium text-blue-700">
              Industry
            </label>
            <input
              className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-900"
              {...register("industry")}
              type="text"
              placeholder="e.g., Technology, Healthcare, Retail"
            />
            {errors.industry && (
              <p className="text-sm text-red-600 mt-1">{errors.industry.message}</p>
            )}
          </div>
        </div>

        {/* Target Audience */}
        <div className="space-y-2">
          <label htmlFor="targetAudience" className="block text-sm font-medium text-blue-700">
            Target Audience
          </label>
          <textarea
            className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-none text-gray-900"
            {...register("targetAudience")}
            placeholder="Describe your ideal customers..."
            rows={2}
          />
          {errors.targetAudience && (
            <p className="text-sm text-red-600 mt-1">{errors.targetAudience.message}</p>
          )}
        </div>

        {/* Brand Voice and Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="brandVoice" className="block text-sm font-medium text-blue-700">
              Brand Voice
            </label>
            <select
              className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-900"
              {...register("brandVoice")}
            >
              <option value="">Select brand voice...</option>
              <option value="professional">Professional</option>
              <option value="casual">Casual & Friendly</option>
              <option value="authoritative">Authoritative</option>
              <option value="playful">Playful & Fun</option>
              <option value="inspirational">Inspirational</option>
              <option value="educational">Educational</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="website" className="block text-sm font-medium text-blue-700">
              Website
            </label>
            <input
              className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-900"
              {...register("website")}
              type="url"
              placeholder="https://yourwebsite.com"
            />
            {errors.website && (
              <p className="text-sm text-red-600 mt-1">{errors.website.message}</p>
            )}
          </div>
        </div>

        {/* Key Products/Services */}
        <div className="space-y-2">
          <label htmlFor="keyProducts" className="block text-sm font-medium text-blue-700">
            Key Products/Services
          </label>
          <textarea
            className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-none text-gray-900"
            {...register("keyProducts")}
            placeholder="List your main products or services..."
            rows={2}
          />
          {errors.keyProducts && (
            <p className="text-sm text-red-600 mt-1">{errors.keyProducts.message}</p>
          )}
        </div>

        {/* Brand Values and USP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="brandValues" className="block text-sm font-medium text-blue-700">
              Brand Values
            </label>
            <textarea
              className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-none text-gray-900"
              {...register("brandValues")}
              placeholder="What does your brand stand for?"
              rows={2}
            />
            {errors.brandValues && (
              <p className="text-sm text-red-600 mt-1">{errors.brandValues.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="uniqueSellingPoints" className="block text-sm font-medium text-blue-700">
              What Makes You Different?
            </label>
            <textarea
              className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-none text-gray-900"
              {...register("uniqueSellingPoints")}
              placeholder="Your unique selling points..."
              rows={2}
            />
            {errors.uniqueSellingPoints && (
              <p className="text-sm text-red-600 mt-1">{errors.uniqueSellingPoints.message}</p>
            )}
          </div>
        </div>

        {/* Additional Context */}
        <div className="space-y-2">
          <label htmlFor="additionalContext" className="block text-sm font-medium text-blue-700">
            Additional Context
          </label>
          <textarea
            className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-none text-gray-900"
            {...register("additionalContext")}
            placeholder="Any other important details about your brand..."
            rows={3}
          />
          {errors.additionalContext && (
            <p className="text-sm text-red-600 mt-1">{errors.additionalContext.message}</p>
          )}
        </div>
        
        <div className="flex justify-center pt-4">
          <button 
            disabled={isSubmitting}
            className={`w-full py-3 px-6 rounded-md font-medium text-white transition duration-200 ${
              isSubmitting 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            }`}  
            type="submit"
          >
            {isSubmitting ? "🔄 Saving..." : existingBrand ? "📝 Update Brand Context" : "💾 Save Brand Context"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrandContextForm;
