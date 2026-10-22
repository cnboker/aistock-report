/**
 * Structured dataset extracted from /public/assets/aistudio/logs_723b300c.txt
 */

export interface PipelineStage {
  id: string;
  name: string;
  command: string;
  status: 'PASS' | 'FAIL';
  elapsed: number;
  outputArtifacts?: string[];
  description: string;
}

export interface FactorAttribution {
  feature: string;
  category: 'ALPHA' | 'RISK' | 'UNKNOWN';
  sign: number;
  quality: number;
  validationIc: number;
  stabilityScore: number;
  positiveFoldRatio: number;
  icRetention: number;
  status: 'VALID' | 'OBSERVE' | 'INVALID' | 'MISSING_FEATURE' | 'NO_GENE';
  primaryCause?: string;
  archetype?: string;
}

export interface ArchitectureComparison {
  rank: number;
  architecture: string;
  topN: number;
  meanReturn: number;
  winRate: number;
  maxDD: number;
  incrementalAlpha: number;
  spread: number;
  periods: number;
  score: number;
  lambdaWeight?: number;
  researchWeight?: number;
  eligible: boolean;
}

export interface StockPick {
  rank: number;
  ticker: string;
  name: string;
  score: number;
  momentum: number;
  reason: string;
  sector: string;
}

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 'stage-1',
    name: 'Data Prepare',
    command: 'python -m quant_research.data_prepare.pipeline',
    status: 'PASS',
    elapsed: 0.879,
    description: '清洗 strategy_features.csv (33,348行)，排重与时间戳规整，生成 clean parquet'
  },
  {
    id: 'stage-2',
    name: 'stock_beta_hs300_swing',
    command: 'python -m quant_research.common.beta.market_beta_builder',
    status: 'PASS',
    elapsed: 2.277,
    description: '计算标的相对于沪深300指数的动态波段Beta (stock_beta_hs300_swing)'
  },
  {
    id: 'stage-3',
    name: 'cs Data Prepare (Feature Pipeline)',
    command: 'python -m quant_research.feature_pipeline.pipeline',
    status: 'PASS',
    elapsed: 62.485,
    description: '运行微观结构(20)、截面排位(10)、信息熵(8)、波动率(20)、资金流(18)及Beta/行业中性化与正交化'
  },
  {
    id: 'stage-4',
    name: 'Label Data Prepare',
    command: 'python -m quant_research.label_dataset_builder.label_pipeline',
    status: 'PASS',
    elapsed: 9.442,
    description: '构建语义多周期标签 (Trend Multi Horizon Label & Defense Label)'
  },
  {
    id: 'stage-5',
    name: 'Research Alpha Pipeline (Gene Mining)',
    command: 'python -m quant_research.research_alpha_engine.pipeline',
    status: 'PASS',
    elapsed: 33.208,
    description: '54个因子阈值挖掘 (W01-W10 步进向前)、基因验证与稳定性归因'
  },
  {
    id: 'stage-6',
    name: 'export Alpha Genome',
    command: 'python -m quant_research.research_alpha_engine.gene.alpha_genome',
    status: 'PASS',
    elapsed: 0.048,
    description: '导出筛选后的15个核心特征因子库 (alpha_genome.yaml)'
  },
  {
    id: 'stage-7',
    name: 'Model Training & Production Freeze (LambdaRank)',
    command: 'python -m quant_research.lambda_alpha_engine.training.train',
    status: 'PASS',
    elapsed: 14.443,
    description: 'LightGBM Learning-to-Rank 模型训练，NDCG@5早停在第7轮，生成生产模型'
  },
  {
    id: 'stage-8',
    name: 'Dual Alpha research_alpha_dataset',
    command: 'python -m quant_research.dual_alpha.historical_research_alpha_builder',
    status: 'PASS',
    elapsed: 1.077,
    description: '构建因子核心分 + 负向风险扣分 + 绝对/相对动量门禁融合分'
  },
  {
    id: 'stage-9',
    name: 'Dual Alpha lambda_alpha_dataset',
    command: 'python -m quant_research.dual_alpha.historical_lambda_alpha_builder',
    status: 'PASS',
    elapsed: 1.244,
    description: '生成历史 LambdaRank 模型截面打分与预测序列'
  },
  {
    id: 'stage-10',
    name: 'dual_alpha_dataset_builder',
    command: 'python -m quant_research.dual_alpha.dual_alpha_dataset_builder',
    status: 'PASS',
    elapsed: 1.184,
    description: '无损内联 Base, Research, Lambda 数据集 (21,544行 × 55列)'
  },
  {
    id: 'stage-11',
    name: 'Dual Alpha Pipeline (Selection/Hold-out)',
    command: 'python -m quant_research.dual_alpha.pipeline',
    status: 'PASS',
    elapsed: 53.512,
    description: '53组架构横向竞争，权重敏感性扫描，独立 Hold-out 盲测与截面选股落盘'
  }
];

