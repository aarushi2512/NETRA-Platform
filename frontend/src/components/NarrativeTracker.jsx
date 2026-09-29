// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
// import { Activity, AlertTriangle, TrendingUp, Clock } from 'lucide-react';

// const API_URL = 'http://localhost:8000/api/v1';

// // Pre-defined narratives to track (matches your database)
// const AVAILABLE_NARRATIVES = [
//   "Cyber Attack",
//   "AI Development and Regulation",
//   "Defence and Security",
//   "South China Sea Tensions",
//   "Financial Technology",
//   "Startup Ecosystem"
// ];

// const SENTIMENT_COLORS = {
//   POSITIVE: '#10b981',
//   NEGATIVE: '#ef4444',
//   NEUTRAL: '#f59e0b',
//   ABSTAIN: '#6b7280'
// };

// export default function NarrativeTracker() {
//   const [selectedNarrative, setSelectedNarrative] = useState("Cyber Attack");
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchMutationData(selectedNarrative);
//   }, [selectedNarrative]);

//   const fetchMutationData = async (narrative) => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_URL}/analytics/mutation?narrative=${encodeURIComponent(narrative)}`);
//       setData(res.data);
//     } catch (error) {
//       console.error("Error fetching mutation data:", error);
//       setData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header & Selector */}
//       <div className="flex justify-between items-center p-4 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//         <div>
//           <h1 className="text-2xl font-bold tracking-wider" style={{ color: '#00f0ff' }}>
//             NARRATIVE MUTATION TRACKER
//           </h1>
//           <p className="text-sm text-gray-400 mt-1">Track how intelligence narratives evolve over time</p>
//         </div>
//         <select 
//           value={selectedNarrative}
//           onChange={(e) => setSelectedNarrative(e.target.value)}
//           className="px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-cyan-500"
//         >
//           {AVAILABLE_NARRATIVES.map(n => <option key={n} value={n}>{n}</option>)}
//         </select>
//       </div>

//       {loading ? (
//         <div className="text-center py-20 text-gray-400">Analyzing narrative evolution...</div>
//       ) : !data ? (
//         <div className="text-center py-20 text-gray-400">No mutation data available.</div>
//       ) : (
//         <>
//           {/* Stats Row */}
//           <div className="grid grid-cols-3 gap-4">
//             <div className="p-4 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//               <div className="text-sm text-gray-400 mb-1">Total Observations</div>
//               <div className="text-3xl font-bold text-white">{data.total_observations}</div>
//             </div>
//             <div className="p-4 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//               <div className="text-sm text-gray-400 mb-1">Mutation Events</div>
//               <div className="text-3xl font-bold text-cyan-400">{data.mutations.length}</div>
//             </div>
//             <div className="p-4 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//               <div className="text-sm text-gray-400 mb-1">Current Sentiment</div>
//               <div className="text-3xl font-bold" style={{ color: SENTIMENT_COLORS[data.timeline[data.timeline.length-1]?.sentiment] || '#fff' }}>
//                 {data.timeline[data.timeline.length-1]?.sentiment || 'N/A'}
//               </div>
//             </div>
//           </div>

//           {/* Timeline Chart */}
//           <div className="p-6 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//             <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#00f0ff' }}>
//               <Activity className="w-5 h-5" />
//               ACTIVITY TIMELINE
//             </h2>
//             <div style={{ width: '100%', height: 250 }}>
//               <ResponsiveContainer>
//                 <AreaChart data={data.timeline}>
//                   <defs>
//                     <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.8}/>
//                       <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#333" />
//                   <XAxis dataKey="phase" stroke="#888" />
//                   <YAxis stroke="#888" />
//                   <Tooltip 
//                     contentStyle={{ backgroundColor: '#13131f', border: '1px solid #333' }}
//                     itemStyle={{ color: '#00f0ff' }}
//                   />
//                   <Area type="monotone" dataKey="volume" stroke="#00f0ff" fillOpacity={1} fill="url(#colorVolume)" />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Mutation Cards */}
//           <div className="grid grid-cols-2 gap-6">
//             <div className="p-6 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//               <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#00f0ff' }}>
//                 <TrendingUp className="w-5 h-5" />
//                 NARRATIVE EVOLUTION
//               </h2>
//               <div className="space-y-4">
//                 {data.mutations.length === 0 ? (
//                   <p className="text-gray-400 text-sm">No significant mutations detected.</p>
//                 ) : (
//                   data.mutations.map((m, i) => (
//                     <div key={i} className="p-4 rounded border-l-4" style={{ backgroundColor: '#0a0a0f', borderColor: '#00f0ff' }}>
//                       <div className="flex justify-between items-start mb-2">
//                         <span className="text-xs font-bold text-cyan-400 uppercase">{m.phase}</span>
//                         <span className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {m.time}</span>
//                       </div>
//                       <div className="flex flex-wrap gap-2 mt-2">
//                         {m.new_elements.map((el, j) => (
//                           <span key={j} className="px-2 py-1 rounded text-xs font-medium bg-gray-800 text-white border border-gray-700">
//                             + {el}
//                           </span>
//                         ))}
//                       </div>
//                       <div className="mt-3 text-xs text-gray-400">
//                         Sentiment shifted to: <span className="font-bold" style={{ color: SENTIMENT_COLORS[m.sentiment_shift] || '#fff' }}>{m.sentiment_shift}</span>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>

