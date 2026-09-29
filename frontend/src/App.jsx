// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
// import { Search, Globe, MessageSquare, RefreshCw, Share2 } from 'lucide-react';
// import InvestigationView from './components/InvestigationView';
// import NetworkGraph from './components/NetworkGraph';
// import NarrativeTracker from './components/NarrativeTracker';
// import CrossPlatformView from './components/CrossPlatformView';
// import AlertsView from './components/AlertsView';
// import DemographicsView from './components/DemographicsView';
// import NetworkIntelligenceView from './components/NetworkIntelligenceView';

// const API_URL = 'http://localhost:8000/api/v1';
// const SENTIMENT_COLORS = { Positive: '#10b981', Negative: '#ef4444', Neutral: '#f59e0b', ABSTAIN: '#6b7280' };

// function App() {
//   const [activeTab, setActiveTab] = useState('analytics');
//   const [sentimentData, setSentimentData] = useState([]);
//   const [narrativeData, setNarrativeData] = useState([]);
//   const [graphData, setGraphData] = useState({ nodes: [], links: [] });
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [lastUpdated, setLastUpdated] = useState(null);
//   const [investigationData, setInvestigationData] = useState(null);
  
//   // 🔄 MAGIC REFRESH KEY
//   const [refreshKey, setRefreshKey] = useState(0);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [sentimentRes, narrativeRes, graphRes, messagesRes] = await Promise.all([
//         axios.get(`${API_URL}/analytics/sentiment`),
//         axios.get(`${API_URL}/analytics/narratives`),
//         axios.get(`${API_URL}/graph/data`),
//         axios.get(`${API_URL}/messages?limit=20`)
//       ]);
//       setSentimentData(sentimentRes.data.sentiment_breakdown || []);
//       setNarrativeData(narrativeRes.data.clusters || []);
//       setGraphData(graphRes.data || { nodes: [], links: [] });
//       setMessages(messagesRes.data.messages || []);
//       setLastUpdated(new Date());
//     } catch (error) { 
//       console.error('Error fetching data:', error); 
//     } finally { 
//       setLoading(false); 
//     }
//   };

//   const handleSearch = async (e) => {
//     if (e.key === 'Enter' && searchQuery.trim()) {
//       setLoading(true);
//       try {
//         const searchRes = await axios.get(`${API_URL}/search?q=${encodeURIComponent(searchQuery)}`);
//         setInvestigationData(searchRes.data);
//       } catch (error) { 
//         console.error('Error searching:', error); 
//       } finally { 
//         setLoading(false); 
//       }
//     }
//   };

//   const handleBackToDashboard = () => { 
//     setInvestigationData(null); 
//     setSearchQuery(''); 
//   };

//   useEffect(() => { fetchData(); }, []);

//   const getPlatformIcon = (platform) => {
//     const p = platform?.toLowerCase() || '';
//     if (p.includes('twitter') || p.includes('x')) return <Share2 className="w-4 h-4" />;
//     if (p.includes('reddit')) return <MessageSquare className="w-4 h-4" />;
//     return <Globe className="w-4 h-4" />;
//   };

//   const getRelativeTime = (timestamp) => {
//     if (!timestamp) return 'Unknown';
//     const diffMs = new Date() - new Date(timestamp);
//     const mins = Math.floor(diffMs / 60000);
//     if (mins < 1) return 'Just now';
//     if (mins < 60) return `${mins}m ago`;
//     return `${Math.floor(mins / 60)}h ago`;
//   };

//   return (
//     <div className="min-h-screen p-6 font-sans" style={{ backgroundColor: '#0a0a0f', color: '#ffffff' }}>
//       {/* Header */}
//       <header className="mb-8 flex justify-between items-center border-b border-gray-700 pb-4">
//         <h1 className="text-3xl font-bold tracking-wider" style={{ color: '#00f0ff' }}>NETRA INTELLIGENCE DASHBOARD</h1>
//         {!investigationData && (
//           <div className="flex gap-3 items-center flex-wrap">
//             <button onClick={() => setActiveTab('analytics')} className={`px-4 py-2 rounded transition-colors text-sm font-medium ${activeTab === 'analytics' ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
//               Analytics
//             </button>
//             <button onClick={() => setActiveTab('mutation')} className={`px-4 py-2 rounded transition-colors text-sm font-medium ${activeTab === 'mutation' ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
//               Mutation Tracker
//             </button>
//             <button onClick={() => setActiveTab('correlation')} className={`px-4 py-2 rounded transition-colors text-sm font-medium ${activeTab === 'correlation' ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
//               Cross-Platform
//             </button>
//             <button onClick={() => setActiveTab('alerts')} className={`px-4 py-2 rounded transition-colors text-sm font-medium ${activeTab === 'alerts' ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
//               Alerts
//             </button>
//             <button onClick={() => setActiveTab('demographics')} className={`px-4 py-2 rounded transition-colors text-sm font-medium ${activeTab === 'demographics' ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
//               Demographics
//             </button>
//             <button onClick={() => setActiveTab('network_intel')} className={`px-4 py-2 rounded transition-colors text-sm font-medium ${activeTab === 'network_intel' ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
//               Network Intel
//             </button>
//             <button onClick={() => setActiveTab('graph')} className={`px-4 py-2 rounded transition-colors text-sm font-medium ${activeTab === 'graph' ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
//               Network Graph
//             </button>
            
