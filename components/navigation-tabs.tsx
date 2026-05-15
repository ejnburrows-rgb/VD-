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
    <div className="sticky top-[64px] z-40 bg-[#F7EBD8]/92 px-3 py-3 backdrop-blur-md md:top-[72px]">
      <div className="container mx-auto max-w-4xl">
        <div className="rounded-2xl border border-[#C8A05C]/35 bg-[#FFF8EC]/80 p-2 shadow-[0_10px_30px_rgba(92,64,51,0.12)]">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`rounded-xl px-4 py-2.5 font-serif text-sm font-semibold transition-all duration-300 md:text-base ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-b from-[#D97706] to-[#B45309] text-[#FFF8EC] shadow-[0_8px_18px_rgba(180,83,9,0.28)]'
                    : 'text-[#5C4033]/85 hover:-translate-y-0.5 hover:bg-[#C8A05C]/16 hover:text-[#4A2F24]'
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