//             {/* Summary / Insight Panel */}
//             <div className="p-6 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//               <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#00f0ff' }}>
//                 <AlertTriangle className="w-5 h-5" />
//                 INTELLIGENCE SUMMARY
//               </h2>
//               <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
//                 <p>
//                   The <span className="text-cyan-400 font-bold">{data.narrative}</span> narrative has been tracked across {data.total_observations} observations.
//                 </p>
//                 <p>
//                   <strong className="text-white">Key Finding:</strong> The narrative has mutated {data.mutations.length} times, introducing new entities and shifting sentiment from 
//                   <span className="text-gray-400"> {data.timeline[0]?.sentiment || 'Neutral'}</span> to 
//                   <span className="font-bold" style={{ color: SENTIMENT_COLORS[data.timeline[data.timeline.length-1]?.sentiment] }}> {data.timeline[data.timeline.length-1]?.sentiment}</span>.
//                 </p>
//                 <p>
//                   <strong className="text-white">Recommendation:</strong> Monitor the newly introduced entities for potential escalation.
//                 </p>
//               </div>
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
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Activity, AlertTriangle, TrendingUp, Clock, ChevronDown } from 'lucide-react';

// Using Vite proxy to avoid CORS issues
const API_URL = '/api/v1';

// Pre-defined narratives to track (matches your database)
const AVAILABLE_NARRATIVES = [
  "Cyber Attack",
  "AI Development and Regulation",
  "Defence and Security",
  "South China Sea Tensions",
  "Financial Technology",
  "Startup Ecosystem"
];

const SENTIMENT_COLORS = {
  POSITIVE: '#10b981', // brand-emerald
  NEGATIVE: '#ef4444', // red-500
  NEUTRAL: '#f59e0b',  // amber-500
  ABSTAIN: '#6b7280'   // gray-500
};

