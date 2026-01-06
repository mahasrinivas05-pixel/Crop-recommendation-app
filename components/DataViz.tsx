
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { CROP_DATA_SAMPLES } from '../constants';

const DataViz: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 md:p-8">
      <h2 className="text-xl font-semibold text-stone-800 mb-6 flex items-center gap-2">
        <i className="fas fa-chart-bar text-emerald-600"></i>
        Comparative Crop Requirements
      </h2>
      
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={CROP_DATA_SAMPLES}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" orientation="left" stroke="#10b981" axisLine={false} tickLine={false} label={{ value: 'Temp (°C)', angle: -90, position: 'insideLeft', style: { fill: '#10b981' } }} />
            <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" axisLine={false} tickLine={false} label={{ value: 'Rain (mm)', angle: 90, position: 'insideRight', style: { fill: '#3b82f6' } }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="top" height={36} />
            <Bar yAxisId="left" dataKey="maxTemp" name="Max Temp" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="maxRain" name="Max Rainfall" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 text-xs text-stone-400 italic">
        *Data based on standard global agricultural benchmarks.
      </p>
    </div>
  );
};

export default DataViz;
