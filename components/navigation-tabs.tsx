"use client"

interface NavigationTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
  const tabs = [
    { id: 'procesar', title: 'Procesar' },
    { id: 'decimas', title: 'Décimas' },
    { id: 'analysis', title: 'Análisis' },
    { id: 'export', title: 'Exportar' },
    { id: 'demo', title: 'Demo' },
    { id: 'education', title: 'Educación' },
  ]

  return (
    <div className="sticky top-[52px] z-40 bg-[#F5E6D3] px-4 py-2 border-b-2 border-[#C8A05C]">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-center flex-wrap gap-1 md:gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3 py-2 rounded-lg font-medium transition-all text-sm md:text-base ${
                activeTab === tab.id
                  ? 'bg-[#8B4513] text-[#F5E6D3] shadow-md'
                  : 'text-[#8B4513] hover:bg-[#C8A05C]/30'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
