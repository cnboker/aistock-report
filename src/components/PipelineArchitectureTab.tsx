import React, { useState } from 'react';
import { 
  GitMerge, 
  Clock, 
  Terminal, 
  Layers, 
  Cpu, 
  Sliders, 
  CheckCircle2, 
  AlertCircle,
  Database,
  ArrowRight,
  Filter,
  BarChart3
} from 'lucide-react';
import { PIPELINE_STAGES, ARCHITECTURE_CANDIDATES } from '../data/logData';

export const PipelineArchitectureTab: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<string>(PIPELINE_STAGES[2].id);
  const currentStageObj = PIPELINE_STAGES.find(s => s.id === selectedStage) || PIPELINE_STAGES[0];

  const totalTime = PIPELINE_STAGES.reduce((acc, curr) => acc + curr.elapsed, 0);

  return (
    <div className="space-y-6">
      {/* Overview stats banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            投研管道与双 Alpha 引擎拓扑架构
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            端到端执行总用时 <strong className="text-emerald-400 font-mono">179.81 秒 (~3.0 分钟)</strong>，包含 11 个标准工程子流水线，全部自动化串联
          </p>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="text-slate-400">总 Stage:</span> <span className="text-emerald-400 font-bold">11 / 11 PASS</span>
          </div>
          <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="text-slate-400">核心架构:</span> <span className="text-indigo-400 font-bold">Dual-Alpha (Research ⋈ Lambda)</span>
          </div>
        </div>
      </div>

      {/* Dual Alpha Architecture Visual Decomposition */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
        <h4 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
          <GitMerge className="w-4 h-4 text-cyan-400" />
          双 Alpha 引擎机理拆解：专家规则引擎 vs 机器学习排序模型
        </h4>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* Branch 1: Research Alpha Engine */}
          <div className="lg:col-span-5 bg-slate-950/80 border border-indigo-900/40 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-indigo-950 pb-2">
                <span className="text-xs font-mono font-bold text-indigo-400 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4" /> 引擎 A · Research Alpha (启发式因子核心)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300">
                  权重: 0.60
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800">
                  <div className="font-semibold text-slate-200 mb-1">1. FactorCore 基础打分</div>
                  <p className="text-slate-400 text-[11px]">
                    根据 15 个活跃因子符号与质量加权，正向命中与置信度赋权，均值 0.127。
                  </p>
                </div>

                <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800">
                  <div className="font-semibold text-rose-300 mb-1">2. NegAsRisk 风险惩罚扣减</div>
                  <p className="text-slate-400 text-[11px]">
                    <code className="text-rose-400 font-mono">penalty_weight = 0.60</code>，若负向因子触发过多则强力压低得分（扣分均值 0.197）。
                  </p>
                </div>

                <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800">
                  <div className="font-semibold text-amber-300 mb-1">3. 多周期动量门禁 (Momentum Gates)</div>
                  <ul className="text-slate-400 text-[11px] list-disc list-inside space-y-0.5">
                    <li><strong className="text-slate-300">相对动量 (RelMom):</strong> 倒数20%弱势股惩罚系数 [0.554, 1.0]</li>
                    <li><strong className="text-slate-300">绝对动量 (AbsMom):</strong> 必须5日收益 &gt; 0，不达标乘数直接清零 (通过率仅43.84%)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-900 text-[11px] font-mono text-slate-400 flex justify-between">
              <span>有效打分率: 100%</span>
              <span className="text-indigo-300">输出列: research_score</span>
            </div>
          </div>

          {/* Center Connector */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center py-4 text-center">
            <div className="p-3 rounded-full bg-slate-800/80 border border-slate-700 text-cyan-400 mb-2">
              <GitMerge className="w-6 h-6 animate-pulse" />
            </div>
            <div className="text-xs font-mono font-bold text-slate-300">
              GlobalFusion
            </div>
            <div className="text-[10px] text-slate-400 mt-1 font-mono">
              λ = 0.40 (Lambda)<br/>
              ρ = 0.60 (Research)
            </div>
            <div className="mt-3 px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-mono">
              Top-10 截面过滤
            </div>
          </div>

          {/* Branch 2: Lambda Alpha Engine */}
          <div className="lg:col-span-5 bg-slate-950/80 border border-cyan-900/40 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-cyan-950 pb-2">
                <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" /> 引擎 B · Lambda Alpha (LightGBM 排序模型)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300">
                  权重: 0.40
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800">
                  <div className="font-semibold text-slate-200 mb-1">1. 排序学习目标 (LTR)</div>
                  <p className="text-slate-400 text-[11px]">
                    优化 <code className="text-cyan-400 font-mono">NDCG@5</code>，直接让模型学习截面头部高收益标的排位，而非绝对收益回归。
                  </p>
                </div>

                <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800">
                  <div className="font-semibold text-slate-200 mb-1">2. 模型超参数与时间约束</div>
                  <ul className="text-slate-400 text-[11px] list-disc list-inside space-y-0.5">
                    <li>max_depth=3, num_leaves=8, lr=0.005, strict_lag=8</li>
                    <li>
                      <span className="text-amber-300 font-semibold">早停截断:</span> 第7轮即触发早停 (<code className="text-amber-300">best_iteration=7</code>)
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800">
                  <div className="font-semibold text-slate-200 mb-1">3. 产出与相关性</div>
                  <p className="text-slate-400 text-[11px]">
                    测试集 IC=+0.1098 (ICIR=+0.44)。与 Research Alpha 的相关性仅为 <strong>0.0601</strong>，具备较好的低相关互补性。
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-900 text-[11px] font-mono text-slate-400 flex justify-between">
              <span>截面标准差: 0.0117</span>
              <span className="text-cyan-300">输出列: lambda_alpha_score</span>
            </div>
          </div>
        </div>
      </div>

      {/* 11 Pipeline Stages Timeline & Drilldown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Stage Flow */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              11 阶段运行耗时瀑布图 (总计 179.8s)
            </h4>
            <span className="text-xs text-slate-400 font-mono">点击阶段查看详情</span>
          </div>

          <div className="space-y-2">
            {PIPELINE_STAGES.map((stage, idx) => {
              const pct = (stage.elapsed / totalTime) * 100;
              const isSelected = stage.id === selectedStage;
              return (
                <div
                  key={stage.id}
                  onClick={() => setSelectedStage(stage.id)}
                  className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500 shadow-md'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-slate-500 text-[11px] w-5">#{idx + 1}</span>
                      <span className={`font-semibold ${isSelected ? 'text-indigo-300' : 'text-slate-200'}`}>
                        {stage.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-slate-400 text-[11px]">{stage.elapsed.toFixed(2)}s</span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                        {stage.status}
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        stage.elapsed > 40
                          ? 'bg-rose-500'
                          : stage.elapsed > 20
                          ? 'bg-amber-500'
                          : 'bg-indigo-500'
                      }`}
                      style={{ width: `${Math.max(pct, 2)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Stage Drilldown */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-3 mb-4">
              <span className="text-indigo-400 font-semibold">STAGE 深度剖析</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 状态: {currentStageObj.status}
              </span>
            </div>

            <h4 className="text-base font-bold text-white mb-2">
              {currentStageObj.name}
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {currentStageObj.description}
            </p>

            <div className="space-y-3 text-xs font-mono">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[11px] block mb-1">执行命令行:</span>
                <code className="text-cyan-300 break-all text-[11px]">
                  {currentStageObj.command}
                </code>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">单阶段耗时:</span>
                <span className="text-amber-400 font-bold text-sm">
                  {currentStageObj.elapsed.toFixed(3)} 秒 ({((currentStageObj.elapsed / totalTime) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
            💡 <strong>工程点评：</strong> 流水线各模块间通过 Parquet 列式存储解耦，支持断点重续和独立特征复用，展现了极佳的 Python 工业级量化工程素养。
          </div>
        </div>
      </div>

      {/* 53 Architecture Candidates Comparison Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-400" />
              架构与权重竞选评估矩阵 (Top-7 候选横向对比)
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              日志测试了 GlobalFusion (33组)、ConditionalFusion (11组)、TwoStage (3组)、Pure Research (3组) 与 Pure Lambda (3组)
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            总参评模型: 53 组 / 合格率 41/53 (77.4%)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="py-2.5 px-3">排名</th>
                <th className="py-2.5 px-3">架构名称</th>
                <th className="py-2.5 px-3">持仓深度(TopN)</th>
                <th className="py-2.5 px-3">权重配比(λ/ρ)</th>
                <th className="py-2.5 px-3">Selection收益</th>
                <th className="py-2.5 px-3">胜率</th>
                <th className="py-2.5 px-3">最大回撤</th>
                <th className="py-2.5 px-3">增量Alpha</th>
                <th className="py-2.5 px-3 text-right">综合评分</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {ARCHITECTURE_CANDIDATES.map((arch) => (
                <tr 
                  key={arch.rank}
                  className={`hover:bg-slate-800/30 transition-colors ${
                    arch.architecture.includes('(Selected)') ? 'bg-indigo-950/20 font-bold' : ''
                  }`}
                >
                  <td className="py-2.5 px-3 text-slate-400">
                    {arch.rank === 4 ? (
                      <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        Winner
                      </span>
                    ) : (
                      `#${arch.rank}`
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-white">
                    {arch.architecture}
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">
                    Top-{arch.topN}
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">
                    {arch.lambdaWeight?.toFixed(1)} / {arch.researchWeight?.toFixed(1)}
                  </td>
                  <td className="py-2.5 px-3 text-emerald-400">
                    +{(arch.meanReturn * 100).toFixed(2)}%
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">
                    {(arch.winRate * 100).toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-3 text-rose-400">
                    {(arch.maxDD * 100).toFixed(2)}%
                  </td>
                  <td className="py-2.5 px-3 text-cyan-400">
                    +{(arch.incrementalAlpha * 100).toFixed(2)}%
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-amber-400">
                    {arch.score.toFixed(4)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
