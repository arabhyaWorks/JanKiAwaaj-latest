# Political Twitter Backend

A Node.js backend service for fetching and analyzing political tweets from Twitter API.

## Features

- Real-time Twitter data fetching
- Political leader tweet tracking
- Sentiment analysis
- Trending hashtag monitoring
- Rate limiting and caching
- Scheduled data updates
- CORS enabled for frontend integration

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Copy `.env.example` to `.env` and fill in your Twitter API credentials.

3. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## API Endpoints

### GET /api/twitter/political-tweets
Get tweets from all tracked political leaders.

**Query Parameters:**
- `limit` (optional): Number of tweets to return (default: 50)
- `refresh` (optional): Force refresh cache (default: false)

### GET /api/twitter/search
Search tweets by query.

**Query Parameters:**
- `q` (required): Search query
- `limit` (optional): Number of tweets to return (default: 20)
- `lang` (optional): Language code (default: 'hi')

### GET /api/twitter/user/:username
Get tweets from a specific user.

**Parameters:**
- `username`: Twitter username (without @)

**Query Parameters:**
- `limit` (optional): Number of tweets to return (default: 20)

### GET /api/twitter/trending-hashtags
Get trending political hashtags.

**Query Parameters:**
- `limit` (optional): Number of hashtags to return (default: 10)

### GET /api/twitter/sentiment-analysis
Get sentiment analysis of political tweets.

**Query Parameters:**
- `timeframe` (optional): Analysis timeframe (default: '24h')

### POST /api/twitter/refresh-cache
Force refresh all cached data.

### GET /health
Health check endpoint.

## Rate Limiting

The API implements rate limiting to prevent abuse:
- 100 requests per 15 minutes per IP address
- Configurable via environment variables

## Caching

Data is cached for 5 minutes to reduce API calls and improve performance:
- Political tweets
- Trending hashtags
- Sentiment analysis
- User data

## Scheduled Tasks

The server runs scheduled tasks to keep data fresh:
- Political tweets: Every 15 minutes
- Trending hashtags: Every 30 minutes
- Sentiment analysis: Every hour
- Cache cleanup: Every 6 hours

## Environment Variables

```env
# Twitter API Credentials
TWITTER_BEARER_TOKEN=your_bearer_token
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_TOKEN_SECRET=your_access_token_secret
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret

# Server Configuration
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Error Handling

The API includes comprehensive error handling:
- Input validation
- Rate limiting
- Twitter API error handling
- Graceful fallbacks to cached data

## Security Features

- Helmet.js for security headers
- CORS configuration
- Rate limiting
- Input validation and sanitization
- Environment variable protection

## Monitoring

- Health check endpoint
- Comprehensive logging
- Error tracking
- Performance metrics

## Development

For development, use:
```bash
npm run dev
```

This starts the server with nodemon for automatic reloading on file changes.

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a process manager like PM2
3. Set up proper logging
4. Configure reverse proxy (nginx)
5. Set up SSL/TLS certificates

## Troubleshooting

### Common Issues

1. **Twitter API Rate Limits**: The service implements caching and rate limiting to handle this automatically.

2. **CORS Errors**: Make sure `FRONTEND_URL` is set correctly in your environment variables.

3. **Authentication Errors**: Verify your Twitter API credentials are correct and have the necessary permissions.

4. **Cache Issues**: Use the `/api/twitter/refresh-cache` endpoint to force refresh cached data.

### Logs

Check the console output for detailed error messages and debugging information.