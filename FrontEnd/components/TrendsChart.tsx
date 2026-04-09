"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { name: 'Lun', fugas: 400, inversion: 150 },
  { name: 'Mar', fugas: 300, inversion: 200 },
  { name: 'Mie', fugas: 450, inversion: 250 },
  { name: 'Jue', fugas: 200, inversion: 300 },
  { name: 'Vie', fugas: 150, inversion: 350 },
  { name: 'Sab', fugas: 500, inversion: 400 },
  { name: 'Dom', fugas: 100, inversion: 500 },
];

export function TrendsChart() {
  return (
    <div className="bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-5 mb-6 border border-slate-700/50 shadow-2xl relative overflow-hidden">
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>

      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-slate-200 font-semibold text-sm uppercase tracking-wider">Tendencias</h3>
        <span className="text-[10px] uppercase tracking-wider font-bold bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full border border-slate-600/50 backdrop-blur-md">Esta semana</span>
      </div>
      
      <div className="h-[220px] w-full -ml-4 relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(51, 65, 85, 0.4)" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#94a3b8" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dy={10}
              tick={{ fill: '#94a3b8', fontWeight: 500 }}
            />
            <YAxis 
              stroke="#94a3b8" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
              tick={{ fill: '#94a3b8', fontWeight: 500 }}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(51, 65, 85, 0.5)', borderRadius: '12px', backdropFilter: 'blur(8px)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
              itemStyle={{ fontSize: '14px', fontWeight: 'bold' }}
              labelStyle={{ color: '#94a3b8', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}
            />
            <Line 
              type="monotone" 
              dataKey="fugas" 
              name="Fugas"
              stroke="#a855f7" 
              strokeWidth={3.5}
              dot={false}
              activeDot={{ r: 6, fill: '#a855f7', stroke: '#0f172a', strokeWidth: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="inversion" 
              name="Inversión"
              stroke="#10b981" 
              strokeWidth={3.5}
              dot={false}
              activeDot={{ r: 6, fill: '#10b981', stroke: '#0f172a', strokeWidth: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-center gap-6 mt-4 relative z-10">
        <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>
          <span className="text-xs font-semibold text-slate-300">Fugas</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
          <span className="text-xs font-semibold text-slate-300">Inversión</span>
        </div>
      </div>
    </div>
  );
}
