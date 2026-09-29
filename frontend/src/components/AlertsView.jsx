// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { AlertTriangle, TrendingUp, Globe, Bell, BellOff, RefreshCw } from 'lucide-react';

// const API_URL = 'http://localhost:8000/api/v1';

// const SEVERITY_STYLES = {
//   CRITICAL: { bg: 'bg-red-900/20', border: 'border-red-600', text: 'text-red-400', icon: <AlertTriangle className="w-5 h-5 text-red-500" /> },
//   WARNING: { bg: 'bg-orange-900/20', border: 'border-orange-600', text: 'text-orange-400', icon: <TrendingUp className="w-5 h-5 text-orange-500" /> },
//   INFO: { bg: 'bg-blue-900/20', border: 'border-blue-600', text: 'text-blue-400', icon: <Globe className="w-5 h-5 text-blue-500" /> }
// };

// const TYPE_ICONS = {
//   ACCELERATION: <TrendingUp className="w-6 h-6" />,
//   SENTIMENT: <AlertTriangle className="w-6 h-6" />,
//   ENTITY: <Globe className="w-6 h-6" />
// };

// export default function AlertsView() {
//   const [alerts, setAlerts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false); // State for button spinner

//   const fetchAlerts = async (isManualRefresh = false) => {
//     if (isManualRefresh) {
//       setRefreshing(true);
//     } else {
//       setLoading(true);
//     }

//     try {
//       // Added ?t=... to prevent browser caching so you see fresh data every time
//       const res = await axios.get(`${API_URL}/analytics/alerts?t=${Date.now()}`);
//       setAlerts(res.data.alerts || []);
//     } catch (error) {
//       console.error("Error fetching alerts:", error);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchAlerts();
//     // Auto-refresh every 30 seconds
//     const interval = setInterval(() => fetchAlerts(true), 30000);
//     return () => clearInterval(interval);
//   }, []);

//   const formatTime = (timestamp) => {
//     if (!timestamp) return 'Unknown';
//     const date = new Date(timestamp);
//     const now = new Date();
//     const diffMins = Math.floor((now - date) / 60000);
//     if (diffMins < 1) return 'Just now';
//     if (diffMins < 60) return `${diffMins}m ago`;
//     return date.toLocaleTimeString();
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center p-4 rounded-lg border border-gray-800" style={{ backgroundColor: '#13131f' }}>
//         <div className="flex items-center gap-3">
//           <div className="p-2 rounded-full bg-red-900/30 border border-red-600">
//             <Bell className="w-6 h-6 text-red-500 animate-pulse" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold tracking-wider text-white">
//               INTELLIGENCE ALERTS
//             </h1>
//             <p className="text-sm text-gray-400 mt-1">
//               {alerts.length} active notifications • Auto-refreshing
//             </p>
//           </div>
//         </div>
        
//         {/* FIXED REFRESH BUTTON */}
//         <button 
//           onClick={() => fetchAlerts(true)}
//           disabled={refreshing}
//           className={`px-4 py-2 rounded text-white text-sm font-medium flex items-center gap-2 transition-all ${
//             refreshing ? 'bg-gray-600 cursor-wait' : 'bg-gray-700 hover:bg-gray-600'
//           }`}
//         >
//           <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} /> 
//           {refreshing ? 'Scanning...' : 'Refresh'}
//         </button>
//       </div>

//       {loading ? (
//         <div className="text-center py-20 text-gray-400">Scanning intelligence feeds...</div>
//       ) : alerts.length === 0 ? (
//         <div className="text-center py-20 text-gray-400 flex flex-col items-center">
//           <BellOff className="w-12 h-12 mb-4 opacity-50" />
//           <p>No active alerts at this time.</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {alerts.map((alert) => {
//             const style = SEVERITY_STYLES[alert.severity] || SEVERITY_STYLES.INFO;
//             return (
//               <div 
//                 key={alert.id} 
//                 className={`p-5 rounded-lg border-l-4 transition-all hover:scale-[1.01] ${style.bg} ${style.border}`}
//                 style={{ backgroundColor: '#13131f' }}
//               >
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-start gap-4">
//                     <div className={`p-3 rounded-lg ${style.bg} ${style.text}`}>
//                       {TYPE_ICONS[alert.type] || <AlertTriangle />}
//                     </div>
//                     <div>
//                       <div className="flex items-center gap-3 mb-1">
//                         <h3 className="text-lg font-bold text-white">{alert.title}</h3>
//                         <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${style.bg} ${style.text} border ${style.border}`}>
//                           {alert.severity}
//                         </span>
//                       </div>
//                       <p className="text-gray-300 text-sm leading-relaxed max-w-3xl">
//                         {alert.description}
//                       </p>
//                       <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
//                         <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
//                         Detected {formatTime(alert.timestamp)}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';
import { AlertTriangle, TrendingUp, Globe, Bell, BellOff, RefreshCw, Clock } from 'lucide-react';

