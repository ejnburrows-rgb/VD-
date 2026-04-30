"use client";

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: 'procesar' | 'decimals' | 'analysis' | 'export' | 'demo' | 'education' | 'tributo' | 'about') => void;
}

export default function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
  const tabs = [
    { id: 'procesar', label: 'Procesar' },
    { id: 'decimals', label: 'Décimas' },
    { id: 'analysis', label: 'Análisis' },
    { id: 'export', label: 'Exportar' },
    { id: 'demo', label: 'Demo' },
    { id: 'education', label: 'Educación' },
    { id: 'tributo', label: 'Tributo' },
    { id: 'about', label: 'Acerca de' }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border-2 border-[#C8A05C]/20">
      <div className="flex flex-wrap justify-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as any)}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''} flex items-center whitespace-nowrap`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
