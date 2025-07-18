const fs = require('fs');
const path = require('path');
const axios = require('axios');
const Parser = require('rss-parser');
// Function to clean text
function cleanText(text) {
    if (!text) return '';
    return text
        .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&').replace(/&quot;/g, '"')
        .replace(/&#8216;/g, "'").replace(/&#8217;/g, "'")
        .replace(/&#8220;/g, '"').replace(/&#8221;/g, '"')
        .replace(/&nbsp;/g, ' ').replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1')
        .replace(/<[^>]*>/g, '').trim();
}

// Enhanced parsing for different RSS formats
function parseRSSItem(item) {
    // Try multiple title patterns
    const title = cleanText(
        item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] || 
        item.match(/<title>(.*?)<\/title>/)?.[1] || ''
    );
    
    // Try multiple link patterns
    const link = cleanText(
        item.match(/<link><!\[CDATA\[(.*?)\]\]><\/link>/)?.[1] ||
        item.match(/<link>(.*?)<\/link>/)?.[1] || 
        item.match(/<guid.*?><!\[CDATA\[(.*?)\]\]><\/guid>/)?.[1] ||
        item.match(/<guid.*?>(.*?)<\/guid>/)?.[1] || ''
    );
    
    // Try multiple date patterns
    const pubDate = cleanText(
        item.match(/<pubDate><!\[CDATA\[(.*?)\]\]><\/pubDate>/)?.[1] ||
        item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || ''
    );
    
    // Try multiple description patterns
    const description = cleanText(
        item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1] || 
        item.match(/<description>(.*?)<\/description>/)?.[1] || ''
    );

    return { title, link, pubDate, description };
}