export const TOP_INVESTIGATED_GENES: FactorAttribution[] = [
  {
    feature: 'beta_feat_vol_down_ratio_fortnight_cs',
    category: 'ALPHA',
    sign: 1,
    quality: 0.8358,
    validationIc: 0.1580,
    stabilityScore: 1.0000,
    positiveFoldRatio: 1.0000,
    icRetention: 1.4632,
    status: 'VALID',
    primaryCause: 'NONE',
    archetype: 'MIXED_FAILURE'
  },
  {
    feature: 'beta_feat_atr_pct_cs',
    category: 'ALPHA',
    sign: -1,
    quality: 0.8182,
    validationIc: 0.1385,
    stabilityScore: 1.0000,
    positiveFoldRatio: 1.0000,
    icRetention: 1.0606,
    status: 'VALID',
    primaryCause: 'NONE',
    archetype: 'MIXED_FAILURE'
  },
  {
    feature: 'beta_feat_vol_quality_fortnight_cs',
    category: 'ALPHA',
    sign: -1,
    quality: 0.8020,
    validationIc: 0.1515,
    stabilityScore: 0.9200,
    positiveFoldRatio: 0.8000,
    icRetention: 1.3029,
    status: 'VALID',
    primaryCause: 'NONE',
    archetype: 'MIXED_FAILURE'
  },
  {
    feature: 'beta_feat_vol_std_swing_cs',
    category: 'ALPHA',
    sign: -1,
    quality: 0.7832,
    validationIc: 0.1014,
    stabilityScore: 0.9961,
    positiveFoldRatio: 1.0000,
    icRetention: 1.7507,
    status: 'VALID',
    primaryCause: 'NONE',
    archetype: 'MIXED_FAILURE'
  },
  {
    feature: 'beta_feat_money_divergence_fortnight_cs',
    category: 'ALPHA',
    sign: -1,
    quality: 0.7721,
    validationIc: 0.1186,
    stabilityScore: 0.9200,
    positiveFoldRatio: 0.8000,
    icRetention: 1.6470,
    status: 'VALID',
    primaryCause: 'NONE',
    archetype: 'MIXED_FAILURE'
  },
  {
    feature: 'beta_feat_vol_std_fortnight_cs',
    category: 'ALPHA',
    sign: -1,
    quality: 0.7633,
    validationIc: 0.1183,
    stabilityScore: 0.8955,
    positiveFoldRatio: 0.8000,
    icRetention: 1.0631,
    status: 'VALID',
    primaryCause: 'NONE',
    archetype: 'MIXED_FAILURE'
  },
  {
    feature: 'beta_feat_prediction_confidence_cs',
    category: 'ALPHA',
    sign: 1,
    quality: 0.7624,
    validationIc: 0.1078,
    stabilityScore: 0.9200,
    positiveFoldRatio: 0.8000,
    icRetention: 1.9442,
    status: 'VALID',
    primaryCause: 'NONE',
    archetype: 'MIXED_FAILURE'
  },
  {
    feature: 'beta_feat_micro_voi_skew_fortnight_cs',
    category: 'ALPHA',
    sign: -1,
    quality: 0.7253,
    validationIc: 0.0932,
    stabilityScore: 0.8735,
    positiveFoldRatio: 0.8000,
    icRetention: 5.6513,
    status: 'VALID',
    primaryCause: 'NONE',
    archetype: 'MIXED_FAILURE'
  },
  {
    feature: 'beta_feat_entropy_signal_score_cs',
    category: 'ALPHA',
    sign: 1,
    quality: 0.7210,
    validationIc: 0.0934,
    stabilityScore: 0.8598,
    positiveFoldRatio: 0.8000,
    icRetention: 2.0118,
    status: 'VALID',
    primaryCause: 'NONE',
    archetype: 'MIXED_FAILURE'
  },
  {
    feature: 'beta_feat_atr_cs',
    category: 'ALPHA',
    sign: -1,
    quality: 0.7062,
    validationIc: 0.0870,
    stabilityScore: 0.8657,
    positiveFoldRatio: 0.8000,
    icRetention: 0.9370,
    status: 'VALID',
    primaryCause: 'NONE',
    archetype: 'MIXED_FAILURE'
  },
  {
    feature: 'beta_feat_vol_std_month_cs',
    category: 'ALPHA',
    sign: -1,
    quality: 0.7030,
    validationIc: 0.0952,
    stabilityScore: 0.7982,
    positiveFoldRatio: 0.6000,
    icRetention: 2.3046,
    status: 'VALID',
    primaryCause: 'FOLD_INSTABILITY',
    archetype: 'FOLD_INSTABILITY'
  },
  {
    feature: 'beta_feat_money_divergence_month_cs',
    category: 'ALPHA',
    sign: -1,
    quality: 0.6749,
    validationIc: 0.1061,
    stabilityScore: 0.7693,
    positiveFoldRatio: 0.8000,
    icRetention: 0.6233,
    status: 'VALID',
    primaryCause: 'NONE',
    archetype: 'MIXED_FAILURE'
  },
  {
    feature: 'beta_feat_prediction_std_cs',
    category: 'ALPHA',
    sign: -1,
    quality: 0.6651,
    validationIc: 0.0697,
    stabilityScore: 0.8363,
    positiveFoldRatio: 0.8000,
    icRetention: 0.9595,
    status: 'VALID',
    primaryCause: 'NONE',
    archetype: 'MIXED_FAILURE'
  },
  {
    feature: 'beta_feat_vol_std_fast_cs',
    category: 'ALPHA',
    sign: -1,
    quality: 0.6606,
    validationIc: 0.0661,
    stabilityScore: 0.8439,
    positiveFoldRatio: 0.8000,
    icRetention: 1.1362,
    status: 'VALID',
    primaryCause: 'NONE',
    archetype: 'MIXED_FAILURE'
  },
  {
    feature: 'beta_feat_entropy_prediction_cs',
    category: 'ALPHA',
    sign: -1,
    quality: 0.6579,
    validationIc: 0.0746,
    stabilityScore: 0.7875,
    positiveFoldRatio: 0.8000,
    icRetention: 0.8522,
    status: 'VALID',
    primaryCause: 'NONE',
    archetype: 'MIXED_FAILURE'
  },
  // Sample failing factors to illustrate root causes
  {
    feature: 'beta_feat_micro_voi_mean_day_cs',
    category: 'ALPHA',
    sign: 1,
    quality: 0.0,
    validationIc: -0.0447,
    stabilityScore: 0.3534,
    positiveFoldRatio: 0.6000,
    icRetention: 0.2514,
    status: 'OBSERVE',
    primaryCause: 'STABILITY_SCORE_FAILURE',
    archetype: 'GLOBAL_FAILURE'
  },
  {
    feature: 'beta_feat_micro_vol_price_corr_swing_cs',
    category: 'ALPHA',
    sign: -1,
    quality: 0.0,
    validationIc: -0.0358,
    stabilityScore: 0.3517,
    positiveFoldRatio: 0.4000,
    icRetention: -4.2684,
    status: 'OBSERVE',
    primaryCause: 'IC_RETENTION_FAILURE',
    archetype: 'GLOBAL_FAILURE'
  },
  {
    feature: 'beta_feat_slope_cs',
    category: 'ALPHA',
    sign: -1,
    quality: 0.0,
    validationIc: -0.0730,
    stabilityScore: 0.1742,
    positiveFoldRatio: 0.0000,
    icRetention: -2.5185,
    status: 'OBSERVE',
    primaryCause: 'IC_RETENTION_FAILURE',
    archetype: 'GLOBAL_FAILURE'
  },
  {
    feature: 'beta_feat_micro_illiq_down_swing_cs',
    category: 'RISK',
    sign: 0,
    quality: 0.0,
    validationIc: -0.2892,
    stabilityScore: 0.2000,
    positiveFoldRatio: 0.0000,
    icRetention: 0.0,
    status: 'INVALID',
    primaryCause: 'IC_RETENTION_FAILURE',
    archetype: 'GLOBAL_FAILURE'
  }
];

