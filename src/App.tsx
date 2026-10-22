/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { ExecutiveSummaryTab } from './components/ExecutiveSummaryTab';
import { PipelineArchitectureTab } from './components/PipelineArchitectureTab';
import { DeepDiagnosticsTab } from './components/DeepDiagnosticsTab';
import { PicksInspectorTab } from './components/PicksInspectorTab';
import { InvestmentPitchTab } from './components/InvestmentPitchTab';
import { ImprovementPlanTab } from './components/ImprovementPlanTab';
import { RawLogTab } from './components/RawLogTab';
import { ReportModal } from './components/ReportModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('pitch');
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Institutional Quantitative Terminal Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExportReport={() => setIsReportModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'pitch' && <InvestmentPitchTab />}
        {activeTab === 'summary' && <ExecutiveSummaryTab />}
        {activeTab === 'pipeline' && <PipelineArchitectureTab />}
        {activeTab === 'diagnostics' && <DeepDiagnosticsTab />}
        {activeTab === 'picks' && <PicksInspectorTab />}
        {activeTab === 'roadmap' && <ImprovementPlanTab />}
        {activeTab === 'rawlog' && <RawLogTab />}
      </main>

      {/* Audit Report Markdown Export Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      {/* Institutional Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
          <span>量化投研系统全景诊断与评估引擎 · v5.0 Dual Alpha Engine Audit</span>
          <span>日志来源: public/assets/aistudio/logs_723b300c.txt</span>
          <span>执行状态: 11 Stages PASS (179.8s)</span>
        </div>
      </footer>
    </div>
  );
}
