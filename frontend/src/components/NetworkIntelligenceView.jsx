// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
// import { Network, Users, GitMerge, Layers, RefreshCw } from 'lucide-react';

// const API_URL = 'http://localhost:8000/api/v1';
// const COLORS = ['#00f0ff', '#a855f7', '#ec4899', '#3b82f6', '#eab308', '#10b981', '#ef4444'];

// export default function NetworkIntelligenceView() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchIntelligence = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_URL}/graph/intelligence?t=${Date.now()}`);
//       setData(res.data);
//     } catch (error) {
//       console.error("Error fetching graph intelligence:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchIntelligence();
//   }, []);

//   const formatName = (name) => {
//     if (!name || name === 'Unknown Node') return 'Unknown Entity';
//     // Truncate long names
//     return name.length > 30 ? name.substring(0, 27) + '...' : name;
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center p-4 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//         <div className="flex items-center gap-3">
//           <div className="p-2 rounded-full bg-cyan-900/30 border border-cyan-600">
//             <Network className="w-6 h-6 text-cyan-400" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold tracking-wider text-white">
//               ADVANCED NETWORK INTELLIGENCE
//             </h1>
//             <p className="text-sm text-gray-400 mt-1">
//               Centrality, Bridge Nodes, and Community Detection
//             </p>
//           </div>
//         </div>
//         <button 
//           onClick={fetchIntelligence}
//           disabled={loading}
//           className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium flex items-center gap-2"
//         >
//           <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> 
//           Recalculate
//         </button>
//       </div>

//       {loading ? (
//         <div className="text-center py-20 text-gray-400">Running graph algorithms...</div>
//       ) : !data ? (
//         <div className="text-center py-20 text-gray-400">No graph intelligence data available.</div>
//       ) : (
//         <>
//           {/* Top Stats Row */}
//           <div className="grid grid-cols-3 gap-4">
//             <div className="p-4 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//               <div className="flex items-center gap-2 mb-2">
//                 <Users className="w-5 h-5 text-purple-400" />
//                 <span className="text-sm text-gray-400 font-medium">Top Influencers</span>
//               </div>
//               <div className="text-3xl font-bold text-white">{data.influencers.length}</div>
//               <div className="text-xs text-gray-500 mt-1">Highest degree centrality</div>
//             </div>
//             <div className="p-4 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//               <div className="flex items-center gap-2 mb-2">
//                 <GitMerge className="w-5 h-5 text-cyan-400" />
//                 <span className="text-sm text-gray-400 font-medium">Bridge Nodes</span>
//               </div>
//               <div className="text-3xl font-bold text-white">{data.bridges.length}</div>
//               <div className="text-xs text-gray-500 mt-1">Cross-community connectors</div>
//             </div>
//             <div className="p-4 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//               <div className="flex items-center gap-2 mb-2">
//                 <Layers className="w-5 h-5 text-emerald-400" />
//                 <span className="text-sm text-gray-400 font-medium">Communities</span>
//               </div>
//               <div className="text-3xl font-bold text-white">{data.communities.length}</div>
//               <div className="text-xs text-gray-500 mt-1">Distinct node clusters</div>
//             </div>
//           </div>

//           {/* Main Content Grid */}
//           <div className="grid grid-cols-2 gap-6">
            
