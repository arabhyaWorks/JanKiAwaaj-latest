import React from 'react';
import { Heart, Share2, MessageCircle, Repeat2, MoreHorizontal } from 'lucide-react';

interface SocialMediaPostProps {
  url?: string;
  author?: string;
  content?: string;
  likes?: number;
  shares?: number;
  date?: string;
  platform?: string;
  tags?: string[];
}

const SocialMediaPost: React.FC<SocialMediaPostProps> = ({
  author = 'Unknown',
  content = '',
  likes = 0,
  url = '',
  shares = 0,
  date = '',
  platform = 'unknown',
  tags = [],
}) => {
  const formatNumber = (num: number) => {
    return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();
  };

  const getAuthorImage = (author: string) => {
    const safeAuthor = author.toLowerCase();
    if (safeAuthor.includes('yogi')) {
      return 'https://i.pinimg.com/736x/dd/7e/7f/dd7e7f211cb2f8bdc0a0cbaf662aa4ad.jpg';
    } else if (safeAuthor.includes('akhilesh')) {
      return 'https://media.publicvibe.com/community/topic/20240928/640933287_69761_050501801_168x300.jpg';
    }
    return 'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg';
  };

  const getVerifiedBadge = () => (
    <svg className="w-5 h-5 text-blue-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer shadow-sm rounded-lg"
    >
      <div className="p-2">
        <div className="flex space-x-3">
          <img
            src={getAuthorImage(author)}
            alt={author}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1">
              <h3 className="text-sm font-bold text-gray-900 hover:underline">{author}</h3>
              {getVerifiedBadge()}
              <span className="text-gray-500">·</span>
              <span className="text-gray-500 text-xs">{date}</span>
            </div>

            <p className="text-sm text-gray-900 mt-1">{content}</p>

            <div className="flex flex-wrap gap-1 mt-2">
              {tags.map((tag, index) => (
                <span key={index} className="text-blue-500 hover:underline text-xs">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between max-w-md mt-2">
              <div className="flex items-center space-x-2 text-gray-500 group">
                <div className="p-1.5 rounded-full group-hover:bg-blue-50 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span className="text-xs">Reply</span>
              </div>

              <div className="flex items-center space-x-2 text-gray-500 group">
                <div className="p-1.5 rounded-full group-hover:bg-green-50 transition-colors">
                  <Repeat2 className="w-4 h-4" />
                </div>
                <span className="text-xs">{formatNumber(shares)}</span>
              </div>

              <div className="flex items-center space-x-2 text-gray-500 group">
                <div className="p-1.5 rounded-full group-hover:bg-red-50 transition-colors">
                  <Heart className="w-4 h-4" />
                </div>
                <span className="text-xs">{formatNumber(likes)}</span>
              </div>

              <div className="flex items-center space-x-2 text-gray-500 group">
                <div className="p-1.5 rounded-full group-hover:bg-blue-50 transition-colors">
                  <Share2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <div className="p-1.5 rounded-full hover:bg-gray-100 cursor-pointer">
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default SocialMediaPost;
