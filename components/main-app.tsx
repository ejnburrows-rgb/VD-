"use client"

import { useState } from 'react'
import { NavigationTabs } from './navigation-tabs'
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
      <NavigationTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <main className="min-h-screen bg-[#F5E6D3]" id="main-content">
        {activeTab === 'process' && <ProcessingSection />}
        {activeTab === 'decimas' && <DecimalsSection />}
        {activeTab === 'analysis' && <AnalysisSection />}
        {activeTab === 'export' && <ExportSection />}
        {activeTab === 'demo' && <DemoSection />}
        {activeTab === 'education' && <EducationSection />}
      </main>

      <AboutModal open={aboutModalOpen} onOpenChange={setAboutModalOpen} />
    </>
  )
}
