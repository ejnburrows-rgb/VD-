
"use client";

import { useState } from "react";
import TributeSection from "@/components/tribute-section";
import NavigationTabs from "@/components/navigation-tabs";
import ProcessingSection from "@/components/processing-section";
import ProcessingSectionRefactored from "@/components/processing-section-refactored";
import DecimalsSection from "@/components/decimals-section";
import AnalysisSection from "@/components/analysis-section";
import ExportSection from "@/components/export-section";
import DemoSection from "@/components/demo-section";
import EducationSection from "@/components/education-section";
import AboutModal from "@/components/about-modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type TabType = 'procesar' | 'decimals' | 'analysis' | 'export' | 'demo' | 'education';

export default function MainApp() {
  const [activeTab, setActiveTab] = useState<TabType>('procesar');
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [useNewPipeline, setUseNewPipeline] = useState(true); // Default to new pipeline

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'procesar':
        return useNewPipeline ? 
          <ProcessingSectionRefactored onVideoProcessed={setCurrentVideoId} /> : 
          <ProcessingSection onVideoProcessed={setCurrentVideoId} />;
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
        return useNewPipeline ? 
          <ProcessingSectionRefactored onVideoProcessed={setCurrentVideoId} /> : 
          <ProcessingSection onVideoProcessed={setCurrentVideoId} />;
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
        
        {/* Pipeline Mode Toggle (only show on processing tab) */}
        {activeTab === 'procesar' && (
          <div className="mt-4 flex justify-center">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full p-2 border-2 border-[#C8A05C]/20">
              <Button
                onClick={() => setUseNewPipeline(false)}
                variant={!useNewPipeline ? "default" : "ghost"}
                className={`rounded-full ${!useNewPipeline ? 'bg-[#C8A05C]' : ''}`}
                size="sm"
              >
                Modo Perplexity (Manual)
              </Button>
              <Button
                onClick={() => setUseNewPipeline(true)}
                variant={useNewPipeline ? "default" : "ghost"}
                className={`rounded-full ${useNewPipeline ? 'bg-[#D2691E]' : ''}`}
                size="sm"
              >
                Pipeline IA Multi-Etapa
                <Badge className="ml-2 bg-green-600 text-white">NUEVO</Badge>
              </Button>
            </div>
          </div>
        )}
        
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
