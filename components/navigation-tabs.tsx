
"use client";

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: 'procesar' | 'decimals' | 'analysis' | 'export' | 'demo' | 'education' | 'tributo' | 'about') => void;
}

export default function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
  const tabs = [
    { id: 'procesar', label: 'Procesar', icon: '📝' },
    { id: 'decimals', label: 'Décimas', icon: '📖' },
    { id: 'analysis', label: 'Análisis', icon: '📊' },
    { id: 'export', label: 'Exportar', icon: '⬇️' },
    { id: 'demo', label: 'Demo', icon: '▶️' },
    { id: 'education', label: 'Educación', icon: '🎓' },
    { id: 'tributo', label: 'Tributo', icon: '🌴' },
    { id: 'about', label: 'Acerca de', icon: '⭐' }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border-2 border-[#C8A05C]/20">
      <div className="flex flex-wrap justify-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as any)}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''} flex items-center gap-2 whitespace-nowrap`}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