export const ARCHITECTURE_CANDIDATES: ArchitectureComparison[] = [
  {
    rank: 1,
    architecture: 'GlobalFusion',
    topN: 10,
    meanReturn: 0.0049,
    winRate: 0.6429,
    maxDD: -0.0656,
    incrementalAlpha: 0.0046,
    spread: 0.0024,
    periods: 14,
    score: 0.8382,
    lambdaWeight: 0.6,
    researchWeight: 0.4,
    eligible: true
  },
  {
    rank: 2,
    architecture: 'GlobalFusion',
    topN: 10,
    meanReturn: 0.0043,
    winRate: 0.6429,
    maxDD: -0.0791,
    incrementalAlpha: 0.0040,
    spread: 0.0018,
    periods: 14,
    score: 0.8138,
    lambdaWeight: 0.7,
    researchWeight: 0.3,
    eligible: true
  },
  {
    rank: 3,
    architecture: 'GlobalFusion',
    topN: 10,
    meanReturn: 0.0058,
    winRate: 0.5000,
    maxDD: -0.0560,
    incrementalAlpha: 0.0055,
    spread: 0.0033,
    periods: 14,
    score: 0.7878,
    lambdaWeight: 0.5,
    researchWeight: 0.5,
    eligible: true
  },
  {
    rank: 4,
    architecture: 'GlobalFusion (Selected)',
    topN: 10,
    meanReturn: 0.0064,
    winRate: 0.4286,
    maxDD: -0.0635,
    incrementalAlpha: 0.0061,
    spread: 0.0038,
    periods: 14,
    score: 0.7780,
    lambdaWeight: 0.4,
    researchWeight: 0.6,
    eligible: true
  },
  {
    rank: 5,
    architecture: 'Research (Pure)',
    topN: 5,
    meanReturn: 0.0130,
    winRate: 0.7143,
    maxDD: -0.0911,
    incrementalAlpha: 0.0000,
    spread: 0.0005,
    periods: 14,
    score: 0.7675,
    lambdaWeight: 0.0,
    researchWeight: 1.0,
    eligible: true
  },
  {
    rank: 6,
    architecture: 'GlobalFusion',
    topN: 5,
    meanReturn: 0.0131,
    winRate: 0.7857,
    maxDD: -0.0448,
    incrementalAlpha: 0.0001,
    spread: 0.0007,
    periods: 14,
    score: 0.7480,
    lambdaWeight: 0.6,
    researchWeight: 0.4,
    eligible: true
  },
  {
    rank: 7,
    architecture: 'Lambda (Pure)',
    topN: 5,
    meanReturn: 0.0124,
    winRate: 0.7857,
    maxDD: -0.0890,
    incrementalAlpha: -0.0005,
    spread: 0.0000,
    periods: 14,
    score: 0.7244,
    lambdaWeight: 1.0,
    researchWeight: 0.0,
    eligible: true
  }
];

