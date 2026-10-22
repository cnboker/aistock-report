import React from 'react';
import { 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  AlertCircle, 
  PieChart, 
  Layers, 
  SlidersHorizontal,
  FileSpreadsheet
} from 'lucide-react';
import { LATEST_STOCK_PICKS } from '../data/logData';

export const PicksInspectorTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Overview Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-bold">
              截面时间戳: 2026-10-22 15:00:00 (收盘后全自动化落盘)
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              融合权重: λ=0.40 (Lambda) / ρ=0.60 (Research)
            </span>
          </div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            实战截面选股穿透：最终入选 Top-9 标的深度画像
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            截面全量池 46 只，极端异常剔除 0 只，满足 5 日绝对动量约束（mom &gt; 0）仅 <strong>9 只</strong>（故 Top-10 最终仅成仓 9 只）
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-400">落盘文件: </span>
            <span className="text-cyan-300">picks_cross_section_20261022.csv</span>
          </div>
        </div>
      </div>

      {/* Critical Portfolio Risk Notice: Sector Concentration */}
      <div className="bg-amber-950/30 border border-amber-900/50 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 space-y-1">
          <div className="font-bold text-amber-200">
            实盘风控警报：极高行业集中度（半导体封测同质化敞口达 33.3%）
          </div>
          <p className="leading-relaxed">
            观察最终选出的 9 只股票，半导体封测龙头占了 <strong>3 只 (华天科技 sz002185、长电科技 sh600584、通富微电 sz002156)</strong>！此外还包含算力硬件（工业富联）与光通信（亨通光电）。<br/>
            这表明策略在缺乏 <strong>Barra 行业中性化权重约束器</strong> 的情况下，由于近期科技硬件板块动量较强，模型自发过度集中押注在单一赛道，一旦行业发生风格杀跌，组合将承受剧烈的回撤共振。
          </p>
        </div>
      </div>

      {/* Picks Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="py-2.5 px-3">排位</th>
                <th className="py-2.5 px-3">代码</th>
                <th className="py-2.5 px-3">名称</th>
                <th className="py-2.5 px-3">细分赛道</th>
                <th className="py-2.5 px-3">融合总得分</th>
                <th className="py-2.5 px-3">5日动量值</th>
                <th className="py-2.5 px-3">选拔逻辑与动量门禁</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {LATEST_STOCK_PICKS.map((stock) => (
                <tr key={stock.rank} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      stock.rank <= 3 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      No.{stock.rank}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-cyan-300 font-bold">
                    {stock.ticker}
                  </td>
                  <td className="py-3 px-3 text-white font-sans font-semibold">
                    {stock.name}
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-sans">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      stock.sector.includes('半导体') 
                        ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                        : stock.sector.includes('通信')
                        ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {stock.sector}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-emerald-400 font-bold text-sm">
                    {stock.score.toFixed(4)}
                  </td>
                  <td className="py-3 px-3 text-cyan-400 font-bold">
                    +{(stock.momentum * 100).toFixed(2)}%
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-sans text-[11px]">
                    {stock.reason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Diagnostics on why mom_ok=9 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
          <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
            动量门禁过滤机制 (Momentum Gates)
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed space-y-1.5">
            日志中 <code className="text-indigo-300 font-mono text-[11px]">[AbsMom] require finite ret &gt; 0.0000</code> 是绝对门禁：
          </p>
          <div className="mt-3 bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs space-y-1">
            <div className="flex justify-between text-emerald-400">
              <span>通过绝对动量 (&gt;0):</span>
              <span>9 只 (19.6%)</span>
            </div>
            <div className="flex justify-between text-rose-400">
              <span>未通过动量 (&lt;=0):</span>
              <span>37 只 (80.4%)</span>
            </div>
            <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-800">
              <span>总截面股票数:</span>
              <span>46 只</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
          <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-cyan-400" />
            行业集中度与风格暴露
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span>半导体与电子硬件</span>
              <span className="font-mono font-bold text-indigo-400">44.4% (4只)</span>
            </div>
            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full w-[44.4%]" />
            </div>

            <div className="flex items-center justify-between text-slate-300 pt-1">
              <span>通信与物联网设备</span>
              <span className="font-mono font-bold text-cyan-400">22.2% (2只)</span>
            </div>
            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
              <div className="bg-cyan-500 h-full w-[22.2%]" />
            </div>

            <div className="flex items-center justify-between text-slate-300 pt-1">
              <span>传统机械装备与金融IT</span>
              <span className="font-mono font-bold text-emerald-400">33.3% (3只)</span>
            </div>
            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[33.3%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
