"use client"

interface NavigationTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
  const tabs = [
    { id: 'process', label: 'Procesar Transcripción', icon: '📝' },
    { id: 'decimas', label: 'Décimas Formateadas', icon: '📖' },
    { id: 'analysis', label: 'Análisis Completo', icon: '📊' },
    { id: 'export', label: 'Exportar Resultados', icon: '⬇️' },
    { id: 'demo', label: 'Demostración', icon: '▶️' },
    { id: 'education', label: 'Educación Histórica', icon: '📚' },
  ]

  return (
    <div className="sticky top-[60px] z-40 bg-[#F5E6D3] px-4 py-3">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border-2 border-[#C8A05C]/20">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`nav-tab flex items-center gap-2 whitespace-nowrap px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'active bg-[#D2691E] text-white'
                    : 'text-[#5C4033] hover:bg-[#C8A05C]/20'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
            {/* About button - separated */}
            <button
              onClick={() => onTabChange('about')}
              className="nav-tab flex items-center gap-2 ml-2 border-l-2 border-[#C8A05C]/30 pl-4 px-3 py-2 rounded-lg text-sm font-medium text-[#5C4033] hover:bg-[#C8A05C]/20 transition-all"
            >
              <span>🌴</span>
              <span className="hidden sm:inline">Acerca de</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
