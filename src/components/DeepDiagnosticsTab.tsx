import React, { useState } from 'react';
import { 
  AlertTriangle, 
  XOctagon, 
  TrendingDown, 
  Database, 
  HelpCircle, 
  BarChart, 
  Activity,
  FileWarning,
  Bug,
  Filter
} from 'lucide-react';
import { TOP_INVESTIGATED_GENES, ROOT_CAUSE_STATS } from '../data/logData';

export const DeepDiagnosticsTab: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredGenes = TOP_INVESTIGATED_GENES.filter(gene => {
    if (filterStatus === 'ALL') return true;
    return gene.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      {/* Alert Banner for Hold-out Crash */}
      <div className="bg-gradient-to-r from-rose-950/70 via-slate-900 to-amber-950/50 border border-rose-800/50 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <XOctagon className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h3 className="text-base font-bold text-rose-200">
              首要致命病灶：Selection 样本内过度挑选与 Hold-out 独立盲测断崖式崩塌
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              系统在 <strong>Selection (选择集)</strong> 窗口内通过多参数扫描选出表现亮眼的配置（均值收益 <strong className="text-emerald-400 font-mono">+0.6381%</strong>，增量Alpha <strong className="text-emerald-400 font-mono">+0.6060%</strong>，胜率 <strong>64.29%</strong>）。但在完全未参与挑选的 <strong>Hold-out (盲测集)</strong> 窗口立即发生严重水土不服，平均收益跌入负值 <strong className="text-rose-400 font-mono">-1.1781%</strong>，最大回撤扩大到 <strong className="text-rose-400 font-mono">-18.4506%</strong>，胜率仅剩 <strong>37.50%</strong>。
            </p>
          </div>
        </div>
      </div>

      {/* Visual Comparison: Selection vs Hold-out */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Selection Box */}
        <div className="bg-slate-900/80 border border-emerald-900/40 rounded-xl p-5">
          <div className="flex items-center justify-between text-xs font-mono mb-3 border-b border-emerald-950 pb-2">
            <span className="text-emerald-400 font-bold">1. Selection 优化选择集 (2026-07-02 ~ 2026-09-09)</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300">14个评估周期</span>
          </div>
          <div className="grid grid-cols-3 gap-3 font-mono text-center mb-3">
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-0.5">平均周期收益</span>
              <span className="text-emerald-400 font-bold text-sm">+0.638%</span>
            </div>
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-0.5">最大回撤</span>
              <span className="text-amber-400 font-bold text-sm">-6.35%</span>
            </div>
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-0.5">胜率 (Win Rate)</span>
              <span className="text-emerald-400 font-bold text-sm">64.29%</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            在多达 53 组架构中进行事后排名挑选，此阶段极大吸收了数据切片内的随机噪声。
          </p>
        </div>

        {/* Hold-out Box */}
        <div className="bg-slate-900/80 border border-rose-900/50 rounded-xl p-5">
          <div className="flex items-center justify-between text-xs font-mono mb-3 border-b border-rose-950 pb-2">
            <span className="text-rose-400 font-bold">2. Hold-out 独立盲测集 (2026-09-09 ~ 2026-10-22)</span>
            <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300">8个非重叠周期</span>
          </div>
          <div className="grid grid-cols-3 gap-3 font-mono text-center mb-3">
            <div className="p-2.5 rounded bg-slate-950 border border-rose-950/40">
              <span className="text-[11px] text-slate-400 block mb-0.5">真实盲测收益</span>
              <span className="text-rose-400 font-bold text-sm">-1.178%</span>
            </div>
            <div className="p-2.5 rounded bg-slate-950 border border-rose-950/40">
              <span className="text-[11px] text-slate-400 block mb-0.5">最大回撤</span>
              <span className="text-rose-400 font-bold text-sm">-18.45%</span>
            </div>
            <div className="p-2.5 rounded bg-slate-950 border border-rose-950/40">
              <span className="text-[11px] text-slate-400 block mb-0.5">胜率 (Win Rate)</span>
              <span className="text-rose-400 font-bold text-sm">37.50%</span>
            </div>
          </div>
          <p className="text-xs text-rose-300/80 leading-relaxed font-mono text-[11px]">
            [VALIDITY GATE] 触发拦截：由于有效周期少于 12 且收益为负，系统拒绝升级为 VALIDATED 状态！
          </p>
        </div>
      </div>

      {/* Root Cause 2: Missing Features & Extreme NaN rates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Missing Features Alert */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <FileWarning className="w-4 h-4 text-amber-400" />
              11 个核心交互因子与 Alpha101 严重缺失
            </h4>
            <span className="text-xs font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
              11 个 Missing
            </span>
          </div>
          <p className="text-xs text-slate-300 mb-3">
            在 <code className="text-slate-200 font-mono text-[11px]">Strict Time-Series Threshold Gene Discovery</code> 执行中，以下11个预设特征在特征库中完全不存在（Feature missing），直接导致系统无法使用交互特征：
          </p>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 font-mono text-[11px] text-slate-300 space-y-1 max-h-48 overflow-y-auto">
            <div className="text-rose-400">✗ beta_feat_inter_money_div_x_illiq_swing_cs</div>
            <div className="text-rose-400">✗ beta_feat_inter_vol_std_x_entropy_cs</div>
            <div className="text-rose-400">✗ beta_feat_inter_money_div_x_atr_cs</div>
            <div className="text-rose-400">✗ beta_feat_inter_product_cs</div>
            <div className="text-rose-400">✗ beta_feat_inter_entropy_x_pred_std_cs</div>
            <div className="text-rose-400">✗ beta_feat_inter_money_flow_std_x_illiq_cs</div>
            <div className="text-amber-400">✗ beta_feat_alpha101_2_cs</div>
            <div className="text-amber-400">✗ beta_feat_alpha101_4_cs</div>
            <div className="text-amber-400">✗ beta_feat_alpha101_6_cs</div>
            <div className="text-amber-400">✗ beta_feat_alpha101_12_cs</div>
            <div className="text-amber-400">✗ beta_feat_alpha101_101_cs</div>
          </div>
        </div>

        {/* Feature NaN Rates Alert */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              微观流动性特征极端空值率诊断 (NaN Rate)
            </h4>
            <span className="text-xs font-mono text-slate-400">BetaNeutral 诊断记录</span>
          </div>
          <p className="text-xs text-slate-300 mb-3">
            部分特征在 21,544 个样本中有效数据极少，不仅丧失截面横截面代表性，更可能造成数据对齐污染：
          </p>

          <div className="space-y-2 text-xs font-mono">
            <div className="bg-slate-950 p-2.5 rounded border border-slate-800 flex items-center justify-between">
              <span className="text-slate-300">feat_micro_illiq_down_swing_cs</span>
              <div className="text-right">
                <span className="text-rose-400 font-bold">缺失率: 98.18%</span>
                <span className="text-slate-500 text-[10px] block">有效行数仅 393 / 21544</span>
              </div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded border border-slate-800 flex items-center justify-between">
              <span className="text-slate-300">feat_micro_illiq_up_swing_cs</span>
              <div className="text-right">
                <span className="text-rose-400 font-bold">缺失率: 88.47%</span>
                <span className="text-slate-500 text-[10px] block">有效行数仅 2485 / 21544</span>
              </div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded border border-slate-800 flex items-center justify-between">
              <span className="text-slate-300">feat_money_divergence_month_cs</span>
              <div className="text-right">
                <span className="text-amber-400 font-bold">缺失率: 34.38%</span>
                <span className="text-slate-500 text-[10px] block">有效行数 14138 / 21544</span>
              </div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded border border-slate-800 flex items-center justify-between">
              <span className="text-slate-300">feat_micro_top_vol_ret_mean_day_fortnight_cs</span>
              <div className="text-right">
                <span className="text-amber-400 font-bold">缺失率: 22.13%</span>
                <span className="text-slate-500 text-[10px] block">有效行数 16777 / 21544</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Root Cause Attribution Breakdown */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
        <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4 text-indigo-400" />
          全系统 43 个候选因子稳定性归因诊断 (Root Cause Breakdown)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
          {ROOT_CAUSE_STATS.map((stat, idx) => (
            <div key={idx} className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 text-center font-mono">
              <span className="text-[10px] text-slate-400 block truncate" title={stat.cause}>
                {stat.cause}
              </span>
              <span className={`text-xl font-bold my-1 block ${
                stat.cause === 'NONE (PASS)' ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {stat.count}
              </span>
              <span className="text-[11px] text-slate-500">{stat.percentage}</span>
            </div>
          ))}
        </div>

        {/* Factor Table with Filters */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-xs text-slate-300 font-semibold">代表性因子指标穿透表</span>
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={() => setFilterStatus('ALL')}
              className={`px-2 py-0.5 rounded cursor-pointer ${filterStatus === 'ALL' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              全部
            </button>
            <button
              onClick={() => setFilterStatus('VALID')}
              className={`px-2 py-0.5 rounded cursor-pointer ${filterStatus === 'VALID' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              已晋级 (VALID)
            </button>
            <button
              onClick={() => setFilterStatus('OBSERVE')}
              className={`px-2 py-0.5 rounded cursor-pointer ${filterStatus === 'OBSERVE' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              观察中 (OBSERVE)
            </button>
            <button
              onClick={() => setFilterStatus('INVALID')}
              className={`px-2 py-0.5 rounded cursor-pointer ${filterStatus === 'INVALID' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              已淘汰 (INVALID)
            </button>
          </div>
        </div>

        <div className="overflow-x-auto max-h-80 overflow-y-auto">
          <table className="w-full text-xs text-left border-collapse font-mono">
            <thead className="sticky top-0 bg-slate-900 border-b border-slate-800 text-slate-400">
              <tr>
                <th className="py-2 px-3">特征因子名</th>
                <th className="py-2 px-3">方向(Sign)</th>
                <th className="py-2 px-3">验证集IC</th>
                <th className="py-2 px-3">稳定性得分</th>
                <th className="py-2 px-3">正向Fold比</th>
                <th className="py-2 px-3">IC保留率</th>
                <th className="py-2 px-3">状态</th>
                <th className="py-2 px-3 text-right">根因归因</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredGenes.map((gene, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2 px-3 text-slate-200 truncate max-w-[240px]" title={gene.feature}>
                    {gene.feature}
                  </td>
                  <td className="py-2 px-3 text-slate-300">
                    {gene.sign > 0 ? '+1' : gene.sign < 0 ? '-1' : '0'}
                  </td>
                  <td className={`py-2 px-3 ${gene.validationIc > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {gene.validationIc.toFixed(4)}
                  </td>
                  <td className="py-2 px-3 text-slate-300">
                    {gene.stabilityScore.toFixed(3)}
                  </td>
                  <td className="py-2 px-3 text-slate-300">
                    {(gene.positiveFoldRatio * 100).toFixed(0)}%
                  </td>
                  <td className="py-2 px-3 text-slate-300">
                    {gene.icRetention.toFixed(2)}x
                  </td>
                  <td className="py-2 px-3">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      gene.status === 'VALID' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : gene.status === 'OBSERVE'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {gene.status}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-right text-slate-400 text-[11px]">
                    {gene.primaryCause || 'NONE'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Model Underfitting vs Premature Early Stopping Diagnostic */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
        <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
          <Bug className="w-4 h-4 text-cyan-400" />
          算法层矛盾：LightGBM 第 7 轮过早早停 (best_iteration=7)
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs font-mono mt-3">
          <div className="p-3 rounded bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block mb-1">训练设置</span>
            <span className="text-cyan-300 block">learning_rate: 0.005</span>
            <span className="text-cyan-300 block">max_depth: 3 | num_leaves: 8</span>
            <span className="text-cyan-300 block">early_stopping_round: 80</span>
          </div>

          <div className="p-3 rounded bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block mb-1">早停现象</span>
            <span className="text-amber-400 block font-bold">[7] valid_0's ndcg@5: 0.3952</span>
            <span className="text-slate-400 block">[25] ndcg@5: 0.3464</span>
            <span className="text-slate-400 block">[50] ndcg@5: 0.3526</span>
          </div>

          <div className="p-3 rounded bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block mb-1">技术剖析</span>
            <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
              学习率极小 (0.005) 时，7 棵浅树（depth=3）几乎无法学习到复杂的非线性特征组合。过早早停本质上是因为<strong>验证集只有8天（60个周期）</strong>，噪声极大导致NDCG在第8轮后剧烈震荡，模型误以为过拟合而提前终止！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
