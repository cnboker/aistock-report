import React from 'react';
import { 
  Activity, 
  AlertTriangle, 
  Award, 
  CheckCircle2, 
  Clock, 
  FileDown, 
  Layers, 
  TrendingDown, 
  TrendingUp,
  Cpu,
  Share2
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onExportReport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onExportReport }) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      {/* Top Banner with Alert Notice */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-rose-950/60 border-b border-amber-900/40 px-4 py-1.5 text-xs text-amber-200/90 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-mono">
          <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="font-semibold text-amber-300">系统审计预警：</span>
          <span>
            流水线虽然通过内部生产门禁 (Health: 100/100)，但在独立 Hold-out 盲测出现超额收益衰减 (均值 -1.18%, 最大回撤 -18.45%)，触发真实防过拟合门禁。
          </span>
        </div>
        <div className="flex items-center gap-3 text-slate-400 font-mono">
          <span>审计时间戳: 2026-10-22 15:00</span>
          <span className="text-emerald-400 font-semibold">11/11 阶段通过 (179.8s)</span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/10 border border-indigo-500/30 text-indigo-400 shadow-inner">
            <Cpu className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                量化投研系统全景诊断与评估引擎
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                v5.0-DUAL-ALPHA
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              基于 <code className="text-slate-300 font-mono">/public/assets/aistudio/logs_723b300c.txt</code> 4,728行流水线全日志深度反编译诊断
            </p>
          </div>
        </div>

        {/* Quick Badges & Actions */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">国内梯队:</span>
            <span className="font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
              第 3 梯队 (精品私募/成熟团队原型)
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">系统阶段:</span>
            <span className="font-semibold text-cyan-400">工业化原型验证期</span>
          </div>

          <button
            onClick={onExportReport}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>导出审计报告</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto border-t border-slate-900 space-x-1 scrollbar-none">
        {[
          { id: 'summary', label: '全景评估与梯队定位' },
          { id: 'pitch', label: '★ 项目投资推荐书 (Pitch Memo)' },
          { id: 'pipeline', label: '流水线与双Alpha架构' },
          { id: 'diagnostics', label: '深度病灶与稳定性归因' },
          { id: 'picks', label: '选股截面与实盘穿透' },
          { id: 'roadmap', label: '具体优化与改造方案' },
          { id: 'rawlog', label: '原始日志交互检索' }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2.5 px-3.5 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