// All RSS Feeds from your list
const allRSSFeeds = [
    'https://www.amarujala.com/rss?client=android&client_new=au_revamp',
    'https://www.amarujala.com/rss/breaking-news.xml?client=android&client_new=au_revamp',
    'https://hindi.oneindia.com/rss/',
    'https://hindi.news18.com/khabar-rss/',
    'https://newssetu.in/rss/category/उत्तर-प्रदेश',
    'https://newssetu.in/rss/category/कुशीनगर',
    'https://newssetu.in/rss/category/गोरखपुर',
    'https://newssetu.in/rss/category/देवरिया',
    'https://newssetu.in/rss/category/लखनऊ',
    'https://newssetu.in/rss/category/बालियाँ',
    'https://newssetu.in/rss/category/संत-कबीर-नगर',
    'https://www.indiatv.in/rssnews/topstory-uttar-pradesh.xml',
    'https://www.indiatv.in/rssnews/topstory-crime.xml',
    'https://www.bhaskar.com/rss-v1--category-2052.xml',
    'https://www.poojanews.com/uttar-pradesh-news/feed/',
    'https://www.hindustantimes.com/feeds/rss/cities/noida-news/rssfeed.xml',
    'https://www.hindustantimes.com/feeds/rss/cities/lucknow-news/rssfeed.xml',
    'https://timesofindia.indiatimes.com/rssfeeds/8021716.cms',
    'https://timesofindia.indiatimes.com/rssfeeds/3947067.cms',
    'https://timesofindia.indiatimes.com/rssfeeds/3947071.cms',
    'https://www.prabhatkhabar.com/rss-feed',
    'https://www.thehindu.com/rssfeeds/',
    'https://hindi.news18.com/commonfeeds/v1/hin/rss/crime/crime.xml',
    'https://www.livehindustan.com/rss',
    'https://navbharattimes.indiatimes.com/rssfeedsdefault.cms',
    'https://hindi.oneindia.com/rss/feeds/hindi-politics-fb.xml',
    'https://hindi.oneindia.com/rss/feeds/hindi-uttar-pradesh-fb.xml',
    'https://hindi.oneindia.com/rss/feeds/hindi-varanasi-fb.xml',
    'https://hindi.oneindia.com/rss/feeds/oneindia-hindi-fb.xml',
    'https://hindi.oneindia.com/rss/hindi-news-fb.xml',
    'https://www.amarujala.com/rss/uttar-pradesh.xml?client=android&client_new=au_revamp',
    'https://www.tv9hindi.com/feed',
    'https://www.amarujala.com/rss/gorakhpur.xml?client=android&client_new=au_revamp',
    'https://www.amarujala.com/rss/lucknow.xml?client=android&client_new=au_revamp',
    'https://www.amarujala.com/rss/amroha.xml?client=android&client_new=au_revamp',
    'https://www.amarujala.com/rss/amethi.xml?client=android&client_new=au_revamp',
    'https://www.amarujala.com/rss/ambedkar-nagar.xml?client=android&client_new=au_revamp',
    'https://www.amarujala.com/rss/ayodhya.xml?client=android&client_new=au_revamp',
    'https://www.amarujala.com/rss/aligarh.xml?client=android&client_new=au_revamp',
    'https://www.amarujala.com/rss/agra.xml?client=android&client_new=au_revamp',
    'https://www.amarujala.com/rss/azamgarh.xml?client=android&client_new=au_revamp',
    'https://www.amarujala.com/rss/etawah.xml?client=android&client_new=au_revamp',
    'https://www.amarujala.com/rss/unnao.xml?client=android&client_new=au_revamp',
    'https://www.amarujala.com/rss/ghaziabad.xml?client=android&client_new=au_revamp',
    'https://www.amarujala.com/rss/noida.xml?client=android&client_new=au_revamp',
    'https://www.amarujala.com/rss/etah.xml',
    'https://www.amarujala.com/rss/auraiya.xml',
    'https://www.amarujala.com/rss/kannauj.xml',
    'https://www.amarujala.com/rss/kanpur.xml',
    'https://www.amarujala.com/rss/kasganj.xml',
    'https://www.amarujala.com/rss/kushinagar.xml',
    'https://www.amarujala.com/rss/kaushambi.xml',
    'https://www.amarujala.com/rss/ghazipur.xml',
    'https://www.amarujala.com/rss/gonda.xml',
    'https://www.amarujala.com/rss/ghatampur.xml',
    'https://www.amarujala.com/rss/chandauli.xml',
    'https://www.amarujala.com/rss/chitrakoot.xml',
    'https://www.amarujala.com/rss/jalaun.xml',
    'https://www.amarujala.com/rss/jaunpur.xml',
    'https://www.amarujala.com/rss/jhansi.xml',
    'https://www.amarujala.com/rss/deoria.xml',
    'https://www.amarujala.com/rss/pilibhit.xml',
    'https://www.amarujala.com/rss/pratapgarh.xml',
    'https://www.amarujala.com/rss/allahabad.xml',
    'https://www.amarujala.com/rss/fatehpur.xml',
    'https://www.amarujala.com/rss/farrukhabad.xml',
    'https://www.amarujala.com/rss/firozabad.xml',
    'https://www.amarujala.com/rss/budaun.xml',
    'https://www.amarujala.com/rss/bareilly.xml',
    'https://www.amarujala.com/rss/balrampur.xml',
    'https://www.amarujala.com/rss/ballia.xml',
    'https://www.amarujala.com/rss/basti.xml',
    'https://www.amarujala.com/rss/bahraich.xml',
    'https://www.amarujala.com/rss/banda.xml',
    'https://www.amarujala.com/rss/baghpat.xml',
    'https://www.amarujala.com/rss/barabanki.xml',
    'https://www.amarujala.com/rss/bijnor.xml',
    'https://www.amarujala.com/rss/bulandshahr.xml',
    'https://www.amarujala.com/rss/bhadohi.xml',
    'https://www.amarujala.com/rss/mau.xml',
    'https://www.amarujala.com/rss/mathura.xml',
    'https://www.amarujala.com/rss/maharajganj.xml',
    'https://www.amarujala.com/rss/mahoba.xml',
    'https://www.amarujala.com/rss/mirzapur.xml',
    'https://www.amarujala.com/rss/muzaffarnagar.xml',
    'https://www.amarujala.com/rss/moradabad.xml',
    'https://www.amarujala.com/rss/meerut.xml',
    'https://www.amarujala.com/rss/mainpuri.xml',
    'https://www.amarujala.com/rss/rampur.xml',
    'https://www.amarujala.com/rss/raebareli.xml',
    'https://www.amarujala.com/rss/lakhimpur-kheri.xml',
    'https://www.amarujala.com/rss/lalitpur.xml',
    'https://www.amarujala.com/rss/varanasi.xml',
    'https://www.amarujala.com/rss/shamli.xml',
    'https://www.amarujala.com/rss/shahjahanpur.xml',
    'https://www.amarujala.com/rss/shravasti.xml',
    'https://www.amarujala.com/rss/sant-kabir-nagar.xml',
    'https://www.amarujala.com/rss/sambhal.xml',
    'https://www.amarujala.com/rss/saharanpur.xml',
    'https://www.amarujala.com/rss/siddharthnagar.xml',
    'https://www.amarujala.com/rss/sitapur.xml',
    'https://www.amarujala.com/rss/sultanpur.xml',
    'https://www.amarujala.com/rss/sonebhadra.xml',
    'https://www.amarujala.com/rss/hamirpur.xml',
    'https://www.amarujala.com/rss/hardoi.xml',
    'https://www.amarujala.com/rss/hathras.xml',
    'https://www.amarujala.com/rss/hapur.xml'
];

