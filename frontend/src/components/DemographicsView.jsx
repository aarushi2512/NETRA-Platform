// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
// import { Users, Globe, Briefcase, Languages, ShieldCheck } from 'lucide-react';

// const API_URL = 'http://localhost:8000/api/v1';

// const COLORS = ['#00f0ff', '#a855f7', '#ec4899', '#3b82f6', '#eab308', '#10b981', '#ef4444'];

// export default function DemographicsView() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDemographics();
//   }, []);

//   const fetchDemographics = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_URL}/analytics/demographics?t=${Date.now()}`);
//       setData(res.data);
//     } catch (error) {
//       console.error("Error fetching demographics:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center p-4 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//         <div className="flex items-center gap-3">
//           <div className="p-2 rounded-full bg-purple-900/30 border border-purple-600">
//             <Users className="w-6 h-6 text-purple-400" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold tracking-wider text-white">
//               AUDIENCE DEMOGRAPHICS
//             </h1>
//             <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
//               <ShieldCheck className="w-4 h-4 text-green-500" />
//               Privacy-Safe Aggregated Inference • No PII Stored
//             </p>
//           </div>
//         </div>
//         <button 
//           onClick={fetchDemographics}
//           className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium"
//         >
//           Refresh Analysis
//         </button>
//       </div>

//       {loading ? (
//         <div className="text-center py-20 text-gray-400">Inferring audience demographics...</div>
//       ) : !data || data.total_analyzed === 0 ? (
//         <div className="text-center py-20 text-gray-400">No data available for demographic inference.</div>
//       ) : (
//         <>
//           {/* Top Stats */}
//           <div className="grid grid-cols-4 gap-4">
//             <div className="p-4 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//               <div className="text-sm text-gray-400 mb-1">Total Analyzed</div>
//               <div className="text-3xl font-bold text-white">{data.total_analyzed}</div>
//             </div>
//             <div className="p-4 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//               <div className="text-sm text-gray-400 mb-1">Active Regions</div>
//               <div className="text-3xl font-bold text-cyan-400">{data.regions.length}</div>
//             </div>
//             <div className="p-4 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//               <div className="text-sm text-gray-400 mb-1">Professional Sectors</div>
//               <div className="text-3xl font-bold text-purple-400">{data.professions.length}</div>
//             </div>
//             <div className="p-4 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//               <div className="text-sm text-gray-400 mb-1">Languages Detected</div>
//               <div className="text-3xl font-bold text-emerald-400">{data.languages.length}</div>
//             </div>
//           </div>

//           {/* Charts Grid */}
//           <div className="grid grid-cols-2 gap-6">
//             {/* Professional Interest */}
//             <div className="p-6 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//               <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#00f0ff' }}>
//                 <Briefcase className="w-5 h-5" /> PROFESSIONAL INTEREST (Inferred)
//               </h2>
//               <div style={{ width: '100%', height: 300 }}>
//                 <ResponsiveContainer>
//                   <BarChart data={data.professions} layout="vertical">
//                     <CartesianGrid strokeDasharray="3 3" stroke="#333" />
//                     <XAxis type="number" stroke="#888" />
//                     <YAxis dataKey="name" type="category" width={150} stroke="#888" style={{ fontSize: '12px' }} />
//                     <Tooltip contentStyle={{ backgroundColor: '#13131f', border: '1px solid #333' }} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
//                     <Bar dataKey="value" fill="#a855f7" radius={[0, 4, 4, 0]} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             {/* Geographic Region */}
//             <div className="p-6 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//               <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#00f0ff' }}>
//                 <Globe className="w-5 h-5" /> GEOGRAPHIC REGION (Inferred)
//               </h2>
//               <div style={{ width: '100%', height: 300 }}>
//                 <ResponsiveContainer>
//                   <PieChart>
//                     <Pie data={data.regions} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
//                       {data.regions.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
//                     </Pie>
//                     <Tooltip contentStyle={{ backgroundColor: '#13131f', border: '1px solid #333' }} />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             {/* Age Bracket */}
//             <div className="p-6 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//               <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#00f0ff' }}>
//                 <Users className="w-5 h-5" /> AGE BRACKET (Platform Heuristic)
//               </h2>
//               <div style={{ width: '100%', height: 300 }}>
//                 <ResponsiveContainer>
//                   <BarChart data={data.age_brackets}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#333" />
//                     <XAxis dataKey="name" stroke="#888" />
//                     <YAxis stroke="#888" />
//                     <Tooltip contentStyle={{ backgroundColor: '#13131f', border: '1px solid #333' }} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
//                     <Bar dataKey="value" fill="#ec4899" radius={[4, 4, 0, 0]} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             {/* Language */}
//             <div className="p-6 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//               <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#00f0ff' }}>
//                 <Languages className="w-5 h-5" /> LANGUAGE DISTRIBUTION
//               </h2>
//               <div style={{ width: '100%', height: 300 }}>
//                 <ResponsiveContainer>
//                   <PieChart>
//                     <Pie data={data.languages} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5}>
//                       {data.languages.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />)}
//                     </Pie>
//                     <Tooltip contentStyle={{ backgroundColor: '#13131f', border: '1px solid #333' }} />
//                     <Legend wrapperStyle={{ color: '#fff' }} />
//                   </PieChart>
//                 </ResponsiveContainer>
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
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend 
} from 'recharts';
import { Users, Globe, Briefcase, Languages, ShieldCheck, RefreshCw } from 'lucide-react';

