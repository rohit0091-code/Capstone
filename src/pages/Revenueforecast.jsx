import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const RevenueForecast = () => {
 
  const actualData = [
    { name: 'Week 1', revenue: 4000, type: 'actual' },
    { name: 'Week 2', revenue: 4500, type: 'actual' },
    { name: 'Week 3', revenue: 5100, type: 'actual' },
    { name: 'Week 4', revenue: 6000, type: 'actual' }, // Current Week
  ];

  
  const forecastData = [
    ...actualData,
    { name: 'Week 5', revenue: 6800, type: 'forecast' },
    { name: 'Week 6', revenue: 7400, type: 'forecast' },
    { name: 'Week 7', revenue: 8100, type: 'forecast' },
  ];

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Revenue Forecast</h2>
        <p className="text-sm text-gray-500">Projected growth for the next 3 weeks</p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={forecastData}>
            <defs>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
            
            <Tooltip 
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}
              cursor={{ stroke: '#3b82f6', strokeWidth: 2 }}
            />

    
            <ReferenceLine x="Week 4" stroke="#9CA3AF" strokeDasharray="3 3" label={{ position: 'top', value: 'Today', fill: '#9CA3AF', fontSize: 12 }} />

            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#3b82f6" 
              strokeWidth={4} 
              fillOpacity={1} 
              fill="url(#colorActual)" 
            
              strokeDasharray={(props) => (props.payload.type === 'forecast' ? "5 5" : "0")}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex items-center justify-between p-4 bg-blue-50 rounded-2xl">
        <div>
          <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider">Estimated Revenue</p>
          <p className="text-2xl font-black text-blue-900">$22,300.00</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider">Confidence</p>
          <p className="text-lg font-bold text-blue-900">88%</p>
        </div>
      </div>
    </div>
  );
};

export default RevenueForecast;