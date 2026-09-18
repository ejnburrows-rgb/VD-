"use client"

import { useState } from 'react'
import { NavigationTabs } from './navigation-tabs'
import { TributeSection } from './tribute-section'
import { ProcessingSection } from './processing-section'
import { DecimalsSection } from './decimals-section'
import { AnalysisSection } from './analysis-section'
import { ExportSection } from './export-section'
import DemoSection from './demo-section'
import { EducationSection } from './education-section'
import { AboutModal } from './about-modal'

export function MainApp() {
  const [activeTab, setActiveTab] = useState('process')
  const [aboutModalOpen, setAboutModalOpen] = useState(false)

  const handleTabChange = (tab: string) => {
    if (tab === 'about') {
      setAboutModalOpen(true)
    } else {
      setActiveTab(tab)
    }
  }

  return (
    <>
      <TributeSection />
      <NavigationTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <main className="min-h-screen bg-[#120B08]" id="main-content">
        <div className="mx-auto max-w-6xl px-3 py-8 md:px-6 md:py-12">
          {activeTab === 'process' && <ProcessingSection />}
          {activeTab === 'decimas' && <DecimalsSection />}
          {activeTab === 'analysis' && <AnalysisSection />}
          {activeTab === 'export' && <ExportSection />}
          {activeTab === 'demo' && <DemoSection />}
          {activeTab === 'education' && <EducationSection />}
        </div>
      </main>

      <AboutModal open={aboutModalOpen} onOpenChange={setAboutModalOpen} />
    </>
  )
}
