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
    <div className="sticky top-[58px] z-40 border-b border-[#F4D58D]/20 bg-[#20130D]/92 px-3 py-3 backdrop-blur-md md:top-[66px]">
      <div className="mx-auto max-w-5xl overflow-x-auto">
        <div className="flex min-w-max items-center justify-center gap-2 px-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`rounded-full border px-4 py-2 font-serif text-sm font-semibold transition-all duration-300 md:text-base ${
                activeTab === tab.id
                  ? 'border-[#F4D58D] bg-[#F4D58D] text-[#20130D] shadow-lg'
                  : 'border-[#F4D58D]/25 bg-white/5 text-[#FFF3D6] hover:border-[#F4D58D]/70 hover:bg-[#F4D58D]/10'
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
