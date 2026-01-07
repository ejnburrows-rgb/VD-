
"use client";

import { useState } from "react";
import TributeSection from "@/components/tribute-section";
import NavigationTabs from "@/components/navigation-tabs";
import ProcessingSection from "@/components/processing-section";
import DecimalsSection from "@/components/decimals-section";
import AnalysisSection from "@/components/analysis-section";
import ExportSection from "@/components/export-section";
import DemoSection from "@/components/demo-section";
import EducationSection from "@/components/education-section";
import AboutModal from "@/components/about-modal";

type TabType = 'procesar' | 'decimals' | 'analysis' | 'export' | 'demo' | 'education';

export default function MainApp() {
  const [activeTab, setActiveTab] = useState<TabType>('procesar');
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'procesar':
        return <ProcessingSection onVideoProcessed={setCurrentVideoId} />;
      case 'decimals':
        return <DecimalsSection videoId={currentVideoId} />;
      case 'analysis':
        return <AnalysisSection videoId={currentVideoId} />;
      case 'export':
        return <ExportSection videoId={currentVideoId} />;
      case 'demo':
        return <DemoSection />;
      case 'education':
        return <EducationSection />;
      default:
        return <ProcessingSection onVideoProcessed={setCurrentVideoId} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] to-[#E6D7C1]">
      <TributeSection />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <NavigationTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          onAboutClick={() => setShowAboutModal(true)}
        />
        
        <div className="mt-8">
          {renderActiveSection()}
        </div>
      </div>

      <AboutModal 
        isOpen={showAboutModal} 
        onClose={() => setShowAboutModal(false)} 
      />
    </div>
  );
}
