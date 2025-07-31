import React, { useEffect, useRef, useState } from "react";

const BroadcastControlCenter = () => {
  const [channels, setChannels] = useState([
    // National News Channels
    {
      id: "aaj-tak-404p",
      name: "Aaj Tak",
      quality: "404p",
      url: "https://aajtaklive-amd.akamaized.net/hls/live/2014416/aajtak/aajtaklive/live_404p/chunks.m3u8",
      status: "loading",
      isLive: false,
      viewers: "2.4M",
      uptime: "24/7",
      category: "National",
      type: "hls", // hls or embed
    },
    {
      id: "aaj-tak-hd",
      name: "Aaj Tak HD",
      quality: "HD",
      url: "https://feeds.intoday.in/aajtak/api/aajtakhd/master.m3u8",
      status: "loading",
      isLive: false,
      viewers: "1.8M",
      uptime: "24/7",
      category: "National",
      type: "hls", // hls or embed
    },

    {
      id: "abp-ganga",
      name: "ABP Ganga",
      quality: "1080p",
      url: "https://abplivetv.akamaized.net/hls/live/2043013/ganga/master.m3u8",
      status: "loading",
      isLive: false,
      viewers: "892K",
      uptime: "24/7",
      category: "UP Regional",
      type: "hls", // hls or embed
    },
    {
      id: "dd-news",
      name: "DD News",
      quality: "1080p",
      url: "https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/0811cd8c37ca4c409d5385a6cd2fa18b/index.m3u8",
      status: "loading",
      isLive: false,
      viewers: "1.2M",
      uptime: "24/7",
      category: "National",
      type: "hls", // hls or embed
    },
    {
      id: "et-now-swadesh",
      name: "ET Now Swadesh",
      quality: "720p",
      url: "https://d32gxr3r1ksq2p.cloudfront.net/master.m3u8",
      status: "loading",
      isLive: false,
      viewers: "456K",
      uptime: "24/7",
      category: "National",
      type: "hls", // hls or embed
    },
    {
      id: "india-today",
      name: "India Today",
      quality: "720p",
      url: "https://indiatodaylive.akamaized.net/hls/live/2014320/indiatoday/indiatodaylive/playlist.m3u8",
      status: "loading",
      isLive: false,
      viewers: "1.6M",
      uptime: "16/7",
      category: "National",
      type: "hls", // hls or embed
    },

    {
      id: "lok-sabha-tv",
      name: "Lok Sabha TV",
      quality: "1080p",
      url: "https://playhls.media.nic.in/hls/live/lstv/lstv.m3u8",
      status: "loading",
      isLive: false,
      viewers: "678K",
      uptime: "24/7",
      category: "National",
      type: "hls", // hls or embed
    },
    {
      id: "ndtv-24x7",
      name: "NDTV 24x7",
      quality: "480p",
      url: "https://ndtv24x7elemarchana.akamaized.net/hls/live/2003678/ndtv24x7/master.m3u8",
      status: "loading",
      isLive: false,
      viewers: "1.1M",
      uptime: "24/7",
      category: "National",
      type: "hls", // hls or embed
    },
    {
      id: "ndtv-india",
      name: "NDTV India",
      quality: "480p",
      url: "https://ndtvindiaelemarchana.akamaized.net/hls/live/2003679/ndtvindia/master.m3u8",
      status: "loading",
      isLive: false,
      viewers: "934K",
      uptime: "24/7",
      category: "National",
      type: "hls", // hls or embed
    },
    {
      id: "news24",
      name: "News 24",
      quality: "720p",
      url: "https://vidcdn.vidgyor.com/news24-origin/liveabr/playlist.m3u8",
      status: "loading",
      isLive: false,
      viewers: "756K",
      uptime: "24/7",
      category: "National",
      type: "hls", // hls or embed
    },
    {
      id: "republic-bharat",
      name: "Republic Bharat",
      quality: "1080p",
      url: "https://vg-republictvlive.akamaized.net/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/vglive-sk-275673/main.m3u8",
      status: "loading",
      isLive: false,
      viewers: "2.1M",
      uptime: "24/7",
      category: "National",
      type: "hls", // hls or embed
    },

    {
      id: "tv9-bharatvarsh",
      name: "TV9 Bharatvarsh",
      quality: "720p",
      url: "https://dyjmyiv3bp2ez.cloudfront.net/pub-iotv9hinjzgtpe/liveabr/playlist.m3u8",
      status: "loading",
      isLive: false,
      viewers: "834K",
      uptime: "24/7",
      category: "National",
      type: "hls", // hls or embed
    },
    {
      id: "wion",
      name: "WION",
      quality: "1080p",
      url: "https://d7x8z4yuq42qn.cloudfront.net/index_7.m3u8",
      status: "loading",
      isLive: false,
      viewers: "567K",
      uptime: "24/7",
      category: "National",
      type: "hls", // hls or embed
    },

    {
      id: "dd-uttar-pradesh",
      name: "DD Uttar Pradesh",
      quality: "720p",
      url: "https://cdn-1.pishow.tv/live/36/master.m3u8",
      status: "loading",
      isLive: false,
      viewers: "312K",
      uptime: "24/7",
      category: "UP Regional",
      type: "hls", // hls or embed
    },
    {
      id: "india-tv-embed",
      name: "India TV",
      quality: "HD",
      url: "https://www.yupptv.com/yupptvnew/channels/indiatv/live/embed",
      type: "embed",
      status: "loading",
      isLive: false,
      viewers: "1.9M",
      uptime: "24/7",
      category: "National",
    },
    {
      id: "abp-news-embed",
      name: "ABP News",
      quality: "HD",
      url: "https://www.yupptv.com/yupptvnew/channels/abp-news/live/embed",
      type: "embed",
      status: "loading",
      isLive: false,
      viewers: "1.5M",
      uptime: "24/7",
      category: "National",
    },
    {
      id: "zee-news-embed",
      name: "Zee News",
      quality: "HD",
      url: "https://www.yupptv.com/yupptvnew/channels/zee-news/live/embed",
      type: "embed",
      status: "loading",
      isLive: false,
      viewers: "1.4M",
      uptime: "24/7",
      category: "National",
    },
    {
      id: "first-india-news",
      name: "First India News",
      quality: "1080p",
      url: "https://xlbor37ydvaj-hls-live.wmncdn.net/firstindianewstv1/live.stream/index.m3u8",
      type: "hls",
      status: "loading",
      isLive: false,
      viewers: "2.1M",
      uptime: "24/7",
      category: "National",
    },
    {
      id: "ndtv-247",
      name: "NDTV 24/7",
      quality: "1080p",
      url: "https://ndtv24x7elemarchana.akamaized.net/hls/live/2003678/ndtv24x7/master.m3u8",
      type: "hls",
      status: "loading",
      isLive: false,
      viewers: "2.1M",
      uptime: "24/7",
      category: "National",
    },
    {
      id: "news-24",
      name: "News 24",
      quality: "1080p",
      url: "https://vidcdn.vidgyor.com/news24-origin/liveabr/playlist.m3u8",
      type: "hls",
      status: "loading",
      isLive: false,
      viewers: "2.1M",
      uptime: "24/7",
      category: "National",
    },
  ]);

  const [selectedChannel, setSelectedChannel] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [systemStatus, setSystemStatus] = useState("optimal");
  const hlsInstances = useRef({});

  // Stats for the dashboard
  const liveChannels = channels.filter((c) => c.status === "success").length;
  const errorChannels = channels.filter((c) => c.status === "error").length;
  const totalViewers = channels.reduce((sum, channel) => {
    const viewers =
      parseFloat(channel.viewers.replace(/[KM]/g, "")) *
      (channel.viewers.includes("M") ? 1000000 : 1000);
    return sum + (channel.isLive ? viewers : 0);
  }, 0);

  const statsCards = [
    {
      title: "Live Channels",
      value: liveChannels,
      change: `+${Math.floor(Math.random() * 3)}`,
      trending: "up",
      icon: () => (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </svg>
      ),
    },
    {
      title: "Total Viewers",
      value: `${(totalViewers / 1000000).toFixed(1)}M`,
      change: "+12%",
      trending: "up",
      icon: () => (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Error Channels",
      value: errorChannels,
      change: errorChannels > 0 ? `+${errorChannels}` : "0",
      trending: errorChannels > 0 ? "down" : "up",
      icon: () => (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      title: "System Health",
      value: "98.2%",
      change: "+0.3%",
      trending: "up",
      icon: () => (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  const updateChannelStatus = (channelId, status, isLive = false) => {
    setChannels((prev) =>
      prev.map((channel) =>
        channel.id === channelId ? { ...channel, status, isLive } : channel
      )
    );
  };

  const initializeHLSChannel = async (channel) => {
    const videoElement = document.getElementById(`video-${channel.id}`);
    if (!videoElement) return;

    try {
      if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
        videoElement.src = channel.url;

        videoElement.addEventListener("canplay", () => {
          updateChannelStatus(channel.id, "success", true);
        });

        videoElement.addEventListener("error", () => {
          updateChannelStatus(channel.id, "error");
        });
      } else {
        const Hls = (await import("https://cdn.skypack.dev/hls.js")).default;

        if (Hls.isSupported()) {
          const hls = new Hls({
            enableWorker: true,
            lowLatencyMode: true,
            backBufferLength: 30,
            maxBufferLength: 60,
          });

          hlsInstances.current[channel.id] = hls;

          hls.loadSource(channel.url);
          hls.attachMedia(videoElement);

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            updateChannelStatus(channel.id, "success", true);
          });

          hls.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
              updateChannelStatus(channel.id, "error");
            }
          });
        } else {
          updateChannelStatus(channel.id, "unsupported");
        }
      }
    } catch (error) {
      updateChannelStatus(channel.id, "error");
    }
  };

  const initializeEmbedChannel = (channel) => {
    // For embed channels, we assume they're working if the iframe loads
    // You could add more sophisticated checking here
    setTimeout(() => {
      updateChannelStatus(channel.id, "success", true);
    }, 2000);
  };

  const initializeChannel = (channel) => {
    if (channel.type === "hls") {
      initializeHLSChannel(channel);
    } else if (channel.type === "embed") {
      initializeEmbedChannel(channel);
    }
  };

  useEffect(() => {
    channels.forEach((channel) => {
      setTimeout(() => initializeChannel(channel), Math.random() * 2000);
    });

    return () => {
      Object.values(hlsInstances.current).forEach((hls) => {
        if (hls && hls.destroy) {
          hls.destroy();
        }
      });
    };
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "loading":
        return "bg-orange-500";
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "unsupported":
        return "bg-gray-500";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "loading":
        return "Loading...";
      case "success":
        return "Live";
      case "error":
        return "Error";
      case "unsupported":
        return "Unsupported";
      default:
        return "Unknown";
    }
  };

  const renderChannelPlayer = (channel, isGridView = true) => {
    const containerClass = isGridView
      ? "w-full h-32 sm:h-40 md:h-48"
      : "w-full h-96";

    if (channel.type === "embed") {
      return (
        <iframe
          src={channel.url}
          className={`${containerClass} object-cover bg-black border-0`}
          allow="encrypted-media; autoplay; fullscreen"
          title={`${channel.name} Live Stream`}
          sandbox="allow-scripts allow-same-origin allow-presentation"
        />
      );
    } else {
      return (
        <video
          id={`video-${channel.id}`}
          className={`${containerClass} object-cover bg-black`}
          muted={isGridView}
          autoPlay
          playsInline
          controls={!isGridView}
        />
      );
    }
  };

  const TrendingUp = () => (
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
        d="M7 17l9.2-9.2M17 17V7h-10"
      />
    </svg>
  );

  const TrendingDown = () => (
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
        d="M17 7l-9.2 9.2M7 7v10h10"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg border border-gray-600 m-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-900/30 rounded-lg border border-orange-600/20">
                <svg
                  className="w-8 h-8 text-orange-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-white">
                  Integrated Broadcast Command & Control Centre
                </h1>
                <p className="text-sm text-gray-300 mt-1">
                  Real-time media monitoring and analysis system
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-gray-300">
                Live Data
              </span>
            </div>
            <div className="flex bg-gray-800 rounded-lg p-1 shadow-sm border border-gray-600">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  viewMode === "grid"
                    ? "bg-orange-500 text-white shadow-sm"
                    : "text-gray-300 hover:text-orange-400"
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setViewMode("focused")}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  viewMode === "focused"
                    ? "bg-orange-500 text-white shadow-sm"
                    : "text-gray-300 hover:text-orange-400"
                }`}
              >
                Focus View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-6 mb-6">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-600"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.trending === "up" ? (
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      stat.trending === "up" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-orange-900/30 rounded-lg border border-orange-600/20">
                <stat.icon className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="mx-6">
        {viewMode === "grid" ? (
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg border border-gray-600">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Live Channel Monitoring
                </h3>
                <p className="text-sm text-gray-300 mt-1">
                  Real-time streaming status of all monitored news channels
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-300">
                    {liveChannels} Live
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs font-medium text-gray-300">
                    {errorChannels} Error
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {channels.map((channel) => (
                <div
                  key={channel.id}
                  className="bg-gray-800 rounded-xl shadow-lg border border-gray-600 overflow-hidden hover:shadow-xl transition-all duration-200 cursor-pointer hover:scale-[1.02] hover:border-orange-500/50 group"
                  onClick={() => {
                    setSelectedChannel(channel);
                    setViewMode("focused");
                  }}
                >
                  <div className="relative">
                    {renderChannelPlayer(channel, true)}

                    {/* Status indicator */}
                    <div
                      className={`absolute top-2 right-2 w-3 h-3 rounded-full ${getStatusColor(
                        channel.status
                      )} shadow-lg`}
                    ></div>

                    {/* Stream type indicator */}
                    <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-0.5 rounded text-xs font-medium uppercase">
                      {channel.type}
                    </div>

                    {/* Live indicator */}
                    {channel.isLive && (
                      <div className="absolute top-8 left-2 bg-red-600 text-white px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                        LIVE
                      </div>
                    )}

                    {/* Quality badge */}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-0.5 rounded text-xs font-medium">
                      {channel.quality}
                    </div>

                    {/* Channel info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="font-semibold text-sm text-white truncate mb-1">
                        {channel.name}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-gray-300">
                        <span>{channel.viewers} viewers</span>
                        <span
                          className={`px-2 py-0.5 rounded-full font-medium ${
                            channel.status === "success"
                              ? "bg-green-600/80 text-white"
                              : channel.status === "error"
                              ? "bg-red-600/80 text-white"
                              : "bg-orange-600/80 text-white"
                          }`}
                        >
                          {getStatusText(channel.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Focused View */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Video */}
            <div className="lg:col-span-3">
              {selectedChannel && (
                <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl shadow-lg border border-gray-600 overflow-hidden">
                  <div className="p-4 border-b border-gray-600">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold text-white">
                          {selectedChannel.name}
                        </h2>
                        <p className="text-sm text-gray-300">
                          Live broadcast monitoring •{" "}
                          {selectedChannel.type.toUpperCase()} Stream
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            selectedChannel.status === "success"
                              ? "bg-green-900/50 text-green-300 border border-green-700"
                              : selectedChannel.status === "error"
                              ? "bg-red-900/50 text-red-300 border border-red-700"
                              : "bg-orange-900/50 text-orange-300 border border-orange-700"
                          }`}
                        >
                          {getStatusText(selectedChannel.status)}
                        </span>
                        {selectedChannel.isLive && (
                          <div className="flex items-center gap-2 text-sm text-green-400 font-medium">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            LIVE
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="relative bg-black">
                    {renderChannelPlayer(selectedChannel, false)}
                  </div>

                  <div className="p-4 bg-gray-800">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-gray-700 rounded-lg border border-gray-600">
                        <p className="text-xs text-gray-400">Type</p>
                        <p className="text-lg font-bold text-white uppercase">
                          {selectedChannel.type}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-gray-700 rounded-lg border border-gray-600">
                        <p className="text-xs text-gray-400">Quality</p>
                        <p className="text-lg font-bold text-white">
                          {selectedChannel.quality}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-gray-700 rounded-lg border border-gray-600">
                        <p className="text-xs text-gray-400">Viewers</p>
                        <p className="text-lg font-bold text-white">
                          {selectedChannel.viewers}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-gray-700 rounded-lg border border-gray-600">
                        <p className="text-xs text-gray-400">Status</p>
                        <p className="text-lg font-bold text-white">
                          {selectedChannel.status === "success"
                            ? "Online"
                            : "Offline"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Channel List */}
            <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-600">
              <h3 className="text-lg font-semibold text-white mb-4">
                All Channels
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {channels.map((channel) => (
                  <div
                    key={channel.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-700 ${
                      selectedChannel?.id === channel.id
                        ? "bg-orange-900/30 border-2 border-orange-500"
                        : "border border-gray-600"
                    }`}
                    onClick={() => setSelectedChannel(channel)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-white">
                          {channel.name}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-400 uppercase">
                            {channel.type}
                          </span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-400">
                            {channel.quality}
                          </span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-400">
                            {channel.viewers}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {channel.isLive && (
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        )}
                        <div
                          className={`w-2 h-2 rounded-full ${getStatusColor(
                            channel.status
                          )}`}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-600 px-6 py-3 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm gap-2">
          <div className="flex items-center gap-4">
            <span className="text-gray-300">
              System Status:{" "}
              <span className="text-green-400 font-medium">Online</span>
            </span>
            <span className="text-gray-300">
              Total Channels:{" "}
              <span className="text-white font-medium">{channels.length}</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">
              Last Updated:{" "}
              <span className="text-white">
                {new Date().toLocaleTimeString()}
              </span>
            </span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium">
                Monitoring Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BroadcastControlCenter;