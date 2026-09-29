// import { useState, useEffect } from 'react';
// import { ArrowLeft, Globe, MessageSquare, Share2, TrendingUp, Activity } from 'lucide-react';
// import NetworkGraph from './NetworkGraph';

// export default function InvestigationView({ investigationData, graphData, onBack, searchQuery }) {
//   const [filteredGraph, setFilteredGraph] = useState({ nodes: [], links: [] });

//   // 🧠 Smart Subgraph Filtering: Only show nodes connected to the search query
//   useEffect(() => {
//     if (!graphData || !graphData.nodes || !searchQuery) {
//       setFilteredGraph({ nodes: [], links: [] });
//       return;
//     }

//     const q = searchQuery.toLowerCase();
    
//     // Find nodes matching the search query
//     const matchedNodes = graphData.nodes.filter(n => 
//       (n.label || '').toLowerCase().includes(q) || 
//       (n.id || '').toLowerCase().includes(q)
//     );

//     if (matchedNodes.length === 0) {
//       setFilteredGraph({ nodes: [], links: [] });
//       return;
//     }

//     const matchedIds = new Set(matchedNodes.map(n => n.id));

//     // Get all links connected to matched nodes (1-hop)
//     const relevantLinks = graphData.links.filter(l => {
//       const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
//       const targetId = typeof l.target === 'object' ? l.target.id : l.target;
//       return matchedIds.has(sourceId) || matchedIds.has(targetId);
//     });

//     // Collect all node IDs in these links
//     const connectedIds = new Set();
//     relevantLinks.forEach(l => {
//       connectedIds.add(typeof l.source === 'object' ? l.source.id : l.source);
//       connectedIds.add(typeof l.target === 'object' ? l.target.id : l.target);
//     });

//     // Also include the primary matched nodes
//     matchedNodes.forEach(n => connectedIds.add(n.id));

//     // Filter to only these nodes
//     const filteredNodes = graphData.nodes.filter(n => connectedIds.has(n.id));

//     setFilteredGraph({ nodes: filteredNodes, links: relevantLinks });
//   }, [graphData, searchQuery]);

//   const getPlatformIcon = (platform) => {
//     const platformLower = platform?.toLowerCase() || '';
//     if (platformLower.includes('twitter') || platformLower.includes('x')) return <Share2 className="w-4 h-4" />;
//     if (platformLower.includes('reddit')) return <MessageSquare className="w-4 h-4" />;
//     return <Globe className="w-4 h-4" />;
//   };

//   const getRelativeTime = (timestamp) => {
//     if (!timestamp) return 'Unknown time';
//     const date = new Date(timestamp);
//     const now = new Date();
//     const diffMs = now - date;
//     const diffMins = Math.floor(diffMs / 60000);
//     const diffHours = Math.floor(diffMs / 3600000);
//     const diffDays = Math.floor(diffMs / 86400000);

//     if (diffMins < 1) return 'Just now';
//     if (diffMins < 60) return `${diffMins}m ago`;
//     if (diffHours < 24) return `${diffHours}h ago`;
//     return `${diffDays}d ago`;
//   };

//   return (
//     <div className="space-y-6 animate-in fade-in duration-300">
//       {/* Top Bar */}
//       <div className="flex justify-between items-center p-4 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//         <div className="flex items-center gap-4">
//           <button 
//             onClick={onBack}
//             className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 flex items-center gap-2 transition-colors text-sm font-medium"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Back to Dashboard
//           </button>
//           <h1 className="text-2xl font-bold tracking-wider" style={{ color: '#00f0ff' }}>
//             INVESTIGATION: {searchQuery.toUpperCase()}
//           </h1>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-4 gap-4">
//         <div className="p-4 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//           <div className="flex items-center gap-2 mb-2">
//             <Activity className="w-5 h-5" style={{ color: '#00f0ff' }} />
//             <span className="text-sm text-gray-400 font-medium">Observations</span>
//           </div>
//           <div className="text-3xl font-bold text-white">{investigationData.summary?.observations || 0}</div>
//         </div>
        