export default function NarrativeTracker() {
  const [selectedNarrative, setSelectedNarrative] = useState("Cyber Attack");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMutationData(selectedNarrative);
  }, [selectedNarrative]);

  const fetchMutationData = async (narrative) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/analytics/mutation?narrative=${encodeURIComponent(narrative)}`);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching mutation data:", error);
      toast.error('Failed to fetch mutation data');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  // Custom Tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-800 border border-dark-600 rounded-lg p-3 shadow-xl">
          <p className="text-sm font-semibold text-white mb-1">Phase: {label}</p>
          <p className="text-sm text-brand-cyan">Volume: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  const currentSentiment = data?.timeline[data.timeline.length - 1]?.sentiment || 'ABSTAIN';
  const initialSentiment = data?.timeline[0]?.sentiment || 'ABSTAIN';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 h-full flex flex-col"
    >
      {/* Header & Selector */}
      <div className="glass-panel p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gradient tracking-wide">
            NARRATIVE MUTATION TRACKER
          </h1>
          <p className="text-sm text-gray-400 mt-1">Track how intelligence narratives evolve and shift over time</p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <select 
            value={selectedNarrative}
            onChange={(e) => setSelectedNarrative(e.target.value)}
            className="input-modern appearance-none pr-10 cursor-pointer"
          >
            {AVAILABLE_NARRATIVES.map(n => (
              <option key={n} value={n} className="bg-dark-800 text-white">{n}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 glass-panel min-h-[400px]">
          <Activity className="w-10 h-10 mb-4 text-brand-cyan animate-pulse" />
          <p className="text-lg font-medium">Analyzing narrative evolution...</p>
        </div>
      ) : !data ? (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 glass-panel min-h-[400px]">
          <AlertTriangle className="w-12 h-12 mb-4 opacity-30" />
          <p className="text-lg font-medium">No mutation data available.</p>
          <p className="text-sm text-gray-500 mt-1">Try selecting a different narrative or ensure the backend is seeded.</p>
        </div>
      ) : (
        <>
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard label="Total Observations" value={data.total_observations} color="text-white" delay={0.1} />
            <StatCard label="Mutation Events" value={data.mutations.length} color="text-brand-cyan" delay={0.2} />
            <StatCard 
              label="Current Sentiment" 
              value={currentSentiment} 
              color={SENTIMENT_COLORS[currentSentiment]} 
              delay={0.3} 
            />
          </div>

          {/* Timeline Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-panel p-6 hover-glow flex flex-col"
          >
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
              <Activity className="w-5 h-5 text-brand-cyan" />
              ACTIVITY TIMELINE
            </h2>
            <div className="flex-1 min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.timeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                  <XAxis dataKey="phase" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="volume" 
                    stroke="#06b6d4" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorVolume)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Mutation Cards & Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
            
            {/* Narrative Evolution */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-panel p-6 hover-glow flex flex-col"
            >
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                <TrendingUp className="w-5 h-5 text-brand-purple" />
                NARRATIVE EVOLUTION
              </h2>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 no-scrollbar">
                {data.mutations.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-8">No significant mutations detected.</p>
                ) : (
                  data.mutations.map((m, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + (i * 0.1) }}
                      className="p-4 rounded-xl bg-dark-900/50 border border-l-4 border-l-brand-cyan border-white/5 hover:bg-dark-800/50 transition-all"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-bold text-brand-cyan uppercase tracking-wider bg-brand-cyan/10 px-2 py-1 rounded">
                          {m.phase}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {m.time}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {m.new_elements.map((el, j) => (
                          <span key={j} className="px-2.5 py-1 rounded-md text-xs font-medium bg-dark-700 text-gray-200 border border-white/10">
                            + {el}
                          </span>
                        ))}
                      </div>
                      
                      <div className="text-xs text-gray-400 pt-3 border-t border-white/5">
                        Sentiment shifted to: <span className="font-bold" style={{ color: SENTIMENT_COLORS[m.sentiment_shift] || '#fff' }}>{m.sentiment_shift}</span>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Intelligence Summary Panel */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-panel p-6 hover-glow flex flex-col"
            >
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                <AlertTriangle className="w-5 h-5 text-brand-emerald" />
                INTELLIGENCE SUMMARY
              </h2>
              <div className="flex-1 space-y-6 text-sm text-gray-300 leading-relaxed">
                <div className="p-4 rounded-xl bg-dark-900/50 border border-white/5">
                  <p>
                    The <span className="text-brand-cyan font-bold">{data.narrative}</span> narrative has been tracked across <span className="text-white font-semibold">{data.total_observations}</span> observations.
                  </p>
                </div>
                
                <div className="p-4 rounded-xl bg-dark-900/50 border border-white/5">
                  <p className="mb-2">
                    <strong className="text-white block mb-1">Key Finding:</strong> 
                    The narrative has mutated <span className="text-brand-purple font-semibold">{data.mutations.length}</span> times, introducing new entities and shifting sentiment from 
                    <span className="text-gray-400 font-medium"> {initialSentiment}</span> to 
                    <span className="font-bold" style={{ color: SENTIMENT_COLORS[currentSentiment] }}> {currentSentiment}</span>.
                  </p>
                </div>
                
                <div className="p-4 rounded-xl bg-brand-emerald/5 border border-brand-emerald/20">
                  <p>
                    <strong className="text-brand-emerald block mb-1">Recommendation:</strong> 
                    Monitor the newly introduced entities for potential escalation or coordinated amplification.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </>
      )}
    </motion.div>
  );
}

// Reusable Stat Card Component
function StatCard({ label, value, color, delay = 0 }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-panel p-5 hover-glow flex flex-col justify-between"
    >
      <span className="text-sm text-gray-400 font-medium mb-2">{label}</span>
      <span className={`text-3xl font-bold ${color}`}>{value}</span>
    </motion.div>
  );
}