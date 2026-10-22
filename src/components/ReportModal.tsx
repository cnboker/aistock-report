import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const fullReportMarkdown = `# 【量化投研系统全景诊断与评估审计研报】
**系统名称：** ai-stock / quant_research (Dual Alpha Architecture)
**审计日志：** logs_723b300c.txt (4,728 行，213 KB)
**审计时间：** 2026-10-22 15:00:00
**审计机构/角色：** 资深量化系统架构师 & 私募投研总监视角

---

## 一、 客观全面评估结论与核心摘要

| 评估维度 | 核心结论 | 评级 / 得分 | 关键指标证据 |
| :--- | :--- | :--- | :--- |
| **系统所处阶段** | **工业级量化投研原型验证期 (Phase 2.5)** | 准生产级 | 11个Stage全自动流水线，179.8s跑通2万余行截面数据；但数据仅4个月、有效股仅46只。 |
| **技术水平评估** | **专业级量化流水线，防过拟合严密，模型早停欠拟合** | 78 / 100 (良好) | 采用工业级 Learning to Rank (NDCG@5) 与双Alpha架构；但第7轮早停，Illiq因子缺失率达98.18%。 |
| **国内梯队定位** | **国内第三梯队头部 (成熟量化团队/精品私募原型)** | Tier 3 前列 | 远超民间散户/初级Jupyter，但距第一梯队头部百亿(幻方/九坤/衍复)在全A池、高频L2与深度模型有算力壁垒。 |
| **核心红线预警** | **Selection 优化挑选过拟合，Hold-out 独立盲测断崖式崩塌** | 强制拦截 (FAIL) | Selection Mean: +0.638% (胜率64%) -> Hold-out Mean: -1.178% (最大回撤 -18.45%，胜率37.5%)。 |

---

## 二、 系统当前处于什么阶段？ (System Stage Evaluation)

### 1. 阶段定性：工业化量化投研管道原型向实盘过渡阶段 (Industrial Prototype / Pre-Production Validation)
- **已完成的核心里程碑：**
  1. **完整工业级工程链条：** 涵盖数据清洗、Beta对齐、微观结构特征计算、截面排位、信息熵计算、多周期语义标签（Day=8, Swing=24, Fortnight=80, Month=160 bars）、机器学习排序训练、双Alpha融合与选股落盘，全程代码高度模块化，运行高效（全流程 179.8 秒全部 PASS）。
  2. **高度科学审慎的防过拟合机制：** 系统设置了严格滞后（strict lag = 6~8）、时序步进切分、Non-overlap周期硬约束，并在独立 Hold-out 收益为负时，系统能够主动抛出：\`[VALIDITY GATE] Hold-out effective periods 8 < 12; VALIDATED is forbidden.\`，严禁假阳性宣传，展现了机构级的科学素养。

- **距离真实资管实盘（Production AUM）的差距：**
  1. **数据跨度过短：** 数据范围仅 2026-06-16 至 2026-10-22（仅约4个月历史），未经过完整牛市、熊市、剧烈震荡及微盘流动性挤兑（如2024年初A股极端行情）检验。
  2. **标的池极其受限：** 原始101只标的经过60天历史过滤后仅剩 **46 只股票**。截面自由度严重受限。
  3. **Hold-out 样本外崩塌：** 选出的配置在未参与优化的盲测期发生 -18.45% 剧烈回撤，尚未达到可承受外部受托资金的风险标准。

---

## 三、 技术处于什么水平？ (Technical Capability Assessment)

### 1. 技术亮点 (Tier-level Strengths)
1. **因子工程规范度高 (82/100)：** 涵盖微观结构（Illiq、VOI偏度、量价相关）、信息熵（趋势熵、信号置信熵）、波动率及资金流分歧，全流程完成 Beta 中性化（对标沪深300）与行业中性化、正交化。
2. **双 Alpha 架构创新设计 (85/100)：**
   - **Research Alpha：** 融合了因子核心分 (Factor Core) + 负向风险扣减 (Neg-As-Risk, 权重0.60) + 绝对/相对动量门禁 (AbsMom 必须5日收益>0，直接过滤80%下行标的)。
   - **Lambda Alpha：** 采用行业前沿的 LightGBM LambdaRank 学习排序框架，优化目标为 NDCG@5，直接对标股票横截面排位能力。
   - **融合层：** 对 53 组架构（GlobalFusion, ConditionalFusion, TwoStage 等）进行参数敏感性网格扫描。

### 2. 技术短板与病灶 (Technical Weaknesses)
1. **模型过早早停与算法欠拟合：** LightGBM 学习率仅 0.005，树深 3，仅迭代 7 步就触发早停 (\`best_iteration=7\`)。主要由于验证集过小（仅8天、60个周期），噪声波动导致 NDCG 早停误判。
2. **因子缺失与极端空值：**
   - 11个交互因子与 Alpha101 在日志中全部报错 \`Feature missing\`。
   - \`feat_micro_illiq_down_swing_cs\` 缺失率达 **98.18%**（有效样本仅 393/21544）。
3. **缺乏组合优化器与交易成本摩擦：** 回测完全未扣除 A 股印花税、佣金与冲击成本。Swing 周期（3天）高换手策略若扣除千分之二摩擦，微薄收益将转为亏损。

---

## 四、 在国内量化界大概在哪个梯队？ (Domestic Quant Tier Benchmark)

- **国内量化私募行业四级梯队标准：**
  - **第一梯队 (头部百亿量化，如幻方、九坤、灵均、鸣石、衍复、宽德、明汯)：** 全A 5000+标的、L2高频Tick与逐笔订单簿、Transformer/GNN时序网络、C++/FPGA极速执行、万分之一内冲击滑点控制、Barra多因子风险模型。
  - **第二梯队 (腰部中型量化，10亿~50亿)：** 中证500/1000/全A体系，自动化特征流水线，LightGBM/XGBoost结合时序模型，滚动几年Walk-forward，商用优化器(Mosek/CVXPY)。
  - **第三梯队 (小型精品量化 / 5亿以下私募 / 专业自营工作室原型) —— 【本系统定位】：** 具备规范的代码框架与工业级流水线，采用现代学习排序算法与中性化处理，但受限于标的池（46只）、数据历史（4个月）、微观数据深度及摩擦建模。
  - **第四梯队 (个人业余量化 / 初级技术分析)：** 单机Jupyter、简单均线MACD、无中性化、严重未来函数。

**定级结论：国内第三梯队头部（稳居 Tier 3，具备二梯队的工程架构底座，但受限于数据宽度与实盘摩擦闭环）。**

---

## 五、 具体改进与优化落地技术方案 (Actionable Engineering Roadmap)

### 1. 数据层全A扩容与缺失治理
- 将标的池从 46 只扩容至 **中证1000 / 国证2000 全A池 (1500~2000只)**。
- 数据跨度拓展至 2020~2026 年（至少 5 年），跨越牛熊与极端流动性冲击。
- 修复 Illiq 因子除零错误，加入平滑系数 $\epsilon = 10^{-6}$，停牌个股采用截面中位数填充。

### 2. 补齐 11 个缺失交互特征与 Alpha101 库
- 补充 \`InteractionBuilder\`，生成资金背离与流动性比率的非线性乘积。
- 注入 WorldQuant Alpha101 核心公式（Alpha#2, #4, #6, #12, #101）。

### 3. 破除 Hold-out 崩塌：引入组合净化交叉验证 (CPCV) 与 DSR 折现
- 废止在同一段 OOS 数据上暴力扫描 53 组权重的后视挑选做法。
- 引入 Marcos López de Prado 组合净化交叉验证 (CPCV)，设置 Purging 与 Embargo。
- 使用 Deflated Sharpe Ratio (DSR) 扣减多重测试惩罚。

### 4. 解决 LightGBM 第 7 轮早停与欠拟合
- 提高学习率至 0.02 ~ 0.03，限制最少迭代次数 \`min_iterations = 40\`。
- 扩大验证集时间跨度至 60 个交易日以上。

### 5. 交易摩擦成本扣除与 Barra 行业约束优化器
- 调仓底座硬扣双边交易成本 0.15%（印花税+佣金+滑点）。
- 部署 CVXPY 二次规划组合优化器，强制约束单一行业权重 $\le 20\%$，个股权重 $\le 8\%$，彻底杜绝半导体封测同质化扎堆（33.3%）风险。
`;

  const handleDownload = () => {
    const blob = new Blob([fullReportMarkdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `quant_research_system_audit_report_20261022.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(fullReportMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">
              量化投研系统全景诊断与评估正式审计报告 (Markdown)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '已复制全篇' : '复制全文'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>下载 .md 研报</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed space-y-4 bg-slate-950/40">
          <pre className="whitespace-pre-wrap font-sans">
            {fullReportMarkdown}
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>字数统计: ~3,200 字 · 覆盖系统 11 个阶段与全部日志诊断点</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs transition-colors cursor-pointer"
          >
            关闭窗口
          </button>
        </div>
      </div>
    </div>
  );
};