//         <div className="p-4 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//           <div className="flex items-center gap-2 mb-2">
//             <span className="text-xl">🏢</span>
//             <span className="text-sm text-gray-400 font-medium">Unique Entities</span>
//           </div>
//           <div className="text-3xl font-bold text-white">{investigationData.summary?.entities?.length || 0}</div>
//         </div>
        
//         <div className="p-4 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//           <div className="flex items-center gap-2 mb-2">
//             <Globe className="w-5 h-5" style={{ color: '#3b82f6' }} />
//             <span className="text-sm text-gray-400 font-medium">Platforms</span>
//           </div>
//           <div className="text-3xl font-bold text-white">{investigationData.summary?.platforms?.length || 0}</div>
//         </div>
        
//         <div className="p-4 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//           <div className="flex items-center gap-2 mb-2">
//             <TrendingUp className="w-5 h-5" style={{ color: '#10b981' }} />
//             <span className="text-sm text-gray-400 font-medium">Activity Trend</span>
//           </div>
//           <div className="text-3xl font-bold" style={{ color: '#10b981' }}>
//             {investigationData.summary?.activity_trend || '0%'}
//           </div>
//         </div>
//       </div>

//       {/* Provenance Panel and Evidence Feed */}
//       <div className="grid grid-cols-2 gap-6">
//         {/* Provenance Panel */}
//         <div className="p-6 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//           <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#00f0ff' }}>
//             <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
//             WHY THIS NARRATIVE?
//           </h2>
//           <div className="p-4 rounded mb-4" style={{ backgroundColor: '#0a0a0f', borderLeft: '4px solid #00f0ff' }}>
//             <p className="text-gray-300 text-sm leading-relaxed">{investigationData.provenance}</p>
//           </div>
          
//           <div className="space-y-4">
//             <div>
//               <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Key Entities</h3>
//               <div className="flex flex-wrap gap-2">
//                 {investigationData.summary?.entities?.slice(0, 8).map((entity, index) => (
//                   <span key={index} className="px-3 py-1 rounded-full text-xs font-medium border" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', borderColor: 'rgba(168, 85, 247, 0.3)' }}>
//                     {entity}
//                   </span>
//                 ))}
//               </div>
//             </div>
            
//             <div>
//               <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Platforms Involved</h3>
//               <div className="flex flex-wrap gap-2">
//                 {investigationData.summary?.platforms?.map((platform, index) => (
//                   <span key={index} className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 bg-gray-800 text-gray-300 border border-gray-700">
//                     {getPlatformIcon(platform)}
//                     {platform.toUpperCase()}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Evidence Feed */}
//         <div className="p-6 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//           <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#00f0ff' }}>
//             <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
//             EVIDENCE FEED
//           </h2>
//           <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
//             {investigationData.posts?.length === 0 ? (
//               <p className="text-gray-400 text-center py-8 text-sm">No direct evidence found for this query.</p>
//             ) : (
//               investigationData.posts?.map((post, index) => (
//                 <div key={index} className="p-3 rounded border-l-4 hover:bg-gray-800/50 transition-colors" style={{ backgroundColor: '#0a0a0f', borderColor: '#00f0ff' }}>
//                   <div className="flex items-center justify-between mb-2">
//                     <div className="flex items-center gap-2 text-xs text-gray-400">
//                       {getPlatformIcon(post.platform)}
//                       <span className="font-bold text-gray-300">{post.platform?.toUpperCase() || 'UNKNOWN'}</span>
//                       <span>•</span>
//                       <span>{getRelativeTime(post.published_at)}</span>
//                     </div>
//                     {post.sentiment_label && (
//                       <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
//                         post.sentiment_label === 'NEGATIVE' ? 'bg-red-900/50 text-red-400 border border-red-800' : 
//                         post.sentiment_label === 'POSITIVE' ? 'bg-green-900/50 text-green-400 border border-green-800' : 
//                         'bg-gray-700 text-gray-300 border border-gray-600'
//                       }`}>
//                         {post.sentiment_label}
//                       </span>
//                     )}
//                   </div>
//                   <p className="text-gray-200 text-sm leading-relaxed">
//                     {(post.text_content || post.content || 'No content').substring(0, 200)}
//                   </p>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Interactive Graph (Using the unified NetworkGraph component) */}
//       <NetworkGraph graphData={filteredGraph} highlightQuery={searchQuery} />
//     </div>
//   );
// }



