"use client";
import { useState } from "react";
import SocialMediaForm from "./components/social-media-form";
import SocialMediaContentDisplay from "./components/social-media-content-display";
import BrandContextForm from "./components/brand-context-form";

export default function Home() {
  const [socialMediaContent, setSocialMediaContent] = useState(null);
  const [selectedBrandId, setSelectedBrandId] = useState<string>("");
  const [showBrandForm, setShowBrandForm] = useState(false);

  const handleSocialMediaContentGenerated = (content: any) => {
    setSocialMediaContent(content);
  };

  const handleBrandSaved = (brandId: string) => {
    setSelectedBrandId(brandId);
    setShowBrandForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">AI Social Media Studio</h1>
          <p className="text-gray-600">Create engaging social media content with AI-powered brand awareness</p>
        </div>

        {/* Brand Context Section */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowBrandForm(!showBrandForm)}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
          >
            <span className="text-xl mr-2">🏢</span>
            {showBrandForm ? "Hide Brand Setup" : "Setup Brand Context"}
          </button>
        </div>

        {/* Conditional Brand Form */}
        {showBrandForm && (
          <div className="max-w-4xl mx-auto">
            <BrandContextForm onBrandSaved={handleBrandSaved} />
          </div>
        )}

        {/* Social Media Creator */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 flex items-center justify-center">
              <span className="mr-2">✨</span>
              Social Media Content Creator
            </h2>
            <p className="text-gray-600 mt-2">
              Generate platform-optimized content for your brand
            </p>
          </div>
          <SocialMediaForm 
            onContentGenerated={handleSocialMediaContentGenerated} 
            selectedBrandId={selectedBrandId}
          />
        </div>

        {/* Social Media Content Display */}
        {socialMediaContent && (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-700 flex items-center justify-center">
                <span className="mr-2">🎯</span>
                Generated Social Media Content
              </h2>
              <p className="text-gray-600 mt-2">Ready to copy and paste to your social platforms!</p>
            </div>
            <SocialMediaContentDisplay content={socialMediaContent} />
          </div>
        )}

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">
            Powered by AI • Create engaging content for Twitter, LinkedIn, and Instagram
          </p>
        </div>
      </div>
    </div>
  );
}