//             {/* Top Influencers */}
//             <div className="p-6 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//               <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#00f0ff' }}>
//                 <Users className="w-5 h-5" /> TOP INFLUENCERS (Degree Centrality)
//               </h2>
//               <div className="space-y-3">
//                 {data.influencers.map((inf, i) => (
//                   <div key={i} className="flex items-center justify-between p-3 rounded bg-gray-900/50 border border-gray-800">
//                     <div className="flex items-center gap-3">
//                       <span className="text-lg font-bold text-gray-600">#{i + 1}</span>
//                       <div>
//                         <div className="font-bold text-white">{formatName(inf.name)}</div>
//                         <div className="text-xs text-purple-400">{inf.type || 'Entity'}</div>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className="text-xl font-bold text-cyan-400">{inf.degree}</div>
//                       <div className="text-xs text-gray-500">Connections</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Bridge Nodes */}
//             <div className="p-6 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//               <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#00f0ff' }}>
//                 <GitMerge className="w-5 h-5" /> CRITICAL BRIDGE NODES
//               </h2>
//               <p className="text-xs text-gray-400 mb-4">Entities that connect disparate platforms or narratives, acting as information conduits.</p>
//               <div className="space-y-3">
//                 {data.bridges.length > 0 ? data.bridges.map((bridge, i) => (
//                   <div key={i} className="flex items-center justify-between p-3 rounded bg-gray-900/50 border border-gray-800">
//                     <div className="font-bold text-white">{formatName(bridge.name)}</div>
//                     <div className="px-3 py-1 rounded-full bg-cyan-900/30 text-cyan-400 text-xs font-bold border border-cyan-800">
//                       Bridge Score: {bridge.bridge_score}
//                     </div>
//                   </div>
//                 )) : (
//                   <div className="text-center py-8 text-gray-500 text-sm">
//                     No strong bridge nodes detected in current graph topology.
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Community Clusters Chart */}
//             <div className="col-span-2 p-6 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//               <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#00f0ff' }}>
//                 <Layers className="w-5 h-5" /> COMMUNITY CLUSTER DISTRIBUTION
//               </h2>
//               {data.communities.length === 0 ? (
//                 <div className="text-center py-12 text-gray-500">No community data available.</div>
//               ) : (
//                 <div style={{ width: '100%', height: 300 }}>
//                   <ResponsiveContainer>
//                     <BarChart data={data.communities}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#333" />
//                       <XAxis 
//                         dataKey="community" 
//                         stroke="#888" 
//                         style={{ fontSize: '11px' }}
//                         tick={{ fill: '#888' }}
//                       />
//                       <YAxis stroke="#888" tick={{ fill: '#888' }} />
//                       <Tooltip 
//                         contentStyle={{ backgroundColor: '#13131f', border: '1px solid #333', color: '#fff' }} 
//                         cursor={{ fill: 'rgba(255,255,255,0.05)' }}
//                       />
//                       <Bar dataKey="size" radius={[4, 4, 0, 0]}>
//                         {data.communities.map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                         ))}
//                       </Bar>
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               )}
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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Network, Users, GitMerge, Layers, RefreshCw, Crown, Link as LinkIcon } from 'lucide-react';

// Using Vite proxy to avoid CORS issues
const API_URL = '/api/v1';
const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#eab308', '#10b981', '#f97316'];