import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, MessageSquare, Share2, TrendingUp, Activity, Zap, Target } from 'lucide-react';
import NetworkGraph from './NetworkGraph';

export default function InvestigationView({ investigationData, graphData, onBack, searchQuery }) {
  const [filteredGraph, setFilteredGraph] = useState({ nodes: [], links: [] });

  // 🧠 Smart Subgraph Filtering: Only show nodes connected to the search query
  useEffect(() => {
    if (!graphData || !graphData.nodes || !searchQuery) {
      setFilteredGraph({ nodes: [], links: [] });
      return;
    }

    const q = searchQuery.toLowerCase();
    
    // Find nodes matching the search query
    const matchedNodes = graphData.nodes.filter(n => 
      (n.label || '').toLowerCase().includes(q) || 
      (n.id || '').toLowerCase().includes(q)
    );

    if (matchedNodes.length === 0) {
      setFilteredGraph({ nodes: [], links: [] });
      return;
    }

    const matchedIds = new Set(matchedNodes.map(n => n.id));

    // Get all links connected to matched nodes (1-hop)
    const relevantLinks = graphData.links.filter(l => {
      const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
      const targetId = typeof l.target === 'object' ? l.target.id : l.target;
      return matchedIds.has(sourceId) || matchedIds.has(targetId);
    });

    // Collect all node IDs in these links
    const connectedIds = new Set();
    relevantLinks.forEach(l => {
      connectedIds.add(typeof l.source === 'object' ? l.source.id : l.source);
      connectedIds.add(typeof l.target === 'object' ? l.target.id : l.target);
    });

    // Also include the primary matched nodes
    matchedNodes.forEach(n => connectedIds.add(n.id));

    // Filter to only these nodes
    const filteredNodes = graphData.nodes.filter(n => connectedIds.has(n.id));

    setFilteredGraph({ nodes: filteredNodes, links: relevantLinks });
  }, [graphData, searchQuery]);

  const getPlatformIcon = (platform) => {
    const platformLower = platform?.toLowerCase() || '';
    if (platformLower.includes('twitter') || platformLower.includes('x')) return <Share2 className="w-4 h-4 text-blue-400" />;
    if (platformLower.includes('reddit')) return <MessageSquare className="w-4 h-4 text-orange-400" />;
    if (platformLower.includes('youtube')) return <Zap className="w-4 h-4 text-red-500" />;
    return <Globe className="w-4 h-4 text-gray-400" />;
  };

  const getRelativeTime = (timestamp) => {
    if (!timestamp) return 'Unknown time';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const summary = investigationData?.summary || {};
  const posts = investigationData?.posts || [];
  const provenance = investigationData?.provenance || 'No provenance data available.';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 h-full flex flex-col"
    >
      {/* Top Bar */}
      <div className="glass-panel p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <motion.button 
            onClick={onBack}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-xl bg-dark-700/50 hover:bg-dark-600 flex items-center gap-2 text-gray-300 hover:text-white transition-all border border-white/5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Dashboard</span>
          </motion.button>
          <div>
            <h1 className="text-2xl font-bold text-gradient tracking-wide">
              INVESTIGATION: {searchQuery.toUpperCase()}
            </h1>
            <p className="text-xs text-gray-400 mt-1">Deep-dive analysis and provenance tracking</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard 
          icon={<Activity className="w-5 h-5 text-brand-cyan" />} 
          label="Observations" 
          value={summary.observations || 0} 
          delay={0.1} 
        />
        <SummaryCard 
          icon={<Target className="w-5 h-5 text-brand-purple" />} 
          label="Unique Entities" 
          value={summary.entities?.length || 0} 
          delay={0.2} 
        />
        <SummaryCard 
          icon={<Globe className="w-5 h-5 text-brand-blue" />} 
          label="Platforms" 
          value={summary.platforms?.length || 0} 
          delay={0.3} 
        />
        <SummaryCard 
          icon={<TrendingUp className="w-5 h-5 text-brand-emerald" />} 
          label="Activity Trend" 
          value={summary.activity_trend || '0%'} 
          isTrend 
          delay={0.4} 
        />
      </div>

      {/* Provenance Panel and Evidence Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        {/* Provenance Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-6 flex flex-col"
        >
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
            WHY THIS NARRATIVE?
          </h2>
          
          <div className="p-4 rounded-xl bg-dark-900/50 border-l-4 border-brand-cyan mb-6">
            <p className="text-gray-300 text-sm leading-relaxed">{provenance}</p>
          </div>
          
          <div className="space-y-6 flex-1">
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Key Entities</h3>
              <div className="flex flex-wrap gap-2">
                {summary.entities?.slice(0, 8).map((entity, index) => (
                  <motion.span 
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + (index * 0.05) }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-purple/10 text-brand-purple border border-brand-purple/20"
                  >
                    {entity}
                  </motion.span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Platforms Involved</h3>
              <div className="flex flex-wrap gap-2">
                {summary.platforms?.map((platform, index) => (
                  <motion.span 
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + (index * 0.05) }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 bg-dark-700/50 text-gray-300 border border-white/5"
                  >
                    {getPlatformIcon(platform)}
                    {platform.toUpperCase()}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Evidence Feed */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-6 flex flex-col"
        >
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
            <span className="w-2 h-2 rounded-full bg-brand-emerald"></span>
            EVIDENCE FEED
          </h2>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 no-scrollbar">
            {posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Globe className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm">No direct evidence found for this query.</p>
              </div>
            ) : (
              posts.map((post, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (index * 0.05) }}
                  className="p-4 rounded-xl bg-dark-900/50 border border-white/5 hover:border-brand-blue/30 hover:bg-dark-800/50 transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      {getPlatformIcon(post.platform)}
                      <span className="font-bold text-gray-300">{post.platform?.toUpperCase() || 'UNKNOWN'}</span>
                      <span>•</span>
                      <span>{getRelativeTime(post.published_at)}</span>
                    </div>
                    {post.sentiment_label && (
                      <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-md border ${
                        post.sentiment_label === 'NEGATIVE' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                        post.sentiment_label === 'POSITIVE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                        'bg-gray-500/10 text-gray-400 border-gray-500/20'
                      }`}>
                        {post.sentiment_label}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-200 leading-relaxed group-hover:text-white transition-colors">
                    {(post.text_content || post.content || 'No content').substring(0, 200)}
                    {(post.text_content || post.content || '').length > 200 ? '...' : ''}
                  </p>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Interactive Graph */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-panel p-1 min-h-[400px]"
      >
        <NetworkGraph graphData={filteredGraph} highlightQuery={searchQuery} />
      </motion.div>
    </motion.div>
  );
}

// Reusable Summary Card Component for cleaner code
function SummaryCard({ icon, label, value, isTrend = false, delay = 0 }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-panel p-5 hover-glow flex flex-col justify-between"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-dark-900/50 border border-white/5">
          {icon}
        </div>
        <span className="text-sm text-gray-400 font-medium">{label}</span>
      </div>
      <div className={`text-3xl font-bold ${isTrend ? 'text-brand-emerald' : 'text-white'}`}>
        {value}
      </div>
    </motion.div>
  );
}