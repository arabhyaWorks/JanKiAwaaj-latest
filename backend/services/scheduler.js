const cron = require('node-cron');
const TwitterService = require('./twitterService');

const twitterService = new TwitterService();

// Schedule tasks for automatic data collection
function startScheduledTasks() {
  console.log('🕐 Starting scheduled tasks...');

  // Refresh political tweets every 15 minutes
  cron.schedule('*/15 * * * *', async () => {
    try {
      console.log('🔄 Refreshing political tweets...');
      await twitterService.getPoliticalTweets(50, true);
      console.log('✅ Political tweets refreshed successfully');
    } catch (error) {
      console.error('❌ Error refreshing political tweets:', error.message);
    }
  });

  // Refresh trending hashtags every 30 minutes
  cron.schedule('*/30 * * * *', async () => {
    try {
      console.log('🔄 Refreshing trending hashtags...');
      await twitterService.getTrendingHashtags(15);
      console.log('✅ Trending hashtags refreshed successfully');
    } catch (error) {
      console.error('❌ Error refreshing trending hashtags:', error.message);
    }
  });

  // Refresh sentiment analysis every hour
  cron.schedule('0 * * * *', async () => {
    try {
      console.log('🔄 Refreshing sentiment analysis...');
      await twitterService.getSentimentAnalysis('24h');
      console.log('✅ Sentiment analysis refreshed successfully');
    } catch (error) {
      console.error('❌ Error refreshing sentiment analysis:', error.message);
    }
  });

  // Clear old cache entries every 6 hours
  cron.schedule('0 */6 * * *', () => {
    try {
      console.log('🧹 Clearing cache...');
      twitterService.refreshCache();
      console.log('✅ Cache cleared successfully');
    } catch (error) {
      console.error('❌ Error clearing cache:', error.message);
    }
  });

  console.log('✅ Scheduled tasks started successfully');
}

module.exports = { startScheduledTasks };