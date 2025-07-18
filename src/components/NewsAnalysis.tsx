import React from 'react';
import {
  Newspaper,
  TrendingUp,
  TrendingDown,
  Eye,
  Calendar,
} from 'lucide-react';
import { parseISO, format } from 'date-fns';

type NewsItem = {
  title: string;
  description: string;
  date: string;
  url: string;
};

type NewsAnalysisProps = {
  newsData: NewsItem[];
};

const NewsAnalysis: React.FC<NewsAnalysisProps> = ({ newsData }) => {
  if (!newsData || newsData.length === 0) {
    return (
      <div className="text-gray-500 text-center mt-8">
        No news data available.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {newsData.map((item, index) => (
        <div
          key={index}
          className="border rounded-xl p-4 bg-white shadow flex flex-col gap-2"
        >
          {/* Headline as a clickable link */}
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 font-semibold hover:underline"
          >
            <Newspaper size={20} />
            {item.title}
          </a>

          <div className="text-gray-700">{item.description}</div>

          <div className="flex justify-between text-sm text-gray-500 mt-2 flex-wrap gap-2">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              {/* 👇 Show full date & time instead of "x ago" */}
              {format(parseISO(item.date), 'dd MMM yyyy, hh:mm a')}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsAnalysis;
