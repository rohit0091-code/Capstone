import React, { useState, useMemo } from 'react';
import { FileText, Download, TrendingUp, Calendar, Filter, PieChart, ChevronDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import RevenueForecast from './Revenueforecast';

const Reports = () => {
 
  const [transactions] = useState([
    { date: '2026-04-01', revenue: 1200 }, { date: '2026-04-05', revenue: 2100 },
    { date: '2026-04-10', revenue: 800 }, { date: '2026-04-15', revenue: 4500 },
    { date: '2026-04-20', revenue: 3200 }, { date: '2026-04-25', revenue: 5100 },
  ]);

  const [dateFilter, setDateFilter] = useState("Last 30 Days");

  
  const totals = useMemo(() => {
    const revenue = transactions.reduce((sum, t) => sum + t.revenue, 0);
    const avgOrder = revenue / (transactions.length || 1);
    return { revenue, avgOrder };
  }, [transactions]);

  
  const forecastData = [
    ...transactions,
    { date: '2026-05-01', revenue: 5800, isForecast: true },
    { date: '2026-05-05', revenue: 6200, isForecast: true },
  ];

 
  const downloadCSV = () => {
    const headers = "Date,Revenue\n";
    const rows = transactions.map(t => `${t.date},${t.revenue}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `Report_${dateFilter.replace(/ /g, '_')}.csv`);
    a.click();
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
     
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Report</h1>
          <p className="text-gray-500">Real-time revenue tracking and forecasting.</p>
        </div>
        <div className="flex gap-3">
          <select 
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-medium shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </select>
          <button 
            onClick={downloadCSV}
            className="flex items-center gap-2 bg-blue-500 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-600 transition shadow-lg shadow-blue-200"
          >
            <Download size={18} /> Export CSV
          </button>
        </div>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg"><TrendingUp size={20}/></div>
            <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-md">+12.5%</span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Total Revenue ({dateFilter})</h3>
          <p className="text-3xl font-bold text-gray-900 mt-1">${totals.revenue.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><PieChart size={20}/></div>
            <span className="text-blue-600 text-xs font-bold bg-blue-50 px-2 py-1 rounded-md">Stable</span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Avg. Transaction Value</h3>
          <p className="text-3xl font-bold text-gray-900 mt-1">${totals.avgOrder.toFixed(2)}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Calendar size={20}/></div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Projected End of Month</h3>
          <p className="text-3xl font-bold text-gray-900 mt-1">$24,500</p>
        </div>
      </div>

    
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-8 w-full">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Revenue Forecast</h2>
            <p className="text-sm text-gray-400">Actual vs Predicted Growth</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-500 rounded-full"></span> Actual</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-300 rounded-full"></span> Forecast</div>
          </div>
          
        </div>
        
        <div className="h-[87.5%] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorRev)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;