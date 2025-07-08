import React from 'react';
import { Heart, Share2, Calendar, MessageCircle, Repeat2, MoreHorizontal } from 'lucide-react';

interface SocialMediaPostProps {
  author: string;
  content: string;
  likes: number;
  shares: number;
  date: string;
  platform: string;
  tags: string[];
}

const SocialMediaPost: React.FC<SocialMediaPostProps> = ({ 
  author, content, likes, shares, date, platform, tags 
}) => {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  const getAuthorImage = (author: string) => {
    if (author.toLowerCase().includes('yogi')) {
      return 'https://i.pinimg.com/736x/dd/7e/7f/dd7e7f211cb2f8bdc0a0cbaf662aa4ad.jpg';
    } else if (author.toLowerCase().includes('akhilesh')) {
      return 'https://media.publicvibe.com/community/topic/20240928/640933287_69761_050501801_168x300.jpg';
    }
    return 'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=';
  };

  const getPlatformLogo = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter': return 'https://cdn.worldvectorlogo.com/logos/twitter-logo-2.svg';
      case 'facebook': return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjvzC_QRv6moAhgNb5C6e3yicKgFND1g2RwA&s';
      default: return '';
    }
  };

  const getVerifiedBadge = () => (
    <svg className="w-5 h-5 text-blue-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );

  if (platform.toLowerCase() === 'twitter') {
    return (
      <div className="bg-white border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer shadow-sm rounded-lg">
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
              
              <div className="mt-1">
                <p className="text-sm text-gray-900 leading-5">{content}</p>
              </div>
              
              <div className="flex flex-wrap gap-1 mt-2">
                {tags.map((tag, index) => (
                  <span key={index} className="text-blue-500 hover:underline text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between max-w-md mt-2">
                <div className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 cursor-pointer group">
                  <div className="p-1.5 rounded-full group-hover:bg-blue-50 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <span className="text-xs">Reply</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-500 hover:text-green-500 cursor-pointer group">
                  <div className="p-1.5 rounded-full group-hover:bg-green-50 transition-colors">
                    <Repeat2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs">{formatNumber(shares)}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-500 hover:text-red-500 cursor-pointer group">
                  <div className="p-1.5 rounded-full group-hover:bg-red-50 transition-colors">
                    <Heart className="w-4 h-4" />
                  </div>
                  <span className="text-xs">{formatNumber(likes)}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 cursor-pointer group">
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
      </div>
    );
  }

  // Facebook Post Format
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-lg">
      <div className="p-2">
        <div className="flex items-center space-x-3 mb-3">
          <img 
            src={getAuthorImage(author)} 
            alt={author}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-semibold text-gray-900">{author}</h3>
              <img src={getPlatformLogo(platform)} alt={platform} className="w-3 h-3" />
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <span>{date}</span>
              <span>·</span>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="p-1 rounded-full hover:bg-gray-100 cursor-pointer">
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </div>
        </div>
        
        <div className="mb-3">
          <p className="text-sm text-gray-900 leading-5">{content}</p>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag, index) => (
            <span key={index} className="text-blue-600 hover:underline text-xs cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="border-t border-gray-200 pt-2">
          <div className="flex items-center justify-between text-gray-500 text-xs mb-2">
            <span>{formatNumber(likes)} people like this</span>
            <span>{formatNumber(shares)} shares</span>
          </div>
          
          <div className="flex items-center border-t border-gray-200 pt-1">
            <button className="flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-gray-50 transition-colors">
              <Heart className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-medium text-gray-700">Like</span>
            </button>
            <button className="flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-gray-50 transition-colors">
              <MessageCircle className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-medium text-gray-700">Comment</span>
            </button>
            <button className="flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-gray-50 transition-colors">
              <Share2 className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-medium text-gray-700">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaPost;