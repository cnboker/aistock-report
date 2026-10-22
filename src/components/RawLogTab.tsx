import React, { useState } from 'react';
import { Terminal, Search, Bookmark, ChevronRight, FileText, Check, Copy } from 'lucide-react';

interface BookmarkItem {
  title: string;
  line: string;
  keyword: string;
  snippet: string;
}

const LOG_BOOKMARKS: BookmarkItem[] = [
  {
    title: '1. 数据清洗与Beta对齐诊断',
    line: 'Line 21 ~ 63',
    keyword: 'stock return 非空比例',
    snippet: `History Filter:
  Total tickers       : 101
  Valid tickers       : 46
  Required history    : 60 days
stock return 非空比例: 0.9978648347567768
market timestamp dtype: Int64
对齐成功，可以正常计算 Beta`
  },
  {
    title: '2. 因子严重缺失率诊断 (Illiq 98.18%)',
    line: 'Line 170 ~ 198',
    keyword: 'BetaNeutral NaN Diagnostic',
    snippet: `===== BetaNeutral NaN Diagnostic =====
DataFrame shape: (21544, 121)
--- Source feature quality: worst 20 ---
                                              missing_pct  valid_count  unique_count
feat_micro_illiq_down_swing_cs                      98.18          393           386
feat_micro_illiq_up_swing_cs                        88.47         2485          2457
feat_money_divergence_month_cs                      34.38        14138         14077
feat_micro_top_vol_ret_mean_day_fortnight_cs        22.13        16777         15861`
  },
  {
    title: '3. 11个核心交互特征完全缺失',
    line: 'Line 413 ~ 425',
    keyword: 'Missing features',
    snippet: `Missing features:
  - beta_feat_inter_money_div_x_illiq_swing_cs
  - beta_feat_inter_vol_std_x_entropy_cs
  - beta_feat_inter_money_div_x_atr_cs
  - beta_feat_inter_product_cs
  - beta_feat_inter_entropy_x_pred_std_cs
  - beta_feat_inter_money_flow_std_x_illiq_cs
  - beta_feat_alpha101_2_cs ... beta_feat_alpha101_101_cs`
  },
  {
    title: '4. LightGBM 第 7 轮过早早停',
    line: 'Line 3755 ~ 3762',
    keyword: 'best_iteration=7',
    snippet: `Training until validation scores don't improve for 80 rounds
[25]	valid_0's ndcg@5: 0.346492
[50]	valid_0's ndcg@5: 0.352696
[75]	valid_0's ndcg@5: 0.352664
Early stopping, best iteration is:
[7]	valid_0's ndcg@5: 0.3952
✅ LightGBM best_iteration=7`
  },
  {
    title: '5. Selection 挑选优化 (均值 +0.638%)',
    line: 'Line 4326 ~ 4341',
    keyword: 'STAGE-3 COMBINED CONFIG',
    snippet: `====================================================================================================
STAGE-3 COMBINED CONFIG
====================================================================================================
架构: GlobalFusion
TopN: 10
Lambda / Research: 0.4000 / 0.6000
FusionColumn: _fusion_0.40_0.60
ResearchFilter: None
Selection method: IC_SELECTOR_THEN_RETURN_RERANK
Status: RESEARCH_CANDIDATE
Selection Mean: +0.6381%
Selection Incremental Alpha: +0.6060%
Selection MaxDD: -6.3530%
Selection periods: 14`
  },
  {
    title: '6. Hold-out 独立盲测崩塌与红线拦截',
    line: 'Line 4344 ~ 4363',
    keyword: 'HOLD-OUT 独立评估',
    snippet: `====================================================================================================
HOLD-OUT 独立评估
====================================================================================================
Hold-out start: 2026-09-09 15:00:00
FusionColumn: _fusion_0.40_0.60
Architecture: GlobalFusion
TopN: 10
Final weights: 0.4 / 0.6
Non-overlap periods: 8
Hold-out Mean: -1.1781%
Hold-out MaxDD: -18.4506%
Hold-out WinRate: 37.50%
Diagnostic periods: 22
Diagnostic Mean: -1.1108%
Final status: HOLD_OUT_EVALUATED
[VALIDITY GATE] Hold-out effective periods 8 < 12; VALIDATED is forbidden.`
  },
  {
    title: '7. 最终稳健选股落盘截面 (Top-9)',
    line: 'Line 4422 ~ 4436',
    keyword: '稳健 Top-10 选股',
    snippet: `==========================================================================================
稳健 Top-10 选股 | mode=fusion | as_of=2026-10-22 15:00:00
==========================================================================================
 rank   ticker  score  momentum      reason
    1 sz002185 0.9822    0.1044 融合分+极端剔除+动量
    2 sh600031 0.9378    0.0051 融合分+极端剔除+动量
    3 sz300037 0.7867    0.0002 融合分+极端剔除+动量
    4 sh603728 0.6800    0.0262 融合分+极端剔除+动量
    5 sz301696 0.6622    0.0047 融合分+极端剔除+动量
    6 sh600487 0.6178    0.0148 融合分+极端剔除+动量
    7 sh600584 0.5644    0.0504 融合分+极端剔除+动量
    8 sh601138 0.5422    0.0059 融合分+极端剔除+动量
    9 sz002156 0.5378    0.0373 融合分+极端剔除+动量
==========================================================================================`
  },
  {
    title: '8. 11阶段总耗时汇总 (179.8s)',
    line: 'Line 4703 ~ 4727',
    keyword: 'PIPELINE SUCCESS',
    snippet: `====================================================================================================
🏁 DAILY QUANT RESEARCH & TRAINING PIPELINE SUMMARY
====================================================================================================
Stage                                   Status            Time
-----------------------------------------------------------------
Data Prepare                            PASS           0.879s
stock_beta_hs300_swing                  PASS           2.277s
cs Data Prepare                         PASS          62.485s
Label Data Prepare                      PASS           9.442s
Research Alpha Pipeline                 PASS          33.208s
export Alpha Genome                     PASS           0.048s
Model Training & Production Freeze      PASS          14.443s
Dual Alpha research_alpha_dataset preparePASS           1.077s
Dual Alpha lambda_alpha_dataset prepare PASS           1.244s
dual_alpha_dataset_builder              PASS           1.184s
Dual Alpha Pipeline                     PASS          53.512s
-----------------------------------------------------------------
Pipeline status : PASS
Total elapsed   : 179.807s`
  }
];

