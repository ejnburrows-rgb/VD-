
"use client";

import { useState } from "react";
import NavigationTabs from "@/components/navigation-tabs";
import { ProcessingSection } from "@/components/processing-section";
import { DecimalsSection } from "@/components/decimals-section";
import { AnalysisSection } from "@/components/analysis-section";
import { ExportSection } from "@/components/export-section";
import DemoSection from "@/components/demo-section";
import { EducationSection } from "@/components/education-section";
import AboutSection from "@/components/about-section";

type TabType = 'procesar' | 'decimals' | 'analysis' | 'export' | 'demo' | 'education' | 'about';

export function MainApp() {
  const [activeTab, setActiveTab] = useState<TabType>('procesar');

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'procesar':
        return <ProcessingSection />;
      case 'decimals':
        return <DecimalsSection />;
      case 'analysis':
        return <AnalysisSection />;
      case 'export':
        return <ExportSection />;
      case 'demo':
        return <DemoSection />;
      case 'education':
        return <EducationSection />;
      case 'about':
        return <AboutSection />;
      default:
        return <ProcessingSection />;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <NavigationTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="mt-8">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
}
