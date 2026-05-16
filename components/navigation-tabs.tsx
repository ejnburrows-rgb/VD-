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
    <div className="sticky top-[60px] z-40 bg-[#F7EBD8] px-4 py-3 shadow-md md:top-[68px]">
      <div className="container mx-auto max-w-4xl">
        <div className="rounded-2xl border border-[#C8A05C]/45 bg-[#FFF8EC] p-2.5 shadow-lg">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`min-h-11 rounded-xl px-4 py-2.5 font-serif text-base font-bold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-[#B65C17] text-[#FFF8EC] shadow-md ring-2 ring-[#C8A05C]/35'
                    : 'text-[#4A2F24] hover:bg-[#F0D9B5] hover:text-[#3A241A]'
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