export const LATEST_STOCK_PICKS: StockPick[] = [
  { rank: 1, ticker: 'sz002185', name: '华天科技', score: 0.9822, momentum: 0.1044, reason: '融合高分+极端剔除+强正动量(lookback=5)', sector: '半导体封测' },
  { rank: 2, ticker: 'sh600031', name: '三一重工', score: 0.9378, momentum: 0.0051, reason: '融合分次席+平稳动量+Beta中性支撑', sector: '工程机械' },
  { rank: 3, ticker: 'sz300037', name: '银之杰', score: 0.7867, momentum: 0.0002, reason: '金融IT波段动量转正+波动率下行比率高', sector: '金融科技' },
  { rank: 4, ticker: 'sh603728', name: '鸣志电器', score: 0.6800, momentum: 0.0262, reason: '控制电机+资金流分歧收敛+动量门禁通过', sector: '人形机器人/电机' },
  { rank: 5, ticker: 'sz301696', name: '博实结', score: 0.6622, momentum: 0.0047, reason: '次新物联网终端+低波动质量+正向置信度', sector: '通信与物联网' },
  { rank: 6, ticker: 'sh600487', name: '亨通光电', score: 0.6178, momentum: 0.0148, reason: '光通信/海缆+趋势熵低+微观VOI偏度稳定', sector: '通信与电力' },
  { rank: 7, ticker: 'sh600584', name: '长电科技', score: 0.5644, momentum: 0.0504, reason: '封测龙头+短线动量加速+资金失衡修正', sector: '半导体芯片' },
  { rank: 8, ticker: 'sh601138', name: '工业富联', score: 0.5422, momentum: 0.0059, reason: 'AI算力服务器+大市值低波动+Beta剥离超额', sector: '算力硬件' },
  { rank: 9, ticker: 'sz002156', name: '通富微电', score: 0.5378, momentum: 0.0373, reason: '先进封装+资金surge+绝对动量门限通过', sector: '半导体封测' }
];