// Using Vite proxy to avoid CORS issues
const API_URL = '/api/v1';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#eab308', '#10b981', '#f97316'];

export default function DemographicsView() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDemographics = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await axios.get(`${API_URL}/analytics/demographics?t=${Date.now()}`);
      setData(res.data);
      if (isManual) toast.success('Demographic analysis updated');
    } catch (error) {
      console.error("Error fetching demographics:", error);
      if (isManual) toast.error('Failed to fetch demographic data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDemographics();
  }, []);

  // Custom Tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-800 border border-dark-600 rounded-lg p-3 shadow-xl">
          <p className="text-sm font-semibold text-white mb-1">{label || payload[0].name}</p>
          <p className="text-sm text-brand-cyan">
            {payload[0].value} {payload[0].name === 'value' ? '' : ''}
          </p>
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
          <div className="p-3 rounded-xl bg-brand-purple/10 border border-brand-purple/20 shadow-glow-purple">
            <Users className="w-6 h-6 text-brand-purple" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gradient tracking-wide">
              AUDIENCE DEMOGRAPHICS
            </h1>
            <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-emerald" />
              Privacy-Safe Aggregated Inference • No PII Stored
            </p>
          </div>
        </div>
        
        <motion.button 
          onClick={() => fetchDemographics(true)}
          disabled={refreshing}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2.5 rounded-xl bg-dark-700/50 hover:bg-dark-600 text-white text-sm font-medium flex items-center gap-2 transition-all border border-white/10 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Analyzing...' : 'Refresh Analysis'}
        </motion.button>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 glass-panel min-h-[400px]">
          <RefreshCw className="w-10 h-10 mb-4 text-brand-purple animate-spin" />
          <p className="text-lg font-medium">Inferring audience demographics...</p>
        </div>
      ) : !data || data.total_analyzed === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 glass-panel min-h-[400px]">
          <Users className="w-12 h-12 mb-4 opacity-30" />
          <p className="text-lg font-medium">No data available for demographic inference.</p>
          <p className="text-sm text-gray-500 mt-1">Ensure the backend pipeline has processed sufficient posts.</p>
        </div>
      ) : (
        <>
          {/* Top Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Analyzed" value={data.total_analyzed} color="text-white" delay={0.1} />
            <StatCard label="Active Regions" value={data.regions?.length || 0} color="text-brand-cyan" delay={0.2} />
            <StatCard label="Professional Sectors" value={data.professions?.length || 0} color="text-brand-purple" delay={0.3} />
            <StatCard label="Languages Detected" value={data.languages?.length || 0} color="text-brand-emerald" delay={0.4} />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
            
            {/* Professional Interest */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-panel p-6 hover-glow flex flex-col"
            >
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                <Briefcase className="w-5 h-5 text-brand-purple" /> 
                PROFESSIONAL INTEREST (Inferred)
              </h2>
              <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.professions} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
                    <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                    <YAxis dataKey="name" type="category" width={120} stroke="#9ca3af" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                    <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Geographic Region */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-panel p-6 hover-glow flex flex-col"
            >
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                <Globe className="w-5 h-5 text-brand-cyan" /> 
                GEOGRAPHIC REGION (Inferred)
              </h2>
              <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={data.regions} 
                      dataKey="value" 
                      nameKey="name" 
                      cx="50%" 
                      cy="50%" 
                      outerRadius={90} 
                      innerRadius={40}
                      paddingAngle={5}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {data.regions.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Age Bracket */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="glass-panel p-6 hover-glow flex flex-col"
            >
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                <Users className="w-5 h-5 text-pink-500" /> 
                AGE BRACKET (Platform Heuristic)
              </h2>
              <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.age_brackets} margin={{ bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                    <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                    <Bar dataKey="value" fill="#ec4899" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Language Distribution */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="glass-panel p-6 hover-glow flex flex-col"
            >
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                <Languages className="w-5 h-5 text-brand-emerald" /> 
                LANGUAGE DISTRIBUTION
              </h2>
              <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={data.languages} 
                      dataKey="value" 
                      nameKey="name" 
                      cx="50%" 
                      cy="50%" 
                      innerRadius={60} 
                      outerRadius={90} 
                      paddingAngle={5}
                    >
                      {data.languages.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ color: '#9ca3af', fontSize: '12px', paddingTop: '20px' }} />
                  </PieChart>
                </ResponsiveContainer>
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