export default function NetworkIntelligenceView() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchIntelligence = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await axios.get(`${API_URL}/graph/intelligence?t=${Date.now()}`);
      setData(res.data);
      if (isManual) toast.success('Graph intelligence recalculated');
    } catch (error) {
      console.error("Error fetching graph intelligence:", error);
      if (isManual) toast.error('Failed to recalculate graph intelligence');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchIntelligence();
  }, []);

  const formatName = (name) => {
    if (!name || name === 'Unknown Node') return 'Unknown Entity';
    return name.length > 30 ? name.substring(0, 27) + '...' : name;
  };

  // Custom Tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-800 border border-dark-600 rounded-lg p-3 shadow-xl">
          <p className="text-sm font-semibold text-white mb-1">{label}</p>
          <p className="text-sm text-brand-cyan">Size: {payload[0].value} nodes</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 h-full flex flex-col"
    >
      {/* Header */}
      <div className="glass-panel p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 shadow-glow-blue">
            <Network className="w-6 h-6 text-brand-cyan" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gradient tracking-wide">
              ADVANCED NETWORK INTELLIGENCE
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Centrality, Bridge Nodes, and Community Detection
            </p>
          </div>
        </div>
        
        <motion.button 
          onClick={() => fetchIntelligence(true)}
          disabled={refreshing || loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2.5 rounded-xl bg-dark-700/50 hover:bg-dark-600 text-white text-sm font-medium flex items-center gap-2 transition-all border border-white/10 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing || loading ? 'animate-spin' : ''}`} /> 
          {refreshing || loading ? 'Recalculating...' : 'Recalculate'}
        </motion.button>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 glass-panel min-h-[400px]">
          <RefreshCw className="w-10 h-10 mb-4 text-brand-cyan animate-spin" />
          <p className="text-lg font-medium">Running graph algorithms...</p>
        </div>
      ) : !data ? (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 glass-panel min-h-[400px]">
          <Network className="w-12 h-12 mb-4 opacity-30" />
          <p className="text-lg font-medium">No graph intelligence data available.</p>
          <p className="text-sm text-gray-500 mt-1">Ensure Neo4j is populated and the pipeline has run.</p>
        </div>
      ) : (
        <>
          {/* Top Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard 
              icon={<Users className="w-5 h-5 text-brand-purple" />}
              label="Top Influencers" 
              value={data.influencers?.length || 0} 
              sublabel="Highest degree centrality"
              delay={0.1} 
            />
            <StatCard 
              icon={<GitMerge className="w-5 h-5 text-brand-cyan" />}
              label="Bridge Nodes" 
              value={data.bridges?.length || 0} 
              sublabel="Cross-community connectors"
              delay={0.2} 
            />
            <StatCard 
              icon={<Layers className="w-5 h-5 text-brand-emerald" />}
              label="Communities" 
              value={data.communities?.length || 0} 
              sublabel="Distinct node clusters"
              delay={0.3} 
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
            
            {/* Top Influencers */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-panel p-6 hover-glow flex flex-col"
            >
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                <Crown className="w-5 h-5 text-yellow-500" /> 
                TOP INFLUENCERS (Degree Centrality)
              </h2>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 no-scrollbar">
                {data.influencers?.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-8">No influencers detected.</p>
                ) : (
                  data.influencers?.map((inf, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + (i * 0.05) }}
                      className="flex items-center justify-between p-3 rounded-xl bg-dark-900/50 border border-white/5 hover:border-brand-purple/30 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-gray-600 w-6 text-center">#{i + 1}</span>
                        <div>
                          <div className="font-bold text-white text-sm">{formatName(inf.name)}</div>
                          <div className="text-xs text-brand-purple">{inf.type || 'Entity'}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-brand-cyan">{inf.degree}</div>
                        <div className="text-xs text-gray-500">Connections</div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Bridge Nodes */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-panel p-6 hover-glow flex flex-col"
            >
              <h2 className="text-lg font-bold mb-2 flex items-center gap-2 text-white">
                <LinkIcon className="w-5 h-5 text-brand-cyan" /> 
                CRITICAL BRIDGE NODES
              </h2>
              <p className="text-xs text-gray-400 mb-4">Entities that connect disparate platforms or narratives, acting as information conduits.</p>
              
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 no-scrollbar">
                {data.bridges?.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 py-8">
                    <LinkIcon className="w-8 h-8 mb-2 opacity-30" />
                    <p className="text-sm">No strong bridge nodes detected in current graph topology.</p>
                  </div>
                ) : (
                  data.bridges?.map((bridge, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + (i * 0.05) }}
                      className="flex items-center justify-between p-3 rounded-xl bg-dark-900/50 border border-white/5 hover:border-brand-cyan/30 transition-all"
                    >
                      <div className="font-bold text-white text-sm truncate pr-4">{formatName(bridge.name)}</div>
                      <div className="shrink-0 px-3 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan text-xs font-bold border border-brand-cyan/20">
                        Score: {bridge.bridge_score}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Community Clusters Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-panel p-6 hover-glow flex flex-col lg:col-span-2"
            >
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                <Layers className="w-5 h-5 text-brand-emerald" /> 
                COMMUNITY CLUSTER DISTRIBUTION
              </h2>
              
              {data.communities?.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <Layers className="w-8 h-8 mb-2 opacity-30" />
                  <p className="text-sm">No community data available.</p>
                </div>
              ) : (
                <div className="flex-1 min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.communities} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                      <XAxis 
                        dataKey="community" 
                        stroke="#9ca3af" 
                        fontSize={11} 
                        tickLine={false} 
                        axisLine={false}
                      />
                      <YAxis 
                        stroke="#9ca3af" 
                        fontSize={11} 
                        tickLine={false} 
                        axisLine={false} 
                      />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                      <Bar dataKey="size" radius={[4, 4, 0, 0]} barSize={40}>
                        {data.communities.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </motion.div>

          </div>
        </>
      )}
    </motion.div>
  );
}

// Reusable Stat Card Component
function StatCard({ icon, label, value, sublabel, delay = 0 }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-panel p-5 hover-glow flex flex-col justify-between"
    >
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm text-gray-400 font-medium">{label}</span>
      </div>
      <div>
        <div className="text-3xl font-bold text-white">{value}</div>
        <div className="text-xs text-gray-500 mt-1">{sublabel}</div>
      </div>
    </motion.div>
  );
}