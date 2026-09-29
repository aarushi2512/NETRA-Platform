// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Share2, MessageSquare, Globe, ArrowRight, Activity } from 'lucide-react';

// const API_URL = 'http://localhost:8000/api/v1';

// const PLATFORM_ICONS = {
//   X: <Share2 className="w-5 h-5" />,
//   REDDIT: <MessageSquare className="w-5 h-5" />,
//   TELEGRAM: <Globe className="w-5 h-5" />,
//   UNKNOWN: <Globe className="w-5 h-5" />
// };

// const PLATFORM_COLORS = {
//   X: '#3b82f6',       // Blue
//   REDDIT: '#ef4444',  // Red
//   TELEGRAM: '#0088cc',// Telegram Blue
//   UNKNOWN: '#6b7280'  // Gray
// };

// export default function CrossPlatformView() {
//   const [query, setQuery] = useState('cisco');
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchCorrelation = async (searchTerm) => {
//     if (!searchTerm.trim()) return;
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_URL}/analytics/correlation?q=${encodeURIComponent(searchTerm)}`);
//       setData(res.data);
//     } catch (error) {
//       console.error("Error fetching correlation:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCorrelation(query);
//   }, []);

//   const formatTime = (timestamp) => {
//     if (!timestamp) return 'Unknown';
//     const date = new Date(timestamp);
//     return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header & Search */}
//       <div className="flex justify-between items-center p-4 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//         <div>
//           <h1 className="text-2xl font-bold tracking-wider" style={{ color: '#00f0ff' }}>
//             CROSS-PLATFORM CORRELATION
//           </h1>
//           <p className="text-sm text-gray-400 mt-1">Track how intelligence spreads across social networks</p>
//         </div>
//         <div className="flex gap-2">
//           <input 
//             type="text" 
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && fetchCorrelation(query)}
//             className="px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-cyan-500"
//             placeholder="Enter topic..."
//           />
//           <button 
//             onClick={() => fetchCorrelation(query)}
//             className="px-4 py-2 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-medium"
//           >
//             Track
//           </button>
//         </div>
//       </div>

//       {loading ? (
//         <div className="text-center py-20 text-gray-400">Analyzing cross-platform spread...</div>
//       ) : !data || data.flow.length === 0 ? (
//         <div className="text-center py-20 text-gray-400">No cross-platform data found for this topic.</div>
//       ) : (
//         <>
//           {/* Stats */}
//           <div className="grid grid-cols-3 gap-4">
//             <div className="p-4 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//               <div className="text-sm text-gray-400 mb-1">Topic Tracked</div>
//               <div className="text-xl font-bold text-white capitalize">{data.query}</div>
//             </div>
//             <div className="p-4 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//               <div className="text-sm text-gray-400 mb-1">Platforms Involved</div>
//               <div className="text-xl font-bold text-cyan-400">{data.flow.length}</div>
//             </div>
//             <div className="p-4 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//               <div className="text-sm text-gray-400 mb-1">Total Observations</div>
//               <div className="text-xl font-bold text-emerald-400">{data.total_posts}</div>
//             </div>
//           </div>

//           {/* Timeline Flow */}
//           <div className="p-6 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//             <h2 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ color: '#00f0ff' }}>
//               <Activity className="w-5 h-5" />
//               INTELLIGENCE SPREAD TIMELINE
//             </h2>
            
//             <div className="relative">
//               {/* Connecting Line */}
//               <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-700 z-0"></div>
              
//               <div className="flex justify-between relative z-10">
//                 {data.flow.map((item, index) => (
//                   <div key={index} className="flex flex-col items-center w-1/4 px-2">
//                     {/* Platform Icon Node */}
//                     <div 
//                       className="w-16 h-16 rounded-full flex items-center justify-center border-4 mb-4 shadow-lg"
//                       style={{ 
//                         backgroundColor: '#0a0a0f', 
//                         borderColor: PLATFORM_COLORS[item.platform] || '#6b7280',
//                         color: PLATFORM_COLORS[item.platform] || '#6b7280'
//                       }}
//                     >
//                       {PLATFORM_ICONS[item.platform] || PLATFORM_ICONS.UNKNOWN}
//                     </div>
                    
//                     {/* Platform Name */}
//                     <div className="text-sm font-bold text-white mb-1">{item.platform}</div>
                    
//                     {/* Time */}
//                     <div className="text-xs text-cyan-400 mb-2">{formatTime(item.first_seen)}</div>
                    
//                     {/* Volume */}
//                     <div className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full">
//                       {item.post_count} posts
//                     </div>

//                     {/* Sample Text (Tooltip style) */}
//                     <div className="mt-3 text-xs text-gray-500 text-center italic px-2 hidden md:block">
//                       "{item.sample_text}"
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Detailed Evidence List */}
//           <div className="p-6 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//             <h2 className="text-lg font-bold mb-4" style={{ color: '#00f0ff' }}>PLATFORM BREAKDOWN</h2>
//             <div className="space-y-3">
//               {data.flow.map((item, index) => (
//                 <div key={index} className="flex items-center justify-between p-4 rounded border-l-4" style={{ backgroundColor: '#0a0a0f', borderColor: PLATFORM_COLORS[item.platform] }}>
//                   <div className="flex items-center gap-4">
//                     <div style={{ color: PLATFORM_COLORS[item.platform] }}>
//                       {PLATFORM_ICONS[item.platform]}
//                     </div>
//                     <div>
//                       <div className="font-bold text-white">{item.platform}</div>
//                       <div className="text-xs text-gray-400">First detected: {formatTime(item.first_seen)}</div>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="text-sm font-bold text-cyan-400">{item.post_count} posts</div>
//                     <div className="text-xs text-gray-500 max-w-xs truncate">{item.sample_text}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Share2, MessageSquare, Globe, Activity, Search, Youtube } from 'lucide-react';

// Using Vite proxy to avoid CORS issues
const API_URL = '/api/v1';

const PLATFORM_ICONS = {
  X: <Share2 className="w-6 h-6" />,
  TWITTER: <Share2 className="w-6 h-6" />,
  REDDIT: <MessageSquare className="w-6 h-6" />,
  YOUTUBE: <Youtube className="w-6 h-6" />,
  TELEGRAM: <Globe className="w-6 h-6" />,
  UNKNOWN: <Globe className="w-6 h-6" />
};

const PLATFORM_COLORS = {
  X: '#3b82f6',       // brand-blue
  TWITTER: '#3b82f6',
  REDDIT: '#f97316',  // orange-500
  YOUTUBE: '#ef4444', // red-500
  TELEGRAM: '#06b6d4',// brand-cyan
  UNKNOWN: '#6b7280'  // gray-500
};

export default function CrossPlatformView() {
  const [query, setQuery] = useState('cybersecurity');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCorrelation = async (searchTerm) => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    const toastId = toast.loading(`Tracking cross-platform spread for "${searchTerm}"...`);
    try {
      const res = await axios.get(`${API_URL}/analytics/correlation?q=${encodeURIComponent(searchTerm)}`);
      setData(res.data);
      toast.success('Correlation data loaded', { id: toastId });
    } catch (error) {
      console.error("Error fetching correlation:", error);
      toast.error('Failed to fetch correlation data', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCorrelation(query);
  }, []);

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Unknown';
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 h-full flex flex-col"
    >
      {/* Header & Search */}
      <div className="glass-panel p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gradient tracking-wide">
            CROSS-PLATFORM CORRELATION
          </h1>
          <p className="text-sm text-gray-400 mt-1">Track how intelligence and narratives spread across social networks</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchCorrelation(query)}
              className="input-modern pl-10"
              placeholder="Enter topic or entity..."
            />
          </div>
          <motion.button 
            onClick={() => fetchCorrelation(query)}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue/90 text-white font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? 'Tracking...' : 'Track'}
          </motion.button>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 glass-panel min-h-[400px]">
          <Activity className="w-12 h-12 mb-4 text-brand-cyan animate-pulse" />
          <p className="text-lg font-medium">Analyzing cross-platform spread...</p>
          <p className="text-sm text-gray-500 mt-1">Connecting the dots across networks</p>
        </div>
      ) : !data || !data.flow || data.flow.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 glass-panel min-h-[400px]">
          <Globe className="w-12 h-12 mb-4 opacity-30" />
          <p className="text-lg font-medium">No cross-platform data found</p>
          <p className="text-sm text-gray-500 mt-1">Try a different topic or ensure the backend is seeded.</p>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard 
              label="Topic Tracked" 
              value={data.query} 
              color="text-white" 
              delay={0.1} 
            />
            <StatCard 
              label="Platforms Involved" 
              value={data.flow.length} 
              color="text-brand-cyan" 
              delay={0.2} 
            />
            <StatCard 
              label="Total Observations" 
              value={data.total_posts || 0} 
              color="text-brand-emerald" 
              delay={0.3} 
            />
          </div>

          {/* Timeline Flow */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-panel p-6 flex-1"
          >
            <h2 className="text-lg font-bold mb-8 flex items-center gap-2 text-white">
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
              INTELLIGENCE SPREAD TIMELINE
            </h2>
            
            <div className="relative overflow-x-auto pb-4 no-scrollbar">
              {/* Connecting Line */}
              <div className="absolute top-10 left-8 right-8 h-0.5 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-cyan opacity-30 z-0"></div>
              
              <div className="flex justify-between relative z-10 min-w-max gap-8 px-4">
                {data.flow.map((item, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                    className="flex flex-col items-center w-48 px-2 group"
                  >
                    {/* Platform Icon Node */}
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-20 h-20 rounded-full flex items-center justify-center border-4 mb-4 shadow-lg transition-all duration-300 group-hover:shadow-glow-blue"
                      style={{ 
                        backgroundColor: '#0B0F19', 
                        borderColor: PLATFORM_COLORS[item.platform] || '#6b7280',
                        color: PLATFORM_COLORS[item.platform] || '#6b7280'
                      }}
                    >
                      {PLATFORM_ICONS[item.platform] || PLATFORM_ICONS.UNKNOWN}
                    </motion.div>
                    
                    {/* Platform Name */}
                    <div className="text-sm font-bold text-white mb-1 tracking-wide">{item.platform}</div>
                    
                    {/* Time */}
                    <div className="text-xs text-brand-cyan mb-2 font-mono">{formatTime(item.first_seen)}</div>
                    
                    {/* Volume */}
                    <div className="text-xs text-gray-300 bg-dark-700/50 border border-white/5 px-3 py-1 rounded-full mb-3">
                      {item.post_count} posts
                    </div>

                    {/* Sample Text */}
                    <div className="text-xs text-gray-500 text-center italic px-2 leading-relaxed bg-dark-900/50 p-3 rounded-lg border border-white/5">
                      "{item.sample_text}"
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Detailed Evidence List */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-panel p-6"
          >
            <h2 className="text-lg font-bold mb-4 text-white">PLATFORM BREAKDOWN</h2>
            <div className="space-y-3">
              {data.flow.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + (index * 0.1) }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-dark-900/50 border border-white/5 hover:border-white/10 transition-all group"
                  style={{ borderLeftWidth: '3px', borderLeftColor: PLATFORM_COLORS[item.platform] }}
                >
                  <div className="flex items-center gap-4 mb-3 sm:mb-0">
                    <div className="p-2 rounded-lg bg-dark-800 group-hover:bg-dark-700 transition-colors" style={{ color: PLATFORM_COLORS[item.platform] }}>
                      {PLATFORM_ICONS[item.platform]}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">{item.platform}</div>
                      <div className="text-xs text-gray-400">First detected: {formatTime(item.first_seen)}</div>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-sm font-bold text-brand-cyan">{item.post_count} posts</div>
                    <div className="text-xs text-gray-500 max-w-md truncate mt-1">{item.sample_text}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

// Reusable Sub-components
function StatCard({ label, value, color, delay = 0 }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-panel p-5 hover-glow flex flex-col justify-between"
    >
      <span className="text-sm text-gray-400 font-medium mb-2">{label}</span>
      <span className={`text-2xl font-bold ${color} capitalize`}>{value}</span>
    </motion.div>
  );
}