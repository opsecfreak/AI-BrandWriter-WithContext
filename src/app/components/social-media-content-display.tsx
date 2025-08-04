"use client";
import React from "react";

interface SocialMediaContentProps {
  content: {
    content: {
      twitter?: {
        text: string;
        hashtags: string[];
        engagement_hook: string;
      };
      linkedin?: {
        text: string;
        hashtags: string[];
        engagement_hook: string;
      };
      instagram?: {
        text: string;
        hashtags: string[];
        engagement_hook: string;
      };
    };
    strategy: {
      target_audience: string;
      content_pillars: string[];
      posting_schedule: string;
      engagement_tactics: string[];
    };
  };
}

const SocialMediaContentDisplay: React.FC<SocialMediaContentProps> = ({ content }) => {
  const platforms = [
    {
      name: "Twitter/X",
      icon: "🐦",
      data: content.content.twitter,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-800"
    },
    {
      name: "LinkedIn",
      icon: "💼",
      data: content.content.linkedin,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
      textColor: "text-blue-900"
    },
    {
      name: "Instagram",
      icon: "📸",
      data: content.content.instagram,
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      textColor: "text-pink-800"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Platform Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => {
          if (!platform.data) return null;
          
          return (
            <div
              key={platform.name}
              className={`${platform.bgColor} p-4 rounded-lg border ${platform.borderColor} shadow-sm`}
            >
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">{platform.icon}</span>
                <h4 className={`font-semibold ${platform.textColor}`}>
                  {platform.name}
                </h4>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {platform.data.text}
                  </p>
                </div>
                
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-1">Hashtags:</p>
                  <div className="flex flex-wrap gap-1">
                    {platform.data.hashtags.map((hashtag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-white rounded-full border text-gray-600"
                      >
                        {hashtag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs font-medium text-gray-600 mb-1">Engagement Hook:</p>
                  <p className="text-xs text-gray-600 italic">
                    {platform.data.engagement_hook}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Strategy Section */}
      <div className="bg-green-50 p-6 rounded-lg border border-green-200 shadow-sm">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-2">📊</span>
          <h4 className="font-semibold text-green-800">Content Strategy</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-green-700 mb-2">Target Audience</h5>
            <p className="text-sm text-gray-700 mb-4">
              {content.strategy.target_audience}
            </p>
            
            <h5 className="font-medium text-green-700 mb-2">Content Pillars</h5>
            <div className="flex flex-wrap gap-2">
              {content.strategy.content_pillars.map((pillar, index) => (
                <span
                  key={index}
                  className="text-xs px-3 py-1 bg-green-100 rounded-full text-green-700 border border-green-200"
                >
                  {pillar}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h5 className="font-medium text-green-700 mb-2">Posting Schedule</h5>
            <p className="text-sm text-gray-700 mb-4">
              {content.strategy.posting_schedule}
            </p>
            
            <h5 className="font-medium text-green-700 mb-2">Engagement Tactics</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              {content.strategy.engagement_tactics.map((tactic, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  {tactic}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaContentDisplay;
