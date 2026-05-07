"use client"

interface NavigationTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
  const tabs = [
    { id: 'process', title: 'Procesar' },
    { id: 'decimas', title: 'Décimas' },
    { id: 'analysis', title: 'Análisis' },
    { id: 'export', title: 'Exportar' },
    { id: 'demo', title: 'Demo' },
    { id: 'education', title: 'Educación' },
    { id: 'about', title: 'Acerca de' },
  ]

  return (
    <div className="sticky top-[52px] z-40 bg-[#F5E6D3] px-4 py-2">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-[#F5E6D3] rounded-xl p-2 border-2 border-[#C8A05C]">
          <div className="flex flex-wrap justify-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-3 py-2 flex items-center justify-center rounded-lg text-sm font-serif font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#D97706] text-[#F5E6D3] shadow-md'
                    : 'text-[#5C4033] hover:bg-[#C8A05C]/30'
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
