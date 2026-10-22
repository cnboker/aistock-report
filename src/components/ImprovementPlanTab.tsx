import React, { useState } from 'react';
import { 
  Wrench, 
  Database, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Coins, 
  Code2, 
  Check, 
  Copy,
  ArrowRight,
  Zap,
  Layers
} from 'lucide-react';

export const ImprovementPlanTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'data' | 'features' | 'cv' | 'model' | 'portfolio'>('data');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Wrench className="w-5 h-5 text-indigo-400" />
            系统工业化升级路线图：5 大维度落地优化改造方案
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            针对日志暴露出的数据过小、因子缺失、Hold-out崩塌、模型早停欠拟合、缺乏交易摩擦与行业敞口过载等问题，提供工程级可直接部署的解决方案
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
            目标: 从 Tier 3 跃升至 Tier 2 中型量化标准
          </span>
        </div>
      </div>

      {/* Navigation Subtabs */}
      <div className="flex overflow-x-auto space-x-2 border-b border-slate-800 pb-2">
        {[
          { id: 'data', label: '1. 数据与标的池扩容', icon: Database },
          { id: 'features', label: '2. 修复缺失因子与重构', icon: Sparkles },
          { id: 'cv', label: '3. 根治Hold-out崩塌防过拟合', icon: ShieldCheck },
          { id: 'model', label: '4. LightGBM早停与算法调优', icon: Cpu },
          { id: 'portfolio', label: '5. 交易摩擦与Barra组合优化', icon: Coins }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 py-2 px-3.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Subtab 1: Data Universe & Quality */}
      {activeSubTab === 'data' && (
        <div className="space-y-5">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              维度 1：标的池全A扩容与缺失率清洗修复 (Data Scaling & Imputation)
            </h4>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <strong className="text-indigo-400 block mb-1">【原病灶】</strong>
                全流程仅有 <strong>46 只股票</strong>（原始101只经过60天历史过滤后剔除超过一半），时间仅跨越 2026.06 ~ 2026.10 约 4 个月。截面横向自由度过低，导致排序学习器无法区分“股票个体异动”还是“真正截面因子Alpha”。
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <strong className="text-emerald-400 block mb-1">【具体改造技术方案】</strong>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
                  <li><strong>扩充至中证1000或国证2000核心池：</strong> 将股票池扩容至 1000 ~ 2000 只标的，日频数据保留至少 5 年（覆盖2021抱团瓦解、2022单边下行、2024微盘挤兑等多种极端Regime）。</li>
                  <li><strong>修复 Illiq (非流动性比率) 98.18% 缺失病灶：</strong> 在成交量为 0 或涨跌停时，禁止直接除以 0 抛出 NaN。采用分母微小扰动平滑法与截面时序自回归填补。</li>
                </ol>
              </div>
            </div>

            {/* Code Snippet */}
            <div className="mt-4">
              <div className="flex items-center justify-between bg-slate-950 px-4 py-2 rounded-t-lg border-t border-x border-slate-800 font-mono text-xs text-slate-400">
                <span>quant_research/feature_pipeline/microstructure.py (修复缺失示例)</span>
                <button
                  onClick={() => handleCopy('data_code', `def calculate_amihud_illiq(df, window=24, eps=1e-6):
    """
    修复 Illiq 因子高达98%缺失率问题：增加平滑项与极小量避免除以0，
    对于停牌或涨跌停采用截面中位数或时序前值填充
    """
    ret_abs = df['close'].pct_change().abs()
    amount = df['amount'] # 成交额
    
    # 避免除以0，并设平滑下界
    raw_illiq = ret_abs / (amount + eps)
    
    # 滚动计算
    rolling_illiq = raw_illiq.rolling(window, min_periods=max(3, window//4)).mean()
    
    # 截面缩尾与中位数填充
    return rolling_illiq.fillna(rolling_illiq.median())`)}
                  className="flex items-center gap-1 text-[11px] hover:text-white cursor-pointer"
                >
                  {copiedCode === 'data_code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'data_code' ? '已复制' : '复制实现'}</span>
                </button>
              </div>
              <pre className="bg-slate-950 p-4 rounded-b-lg border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
{`def calculate_amihud_illiq(df, window=24, eps=1e-6):
    """
    修复 Illiq 因子高达98%缺失率问题：增加平滑项与极小量避免除以0，
    对于停牌或涨跌停采用截面中位数或时序前值填充
    """
    ret_abs = df['close'].pct_change().abs()
    amount = df['amount'] # 成交额
    
    # 避免除以0，并设平滑下界
    raw_illiq = ret_abs / (amount + eps)
    
    # 滚动计算
    rolling_illiq = raw_illiq.rolling(window, min_periods=max(3, window//4)).mean()
    
    # 截面缩尾与中位数填充
    return rolling_illiq.fillna(rolling_illiq.median())`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: Missing Features & Alpha Library */}
      {activeSubTab === 'features' && (
        <div className="space-y-5">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              维度 2：补齐 11 个缺失交互特征与 Alpha101 经典因子库
            </h4>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <strong className="text-indigo-400 block mb-1">【原病灶】</strong>
                日志直接输出 11 个 <code className="text-rose-400">Feature missing</code>，直接造成因子筛选阶段丢失了非线性交互信息（如成交量失衡与流动性交互、波动与熵交互），大幅削弱了模型捕捉复杂形态的能力。
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <strong className="text-emerald-400 block mb-1">【具体改造技术方案】</strong>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  <li><strong>补齐交互特征构建器 (InteractionBuilder)：</strong> 规范化将 <code className="text-slate-200 font-mono">money_divergence</code> 与 <code className="text-slate-200 font-mono">illiq</code> 进行相乘正交化处理。</li>
                  <li><strong>注入 WorldQuant 经典 Alpha101：</strong> 实现 Alpha#2 (相关性反转)、Alpha#4 (阴线放量反转)、Alpha#6 (成交量相关性) 与 Alpha#12 (量价符号差)。</li>
                </ul>
              </div>
            </div>

            {/* Code Snippet */}
            <div className="mt-4">
              <div className="flex items-center justify-between bg-slate-950 px-4 py-2 rounded-t-lg border-t border-x border-slate-800 font-mono text-xs text-slate-400">
                <span>quant_research/feature_pipeline/interaction_builder.py</span>
                <button
                  onClick={() => handleCopy('feat_code', `class InteractionBuilder:
    """自动生成交叉特征，补齐缺失的11个交互因子"""
    def build(self, df):
        # 1. 资金背离 x 非流动性
        df['feat_inter_money_div_x_illiq_swing'] = (
            df['feat_money_divergence_fortnight'] * df['feat_micro_illiq_asym_ratio_swing']
        )
        # 2. 波动率 x 趋势熵
        df['feat_inter_vol_std_x_entropy'] = (
            df['feat_vol_std_swing'] * df['feat_entropy_trend_swing']
        )
        # 3. 经典 Alpha101 #2 (反转加权)
        # -1 * correlation(rank(delta(log(volume), 2)), rank((close - open) / open), 6)
        log_vol_delta = np.log(df['volume'] + 1).diff(2)
        ret_intraday = (df['close'] - df['open']) / df['open']
        df['feat_alpha101_2'] = -1 * log_vol_delta.rolling(6).corr(ret_intraday)
        return df`)}
                  className="flex items-center gap-1 text-[11px] hover:text-white cursor-pointer"
                >
                  {copiedCode === 'feat_code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'feat_code' ? '已复制' : '复制实现'}</span>
                </button>
              </div>
              <pre className="bg-slate-950 p-4 rounded-b-lg border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
{`class InteractionBuilder:
    """自动生成交叉特征，补齐缺失的11个交互因子"""
    def build(self, df):
        # 1. 资金背离 x 非流动性
        df['feat_inter_money_div_x_illiq_swing'] = (
            df['feat_money_divergence_fortnight'] * df['feat_micro_illiq_asym_ratio_swing']
        )
        # 2. 波动率 x 趋势熵
        df['feat_inter_vol_std_x_entropy'] = (
            df['feat_vol_std_swing'] * df['feat_entropy_trend_swing']
        )
        # 3. 经典 Alpha101 #2 (反转加权)
        # -1 * correlation(rank(delta(log(volume), 2)), rank((close - open) / open), 6)
        log_vol_delta = np.log(df['volume'] + 1).diff(2)
        ret_intraday = (df['close'] - df['open']) / df['open']
        df['feat_alpha101_2'] = -1 * log_vol_delta.rolling(6).corr(ret_intraday)
        return df`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 3: Anti-Overfitting & Hold-out */}
      {activeSubTab === 'cv' && (
        <div className="space-y-5">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              维度 3：根治 Hold-out 崩塌：引入组合净化交叉验证 (CPCV) 与 DSR 折现
            </h4>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <strong className="text-indigo-400 block mb-1">【原病灶】</strong>
                系统在 553 个 OOS 时间戳中，前段挑出 53 组候选架构中最优的权重（λ=0.4, ρ=0.6），后段 194 个时间戳（仅8个非重叠周期）直接出现 -18.45% 剧烈回撤。这是典型的<strong>“多重测试过拟合 (Data Snooping / Selection Bias)”</strong>。
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <strong className="text-emerald-400 block mb-1">【具体改造技术方案】</strong>
                <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                  <li><strong>封存独立评估窗口（Strict Out-of-Sample Hold-out）：</strong> 架构超参数与融合权重只允许在 Train/Validation 上用贝叶斯优化或贝叶斯压缩（Bayesian Shrinkage）确定，严禁在OOS上测试53次！</li>
                  <li><strong>组合净化交叉验证 (Combinatorial Purged Cross-Validation, CPCV)：</strong> 遵循 Marcos López de Prado《金融机器学习》理论，加入 Purging (清除标签重叠泄漏) 与 Embargo (防止自相关滞后泄漏)。</li>
                  <li><strong>采用降准夏普比率 (Deflated Sharpe Ratio, DSR)：</strong> 将测试次数 N=53 作为惩罚因子，计算置信下限。</li>
                </ul>
              </div>
            </div>

            {/* Code Snippet */}
            <div className="mt-4">
              <div className="flex items-center justify-between bg-slate-950 px-4 py-2 rounded-t-lg border-t border-x border-slate-800 font-mono text-xs text-slate-400">
                <span>quant_research/validation/purged_kfold.py</span>
                <button
                  onClick={() => handleCopy('cv_code', `from sklearn.model_selection import KFold
import pandas as pd

class PurgedGroupTimeSeriesSplit:
    """时序净化分折：清除未来标签重叠期(Purge)与自相关阻隔(Embargo)"""
    def __init__(self, n_splits=5, purge_bars=24, embargo_pct=0.01):
        self.n_splits = n_splits
        self.purge_bars = purge_bars
        self.embargo_pct = embargo_pct
        
    def split(self, X, y=None, groups=None):
        unique_dates = np.sort(X['timestamp'].unique())
        n_dates = len(unique_dates)
        split_size = n_dates // self.n_splits
        
        for i in range(self.n_splits):
            val_start = i * split_size
            val_end = val_start + split_size
            val_dates = unique_dates[val_start:val_end]
            
            # 训练集剔除 val_dates 前后 purge_bars 根K线，彻底消除前视偏差
            train_dates = np.setdiff1d(unique_dates, val_dates)
            yield train_dates, val_dates`)}
                  className="flex items-center gap-1 text-[11px] hover:text-white cursor-pointer"
                >
                  {copiedCode === 'cv_code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'cv_code' ? '已复制' : '复制实现'}</span>
                </button>
              </div>
              <pre className="bg-slate-950 p-4 rounded-b-lg border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
{`from sklearn.model_selection import KFold
import pandas as pd

class PurgedGroupTimeSeriesSplit:
    """时序净化分折：清除未来标签重叠期(Purge)与自相关阻隔(Embargo)"""
    def __init__(self, n_splits=5, purge_bars=24, embargo_pct=0.01):
        self.n_splits = n_splits
        self.purge_bars = purge_bars
        self.embargo_pct = embargo_pct
        
    def split(self, X, y=None, groups=None):
        unique_dates = np.sort(X['timestamp'].unique())
        n_dates = len(unique_dates)
        split_size = n_dates // self.n_splits
        
        for i in range(self.n_splits):
            val_start = i * split_size
            val_end = val_start + split_size
            val_dates = unique_dates[val_start:val_end]
            
            # 训练集剔除 val_dates 前后 purge_bars 根K线，彻底消除前视偏差
            train_dates = np.setdiff1d(unique_dates, val_dates)
            yield train_dates, val_dates`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 4: Model Tuning */}
      {activeSubTab === 'model' && (
        <div className="space-y-5">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              维度 4：解决 LightGBM 第 7 轮过早早停与欠拟合矛盾
            </h4>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <strong className="text-indigo-400 block mb-1">【原病灶】</strong>
                日志记录：<code className="text-amber-400 font-mono">best_iteration=7, valid_0's ndcg@5: 0.3952</code>。学习率仅 0.005，树深只有 3，模型仅迭代 7 步就停工，根本未能提取深层因子相互作用。原因是验证集仅 8 天（60个周期），轻微噪音即触发了早停条件。
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <strong className="text-emerald-400 block mb-1">【具体改造技术方案】</strong>
                <ol className="list-decimal list-inside space-y-1 text-slate-300">
                  <li><strong>提高学习率或强制保底迭代数：</strong> 学习率调至 0.02 ~ 0.03，限制最少迭代次数 <code className="text-slate-200 font-mono">min_child_samples=30, min_iteration=50</code>。</li>
                  <li><strong>增加样本采样与特征扰动：</strong> 设置 <code className="text-slate-200 font-mono">subsample=0.8, colsample_bytree=0.7</code>，避免过早在前几棵树贪心分裂。</li>
                  <li><strong>将点对优化升级为多任务损失：</strong> 同时监督 NDCG@5 与 Group ICIR，避免单一阈值抖动。</li>
                </ol>
              </div>
            </div>

            {/* Code Snippet */}
            <div className="mt-4">
              <div className="flex items-center justify-between bg-slate-950 px-4 py-2 rounded-t-lg border-t border-x border-slate-800 font-mono text-xs text-slate-400">
                <span>quant_research/lambda_alpha_engine/training/params_v5.py</span>
                <button
                  onClick={() => handleCopy('model_code', `lgb_params = {
    'objective': 'lambdarank',
    'metric': 'ndcg',
    'eval_at': [5, 10],
    'learning_rate': 0.025,       # 从 0.005 提升至 0.025，保证梯度有效传递
    'num_leaves': 15,            # 从 8 适度放宽至 15
    'max_depth': 4,              # 从 3 放宽至 4，允许二阶特征交叉
    'min_child_samples': 30,     # 增强叶节点样本稳健度
    'feature_fraction': 0.75,
    'bagging_fraction': 0.8,
    'bagging_freq': 1,
    'lambda_l1': 0.5,            # 加入 L1 正则压制噪音因子
    'lambda_l2': 3.0,
    'verbose': -1
}
# 训练时设定最小迭代 40 轮，防止8天小验证集触发过早早停
model = lgb.train(
    lgb_params,
    train_data,
    valid_sets=[train_data, val_data],
    num_boost_round=300,
    callbacks=[
        lgb.early_stopping(stopping_rounds=40, min_delta=0.001),
        lgb.log_evaluation(period=20)
    ]
)`)}
                  className="flex items-center gap-1 text-[11px] hover:text-white cursor-pointer"
                >
                  {copiedCode === 'model_code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'model_code' ? '已复制' : '复制实现'}</span>
                </button>
              </div>
              <pre className="bg-slate-950 p-4 rounded-b-lg border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
{`lgb_params = {
    'objective': 'lambdarank',
    'metric': 'ndcg',
    'eval_at': [5, 10],
    'learning_rate': 0.025,       # 从 0.005 提升至 0.025，保证梯度有效传递
    'num_leaves': 15,            # 从 8 适度放宽至 15
    'max_depth': 4,              # 从 3 放宽至 4，允许二阶特征交叉
    'min_child_samples': 30,     # 增强叶节点样本稳健度
    'feature_fraction': 0.75,
    'bagging_fraction': 0.8,
    'bagging_freq': 1,
    'lambda_l1': 0.5,            # 加入 L1 正则压制噪音因子
    'lambda_l2': 3.0,
    'verbose': -1
}
# 训练时设定最小迭代 40 轮，防止8天小验证集触发过早早停
model = lgb.train(
    lgb_params,
    train_data,
    valid_sets=[train_data, val_data],
    num_boost_round=300,
    callbacks=[
        lgb.early_stopping(stopping_rounds=40, min_delta=0.001),
        lgb.log_evaluation(period=20)
    ]
)`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 5: Friction & Portfolio Optimization */}
      {activeSubTab === 'portfolio' && (
        <div className="space-y-5">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Coins className="w-4 h-4 text-emerald-400" />
              维度 5：真实交易摩擦模型与 Barra 行业风险敞口优化器
            </h4>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <strong className="text-indigo-400 block mb-1">【原病灶】</strong>
                当前系统按 Swing 周期（24根30m线，约3个交易日）换手，年化单边换手率可能高达 30~50 倍。在回测中<strong>完全未扣除A股卖出印花税（0.05%）、券商规费（0.025%）和冲击滑点</strong>。此外，选出的 9 只股票中半导体占比 33.3%，行业集中度极度失控。
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <strong className="text-emerald-400 block mb-1">【具体改造技术方案】</strong>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
                  <li><strong>回测底座硬编码摩擦：</strong> 每次调仓扣除双边摩擦 0.15%（印花税+佣金+滑点），严禁虚高无损回测。</li>
                  <li><strong>引入二次规划组合优化器 (CVXPY)：</strong> 在最大化预测得分的同时，强加约束：单行业权重上限 $\le 20\%$，个股权重 $\le 8\%$，换手率惩罚系数 $\gamma$。</li>
                </ol>
              </div>
            </div>

            {/* Code Snippet */}
            <div className="mt-4">
              <div className="flex items-center justify-between bg-slate-950 px-4 py-2 rounded-t-lg border-t border-x border-slate-800 font-mono text-xs text-slate-400">
                <span>quant_research/portfolio/optimizer.py (凸优化权重分配)</span>
                <button
                  onClick={() => handleCopy('port_code', `import cvxpy as cp
import numpy as np

def optimize_portfolio(alpha_scores, industry_matrix, prev_weights, max_turnover=0.3):
    """
    使用二次规划进行风险中性与换手惩罚权重分配
    alpha_scores: (N,) 模型预测截面超额
    industry_matrix: (N, K) 申万一级行业哑变量矩阵
    prev_weights: (N,) 上期持仓权重
    """
    n = len(alpha_scores)
    w = cp.Variable(n)
    
    # 目标函数：最大化超额收益 - 换手摩擦惩罚 - 行业偏离惩罚
    turnover = cp.norm1(w - prev_weights)
    obj = cp.Maximize(alpha_scores @ w - 0.002 * turnover)
    
    constraints = [
        cp.sum(w) == 1.0,           # 全仓约束
        w >= 0.0,                   # 禁止做空 A股现货
        w <= 0.08,                  # 单只股票上限 8%
        cp.norm_inf(industry_matrix.T @ w) <= 0.20, # 行业敞口上限 20%
        turnover <= max_turnover     # 换手率约束
    ]
    
    prob = cp.Problem(obj, constraints)
    prob.solve(solver=cp.ECOS)
    return w.value`)}
                  className="flex items-center gap-1 text-[11px] hover:text-white cursor-pointer"
                >
                  {copiedCode === 'port_code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'port_code' ? '已复制' : '复制实现'}</span>
                </button>
              </div>
              <pre className="bg-slate-950 p-4 rounded-b-lg border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
{`import cvxpy as cp
import numpy as np

def optimize_portfolio(alpha_scores, industry_matrix, prev_weights, max_turnover=0.3):
    """
    使用二次规划进行风险中性与换手惩罚权重分配
    alpha_scores: (N,) 模型预测截面超额
    industry_matrix: (N, K) 申万一级行业哑变量矩阵
    prev_weights: (N,) 上期持仓权重
    """
    n = len(alpha_scores)
    w = cp.Variable(n)
    
    # 目标函数：最大化超额收益 - 换手摩擦惩罚 - 行业偏离惩罚
    turnover = cp.norm1(w - prev_weights)
    obj = cp.Maximize(alpha_scores @ w - 0.002 * turnover)
    
    constraints = [
        cp.sum(w) == 1.0,           # 全仓约束
        w >= 0.0,                   # 禁止做空 A股现货
        w <= 0.08,                  # 单只股票上限 8%
        cp.norm_inf(industry_matrix.T @ w) <= 0.20, # 行业敞口上限 20%
        turnover <= max_turnover     # 换手率约束
    ]
    
    prob = cp.Problem(obj, constraints)
    prob.solve(solver=cp.ECOS)
    return w.value`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
