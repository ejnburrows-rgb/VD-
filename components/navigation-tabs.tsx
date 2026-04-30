
"use client";

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: 'procesar' | 'decimals' | 'analysis' | 'export' | 'demo' | 'education') => void;
  onAboutClick: () => void;
}

export default function NavigationTabs({ activeTab, onTabChange, onAboutClick }: NavigationTabsProps) {
  const tabs = [
    { id: 'procesar', label: 'Procesar Transcripción', icon: '📝' },
    { id: 'decimals', label: 'Décimas Formateadas', icon: '📖' },
    { id: 'analysis', label: 'Análisis Completo', icon: '📊' },
    { id: 'export', label: 'Exportar Resultados', icon: '⬇️' },
    { id: 'demo', label: 'Demostración', icon: '▶️' },
    { id: 'education', label: 'Educación Histórica', icon: '📚' }
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
        <button
          onClick={onAboutClick}
          className="nav-tab flex items-center gap-2 ml-2 border-l-2 border-[#C8A05C]/30 pl-4"
        >
          <span>⭐</span>
          <span className="hidden sm:inline">Acerca de</span>
        </button>
      </div>
    </div>
  );
}