// Using Vite proxy to avoid CORS issues
const API_URL = '/api/v1';

const SEVERITY_STYLES = {
  CRITICAL: { 
    bg: 'bg-red-500/10', 
    border: 'border-red-500/20', 
    borderL: 'border-l-red-500',
    text: 'text-red-400', 
    iconBg: 'bg-red-500/10',
    icon: <AlertTriangle className="w-5 h-5 text-red-400" /> 
  },
  WARNING: { 
    bg: 'bg-orange-500/10', 
    border: 'border-orange-500/20', 
    borderL: 'border-l-orange-500',
    text: 'text-orange-400', 
    iconBg: 'bg-orange-500/10',
    icon: <TrendingUp className="w-5 h-5 text-orange-400" /> 
  },
  INFO: { 
    bg: 'bg-brand-blue/10', 
    border: 'border-brand-blue/20', 
    borderL: 'border-l-brand-blue',
    text: 'text-brand-blue', 
    iconBg: 'bg-brand-blue/10',
    icon: <Globe className="w-5 h-5 text-brand-blue" /> 
  }
};

const TYPE_ICONS = {
  ACCELERATION: <TrendingUp className="w-6 h-6" />,
  SENTIMENT: <AlertTriangle className="w-6 h-6" />,
  ENTITY: <Globe className="w-6 h-6" />,
  DEFAULT: <Bell className="w-6 h-6" />
};

export default function AlertsView() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAlerts = async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      // Cache-busting to ensure fresh data
      const res = await axios.get(`${API_URL}/analytics/alerts?t=${Date.now()}`);
      setAlerts(res.data.alerts || []);
      if (isManualRefresh) {
        toast.success('Intelligence feeds updated');
      }
    } catch (error) {
      console.error("Error fetching alerts:", error);
      if (isManualRefresh) {
        toast.error('Failed to fetch alerts');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => fetchAlerts(true), 30000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Unknown';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMins = Math.floor((now - date) / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 shadow-glow-blue">
            <Bell className="w-6 h-6 text-red-400 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gradient tracking-wide">
              INTELLIGENCE ALERTS
            </h1>
            <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse"></span>
              {alerts.length} active notifications • Auto-refreshing every 30s
            </p>
          </div>
        </div>
        
        <motion.button 
          onClick={() => fetchAlerts(true)}
          disabled={refreshing}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all border ${
            refreshing 
              ? 'bg-dark-700/50 text-gray-400 border-dark-600 cursor-wait' 
              : 'bg-dark-700/50 text-white border-white/10 hover:bg-dark-600 hover:border-white/20'
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} /> 
          {refreshing ? 'Scanning...' : 'Refresh Now'}
        </motion.button>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 glass-panel min-h-[400px]">
          <RefreshCw className="w-10 h-10 mb-4 text-brand-cyan animate-spin" />
          <p className="text-lg font-medium">Scanning intelligence feeds...</p>
        </div>
      ) : alerts.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col items-center justify-center text-gray-400 glass-panel min-h-[400px]"
        >
          <div className="p-4 rounded-full bg-dark-800 border border-white/5 mb-4">
            <BellOff className="w-12 h-12 opacity-50" />
          </div>
          <p className="text-lg font-medium text-white">No active alerts at this time</p>
          <p className="text-sm text-gray-500 mt-1">The system is monitoring, but no thresholds have been breached.</p>
        </motion.div>
      ) : (
        <div className="space-y-4 flex-1 overflow-y-auto no-scrollbar pb-4">
          <AnimatePresence mode="popLayout">
            {alerts.map((alert, index) => {
              const style = SEVERITY_STYLES[alert.severity] || SEVERITY_STYLES.INFO;
              return (
                <motion.div 
                  key={alert.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`glass-panel p-5 border-l-4 ${style.borderL} hover:bg-dark-800/80 transition-all duration-300 group`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${style.iconBg} ${style.text} shrink-0 group-hover:scale-110 transition-transform`}>
                      {TYPE_ICONS[alert.type] || TYPE_ICONS.DEFAULT}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="text-lg font-bold text-white truncate">{alert.title}</h3>
                        <span className={`shrink-0 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${style.bg} ${style.text} ${style.border}`}>
                          {alert.severity}
                        </span>
                      </div>
                      
                      <p className="text-gray-300 text-sm leading-relaxed mb-3">
                        {alert.description}
                      </p>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Detected {formatTime(alert.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}