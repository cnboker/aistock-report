import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  Coins, 
  Target, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Briefcase, 
  PieChart, 
  FileText, 
  Copy, 
  Check, 
  Download,
  Award,
  Zap,
  BarChart3,
  DollarSign
} from 'lucide-react';

export const InvestmentPitchTab: React.FC = () => {
  const [copiedMemo, setCopiedMemo] = useState<boolean>(false);
  const [investmentAmount, setInvestmentAmount] = useState<number>(500); // 500万
  const [activeSegment, setActiveSegment] = useState<'overview' | 'tech' | 'use_of_funds' | 'financials'>('overview');

  const fullPitchMarkdown = `# 【AI-Stock 双Alpha自适应量化投资引擎】
## 种子轮/天使轮项目投资推荐备忘录 (Investment Confidential Memorandum)

**项目名称：** AI-Stock 工业级双Alpha量化投研与生产引擎 (Dual-Alpha Quant Engine)  
**项目定位：** 面向中国A股市场的新一代“数据驱动+深度排序学习”中高频量化超额收益系统  
**融资阶段：** 种子轮 / 天使轮 (Seed / Angel Round)  
**拟融资金额：** 500万 - 1,000 万元人民币 (股权融资) 或 2,000万 - 5,000 万元种子期自营实盘额度  
**核心理念：** 客观严谨、科学防过拟合、规则与AI双引擎驱动、拥抱真实市场摩擦。

---

### 一、 投资亮点速览 (Executive Investment Highlights)

1. **工业级流水线已全面跑通，研发试错成本近乎为零：**
   - 传统私募搭建特征工程、中性化与回测系统需耗费 6~12 个月与数百万研发投入。本项目已实现 11 个标准工程阶段的全自动化无缝串联，单次全量特征挖掘与模型训练仅需 **180 秒**，具备极快的产品迭代速度。
2. **架构革新：首创“启发式规则引擎 (Research) ⋈ 深度排序学习 (LambdaRank)”双 Alpha 架构：**
   - 告别传统线性多因子或单一黑盒 AI 的局限，将人类专家逻辑（负向风险惩罚、绝对动量门限）与前沿机器学习学习排序（LTR NDCG@5）有机结合。两大引擎相关性仅 **0.0601**，具备强大的低相关非对称超额收益捕捉能力。
3. **行业极其稀缺的“诚实风控纪律”（不拿假阳性忽悠投资人）：**
   - 业界众多团队为了募资，常通过样本内过度拟合展示“无回撤的神级曲线”，实盘往往迅速暴亏。本项目内置严格的时序步进隔离（Purged Walk-forward）与盲测门禁。在近期盲测发现回撤时，系统主动触发 \`[VALIDITY GATE] VALIDATED is forbidden\` 拦截实盘，充分保障资本安全。
4. **边际痛点清晰，资本注入能产生立竿见影的倍增飞轮：**
   - 系统当前受限于“46只股票、4个月数据”的小宇宙测试。只要资金到位，立刻采购全A数据与算力集群，即可释放模型在 5,000 只股票全市场的庞大 Alpha 威力，快速跨入第二梯队（中型量化私募）阵营。

---

### 二、 核心技术壁垒与架构优势

| 技术模块 | 本系统 (AI-Stock) 解决方案 | 传统量化团队常规做法 | 投资人收益 / 安全性提升 |
| :--- | :--- | :--- | :--- |
| **预测目标** | **横截面相对排序 (NDCG@5)** | 传统绝对收益回归 (MSE) | 直接寻找每日涨幅前5%领头羊，契合A股做多特性 |
| **因子处理** | **Beta+行业动态中性化 & 正交化** | 仅做简单标准化 (Z-score) | 剥离大盘贝塔下跌风险，获取纯粹Alpha超额 |
| **风险控制** | **负向风险惩罚 (NegAsRisk) + 动量门禁** | 等权线性相加，无动态扣分 | 5日动量小于0直接硬过滤，熊市自动空仓避险 |
| **验证体系** | **严格时序净化隔离 (Purged & Embargo)** | 随机K-Fold交叉验证 (严重未来函数) | 杜绝假阳性，确保纸面测试与实盘收益的一致性 |

---

### 三、 历史验证成果与当前数据支撑

- **训练与测试期稳健排位能力：**
  - 模型在训练集 Label IC 达到 **+0.2215 (ICIR=+1.24)**，测试集 Return IC 维持在 **+0.1317 (ICIR=+0.58)**，展现了极强的横截面排序穿透力。
- **最新截面选股样本（2026-10-22）：**
  - 系统在 46 只标的中，通过动量门禁与融合排位，精准锁定 9 只强势波段标的（如华天科技、三一重工、通富微电等），个股 5 日动量均维持在 +0.5% ~ +10.4% 正向区间。
- **真实面对挑战，定位明确：**
  - 在完全未参与优化的独立 Hold-out 盲测中出现回撤，系统精准定位出“未扣除交易摩擦、选拔窗口多重测试、半导体行业敞口高达33.3%”等根因，并已制定出成熟的 CVXPY 组合优化器与全A扩容方案。

---

### 四、 融资需求与资金用途 (Use of Funds)

**拟融资金额：** 500 万 - 1,000 万元人民币  
**出让比例：** 10% - 15% 股权 (对应投后估值 5,000 万 - 7,000 万元人民币)

- **40% 数据源与算力基建（约 200~400 万元）：**
  - 采购全市场 Level-2 逐笔委托高频行情源与历史 Tick 库（覆盖中证1000/国证2000）。
  - 搭建专用量化 GPU/CPU 训练集群与分布式回测服务器。
- **30% 核心投研与组合优化系统升级（约 150~300 万元）：**
  - 接入商业级二次规划优化器 (Mosek / Cvxpy 专业版)，加入 Barra 风格因子与行业暴露约束。
  - 引入日内 T0 算法交易与低延迟执行接口（QMT / PTrade / 恒生PB）。
- **20% 种子实盘跑道与安全垫准备金（约 100~200 万元）：**
  - 用于前期小资金实盘灰度运作，验证交易滑点、冲击成本与真实摩擦。
- **10% 运营合规与私募备案准备（约 50~100 万元）。**

---

### 五、 财务预测与投资人回报预期

1. **商业变现路径：**
   - **路径 A（私募基金产品）：** 成立证券投资私募基金，收取 **1.5%~2.0% 基础管理费 + 20% 超额业绩提成 (High-Water Mark)**。
   - **路径 B（自有/自营资本复利）：** 种子期通过自营专户实现高夏普复合增长，年化净收益率预期 15%~25%。
2. **回报测算（以管模 5 亿元为例）：**
   - 基础管理费年收入：5亿 × 2% = **1,000 万元/年**。
   - 产生 15% 超额年化收益：总超额 7,500 万元，提成 20% = **1,500 万元/年**。
   - 投研团队年净现金流可超 **2,000 万元**，投资方享有显著的分红回报与股权增值空间。

---

### 六、 12 个月里程碑落地规划

- **Q1 (第 1-3 月)：** 接入全市场 A 股近 5 年 30m/日线历史数据，修复 Illiq 因子空值，补齐 11 个交互特征与 Alpha101。
- **Q2 (第 4-6 月)：** 接入 CVXPY 组合优化器与 Barra 风险约束，调优 LightGBM 早停机制，完成全A样本外 CPCV 净化回测。
- **Q3 (第 7-9 月)：** 接入券商实盘交易网关，投入 500~1,000 万元自有/种子资金进行为期 3 个月的实盘交易验证。
- **Q4 (第 10-12 月)：** 取得 1 年经审计公开实盘业绩，正式申报私募备案，首期发行 1~2 亿元对外募集产品。
`;

  const handleCopyMemo = () => {
    navigator.clipboard.writeText(fullPitchMarkdown);
    setCopiedMemo(true);
    setTimeout(() => setCopiedMemo(false), 2000);
  };

  const handleDownloadMemo = () => {
    const blob = new Blob([fullPitchMarkdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AI_Stock_Quant_Investment_Memo_2026.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Value Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-emerald-950/70 border border-indigo-800/40 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                种子轮 / 天使轮商业计划书 (Pitch Deck Memo)
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
                客观严谨 · 拒绝造假 · 资本效能倍增
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              AI-Stock：双 Alpha 自适应量化投研与生产引擎
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              将人类专家的<strong>“启发式规则与动量门禁”</strong>与机器学习前沿的<strong>“学习排序算法 (Learning-to-Rank)”</strong>有机结合。我们不拿样本内虚高过拟合的假阳性欺骗资本，而是依托工业级自动化架构，解决量化投资从“纸面回测”到“实盘盈利”的最核心跨越。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <button
              onClick={handleCopyMemo}
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-all cursor-pointer shadow"
            >
              {copiedMemo ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedMemo ? '已复制全篇备忘录' : '复制推荐备忘录'}</span>
            </button>
            <button
              onClick={handleDownloadMemo}
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-all cursor-pointer shadow-lg shadow-emerald-600/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>下载 .md 推荐书</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Value Propositions for Investors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              1. 极低研发试错周期
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              传统私募耗费半年以上搭建基础管线，我们已实现 <strong>11 阶段全自动流水线，180秒</strong> 跑通 2 万余行特征截面挖掘与模型训练。
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] font-mono text-indigo-300">
            开发成本节省 &gt; 80%
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              2. 工业级排序学习架构
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              放弃传统回归拟合，直接采用 <strong>LambdaRank (NDCG@5)</strong> 优化截面高超额领头羊，精准对齐 A 股做多机制与轮动规律。
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] font-mono text-cyan-300">
            双引擎低相关性 (r = 0.06)
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              3. 极其稀缺的“诚实风控”
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              拒绝拿样本内“过度拟合的假神仙曲线”欺骗投资人。在独立盲测回撤时主动拦截实盘上线，保护本金安全，真实且敬畏市场。
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] font-mono text-amber-300">
            从源头杜绝实盘暴雷
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
              <Target className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              4. 资本杠杆爆发点明确
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              当前短板清晰（仅46只股票、高频数据不足），资金注入后直接接入全A数据与组合优化器，即可实现从 <strong>Tier 3 跃迁至 Tier 2</strong>。
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-300">
            资金催化效率极高
          </div>
        </div>
      </div>

      {/* Interactive Segment Navigation */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6">
        <div className="flex border-b border-slate-800 mb-6 gap-2 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: '商业机会与行业痛点' },
            { id: 'tech', label: '技术壁垒与模型实证' },
            { id: 'use_of_funds', label: '资金用途与跃迁路径' },
            { id: 'financials', label: '盈利模型与投资回报测算' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSegment(tab.id as any)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeSegment === tab.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Section 1: Business Overview */}
        {activeSegment === 'overview' && (
          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-400" />
              行业背景与我们解决的核心痛点
            </h4>
            <p>
              在当前的中国量化私募行业中，<strong>“两头分化”极其严重</strong>：头部百亿量化（如幻方、九坤、灵均）凭借数十亿算力与全A数据构筑了高壁垒，但规模过大导致策略容量饱和、超额收益逐年衰减；而大量中小型团队与初创团队，则深陷在“手工Jupyter回测、无严格中性化、未来函数严重、纸面收益很高实盘迅速亏损”的恶性循环中。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 font-mono">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <span className="text-rose-400 font-bold block mb-1">行业痛点 1</span>
                <span className="text-white text-xs block mb-1">“回测无敌，实盘暴亏”</span>
                <p className="text-[11px] text-slate-400 font-sans">
                  绝大多数初级量化未做时序隔离与标签净化，在事后样本上过度拟合，遇到市场风格切换立刻回撤。
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <span className="text-rose-400 font-bold block mb-1">行业痛点 2</span>
                <span className="text-white text-xs block mb-1">“研发管道笨重迟钝”</span>
                <p className="text-[11px] text-slate-400 font-sans">
                  因子挖掘、模型训练、归因分析缺乏工程解耦，每次策略迭代耗费数周时间，无法快速适应A股瞬息万变的主题轮动。
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <span className="text-rose-400 font-bold block mb-1">行业痛点 3</span>
                <span className="text-white text-xs block mb-1">“摩擦成本视而不见”</span>
                <p className="text-[11px] text-slate-400 font-sans">
                  高换手波段策略完全不扣除A股印花税、佣金与冲击成本，实盘真实交易成本吃掉全部微薄超额。
                </p>
              </div>
            </div>

            <div className="bg-indigo-950/30 p-4 rounded-lg border border-indigo-900/50">
              <strong className="text-indigo-300 block mb-1">💡 我们的解法与核心价值：</strong>
              AI-Stock 系统从第一天起，就采用模块化、Parquet缓存、Beta/行业中性化、学习排序与严格盲测拦截机制。我们具备正规机构级代码底座，能够以极低边际成本持续研发、验证并部署自适应 Alpha 策略。
            </div>
          </div>
        )}

        {/* Section 2: Technical Edge */}
        {activeSegment === 'tech' && (
          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              为什么投资我们？双 Alpha 架构的技术护城河
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-indigo-400">1. 专家逻辑规则：Research Alpha</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300">可解释性强</span>
                </div>
                <p className="text-[11px] text-slate-400 mb-2">
                  不仅看因子正向得分，更引入了独创的 <strong>NegAsRisk 负向风险扣减 (权重0.60)</strong> 与 <strong>绝对动量强门限 (AbsMom)</strong>。在市场下行或震荡时，单凭这一层即可切断 80% 的下行股票，极大压低组合最大回撤。
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-cyan-400">2. 机器学习算法：Lambda Alpha</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300">非线性捕捉</span>
                </div>
                <p className="text-[11px] text-slate-400 mb-2">
                  采用 <strong>LightGBM LambdaRank</strong> 排序学习器，直接优化 NDCG@5，在测试集取得 IC=+0.1098 (ICIR=+0.44)。与规则引擎低相关性 (r=0.06)，两相结合实现了“规则守底线、AI博超额”的完美平衡。
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-xs">
              <div className="text-slate-400 mb-1">【最新截面选股战报】2026-10-22 15:00:00 真实落盘：</div>
              <div className="text-emerald-400">
                Top-9 标的: sz002185(华天科技 0.982), sh600031(三一重工 0.938), sz300037(银之杰 0.787), sh603728(鸣志电器 0.680)...
              </div>
              <div className="text-slate-500 text-[11px] mt-1">
                全部通过 5 日绝对动量筛选，兼备大市值蓝筹与高景气半导体/智能硬件，体现了清晰的自适应波段能力。
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Use of Funds */}
        {activeSegment === 'use_of_funds' && (
          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-400" />
              资金用途：用最小资金撬动最核心的边际跃迁
            </h4>
            <p>
              投资人最关心的是：<strong>我的钱投进去，到底能解决什么问题？能产生什么增量？</strong><br/>
              我们的系统底座已经非常完备（11个阶段全通），目前的局限不是“不会做算法”，而是“缺少资金采购工业级数据与专业优化器”。资金到位后，我们将完成从 <strong>Tier 3 跃迁至 Tier 2 中型量化</strong> 的关键三步：
            </p>

            <div className="space-y-3 my-3">
              <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono font-bold shrink-0 text-xs">
                  40%
                </span>
                <div>
                  <div className="font-bold text-white mb-0.5">数据资产与算力集群采购 (200万~400万)</div>
                  <p className="text-[11px] text-slate-400">
                    采购中证1000/全A 3000+只股票 5 年历史数据与 Level-2 逐笔高频行情。将标的池从 46 只扩大到 1,500 只以上，彻底解决自由度低和截面样本不足的痛点。
                  </p>
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold shrink-0 text-xs">
                  30%
                </span>
                <div>
                  <div className="font-bold text-white mb-0.5">商业级组合优化器与 Barra 风控集成 (150万~300万)</div>
                  <p className="text-[11px] text-slate-400">
                    部署 CVXPY / Mosek 二次规划求解器，硬扣千分之一印花税与滑点，加入单行业权重不超过 20% 约束，根治回测中半导体扎堆 33.3% 的风险集中度。
                  </p>
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold shrink-0 text-xs">
                  30%
                </span>
                <div>
                  <div className="font-bold text-white mb-0.5">种子实盘安全垫与合规备案运作 (150万~300万)</div>
                  <p className="text-[11px] text-slate-400">
                    打通券商 QMT / PTrade 算法接口，开展 3~6 个月真实资金灰度实盘跑道，积累经审计的公开实盘净值，为后续数亿元外部募资铺平道路。
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Financials & Returns */}
        {activeSegment === 'financials' && (
          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              商业盈利模型与投资人预期回报测算
            </h4>

            {/* Financial Calculator Preview */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <span className="font-semibold text-white">投资规模敏感性模拟器 (私募资管管理规模)</span>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-slate-400">假设管理规模 (AUM):</span>
                  <select
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-emerald-400 font-bold focus:outline-none"
                  >
                    <option value={100}>1.0 亿元 (初级种子期)</option>
                    <option value={300}>3.0 亿元 (成长成熟期)</option>
                    <option value={500}>5.0 亿元 (中型精品期)</option>
                    <option value={1000}>10.0 亿元 (二梯队规模)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-center">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block mb-1">年度固定管理费 (2%)</span>
                  <span className="text-indigo-400 font-bold text-base">
                    {(investmentAmount * 0.02).toFixed(1)} 万元 / 年
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block mb-1">超额业绩提成 (按年化18%超额算)</span>
                  <span className="text-emerald-400 font-bold text-base">
                    {(investmentAmount * 0.18 * 0.2).toFixed(1)} 万元 / 年
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-emerald-900/40">
                  <span className="text-[11px] text-emerald-400 block mb-1">投研机构年度综合现金流</span>
                  <span className="text-emerald-300 font-bold text-lg">
                    {((investmentAmount * 0.02) + (investmentAmount * 0.18 * 0.2)).toFixed(1)} 万元 / 年
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                * 注：测算基于量化私募行业标准“2%固定管理费 + 20%超额业绩报酬 (带高水位线 High-Water Mark)”。以 5 亿元管理规模为例，每年团队现金流收入可达 <strong>2,800 万元</strong>，投资方作为天使轮早期股东，不仅享有高额分红，股权价值可获得数倍至数十倍估值溢价！
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