// Function to get source name from URL
function getSourceName(url) {
    if (url.includes('amarujala.com')) {
        if (url.includes('/rss/')) {
            const match = url.match(/\/rss\/([^.]+)\.xml/);
            return match ? `अमर उजाला - ${match[1]}` : 'अमर उजाला';
        }
        return 'अमर उजाला';
    }
    if (url.includes('oneindia.com')) return 'वन इंडिया';
    if (url.includes('news18.com')) return 'न्यूज़18';
    if (url.includes('newssetu.in')) return 'न्यूज़ सेतु';
    if (url.includes('indiatv.in')) return 'इंडिया टीवी';
    if (url.includes('bhaskar.com')) return 'दैनिक भास्कर';
    if (url.includes('poojanews.com')) return 'पूजा न्यूज़';
    if (url.includes('hindustantimes.com')) return 'हिंदुस्तान टाइम्स';
    if (url.includes('timesofindia.indiatimes.com')) return 'टाइम्स ऑफ इंडिया';
    if (url.includes('prabhatkhabar.com')) return 'प्रभात खबर';
    if (url.includes('thehindu.com')) return 'द हिंदू';
    if (url.includes('livehindustan.com') || url.includes('api.livehindustan.com')) {
        // Extract city name from Live Hindustan URLs
        const cityMatch = url.match(/\/uttar-pradesh\/([^\/]+)\/rssfeed\.xml/);
        if (cityMatch && cityMatch[1] !== 'rssfeed') {
            return `लाइव हिंदुस्तान - ${cityMatch[1]}`;
        }
        return 'लाइव हिंदुस्तान';
    }
    if (url.includes('navbharattimes.indiatimes.com')) return 'नवभारत टाइम्स';
    if (url.includes('tv9hindi.com')) return 'टीवी9 हिंदी';
    return 'Unknown Source';
}

// Function to fetch news from single RSS feed
async function fetchSingleRSS(url, index) {
    try {
        const sourceName = getSourceName(url);
        console.log(`${index + 1}. Loading: ${sourceName}...`);
        
        const response = await axios.get(url, {
            timeout: 8000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'application/rss+xml, application/xml, text/xml'
            }
        });

        const xml = response.data;
        
        // Debug for Live Hindustan feeds
        if (url.includes('livehindustan.com')) {
            console.log(`   🔍 Debug - XML length: ${xml.length}`);
            console.log(`   🔍 Debug - Contains <item>: ${xml.includes('<item>')}`);
            console.log(`   🔍 Debug - XML preview: ${xml.substring(0, 200)}...`);
        }
        
        const items = xml.match(/<item>(.*?)<\/item>/gs) || [];
        
        const articles = [];
        items.forEach((item, itemIndex) => {
            const { title, link, pubDate, description } = parseRSSItem(item);

            if (title && title.length > 5) {
                articles.push({
                    title: title,
                    url: link.trim(),
                    source: sourceName,
                    publishedAt: pubDate || 'Recent',
                    description: description.substring(0, 100) + '...',
                    feedUrl: url
                });
            }
        });
        
        // Extra debug for Live Hindustan
        if (url.includes('livehindustan.com')) {
            console.log(`   🔍 Debug - Found ${items.length} items, ${articles.length} valid articles`);
            if (items.length > 0 && articles.length === 0) {
                console.log(`   🔍 Debug - First item: ${items[0].substring(0, 300)}...`);
            }
        }
        
        console.log(`   ✅ Found ${articles.length} articles from ${sourceName}`);
        return articles;
        
    } catch (error) {
        console.log(`   ❌ Failed: ${getSourceName(url)} - ${error.message}`);
        return [];
    }
}

