import newsData from "../../public/news.json";
import React from "react";
import { Newspaper, Calendar, ExternalLink } from "lucide-react";

const NewsAnalysis = () => {
  if (!newsData || newsData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Newspaper className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No News Available
        </h3>
        <p className="text-gray-500 text-center max-w-sm">
          There are currently no news items to display. Please check back later.
        </p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Unknown date";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Latest News Analysis
        </h2>
        <p className="text-gray-600">
          Stay updated with the latest political developments
        </p>
      </div>

      {/* News Grid */}
      <div className="space-y-6">
        {newsData.map((item, index) => (
          <article
            key={index}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Image Section - Only show if imageUrl exists and is not empty */}
              {item.imageUrl && item.imageUrl.trim() && (
                <div className="lg:w-80 lg:flex-shrink-0">
                  <div className="h-48 lg:h-full relative overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target;
                        const container = target.parentElement?.parentElement;
                        if (container) {
                          container.style.display = "none";
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>
              )}

              {/* Content Section */}
              <div className="flex-1 p-6 lg:p-8">
                <div className="flex flex-col h-full">
                  {/* Header Info */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="flex items-center space-x-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
                        <Newspaper className="w-4 h-4" />
                        <span>{item.source}</span>
                      </div>
                    </div>
                    {item.author && item.author !== "Unknown" && (
                      <div className="text-sm text-gray-500 font-medium">
                        by {item.author}
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 leading-tight">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 transition-colors duration-200 group-hover:text-blue-600"
                    >
                      {item.title}
                    </a>
                  </h3>

                  {/* Description - Only show if exists and not empty */}
                  {item.description && item.description.trim() && (
                    <div className="flex-grow mb-6">
                      <p className="text-gray-700 leading-relaxed text-base">
                        {item.description.replace(/^\r?\n|\r?\n$/g, "").trim()}
                      </p>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={item.publishedAt}>
                        {formatDate(item.publishedAt)}
                      </time>
                    </div>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-600 rounded-lg transition-all duration-200"
                    >
                      <span>Read Full Article</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};

export default NewsAnalysis;
