import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UPMap from './components/UPMap';
import ConstituencyDetail from './components/ConstituencyDetail';
import NewsAnalysis from './components/NewsAnalysis';
import SocialMediaTracker from './components/SocialMediaTracker';
import OppositionAnalysis from './components/OppositionAnalysis';
import SurveyData from './components/SurveyData';
import TrendsAnalysis from './components/TrendsAnalysis';
import LeaderProfiles from './components/LeaderProfiles';
import SchemePerformance from './components/SchemePerformance';
import Layout from './components/Layout';
import NewsList from './components/NewsList';
import jsonData from "../public/news.json";

const transformedNews = jsonData.map((item, index) => ({
  id: index + 1,
  title: item.title,
  description: item.description,
  date: new Date(item.publishedAt).toISOString(),
  url: item.url, 
}));



function App() {
  return (
   /*
    <div>
      <NewsList />
    </div>
    */
    
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="map" element={<UPMap />} />
          <Route path="constituency/:id" element={<ConstituencyDetail />} />
          <Route path="news" element={<NewsAnalysis newsData={transformedNews} />} />
          <Route path="social-media" element={<SocialMediaTracker />} />
          <Route path="opposition" element={<OppositionAnalysis />} />
          <Route path="surveys" element={<SurveyData />} />
          <Route path="trends" element={<TrendsAnalysis />} />
          <Route path="leaders" element={<LeaderProfiles />} />
          <Route path="schemes" element={<SchemePerformance />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;