// Main function to load all RSS feeds
async function loadAllRSSFeeds() {
    console.log('🚀 Loading All RSS Feeds...');
    console.log(`📊 Total feeds to process: ${allRSSFeeds.length}\n`);
    
    const startTime = Date.now();
    let totalArticles = [];
    let successfulFeeds = 0;
    let failedFeeds = 0;

    // Process feeds in batches to avoid overwhelming servers
    const batchSize = 5;
    for (let i = 0; i < allRSSFeeds.length; i += batchSize) {
        const batch = allRSSFeeds.slice(i, i + batchSize);
        
        console.log(`\n📦 Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(allRSSFeeds.length/batchSize)}:`);
        
        const batchPromises = batch.map((url, batchIndex) => 
            fetchSingleRSS(url, i + batchIndex)
        );
        
        const batchResults = await Promise.all(batchPromises);
        
        batchResults.forEach(articles => {
            if (articles.length > 0) {
                totalArticles.push(...articles);
                successfulFeeds++;
            } else {
                failedFeeds++;
            }
        });
        
        // Small delay between batches
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const endTime = Date.now();
    const timeTaken = ((endTime - startTime) / 1000).toFixed(2);

    // Display results
    console.log('\n' + '='.repeat(100));
    console.log('📊 FINAL RESULTS:');
    console.log('='.repeat(100));
    
    console.log(`✅ Successful feeds: ${successfulFeeds}`);
    console.log(`❌ Failed feeds: ${failedFeeds}`);
    console.log(`📰 Total articles found: ${totalArticles.length}`);
    console.log(`⏱️  Time taken: ${timeTaken} seconds`);
    
    if (totalArticles.length > 0) {
        console.log('\n📰 SAMPLE ARTICLES (First 10):');
        console.log('='.repeat(100));
        
        totalArticles.slice(0, 10).forEach((article, index) => {
            console.log(`\n${index + 1}. ${article.title}`);
            console.log(`   📰 Source: ${article.source}`);
            console.log(`   📅 Published: ${article.publishedAt}`);
            console.log(`   📝 Description: ${article.description}`);
            console.log(`   🔗 URL: ${article.url}`);
        });
        
        // Count by source
        console.log('\n📊 ARTICLES BY SOURCE:');
        console.log('='.repeat(100));
        
        const sourceCount = {};
        totalArticles.forEach(article => {
            sourceCount[article.source] = (sourceCount[article.source] || 0) + 1;
        });
        
        Object.entries(sourceCount)
            .sort((a, b) => b[1] - a[1])
            .forEach(([source, count]) => {
                console.log(`${source}: ${count} articles`);
            });
    }
    
    console.log('\n' + '='.repeat(100));
    console.log(`🎉 Processing completed! Total: ${totalArticles.length} articles from ${successfulFeeds} sources`);
    
    return totalArticles;
}

// Export function
module.exports = {
    loadAllRSSFeeds,
    allRSSFeeds
};

// Run if executed directly
if (require.main === module) {
    loadAllRSSFeeds().then((articles) => {
        const outputPath = path.join(__dirname,  '..', '..', 'public','news.json');
        fs.writeFileSync(outputPath, JSON.stringify(articles, null, 2), 'utf-8');
        console.log(`\n📝 Saved ${articles.length} articles to news.json`);
    });
}