export const RawLogTab: React.FC = () => {
  const [selectedBookmark, setSelectedBookmark] = useState<BookmarkItem>(LOG_BOOKMARKS[5]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);

  const filteredBookmarks = LOG_BOOKMARKS.filter(bm => 
    bm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bm.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bm.keyword.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Search & Fast Bookmark Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              原始日志关键节点快速定位与交叉验证
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              直接索引 <code className="text-slate-300 font-mono">/public/assets/aistudio/logs_723b300c.txt</code> 核心段落
            </p>
          </div>
          
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索日志关键字 (如 Hold-out, Illiq, 002185)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Quick Keyword Badges */}
        <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
          <span className="text-slate-400">热搜定位:</span>
          {['HOLD-OUT 独立评估', 'best_iteration=7', 'missing_pct', 'sz002185', 'Missing features', 'Selection Mean'].map((kw, i) => (
            <button
              key={i}
              onClick={() => setSearchQuery(kw)}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] cursor-pointer transition-colors"
            >
              {kw}
            </button>
          ))}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[11px] cursor-pointer"
            >
              重置筛选
            </button>
          )}
        </div>
      </div>

      {/* Main split: Bookmark list vs Content view */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Bookmarks */}
        <div className="lg:col-span-5 space-y-2">
          {filteredBookmarks.map((bm, idx) => {
            const isSelected = selectedBookmark.title === bm.title;
            return (
              <div
                key={idx}
                onClick={() => setSelectedBookmark(bm)}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-950/40 border-indigo-500 text-white shadow-md'
                    : 'bg-slate-900/80 border-slate-800/80 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span>{bm.title}</span>
                  <span className="text-[10px] font-mono text-slate-500">{bm.line}</span>
                </div>
                <div className="text-[11px] font-mono text-slate-400 truncate">
                  关键词: <span className="text-cyan-400">{bm.keyword}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Content Viewer */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-indigo-400" />
                  {selectedBookmark.title}
                </h4>
                <span className="text-[11px] font-mono text-slate-400">
                  行号范围: {selectedBookmark.line} · 锚点: {selectedBookmark.keyword}
                </span>
              </div>
              <button
                onClick={() => handleCopy(selectedBookmark.snippet)}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
              >
                {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet ? '已复制' : '复制原文'}</span>
              </button>
            </div>

            <pre className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed max-h-[460px] overflow-y-auto whitespace-pre">
              {selectedBookmark.snippet}
            </pre>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>日志总规模: 4,728 行 (213,871 字节)</span>
            <span className="text-emerald-400">全流水线运行记录真实完整</span>
          </div>
        </div>
      </div>
    </div>
  );
};
