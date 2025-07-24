import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  Legend,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Newspaper,
  MessageCircle,
  MapPin,
  Eye,
  Calendar,
  ExternalLink
} from "lucide-react";
import SocialMediaPost from "./SocialMediaPost";
import { useNavigate } from "react-router-dom";


import newsData from "../../public/news-with-images-sample.json";

const LatestNews = ({
  navigate,
}) => {
  // Sort news by date and take first 10
  const latestNews = [...newsData]
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 10);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

      if (diffInHours < 1) {
        return "Just now";
      } else if (diffInHours < 24) {
        return `${diffInHours}hrs ago`;
      } else if (diffInHours < 48) {
        return "Yesterday";
      } else {
        return date.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
      }
    } catch (error) {
      return "Recent";
    }
  };

  const generateViewCount = (index) => {
    const baseViews = Math.floor(Math.random() * 50000) + 10000;
    return (baseViews / 1000).toFixed(1) + "k";
  };

  const extractHashtags = (title, description) => {
    // Extract meaningful keywords as hashtags
    const keywords = [];

    // Common political and news terms in Hindi/English
    const politicalTerms = [
      "योगी",
      "CM",
      "सीएम",
      "कांवड़",
      "मंदिर",
      "धर्म",
      "पुलिस",
      "गिरफ्तार",
      "यूपी",
      "लखनऊ",
      "वाराणसी",
      "गंगा",
      "भाजपा",
      "कांग्रेस",
      "सरकार",
    ];

    const text = (title + " " + description).toLowerCase();

    politicalTerms.forEach((term) => {
      if (text.includes(term.toLowerCase())) {
        keywords.push(`#${term}`);
      }
    });

    // Return first 2 relevant hashtags
    return keywords.slice(0, 2);
  };

  if (!newsData || newsData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="text-center py-8">
          <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No news available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <TrendingUp className="w-5 h-5 text-orange-500 mr-2" />
          Latest News
        </h3>
        <button className="text-sm text-gray-500 hover:text-orange-600 transition-colors flex items-center space-x-1 group">
          <a href="/news" className="hover:underline">See All</a>
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        {latestNews.map((news, index) => {
          const hashtags = extractHashtags(news.title, news.description || "");
          const viewCount = generateViewCount(index);

          return (
            <div
              key={index}
              className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100 last:border-b-0 group cursor-pointer"
            >
              {/* Image */}
              {news.imageUrl && news.imageUrl.trim() && (
                <div className="flex-shrink-0">
                  <img
                    src={news.imageUrl}
                    alt={news.title}
                    className="w-20 h-20 object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Title */}
                <h4 className="font-medium text-gray-800 text-sm leading-5 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                  <a
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {news.title}
                  </a>
                </h4>

                {/* Meta Info */}
                <div className="flex items-center space-x-3 text-xs text-gray-500 mb-2">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{viewCount}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">न</span>
                    </div>
                    <span>{news.source}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(news.publishedAt)}</span>
                  </div>
                </div>

                {/* Hashtags */}
                {hashtags.length > 0 && (
                  <div className="flex items-center space-x-1 flex-wrap">
                    {hashtags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* External Link Icon */}
              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 text-gray-400 hover:text-orange-600 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Updated: {formatDate(latestNews[0]?.publishedAt)}</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live Updates</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const sentimentData = [
    { name: "Positive", value: 45, color: "#22c55e" },
    { name: "Neutral", value: 30, color: "#f59e0b" },
    { name: "Negative", value: 25, color: "#ef4444" },
  ];

  const constituencyData = [
    { name: "Lucknow", bjp: 85, opposition: 15 },
    { name: "Varanasi", bjp: 90, opposition: 10 },
    { name: "Gorakhpur", bjp: 88, opposition: 12 },
    { name: "Agra", bjp: 75, opposition: 25 },
    { name: "Kanpur", bjp: 70, opposition: 30 },
  ];

  const trendsData = [
    { date: "Jan 1", bjp: 45, sp: 35, congress: 18, bsp: 15 },
    { date: "Jan 5", bjp: 72, sp: 22, congress: 8, bsp: 12 },
    { date: "Jan 10", bjp: 38, sp: 48, congress: 25, bsp: 8 },
    { date: "Jan 15", bjp: 85, sp: 12, congress: 5, bsp: 18 },
    { date: "Jan 20", bjp: 28, sp: 55, congress: 32, bsp: 6 },
    { date: "Jan 25", bjp: 78, sp: 18, congress: 12, bsp: 22 },
    { date: "Jan 30", bjp: 52, sp: 38, congress: 28, bsp: 9 },
    { date: "Feb 5", bjp: 88, sp: 8, congress: 6, bsp: 14 },
    { date: "Feb 10", bjp: 35, sp: 42, congress: 35, bsp: 5 },
    { date: "Feb 15", bjp: 92, sp: 15, congress: 8, bsp: 25 },
  ];

  const performanceData = [
    { name: "Governance", value: 85, fill: "#f97316" },
    { name: "Development", value: 78, fill: "#22c55e" },
    { name: "Law & Order", value: 92, fill: "#3b82f6" },
    { name: "Healthcare", value: 68, fill: "#8b5cf6" },
  ];

  const regionData = [
    { region: "Western UP", bjp: 82, opposition: 18 },
    { region: "Eastern UP", bjp: 75, opposition: 25 },
    { region: "Central UP", bjp: 88, opposition: 12 },
    { region: "Bundelkhand", bjp: 79, opposition: 21 },
  ];

  const socialMediaPosts = [
    {
      author: "Yogi Adityanath",
      content:
        "Operation Sindoor is our commitment to clean governance and law & order in UP.",
      likes: 12000,
      shares: 3500,
      date: "2024-12-15",
      platform: "Twitter",
      tags: ["Law and Order", "BJP"],
    },
    {
      author: "Akhilesh Yadav",
      content:
        "Where is the overbridge the people were promised? Empty promises won't develop Varanasi.",
      likes: 9000,
      shares: 2700,
      date: "2024-12-10",
      platform: "Twitter",
      tags: ["Opposition", "Infrastructure"],
    },
    {
      author: "Varanasi BJP",
      content:
        "Over 2 lakh people have benefitted from PM Awas Yojana in our constituency. Development continues!",
      likes: 6000,
      shares: 1900,
      date: "2024-12-01",
      platform: "Facebook",
      tags: ["PM Awas Yojana"],
    },
  ];

  const statsCards = [
    {
      title: "Total Mentions",
      value: "12,458",
      change: "+8.2%",
      trending: "up",
      icon: MessageCircle,
    },
    {
      title: "Positive Sentiment",
      value: "45%",
      change: "+2.1%",
      trending: "up",
      icon: TrendingUp,
    },
    {
      title: "News Articles",
      value: "2,847",
      change: "+12.5%",
      trending: "up",
      icon: Newspaper,
    },
    {
      title: "Strong Constituencies",
      value: "248",
      change: "+5.3%",
      trending: "up",
      icon: MapPin,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.trending === "up" ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      stat.trending === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <stat.icon className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Political Trends Graph */}
      <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Political Trends Analysis
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Real-time tracking of party performance and public sentiment
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-xs font-medium text-gray-600">BJP</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs font-medium text-gray-600">SP</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs font-medium text-gray-600">
                Congress
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
              <span className="text-xs font-medium text-gray-600">BSP</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={trendsData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="2 2"
              stroke="#e5e7eb"
              opacity={0.7}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#6b7280", fontWeight: 500 }}
              axisLine={{ stroke: "#d1d5db", strokeWidth: 1 }}
              tickLine={{ stroke: "#d1d5db" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280", fontWeight: 500 }}
              axisLine={{ stroke: "#d1d5db", strokeWidth: 1 }}
              tickLine={{ stroke: "#d1d5db" }}
              domain={[0, 100]}
              label={{
                value: "Number of Posts/Mentions",
                angle: -90,
                position: "insideLeft",
                style: {
                  textAnchor: "middle",
                  fontSize: "12px",
                  fill: "#6b7280",
                  fontWeight: "500",
                },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "12px",
                color: "#fff",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                fontSize: "14px",
              }}
              labelStyle={{ color: "#f3f4f6", fontWeight: "bold" }}
            />
            <Line
              type="monotone"
              dataKey="bjp"
              stroke="#f97316"
              strokeWidth={3}
              name="BJP"
              dot={{
                fill: "#f97316",
                strokeWidth: 3,
                r: 6,
                stroke: "#fff",
              }}
              activeDot={{
                r: 8,
                stroke: "#f97316",
                strokeWidth: 3,
                fill: "#fff",
                boxShadow: "0 0 10px rgba(249, 115, 22, 0.5)",
              }}
            />
            <Line
              type="monotone"
              dataKey="sp"
              stroke="#dc2626"
              strokeWidth={3}
              name="Samajwadi Party"
              dot={{
                fill: "#dc2626",
                strokeWidth: 3,
                r: 6,
                stroke: "#fff",
              }}
              activeDot={{
                r: 8,
                stroke: "#dc2626",
                strokeWidth: 3,
                fill: "#fff",
                boxShadow: "0 0 10px rgba(220, 38, 38, 0.5)",
              }}
            />
            <Line
              type="monotone"
              dataKey="congress"
              stroke="#00bf63"
              strokeWidth={3}
              name="Congress"
              dot={{
                fill: "#00bf63",
                strokeWidth: 3,
                r: 6,
                stroke: "#fff",
              }}
              activeDot={{
                r: 8,
                stroke: "#2563eb",
                strokeWidth: 3,
                fill: "#fff",
                boxShadow: "0 0 10px rgba(37, 99, 235, 0.5)",
              }}
            />
            <Line
              type="monotone"
              dataKey="bsp"
              stroke="#4338ca"
              strokeWidth={3}
              name="BSP"
              dot={{
                fill: "#4338ca",
                strokeWidth: 3,
                r: 6,
                stroke: "#fff",
              }}
              activeDot={{
                r: 8,
                stroke: "#4338ca",
                strokeWidth: 3,
                fill: "#fff",
                boxShadow: "0 0 10px rgba(67, 56, 202, 0.5)",
              }}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Trend Insights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-800">BJP Trend</p>
                <p className="text-2xl font-bold text-orange-600">+13%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
            <p className="text-xs text-orange-700 mt-2">
              Strong upward momentum
            </p>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-800">SP Trend</p>
                <p className="text-2xl font-bold text-red-600">-13%</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-xs text-red-700 mt-2">Declining support base</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">
                  Congress Trend
                </p>
                <p className="text-2xl font-bold text-green-600">0%</p>
              </div>
              <div className="w-8 h-8 flex items-center justify-center">
                <div className="w-6 h-1 bg-green-500 rounded"></div>
              </div>
            </div>
            <p className="text-xs text-green-700 mt-2">
              Stable but low support
            </p>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-800">BSP Trend</p>
                <p className="text-2xl font-bold text-indigo-600">-2%</p>
              </div>
              <TrendingDown className="w-8 h-8 text-indigo-500" />
            </div>
            <p className="text-xs text-indigo-700 mt-2">
              Slight decline observed
            </p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Analysis */}
        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Overall Sentiment Analysis For BJP{" "}
            </h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Live Data</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={130}
                paddingAngle={5}
                dataKey="value"
                stroke="#fff"
                strokeWidth={3}
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {sentimentData.map((item, index) => (
              <div
                key={index}
                className="text-center p-3 bg-white rounded-lg shadow-sm"
              >
                <div
                  className="w-4 h-4 rounded-full mx-auto mb-1"
                  style={{ backgroundColor: item.color }}
                ></div>
                <div className="text-xs text-gray-500">{item.name}</div>
                <div className="text-lg font-bold text-gray-800">
                  {item.value}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Constituency Performance */}
        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Regional Performance
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-xs text-gray-600">BJP</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-xs text-green-600">Opposition</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={regionData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="region"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={{ stroke: "#d1d5db" }}
                label={{
                  value: "Regions of Uttar Pradesh",
                  position: "insideBottom",
                  offset: -5,
                  style: {
                    textAnchor: "middle",
                    fontSize: "12px",
                    fill: "#6b7280",
                    fontWeight: "500",
                  },
                }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={{ stroke: "#d1d5db" }}
                label={{
                  value: "Support Percentage (%)",
                  angle: -90,
                  position: "insideLeft",
                  style: {
                    textAnchor: "middle",
                    fontSize: "12px",
                    fill: "#6b7280",
                    fontWeight: "500",
                  },
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Bar
                dataKey="bjp"
                fill="url(#bjpGradient)"
                name="BJP Support"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="opposition"
                fill="url(#oppositionGradient)"
                name="Opposition Support"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="bjpGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient
                  id="oppositionGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.6} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Enhanced Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Key Performance Areas
            </h3>
            <div className="text-sm text-gray-600">Performance Score (%)</div>
          </div>
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600">
              Government Performance Metrics by Department
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Each ring represents performance percentage in key governance
              areas
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="20%"
              outerRadius="90%"
              data={performanceData}
            >
              <RadialBar
                minAngle={15}
                label={{
                  position: "insideStart",
                  fill: "#fff",
                  fontSize: 12,
                  formatter: (value: number) => `${value}%`,
                }}
                background
                clockWise
                dataKey="value"
                cornerRadius={10}
                fill="#8884d8"
              />
              <Legend
                iconSize={10}
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  paddingTop: "20px",
                  fontSize: "12px",
                  color: "#6b7280",
                }}
                formatter={(value: string) => `${value} Performance`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                formatter={(value: number, name: string) => [
                  `${value}%`,
                  `${name} Performance`,
                ]}
                labelFormatter={() => "Performance Score"}
              />
            </RadialBarChart>
          </ResponsiveContainer>

          {/* Performance Summary */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {performanceData.map((item, index) => (
              <div
                key={index}
                className="text-center p-3 bg-white rounded-lg shadow-sm border border-gray-100"
              >
                <div
                  className="w-4 h-4 rounded-full mx-auto mb-2"
                  style={{ backgroundColor: item.fill }}
                ></div>
                <div className="text-xs text-gray-600 font-medium">
                  {item.name}
                </div>
                <div className="text-lg font-bold text-gray-800">
                  {item.value}%
                </div>
                <div className="text-xs text-gray-500">Score</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trends Analysis */}
        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Political Trends Over Time
            </h3>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600 font-medium">
                +13% this week
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={trendsData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={{ stroke: "#d1d5db" }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={{ stroke: "#d1d5db" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="bjp"
                stroke="#f97316"
                strokeWidth={2}
                name="BJP"
                dot={{ fill: "#f97316", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#f97316", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="sp"
                stroke="#dc2626"
                strokeWidth={2}
                name="Samajwadi Party"
                dot={{ fill: "#dc2626", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#dc2626", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="congress"
                stroke="#19a3e1"
                strokeWidth={2}
                name="Congress"
                dot={{ fill: "#19a3e1", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#19a3e1", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Parties Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Parties Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Trending Parties In UP
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>See All</span>
            </div>
          </div>

          <div className="space-y-4">
            {/* BJP */}
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-center space-x-3">
                  <div className="flex items-center text-gray-400">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-lg font-bold">1</span>
                  </div>
                  <span className="text-xs text-gray-500">(210.27)</span>
                </div>
                <img
                  src="https://media.publicvibe.com/genres/topics/new/bjpnew_150x150.jpg"
                  alt="BJP Logo"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Bharatiya Janata Party
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>8K posts</span>
                    <span>•</span>
                    <span>4.3K positive</span>
                    <span>•</span>
                    <span>952 negative</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span>52.9M views</span>
                    <span>•</span>
                    <span>17.6M positive</span>
                    <span>•</span>
                    <span>3.7M negative</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                  Positive
                </span>
              </div>
            </div>

            {/* SP */}
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex flex-col  items-center space-x-3">
                  <div className="flex items-center text-gray-400">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-lg font-bold">2</span>
                  </div>
                  <span className="text-xs text-gray-500">(96.92)</span>
                </div>
                <img
                  src="https://media.publicvibe.com/ads/smaj_150x150.jpg"
                  alt="SP Logo"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Samajwadi Party
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>3.3K posts</span>
                    <span>•</span>
                    <span>1.2K positive</span>
                    <span>•</span>
                    <span>816 negative</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span>25.1M views</span>
                    <span>•</span>
                    <span>3.6M positive</span>
                    <span>•</span>
                    <span>3.9M negative</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                  Positive
                </span>
              </div>
            </div>

            {/* INC */}
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex flex-col  items-center space-x-3">
                  <div className="flex items-center text-gray-400">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-lg font-bold">3</span>
                  </div>
                  <span className="text-xs text-gray-500">(87.98)</span>
                </div>
                <img
                  src="https://media.publicvibe.com/channels/congress_new_150x150.jpg"
                  alt="INC Logo"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Indian National Congress
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>1.9K posts</span>
                    <span>•</span>
                    <span>825 positive</span>
                    <span>•</span>
                    <span>128 negative</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span>27M views</span>
                    <span>•</span>
                    <span>7.3M positive</span>
                    <span>•</span>
                    <span>1.6M negative</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                  Positive
                </span>
              </div>
            </div>

            {/* BSP */}
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex flex-col  items-center space-x-3">
                  <div className="flex items-center text-gray-400">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-lg font-bold">4</span>
                  </div>
                  <span className="text-xs text-gray-500">(64.2)</span>
                </div>
                <img
                  src="https://media.publicvibe.com/channels/bsp_party_150x150.jpg"
                  alt="BSP Logo"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Bahujan Samaj Party
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>1.7K posts</span>
                    <span>•</span>
                    <span>670 positive</span>
                    <span>•</span>
                    <span>158 negative</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span>20.9M views</span>
                    <span>•</span>
                    <span>4.5M positive</span>
                    <span>•</span>
                    <span>2.3M negative</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                  Positive
                </span>
              </div>
            </div>

            {/* ASP */}
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex flex-col  items-center space-x-3">
                  <div className="flex items-center text-gray-400">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-lg font-bold">5</span>
                  </div>
                  <span className="text-xs text-gray-500">(35.11)</span>
                </div>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/29/Azad_samaj_party.png"
                  alt="ASP Logo"
                  className="w-12 h-12 rounded-lg object-cover bg-white p-1"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Aazad Samaj Party
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>906 posts</span>
                    <span>•</span>
                    <span>195 positive</span>
                    <span>•</span>
                    <span>122 negative</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span>12.3M views</span>
                    <span>•</span>
                    <span>1.6M positive</span>
                    <span>•</span>
                    <span>601.2K negative</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                  Positive
                </span>
              </div>
            </div>

            {/* AD */}
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex flex-col  items-center space-x-3">
                  <div className="flex items-center text-gray-400">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-lg font-bold">6</span>
                  </div>
                  <span className="text-xs text-gray-500">(28.45)</span>
                </div>
                <img
                  src="https://media.publicvibe.com/channels/apna_dal_150x150.jpg"
                  alt="AD Logo"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Apna Dal Sonelal
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>654 posts</span>
                    <span>•</span>
                    <span>142 positive</span>
                    <span>•</span>
                    <span>89 negative</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span>8.7M views</span>
                    <span>•</span>
                    <span>1.2M positive</span>
                    <span>•</span>
                    <span>456K negative</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                  Positive
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Leaders Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Trending Leaders In UP
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>See All</span>
            </div>
          </div>

          <div className="space-y-4">
            {/* Narendra Modi */}
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex flex-col  items-center space-x-3">
                  <div className="flex items-center text-gray-400">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-lg font-bold">1</span>
                  </div>
                  <span className="text-xs text-gray-500">(89.45)</span>
                </div>
                <img
                  src="https://media.publicvibe.com/community/topic/20240318/1699616241_87366_061055940_500x500.jpg"
                  alt="Narendra Modi"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">Narendra Modi</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>Prime Minister</span>
                    <span>•</span>
                    <span>BJP</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>12.5K posts</span>
                    <span>•</span>
                    <span>9.8K positive</span>
                    <span>•</span>
                    <span>1.2K negative</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span>85.2M views</span>
                    <span>•</span>
                    <span>72.1M positive</span>
                    <span>•</span>
                    <span>8.9M negative</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                  Positive
                </span>
              </div>
            </div>

            {/* Yogi Adityanath */}
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex flex-col  items-center space-x-3">
                  <div className="flex items-center text-gray-400">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-lg font-bold">2</span>
                  </div>
                  <span className="text-xs text-gray-500">(78.92)</span>
                </div>
                <img
                  src="https://media.publicvibe.com/community/topic/20240927/641852844_88893_094103873_400x400.jpg"
                  alt="Yogi Adityanath"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Yogi Adityanath
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>Chief Minister</span>
                    <span>•</span>
                    <span>BJP</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>8.7K posts</span>
                    <span>•</span>
                    <span>6.9K positive</span>
                    <span>•</span>
                    <span>1.1K negative</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span>62.4M views</span>
                    <span>•</span>
                    <span>48.7M positive</span>
                    <span>•</span>
                    <span>9.2M negative</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                  Positive
                </span>
              </div>
            </div>

            {/* Akhilesh Yadav */}
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex flex-col  items-center space-x-3">
                  <div className="flex items-center text-gray-400">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-lg font-bold">3</span>
                  </div>
                  <span className="text-xs text-gray-500">(65.18)</span>
                </div>
                <img
                  src="https://media.publicvibe.com/community/topic/20240928/640933287_69761_050501801_168x300.jpg"
                  alt="Akhilesh Yadav"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Akhilesh Yadav
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>SP President</span>
                    <span>•</span>
                    <span>Former CM</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>5.2K posts</span>
                    <span>•</span>
                    <span>3.1K positive</span>
                    <span>•</span>
                    <span>1.8K negative</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span>38.9M views</span>
                    <span>•</span>
                    <span>22.4M positive</span>
                    <span>•</span>
                    <span>12.7M negative</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                  Positive
                </span>
              </div>
            </div>

            {/* Rahul Gandhi */}
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex flex-col  items-center space-x-3">
                  <div className="flex items-center text-gray-400">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-lg font-bold">4</span>
                  </div>
                  <span className="text-xs text-gray-500">(42.67)</span>
                </div>
                <img
                  src="https://media.publicvibe.com/community/topic/20221019/996539590_54785_103520046_320x320.jpg"
                  alt="Rahul Gandhi"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">Rahul Gandhi</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>Congress Leader</span>
                    <span>•</span>
                    <span>MP</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>3.8K posts</span>
                    <span>•</span>
                    <span>1.9K positive</span>
                    <span>•</span>
                    <span>1.6K negative</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span>28.5M views</span>
                    <span>•</span>
                    <span>14.2M positive</span>
                    <span>•</span>
                    <span>11.8M negative</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                  Positive
                </span>
              </div>
            </div>

            {/* Chandrashekhar */}
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex flex-col  items-center space-x-3">
                  <div className="flex items-center text-gray-400">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-lg font-bold">5</span>
                  </div>
                  <span className="text-xs text-gray-500">(31.24)</span>
                </div>
                <img
                  src="https://feeds.abplive.com/onecms/images/uploaded-images/2023/06/29/a871c03418b857cad7bffeba78132cc11688033806038367_original.jpg"
                  alt="Chandrashekhar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Chandrashekhar
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>ASP Chief</span>
                    <span>•</span>
                    <span>MP</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>2.1K posts</span>
                    <span>•</span>
                    <span>1.3K positive</span>
                    <span>•</span>
                    <span>654 negative</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span>15.7M views</span>
                    <span>•</span>
                    <span>9.8M positive</span>
                    <span>•</span>
                    <span>4.2M negative</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                  Positive
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest News */}

        <LatestNews navigate={navigate} />

        {/* Social Media Highlights */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Social Media Highlights
          </h3>
          <button className="text-sm text-gray-500 hover:text-orange-600 transition-colors flex items-center space-x-1">
            <span>See All</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <div className="space-y-4">
            {socialMediaPosts.map((post, index) => (
              <SocialMediaPost
                key={index}
                author={post.author}
                content={post.content}
                likes={post.likes}
                shares={post.shares}
                date={post.date}
                platform={post.platform}
                tags={post.tags}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
