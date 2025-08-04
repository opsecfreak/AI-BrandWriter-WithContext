"use client";
import { useState } from "react";
import TaskForm from "./components/task-form";
import SocialMediaForm from "./components/social-media-form";
import SocialMediaContentDisplay from "./components/social-media-content-display";

export default function Home() {
  const [socialMediaContent, setSocialMediaContent] = useState(null);

  const handleSocialMediaContentGenerated = (content: any) => {
    setSocialMediaContent(content);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">AI Content Studio</h1>
          <p className="text-gray-600">Task Management & Social Media Content Creation</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Task Manager */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-700 flex items-center">
              <span className="mr-2">📋</span>
              Task Manager
            </h2>
            <TaskForm />
          </div>

          {/* Right Column - Social Media Creator */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-700 flex items-center">
              <span className="mr-2">✨</span>
              Social Media Creator
            </h2>
            <SocialMediaForm onContentGenerated={handleSocialMediaContentGenerated} />
          </div>
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
      </div>
    </div>
  );
}
