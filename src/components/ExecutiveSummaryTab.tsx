import React from 'react';
import { 
  Award, 
  ShieldAlert, 
  CheckCircle, 
  XCircle, 
  TrendingDown, 
  Cpu, 
  Database, 
  GitBranch, 
  Gauge, 
  Scale, 
  HelpCircle,
  ArrowRight,
  Zap,
  Info
} from 'lucide-react';
import { TIER_COMPARISONS } from '../data/logData';

export const ExecutiveSummaryTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top 4 Core Verdict Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Stage */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 text-indigo-400 font-semibold">
                <Cpu className="w-4 h-4" /> 1. 系统发展阶段
              </span>
              <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-bold">
                Phase 2.5
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              工业级原型验证期
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              已具备成熟量化私募级别的模块化工程管道（ETL、因子中性化正交化、语义周期标签、LightGBM LambdaRank学习排序、双Alpha融合）。
            </p>
          </div>
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">距离资管实盘:</span>
            <span className="text-amber-400 font-medium">缺少多周期全A数据与组合优化器</span>
          </div>
        </div>

        {/* Card 2: Tech Level */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                <Gauge className="w-4 h-4" /> 2. 技术综合评级
              </span>
              <span className="text-cyan-300 font-bold font-mono text-sm">78 / 100</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              专业量化架构 / 短板明显
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              工程规范度与排产速度极佳（180秒跑完11个阶段）。因子体系兼备微观结构、熵特征与动量门禁。但LightGBM在第7轮过早早停，模型学习不充分。
            </p>
          </div>
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">因子稳定性评定:</span>
            <span className="text-rose-400 font-medium">41/54 因子未通过验证 (75.9%)</span>
          </div>
        </div>

        {/* Card 3: Domestic Tier */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <Award className="w-4 h-4" /> 3. 国内量化梯队
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold">
                Tier 3 头部
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              精品私募 / 自营团队原型
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              远高于民间个人散户与初级Jupyter代码；但距离头部百亿私募（幻方、九坤、灵均、衍复）在全市场5000+标的、高频L2订单簿、深度时序模型上有明显算力与数据壁垒。
            </p>
          </div>
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">同业对标:</span>
            <span className="text-slate-200 font-medium">5亿以下量化工作室/种子基金</span>
          </div>
        </div>

        {/* Card 4: Critical Paradox */}
        <div className="bg-slate-900/80 border border-rose-900/40 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-28 h-28 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
                <ShieldAlert className="w-4 h-4" /> 4. 关键矛盾与红线
              </span>
              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
                HOLD-OUT 崩塌
              </span>
            </div>
            <h3 className="text-xl font-bold text-rose-200 mb-2">
              样本内狂欢 vs 盲测暴跌
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Selection样本选出胜率 64.3%（收益+0.64%），在独立未参与选择的 Hold-out 窗口立即崩塌至 <strong>-1.18%</strong>（回撤达 <strong>-18.45%</strong>，胜率仅 37.5%）。
            </p>
          </div>
          <div className="pt-3 border-t border-rose-900/40 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">门禁阻断:</span>
            <span className="text-rose-400 font-bold">拒绝评定 VALIDATED (强制拦截)</span>
          </div>
        </div>
      </div>

      {/* Deep Explanation of the "100/100 Gate vs Hold-out Collapse" Paradox */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-white mb-4">
          <Info className="w-5 h-5 text-indigo-400" />
          <span>核心病灶解密：为什么模型生产门禁通过 100/100，而 Hold-out 盲测却发生严重回撤？</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> 环节 1：内部生产门禁 (PASS)
              </span>
              <span className="text-xs font-mono text-slate-400">Health: 100/100</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
              <li>训练集 RankIC = +0.2215 (ICIR = +1.24)</li>
              <li>验证集 RankIC = +0.1305 (ICIR = +0.70)</li>
              <li>测试集 RankIC = +0.1098 (ICIR = +0.44)</li>
              <li>特征稳定性、排序单调性(Q1~Q5单调)、Q-rho全达标</li>
              <li className="text-amber-300 font-mono">
                ⚠️ 结论：单纯作为 LightGBM 单模型，它在训练和短期切分上收敛良好，因此生产健康检查通过。
              </li>
            </ul>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-lg border border-rose-900/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-semibold text-rose-400 flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" /> 环节 2：架构选拔 (Selection Overfitting)
              </span>
              <span className="text-xs font-mono text-slate-400">53组策略候选</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
              <li>在 OOS 前段（Selection 区间 14 个周期），系统遍历了 53 组融合架构与 Top-N 参数</li>
              <li>选取了表现最好的组合：GlobalFusion (TopN=10, λ=0.4, ρ=0.6)</li>
              <li>Selection 收益为 +0.6381%，胜率 42.8%~64.3%</li>
              <li className="text-rose-300 font-mono">
                ⚠️ 致命漏洞：在同一段数据上对53组权重进行事后挑选，本质上是将样本内的随机噪声优化为了“伪Alpha”！
              </li>
            </ul>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-lg border border-amber-900/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-semibold text-amber-400 flex items-center gap-1">
                <TrendingDown className="w-3.5 h-3.5" /> 环节 3：Hold-out 真实盲测照妖镜
              </span>
              <span className="text-xs font-mono text-slate-400">8 个独立周期 (9-10月)</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
              <li>真正完全不参与权重选择的 Hold-out 窗口平均收益：<strong>-1.1781%</strong></li>
              <li>Hold-out 最大回撤高达 <strong>-18.4506%</strong>，胜率仅 <strong>37.50%</strong></li>
              <li>系统内置防御机制触发：<code className="text-amber-300">Hold-out periods 8 &lt; 12, VALIDATED forbidden</code></li>
              <li className="text-emerald-400 font-mono">
                ✅ 极其珍贵的亮点：系统具备“诚实自知”能力，未盲目标记通过上线，体现了高超的防欺骗纪律！
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Domestic Quantitative Tier Pyramid & Multidimensional Evaluation */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              国内量化私募四级梯队对照与定位
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              参考幻方量化、九坤投资、衍复投资、鸣石基金等头部机构与行业通用技术架构基准对比
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-full font-bold">
            当前系统定位：Tier 3 (成熟量化原型 / 精品团队水平)
          </span>
        </div>

        {/* Pyramid Graphic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-6">
          <div className="lg:col-span-5 space-y-2 font-mono text-xs">
            {/* Tier 1 */}
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 opacity-60">
              <div className="flex items-center justify-between text-slate-300 font-bold mb-1">
                <span>第一梯队 (头部百亿量化)</span>
                <span className="text-slate-500 text-[10px]">AUM &gt; 100亿</span>
              </div>
              <div className="text-[11px] text-slate-400 font-sans">
                幻方、九坤、鸣石、衍复、灵均、宽德、明汯。全A 5000+标的、L2高频Tick/逐笔委托、Transformer/GNN时序网络、FPGA执行。
              </div>
            </div>

            {/* Tier 2 */}
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 opacity-70">
              <div className="flex items-center justify-between text-slate-300 font-bold mb-1">
                <span>第二梯队 (腰部中型私募/券商自营)</span>
                <span className="text-slate-500 text-[10px]">AUM 10~50亿</span>
              </div>
              <div className="text-[11px] text-slate-400 font-sans">
                中证500/1000/全A体系，成熟自动化特征工程，LightGBM/XGBoost，连续3-5年滚动Walk-forward盲测，凸优化Barra风控。
              </div>
            </div>

            {/* Tier 3 - Current */}
            <div className="p-3.5 rounded-lg bg-gradient-to-r from-indigo-950/80 via-slate-900 to-amber-950/50 border-2 border-indigo-500/60 shadow-lg shadow-indigo-950/50 relative">
              <span className="absolute -top-2.5 right-3 px-2 py-0.5 bg-indigo-500 text-white text-[10px] rounded font-bold shadow">
                ★ 本系统所处位置
              </span>
              <div className="flex items-center justify-between text-indigo-300 font-bold mb-1">
                <span>第三梯队 (小型精品量化/自营原型)</span>
                <span className="text-indigo-400 text-[10px]">AUM 5000万~5亿</span>
              </div>
              <div className="text-[11px] text-slate-200 font-sans leading-relaxed">
                代码流水线极其正规规范，具备Beta中性化、多周期语义标签、Learning-to-Rank排序与严格步进验证。但受困于<strong>标的池狭窄(仅46只)、历史跨度仅4个月、高频数据不足与Holdout回撤</strong>。
              </div>
            </div>

            {/* Tier 4 */}
            <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-900 opacity-40">
              <div className="flex items-center justify-between text-slate-400 font-semibold mb-1">
                <span>第四梯队 (个人宽客 / 业余量化)</span>
                <span className="text-slate-600 text-[10px]">自有小资金</span>
              </div>
              <div className="text-[11px] text-slate-500 font-sans">
                单机Jupyter手工回测，简单MACD/KDJ均线，无中性化，存在严重未来函数和幸存者偏差。
              </div>
            </div>
          </div>

          {/* Dimension Comparison Table */}
          <div className="lg:col-span-7 overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono">
                  <th className="py-2.5 px-3">能力维度</th>
                  <th className="py-2.5 px-3">本系统当前水平</th>
                  <th className="py-2.5 px-3">第一/二梯队标准差距</th>
                  <th className="py-2.5 px-3 text-right">成熟度</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {TIER_COMPARISONS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-200 whitespace-nowrap">
                      {row.dimension}
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      {row.evaluation}
                    </td>
                    <td className="py-3 px-3 text-slate-400 text-[11px]">
                      {row.tier2}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold">
                      <span className={`px-2 py-0.5 rounded text-[11px] ${
                        row.currentScore >= 80 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : row.currentScore >= 70 
                          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                          : row.currentScore >= 60
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {row.currentScore}分
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* System Life-Cycle Roadmap */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-cyan-400" />
          系统成熟度演进阶梯：从目前原型到实盘资管落地
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="p-3.5 rounded-lg bg-slate-950/80 border border-emerald-500/40 relative">
            <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase mb-1 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> Phase 1 · 已完成
            </div>
            <div className="font-bold text-slate-200 text-xs mb-1">核心流水线管道搭建</div>
            <div className="text-[11px] text-slate-400">
              完成Parquet工程化、中性化、多周期语义标签、LTR算法训练闭环。
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-indigo-950/40 border-2 border-indigo-500 relative shadow-md">
            <span className="absolute -top-2 right-2 px-1.5 py-0.2 bg-indigo-500 text-white text-[9px] rounded font-bold font-mono">
              当前阶段
            </span>
            <div className="text-[10px] font-mono text-indigo-400 font-bold uppercase mb-1 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" /> Phase 2 · 攻坚期
            </div>
            <div className="font-bold text-white text-xs mb-1">独立样本外验证与归因</div>
            <div className="text-[11px] text-slate-300">
              通过Hold-out识别假阳性过拟合，解决46只股票样本过小与因子失效归因。
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950/40 border border-slate-800 opacity-60">
            <div className="text-[10px] font-mono text-slate-400 font-bold uppercase mb-1">Phase 3 · 待推进</div>
            <div className="font-bold text-slate-300 text-xs mb-1">标的扩容与全A回测</div>
            <div className="text-[11px] text-slate-400">
              扩容至中证1000/全A 3000+只标的，拉长至3~5年完整牛熊周期。
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950/40 border border-slate-800 opacity-50">
            <div className="text-[10px] font-mono text-slate-400 font-bold uppercase mb-1">Phase 4 · 待推进</div>
            <div className="font-bold text-slate-300 text-xs mb-1">摩擦成本与组合优化</div>
            <div className="text-[11px] text-slate-400">
              接入CVXPY组合优化器，硬扣千分之一印花税与滑点，加入Barra行业暴露控制。
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950/40 border border-slate-800 opacity-40">
            <div className="text-[10px] font-mono text-slate-400 font-bold uppercase mb-1">Phase 5 · 终极目标</div>
            <div className="font-bold text-slate-300 text-xs mb-1">实盘灰度与规模化资管</div>
            <div className="text-[11px] text-slate-400">
              接入QMT/PTrade实盘网关，开启小资金实盘验证，达标后规模化建仓。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
