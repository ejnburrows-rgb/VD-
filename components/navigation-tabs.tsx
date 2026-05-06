"use client"

interface NavigationTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
  const tabs = [
    { id: 'process', icon: '📝', title: 'Procesar' },
    { id: 'decimas', icon: '📖', title: 'Décimas' },
    { id: 'analysis', icon: '📊', title: 'Análisis' },
    { id: 'export', icon: '⬇️', title: 'Exportar' },
    { id: 'demo', icon: '▶️', title: 'Demo' },
    { id: 'education', icon: '🎓', title: 'Educación' },
    { id: 'about', icon: '🌴', title: 'Acerca de' },
  ]

  return (
    <div className="sticky top-[52px] z-40 bg-[#F5E6D3] px-4 py-2">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-[#F5E6D3] rounded-xl p-2 border-2 border-[#C8A05C]">
          <div className="flex justify-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                title={tab.title}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#D97706] shadow-md'
                    : 'hover:bg-[#C8A05C]/30'
                }`}
              >
                {tab.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