//             {/* 🔄 FIXED REFRESH BUTTON */}
//             <button 
//               onClick={() => { 
//                 fetchData(); 
//                 setRefreshKey(prev => prev + 1);
//               }} 
//               disabled={loading} 
//               className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 flex items-center gap-2 text-gray-300 transition-colors text-sm font-medium"
//             >
//               <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
//             </button>
            
//             {lastUpdated && <span className="text-xs text-gray-400 ml-2">Last Updated: {lastUpdated.toLocaleTimeString()}</span>}
//           </div>
//         )}
//       </header>

//       {/* Search Bar */}
//       {!investigationData && (
//         <div className="mb-6">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input 
//               type="text" 
//               placeholder="Investigate topic, entity, or narrative... (press Enter)" 
//               value={searchQuery} 
//               onChange={(e) => setSearchQuery(e.target.value)} 
//               onKeyDown={handleSearch} 
//               className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors" 
//               style={{ backgroundColor: '#13131f' }} 
//             />
//           </div>
//         </div>
//       )}

//       {/* Main Content Area */}
//       {investigationData ? (
//         <InvestigationView investigationData={investigationData} graphData={graphData} onBack={handleBackToDashboard} searchQuery={searchQuery} />
//       ) : (
//         <>
//           {activeTab === 'analytics' && (
//             <div className="grid grid-cols-3 gap-8">
//               <div className="p-6 rounded-lg shadow-lg" style={{ backgroundColor: '#13131f' }}>
//                 <h2 className="text-xl font-bold mb-4">Sentiment Distribution</h2>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie data={sentimentData} dataKey="count" nameKey="label" cx="50%" cy="50%" outerRadius={100} label>
//                       {sentimentData.map((entry, index) => <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[entry.label] || '#888888'} />)}
//                     </Pie>
//                     <Tooltip contentStyle={{ backgroundColor: '#13131f', border: '1px solid #333' }} itemStyle={{ color: '#fff' }} />
//                     <Legend wrapperStyle={{ color: '#fff' }} />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//               <div className="p-6 rounded-lg shadow-lg" style={{ backgroundColor: '#13131f' }}>
//                 <h2 className="text-xl font-bold mb-4">Emerging Narratives</h2>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={narrativeData} layout="vertical">
//                     <CartesianGrid strokeDasharray="3 3" stroke="#333" />
//                     <XAxis type="number" stroke="#888" />
//                     <YAxis dataKey="name" type="category" width={100} stroke="#888" />
//                     <Tooltip contentStyle={{ backgroundColor: '#13131f', border: '1px solid #333' }} itemStyle={{ color: '#fff' }} />
//                     <Bar dataKey="count" fill="#00f0ff" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//               <div className="p-6 rounded-lg shadow-lg" style={{ backgroundColor: '#13131f' }}>
//                 <h2 className="text-xl font-bold mb-4">Live Intelligence Feed</h2>
//                 <div className="space-y-3 max-h-[300px] overflow-y-auto">
//                   {messages.length === 0 ? <p className="text-gray-400 text-center py-8">No messages available</p> : messages.map((msg, i) => (
//                     <div key={i} className="p-3 rounded border-l-4" style={{ backgroundColor: '#0a0a0f', borderColor: '#00f0ff' }}>
//                       <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
//                         {getPlatformIcon(msg.platform)} <span>{msg.platform?.toUpperCase() || 'UNKNOWN'}</span> <span>•</span> <span>{getRelativeTime(msg.published_at)}</span>
//                       </div>
//                       <p className="text-white mt-1 text-sm">{msg.text_content?.substring(0, 150) || 'No content'}...</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
          
//           {/* 🔄 PASSING REFRESH KEY TO FORCE REMOUNT */}
//           {activeTab === 'mutation' && (
//             <NarrativeTracker key={refreshKey} />
//           )}

//           {activeTab === 'correlation' && (
//             <CrossPlatformView key={refreshKey} />
//           )}