export const TIER_COMPARISONS = [
  {
    dimension: '数据覆盖与频段',
    tier1: '全市场5000+ A股，逐笔L2高频行情Tick/Orderbook，期现跨市场，毫秒级数据清洗',
    tier2: '中证500/1000/全A 3000+ 标的，1m/5m/日线，基本面+高频微观结构因子',
    tier3: '百只标的以内小池（如本系统46只有效股），30m/日级别特征，历史约数月至1年',
    tier4: '单只股票或宽基ETF，日线/分钟，公开免费接口抓取',
    currentScore: 58,
    evaluation: '当前仅有46只股票、约4个月历史（2026.6-2026.10），统计自由度不足，极度受限。'
  },
  {
    dimension: '因子工程与中性化',
    tier1: '10,000+因子库，遗传算法与LLM自动化生成因子，Barra CNE6精细风格与行业正交',
    tier2: '数百个精细微观/动量/资金流因子，标准化Beta与申万行业中性化，协方差矩阵风险模型',
    tier3: '50~100个特征（本系统54个），已实现Beta中性化、行业中性化与特征正交化（工程很规范）',
    tier4: 'MACD、KDJ等经典技术指标叠加，不做中性化，完全承担市场Beta敞口',
    currentScore: 82,
    evaluation: '工程规整度极佳，有BetaNeutral、IndustryNeutral与正交化，但缺失了11个核心交互特征且Illiq缺失率严重。'
  },
  {
    dimension: 'AI/机器学习模型',
    tier1: 'Transformer时序网络、动态图图神经网络(GNN)、多任务强化学习与深度Alpha池实时蒸馏',
    tier2: 'XGBoost/LightGBM/CatBoost集成，LambdaRank/ListNet排序学习，时序LSTM',
    tier3: 'LightGBM LambdaRank (NDCG@5排序) + 启发式因子核心打分 + 动量门控',
    tier4: '普通回归或分类，甚至无ML模型，硬编码规则阈值',
    currentScore: 78,
    evaluation: '采用了工业界的LambdaRank学习排序架构，方向完全正确；但早停在第7轮（best_iteration=7），受限于过小验证集。'
  },
  {
    dimension: '防过拟合与验证规范',
    tier1: '严格CPCV组合交叉验证、样本外步进滚动(Walk-forward)覆盖多年牛熊与极端危机测试',
    tier2: 'Purged & Embargoed时序切分，严禁前视偏差，独立Hold-out盲测',
    tier3: '具备步进向前验证、Selection与Hold-out严格切分、IC衰减归因，并设拒绝评定硬门槛',
    tier4: '全样本随机打乱K-Fold交叉验证（严重未来函数泄露），过拟合假阳性率近100%',
    currentScore: 85,
    evaluation: '具有极强的量化科研审慎纪律，能主动抛出Hold-out失败拒绝认定，这是很多半路出家团队做不到的。'
  },
  {
    dimension: '投资组合优化与实战执行',
    tier1: '二次规划/凸优化求解器考虑交易成本与冲击，自研FPGA/日内T0/TWAP/VWAP算法交易',
    tier2: '商用优化器(Mosek/Cvxpy)，严格约束跟踪误差与换手率，扣除千分之二至五摩擦成本',
    tier3: 'Top-N等权或简单评分加权（本系统Top-10稳健选股），未见印花税/佣金滑点精细约束',
    tier4: '不考虑滑点，全仓买入卖出，高频摩擦将本金损耗殆尽',
    currentScore: 60,
    evaluation: '缺少组合优化器（Markowitz/风险平价）与交易成本扣减，3天一换手的Swing策略若不扣交易税费，实盘必亏。'
  }
];

export const ROOT_CAUSE_STATS = [
  { cause: 'IC_RETENTION_FAILURE', count: 16, percentage: '37.2%', desc: '样本外IC大幅衰减或方向翻转' },
  { cause: 'NONE (PASS)', count: 15, percentage: '34.9%', desc: '成功晋级Alpha基因候选' },
  { cause: 'FOLD_INSTABILITY', count: 7, percentage: '16.3%', desc: '跨Fold正向IC比例过低，不稳定' },
  { cause: 'STABILITY_SCORE_FAILURE', count: 3, percentage: '7.0%', desc: '跨窗口稳定性得分未达阈值' },
  { cause: 'NO_VALIDATION_ALPHA', count: 2, percentage: '4.6%', desc: '验证集上无有效超额收益能力' }
];
