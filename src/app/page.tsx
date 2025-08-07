"use client";
import { useState } from "react";
import SocialMediaForm from "./components/social-media-form";
import SocialMediaContentDisplay from "./components/social-media-content-display";
import BrandContextForm from "./components/brand-context-form";
import SocialMediaSidebar from "./components/social-media-sidebar";
import SocialMediaModal from "./components/social-media-modal";

interface SocialMediaGeneration {
  id: string;
  topic: string | null;
  tone: string | null;
  userPrompt: string;
  createdAt: string;
  targetAudience: string | null;
  keyMessage: string | null;
  processedOutput: any;
}

export default function Home() {
  const [socialMediaContent, setSocialMediaContent] = useState(null);
  const [showBrandForm, setShowBrandForm] = useState(false);
  const [selectedGeneration, setSelectedGeneration] = useState<SocialMediaGeneration | null>(null);

  const handleSocialMediaContentGenerated = (content: any) => {
    setSocialMediaContent(content);
  };

  const handleBrandSaved = (brandId: string) => {
    setShowBrandForm(false);
    // Optionally refresh the form to show the new brand
  };

  const handleSelectGeneration = (generation: SocialMediaGeneration) => {
    setSelectedGeneration(generation);
  };

  const handleCloseModal = () => {
    setSelectedGeneration(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Fixed Left Sidebar */}
      <div className="w-80 flex-shrink-0">
        <SocialMediaSidebar
          onSelectGeneration={handleSelectGeneration}
        />
      </div>

      {/* Modal for viewing historical content */}
      <SocialMediaModal
        generation={selectedGeneration}
        onClose={handleCloseModal}
      />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-8">
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
              Powered by AI • Create engaging content for Twitter, LinkedIn, Instagram, YouTube, and Facebook
            </p>
            <p className="text-gray-400 text-xs mt-2">
              📜 Social media history is available in the left sidebar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