//           {activeTab === 'alerts' && (
//             <AlertsView key={refreshKey} />
//           )}

//           {activeTab === 'demographics' && (
//             <DemographicsView key={refreshKey} />
//           )}

//           {activeTab === 'network_intel' && (
//             <NetworkIntelligenceView key={refreshKey} />
//           )}
          
//           {activeTab === 'graph' && (
//             <NetworkGraph graphData={graphData} key={refreshKey} />
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default App;


import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend 
} from 'recharts';
import { 
  Search, Globe, MessageSquare, RefreshCw, Share2, LayoutDashboard, GitBranch, 
  Bell, Users, Network, Shield, Menu, X, Zap 
} from 'lucide-react';

import InvestigationView from './components/InvestigationView';
import NetworkGraph from './components/NetworkGraph';
import NarrativeTracker from './components/NarrativeTracker';
import CrossPlatformView from './components/CrossPlatformView';
import AlertsView from './components/AlertsView';
import DemographicsView from './components/DemographicsView';
import NetworkIntelligenceView from './components/NetworkIntelligenceView';

// Using Vite proxy to avoid CORS issues
const API_URL = '/api/v1';
const SENTIMENT_COLORS = { Positive: '#10b981', Negative: '#ef4444', Neutral: '#f59e0b', ABSTAIN: '#6b7280' };

const navItems = [
  { id: 'analytics', label: 'Analytics', icon: LayoutDashboard },
  { id: 'mutation', label: 'Mutation Tracker', icon: GitBranch },
  { id: 'correlation', label: 'Cross-Platform', icon: Globe },
  { id: 'graph', label: 'Network Graph', icon: Network },
  { id: 'network_intel', label: 'Network Intel', icon: Shield },
  { id: 'alerts', label: 'Automated Alerts', icon: Bell },
  { id: 'demographics', label: 'Demographics', icon: Users },
];

