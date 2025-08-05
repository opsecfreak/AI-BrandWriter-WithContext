"use client";
import React from "react";
import SocialMediaContentDisplay from "./social-media-content-display";

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

interface SocialMediaModalProps {
  generation: SocialMediaGeneration | null;
  onClose: () => void;
}

const SocialMediaModal: React.FC<SocialMediaModalProps> = ({ generation, onClose }) => {
  if (!generation) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {generation.topic || 'Social Media Content'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Generated on {formatDate(generation.createdAt)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            title="Close"
          >
            ×
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Generation Details */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-3">Generation Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {generation.tone && (
                <div>
                  <span className="font-medium text-gray-600">Tone:</span>
                  <span className="ml-2 capitalize">{generation.tone}</span>
                </div>
              )}
              {generation.targetAudience && (
                <div>
                  <span className="font-medium text-gray-600">Target Audience:</span>
                  <span className="ml-2">{generation.targetAudience}</span>
                </div>
              )}
              {generation.keyMessage && (
                <div className="col-span-1 md:col-span-2">
                  <span className="font-medium text-gray-600">Key Message:</span>
                  <p className="mt-1 text-gray-800">{generation.keyMessage}</p>
                </div>
              )}
            </div>
            
            {/* User Prompt */}
            <div className="mt-4">
              <span className="font-medium text-gray-600">Original Prompt:</span>
              <div className="mt-2 p-3 bg-white rounded border text-sm text-gray-700 whitespace-pre-wrap">
                {generation.userPrompt}
              </div>
            </div>
          </div>

          {/* Generated Content */}
          {generation.processedOutput ? (
            <div>
              <h3 className="font-medium text-gray-800 mb-4">Generated Content</h3>
              <SocialMediaContentDisplay content={generation.processedOutput} />
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <span className="text-4xl block mb-2">📝</span>
              <p>No generated content available</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaModal;
