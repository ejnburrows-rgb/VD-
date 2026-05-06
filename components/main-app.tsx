"use client"

import { useState } from 'react'
import { Header } from './header'
import { HeroSection } from './hero-section'
import { NavigationTabs } from './navigation-tabs'
import { TributeSection } from './tribute-section'
import { EducationSection } from './education-section'
import { SiteFooter } from './footer'
import dynamic from 'next/dynamic'

// Dynamically import complex components to optimize initial load
const ProcessingSection = dynamic(() => import('./processing-section').then(m => ({ default: m.ProcessingSection })))
const DecimalsSection = dynamic(() => import('./decimals-section').then(m => ({ default: m.DecimalsSection })))
const AnalysisSection = dynamic(() => import('./analysis-section').then(m => ({ default: m.AnalysisSection })))
const ExportSection = dynamic(() => import('./export-section').then(m => ({ default: m.ExportSection })))
const DemoSection = dynamic(() => import('./demo-section'))

export function MainApp() {
  const [activeTab, setActiveTab] = useState<'procesar' | 'decimas' | 'analysis' | 'export' | 'demo' | 'education'>('procesar')

  return (
    <div className="min-h-screen bg-[#F5E6D3] text-[#5C4033]">
      <Header />
      <HeroSection />
      
      <div className="container mx-auto max-w-6xl py-8">
        <NavigationTabs activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab as any)} />
        
        <main id="main-content" className="mt-8 transition-all duration-300">
          {activeTab === 'procesar' && <ProcessingSection />}
          {activeTab === 'decimas' && <DecimalsSection />}
          {activeTab === 'analysis' && <AnalysisSection />}
          {activeTab === 'export' && <ExportSection />}
          {activeTab === 'demo' && <DemoSection />}
          {activeTab === 'education' && <EducationSection />}
        </main>
      </div>

      <TributeSection />
      <SiteFooter />
    </div>
  )
}