function App() {
  const [activeTab, setActiveTab] = useState('analytics');
  const [sentimentData, setSentimentData] = useState([]);
  const [narrativeData, setNarrativeData] = useState([]);
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [investigationData, setInvestigationData] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const toastId = toast.loading('Fetching latest intelligence...');
    try {
      const [sentimentRes, narrativeRes, graphRes, messagesRes] = await Promise.all([
        axios.get(`${API_URL}/analytics/sentiment`),
        axios.get(`${API_URL}/analytics/narratives`),
        axios.get(`${API_URL}/graph/data`),
        axios.get(`${API_URL}/messages?limit=20`)
      ]);
      setSentimentData(sentimentRes.data.sentiment_breakdown || []);
      setNarrativeData(narrativeRes.data.clusters || []);
      setGraphData(graphRes.data || { nodes: [], links: [] });
      setMessages(messagesRes.data.messages || []);
      setLastUpdated(new Date());
      toast.success('Dashboard updated successfully', { id: toastId });
    } catch (error) { 
      console.error('Error fetching data:', error); 
      toast.error('Failed to fetch data. Is the backend running?', { id: toastId });
    } finally { 
      setLoading(false); 
    }
  };

  const handleSearch = async (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setLoading(true);
      const toastId = toast.loading(`Investigating: "${searchQuery}"...`);
      try {
        const searchRes = await axios.get(`${API_URL}/search?q=${encodeURIComponent(searchQuery)}`);
        setInvestigationData(searchRes.data);
        toast.success('Investigation complete', { id: toastId });
      } catch (error) { 
        console.error('Error searching:', error); 
        toast.error('Search failed. Please try again.', { id: toastId });
      } finally { 
        setLoading(false); 
      }
    }
  };

  const handleBackToDashboard = () => { 
    setInvestigationData(null); 
    setSearchQuery(''); 
  };

  useEffect(() => { fetchData(); }, []);

  const getPlatformIcon = (platform) => {
    const p = platform?.toLowerCase() || '';
    if (p.includes('twitter') || p.includes('x')) return <Share2 className="w-4 h-4 text-blue-400" />;
    if (p.includes('reddit')) return <MessageSquare className="w-4 h-4 text-orange-400" />;
    if (p.includes('youtube')) return <Zap className="w-4 h-4 text-red-500" />;
    return <Globe className="w-4 h-4 text-gray-400" />;
  };

  const getRelativeTime = (timestamp) => {
    if (!timestamp) return 'Unknown';
    const diffMs = new Date() - new Date(timestamp);
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    return `${Math.floor(mins / 60)}h ago`;
  };

  return (
    <div className="flex h-screen bg-dark-900 text-gray-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-full w-64 bg-dark-800/80 backdrop-blur-xl border-r border-white/5 z-50 flex flex-col"
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center shadow-glow-blue">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide text-white">NETRA</h1>
            <p className="text-xs text-gray-400">Intelligence Platform</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto no-scrollbar">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setInvestigationData(null); }}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 text-white border border-brand-blue/30 shadow-glow-blue' 
                  : 'text-gray-400 hover:bg-dark-700/50 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-brand-blue' : ''}`} />
              <span className="font-medium text-sm">{item.label}</span>
            </motion.button>
          ))}
        </nav>

        {/* Live Status Footer */}
        <div className="p-4 border-t border-white/5">
          <div className="glass-panel p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
              <span className="text-xs font-medium text-gray-300">System Online</span>
            </div>
            <p className="text-xs text-gray-500">v2.6.0 • Demo Ready</p>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className={`flex-1 flex flex-col h-full transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Topbar */}
        <header className="h-16 glass-panel border-b border-white/5 flex items-center justify-between px-6 z-40">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-dark-700/50 text-gray-400 hover:text-white transition-colors"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            {!investigationData && (
              <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Investigate topic, entity, or narrative... (Enter)" 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  onKeyDown={handleSearch} 
                  className="input-modern pl-10 py-2 text-sm" 
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {lastUpdated && (
              <span className="text-xs text-gray-500 hidden md:block">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <motion.button 
              onClick={() => { fetchData(); setRefreshKey(prev => prev + 1); }}
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-blue/10 text-brand-blue border border-brand-blue/20 hover:bg-brand-blue/20 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="text-sm font-medium hidden sm:inline">Refresh</span>
            </motion.button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
          {investigationData ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <InvestigationView 
                investigationData={investigationData} 
                graphData={graphData} 
                onBack={handleBackToDashboard} 
                searchQuery={searchQuery} 
              />
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {activeTab === 'analytics' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                    {/* Sentiment Card */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="glass-panel p-6 hover-glow flex flex-col"
                    >
                      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-blue"></span>
                        Sentiment Distribution
                      </h2>
                      <div className="flex-1 min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie 
                              data={sentimentData} 
                              dataKey="count" 
                              nameKey="label" 
                              cx="50%" 
                              cy="50%" 
                              outerRadius={80} 
                              innerRadius={40}
                              paddingAngle={5}
                            >
                              {sentimentData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[entry.label] || '#6b7280'} />
                              ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }} 
                              itemStyle={{ color: '#fff' }} 
                            />
                            <Legend wrapperStyle={{ color: '#9ca3af', fontSize: '12px' }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </motion.div>

                    {/* Narratives Card */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="glass-panel p-6 hover-glow flex flex-col"
                    >
                      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-purple"></span>
                        Emerging Narratives
                      </h2>
                      <div className="flex-1 min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={narrativeData} layout="vertical" margin={{ left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
                            <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                            <YAxis dataKey="name" type="category" width={100} stroke="#9ca3af" fontSize={12} />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }} 
                              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            />
                            <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </motion.div>

                    {/* Live Feed Card */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="glass-panel p-6 hover-glow flex flex-col"
                    >
                      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse"></span>
                        Live Intelligence Feed
                      </h2>
                      <div className="flex-1 overflow-y-auto space-y-3 pr-2 no-scrollbar">
                        {messages.length === 0 ? (
                          <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <Globe className="w-8 h-8 mb-2 opacity-50" />
                            <p className="text-sm">No live messages available</p>
                          </div>
                        ) : (
                          messages.map((msg, i) => (
                            <motion.div 
                              key={i}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="p-3 rounded-xl bg-dark-900/50 border border-white/5 hover:border-brand-blue/30 transition-colors group"
                            >
                              <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                                {getPlatformIcon(msg.platform)} 
                                <span className="font-medium text-gray-300">{msg.platform?.toUpperCase() || 'UNKNOWN'}</span> 
                                <span>•</span> 
                                <span>{getRelativeTime(msg.published_at)}</span>
                              </div>
                              <p className="text-sm text-gray-200 leading-relaxed group-hover:text-white transition-colors">
                                {msg.text_content?.substring(0, 120) || 'No content'}...
                              </p>
                            </motion.div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  </div>
                )}
                
                {/* Other Tabs */}
                {activeTab === 'mutation' && <NarrativeTracker key={refreshKey} />}
                {activeTab === 'correlation' && <CrossPlatformView key={refreshKey} />}
                {activeTab === 'alerts' && <AlertsView key={refreshKey} />}
                {activeTab === 'demographics' && <DemographicsView key={refreshKey} />}
                {activeTab === 'network_intel' && <NetworkIntelligenceView key={refreshKey} />}
                {activeTab === 'graph' && <NetworkGraph graphData={graphData} key={refreshKey} />}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;