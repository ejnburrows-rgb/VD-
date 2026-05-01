"use client";

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: 'procesar' | 'decimals' | 'analysis' | 'export' | 'demo' | 'education' | 'about') => void;
}

export default function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
  const tabs = [
    { id: 'procesar', label: 'Procesar' },
    { id: 'decimals', label: 'Décimas' },
    { id: 'analysis', label: 'Análisis' },
    { id: 'export', label: 'Exportar' },
    { id: 'demo', label: 'Demo' },
    { id: 'education', label: 'Educación' },
    { id: 'about', label: 'Acerca de' }
  ];

  return (
    <div className="tab-bar backdrop-blur-sm rounded-2xl p-2 shadow-lg border-2 border-[var(--vd-accent-gold)]/20">
      <div className="flex flex-wrap justify-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as any)}
            className={`nav-tab ${activeTab === tab.id ? 'active tab-active' : ''} flex items-center whitespace-nowrap`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
