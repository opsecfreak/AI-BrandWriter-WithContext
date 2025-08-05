"use client";
import React, { useState, useEffect } from "react";

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

interface BrandGroup {
  brandName: string;
  brandId: string;
  industry: string | null;
  generations: SocialMediaGeneration[];
}

interface SocialMediaSidebarProps {
  onSelectGeneration: (generation: SocialMediaGeneration) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const SocialMediaSidebar: React.FC<SocialMediaSidebarProps> = ({ 
  onSelectGeneration, 
  isOpen, 
  onToggle 
}) => {
  const [history, setHistory] = useState<BrandGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedBrands, setExpandedBrands] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isOpen) {
      fetchHistory();
    }
  }, [isOpen]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/social-media-history');
      const result = await response.json();
      
      if (result.status === 200) {
        setHistory(result.data);
        // Auto-expand first brand if it has generations
        if (result.data.length > 0 && result.data[0].generations.length > 0) {
          setExpandedBrands(new Set([result.data[0].brandId]));
        }
      }
    } catch (error) {
      console.error('Error fetching social media history:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleBrand = (brandId: string) => {
    const newExpanded = new Set(expandedBrands);
    if (newExpanded.has(brandId)) {
      newExpanded.delete(brandId);
    } else {
      newExpanded.add(brandId);
    }
    setExpandedBrands(newExpanded);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const deleteGeneration = async (generationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!confirm('Are you sure you want to delete this generation?')) {
      return;
    }

    try {
      const response = await fetch(`/api/social-media-history?id=${generationId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        fetchHistory(); // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting generation:', error);
    }
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={onToggle}
        className={`fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 ${
          isOpen ? 'left-80' : 'left-4'
        }`}
        title={isOpen ? "Close History" : "Open History"}
      >
        {isOpen ? '✕' : '📜'}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-xl z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '320px' }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <span className="mr-2">📱</span>
              Social Media History
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Previous content generations by brand
            </p>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <span className="text-4xl block mb-2">🎯</span>
                <p className="text-sm">No content generated yet</p>
                <p className="text-xs mt-1">Create your first social media content!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {history.map((brand) => (
                  <div key={brand.brandId} className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Brand Header */}
                    <button
                      onClick={() => toggleBrand(brand.brandId)}
                      className="w-full p-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center">
                        <span className="text-lg mr-2">🏢</span>
                        <div className="text-left">
                          <h3 className="font-medium text-gray-800 text-sm">
                            {brand.brandName}
                          </h3>
                          {brand.industry && (
                            <p className="text-xs text-gray-500">{brand.industry}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-2">
                          {brand.generations.length}
                        </span>
                        <span className={`transform transition-transform ${
                          expandedBrands.has(brand.brandId) ? 'rotate-90' : ''
                        }`}>
                          ▶
                        </span>
                      </div>
                    </button>

                    {/* Brand Generations */}
                    {expandedBrands.has(brand.brandId) && (
                      <div className="border-t border-gray-200">
                        {brand.generations.length === 0 ? (
                          <div className="p-3 text-center text-gray-500 text-sm">
                            No generations yet
                          </div>
                        ) : (
                          <div className="max-h-64 overflow-y-auto">
                            {brand.generations.map((generation) => (
                              <div
                                key={generation.id}
                                onClick={() => onSelectGeneration(generation)}
                                className="p-3 border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors group"
                              >
                                <div className="flex justify-between items-start">
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-sm text-gray-800 truncate">
                                      {generation.topic || 'Social Media Content'}
                                    </h4>
                                    {generation.tone && (
                                      <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded mt-1">
                                        {generation.tone}
                                      </span>
                                    )}
                                    <p className="text-xs text-gray-500 mt-1">
                                      {formatDate(generation.createdAt)}
                                    </p>
                                  </div>
                                  <button
                                    onClick={(e) => deleteGeneration(generation.id, e)}
                                    className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all ml-2"
                                    title="Delete generation"
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={fetchHistory}
              className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              🔄 Refresh History
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-30"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default SocialMediaSidebar;
