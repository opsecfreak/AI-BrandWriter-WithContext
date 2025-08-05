"use client";
import React, { useState } from "react";

interface SocialMediaContentProps {
  content: {
    content: {
      twitter?: {
        text: string;
        hashtags: string[];
        engagement_hook: string;
        character_count: number;
      };
      linkedin?: {
        text: string;
        hashtags: string[];
        engagement_hook: string;
        character_count: number;
      };
      instagram?: {
        text: string;
        hashtags: string[];
        engagement_hook: string;
        character_count: number;
      };
      youtube_video?: {
        title: string;
        description: string;
        hashtags: string[];
        engagement_hook: string;
        character_count: {
          title: number;
          description: number;
        };
      };
      youtube_shorts?: {
        title: string;
        description: string;
        hashtags: string[];
        engagement_hook: string;
        character_count: {
          title: number;
          description: number;
        };
      };
      facebook_post?: {
        text: string;
        hashtags: string[];
        engagement_hook: string;
        character_count: number;
      };
      facebook_reel?: {
        caption: string;
        hashtags: string[];
        engagement_hook: string;
        character_count: number;
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
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  const copyToClipboard = async (text: string, platform: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(platform);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const platforms = [
    {
      name: "Twitter/X",
      icon: "🐦",
      data: content.content.twitter,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-800",
      limit: 280,
      getText: () => content.content.twitter?.text || ""
    },
    {
      name: "LinkedIn",
      icon: "💼",
      data: content.content.linkedin,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
      textColor: "text-blue-900",
      limit: 3000,
      getText: () => content.content.linkedin?.text || ""
    },
    {
      name: "Instagram",
      icon: "📸",
      data: content.content.instagram,
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      textColor: "text-pink-800",
      limit: 2200,
      getText: () => content.content.instagram?.text || ""
    },
    {
      name: "YouTube Video",
      icon: "🎥",
      data: content.content.youtube_video,
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-800",
      limit: { title: 100, description: 5000 },
      getText: () => `${content.content.youtube_video?.title || ""}\n\n${content.content.youtube_video?.description || ""}`
    },
    {
      name: "YouTube Shorts",
      icon: "📱",
      data: content.content.youtube_shorts,
      bgColor: "bg-red-50",
      borderColor: "border-red-300",
      textColor: "text-red-900",
      limit: { title: 100, description: 5000 },
      getText: () => `${content.content.youtube_shorts?.title || ""}\n\n${content.content.youtube_shorts?.description || ""}`
    },
    {
      name: "Facebook Post",
      icon: "👥",
      data: content.content.facebook_post,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-400",
      textColor: "text-blue-800",
      limit: 63206,
      getText: () => content.content.facebook_post?.text || ""
    },
    {
      name: "Facebook Reel",
      icon: "🎬",
      data: content.content.facebook_reel,
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-800",
      limit: 2200,
      getText: () => content.content.facebook_reel?.caption || ""
    }
  ];

  const getCharacterCountColor = (count: number, limit: number) => {
    if (count > limit) return "text-red-600";
    if (count > limit * 0.9) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="space-y-6">
      {/* Platform Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {platforms.map((platform) => {
          if (!platform.data) return null;
          
          return (
            <div
              key={platform.name}
              className={`${platform.bgColor} p-4 rounded-lg border ${platform.borderColor} shadow-sm`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{platform.icon}</span>
                  <h4 className={`font-semibold ${platform.textColor}`}>
                    {platform.name}
                  </h4>
                </div>
                <button
                  onClick={() => copyToClipboard(platform.getText(), platform.name)}
                  className="text-xs px-2 py-1 bg-white rounded border hover:bg-gray-50 transition-colors"
                  title="Copy to clipboard"
                >
                  {copiedText === platform.name ? "✅" : "📋"}
                </button>
              </div>
              
              <div className="space-y-3">
                {/* YouTube platforms have title and description */}
                {(platform.name === "YouTube Video" || platform.name === "YouTube Shorts") && platform.data && 'title' in platform.data ? (
                  <>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-xs font-medium text-gray-600">Title:</p>
                        <span className={`text-xs ${getCharacterCountColor(
                          typeof platform.data.character_count === 'object' ? platform.data.character_count.title : 0, 
                          100
                        )}`}>
                          {typeof platform.data.character_count === 'object' ? platform.data.character_count.title : 0}/100
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-800 mb-2">
                        {platform.data.title}
                      </p>
                      
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-xs font-medium text-gray-600">Description:</p>
                        <span className={`text-xs ${getCharacterCountColor(
                          typeof platform.data.character_count === 'object' ? platform.data.character_count.description : 0, 
                          5000
                        )}`}>
                          {typeof platform.data.character_count === 'object' ? platform.data.character_count.description : 0}/5000
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {platform.data.description}
                      </p>
                    </div>
                  </>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-xs font-medium text-gray-600">
                        {platform.name === "Facebook Reel" ? "Caption:" : "Content:"}
                      </p>
                      <span className={`text-xs ${getCharacterCountColor(
                        typeof platform.data?.character_count === 'number' ? platform.data.character_count : 0, 
                        typeof platform.limit === 'number' ? platform.limit : 0
                      )}`}>
                        {typeof platform.data?.character_count === 'number' ? platform.data.character_count : 0}/{typeof platform.limit === 'number' ? platform.limit : ''}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {platform.name === "Facebook Reel" && platform.data && 'caption' in platform.data 
                        ? platform.data.caption 
                        : platform.data && 'text' in platform.data 
                        ? platform.data.text 
                        : ''}
                    </p>
                  </div>
                )}
                
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
