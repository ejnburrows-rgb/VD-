"use client"

import { useState } from 'react'
import { Button } from './ui/button'

interface NavigationTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
  const tabs = [
    { id: 'process', label: '📝 Procesar Transcripción', icon: '📝' },
    { id: 'decimas', label: '📖 Décimas Formateadas', icon: '📖' },
    { id: 'analysis', label: '📊 Análisis Completo', icon: '📊' },
    { id: 'export', label: '⬇️ Exportar Resultados', icon: '⬇️' },
    { id: 'demo', label: '▶️ Demostración', icon: '▶️' },
    { id: 'education', label: '📚 Educación Histórica', icon: '📚' },
    { id: 'about', label: '🌴 Acerca de', icon: '🌴' },
  ]

  return (
    <div className="bg-[#F5E6D3] border-b-2 border-[#C8A05C] px-4 py-2">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-wrap gap-2 justify-center">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className={
                activeTab === tab.id
                  ? 'bg-[#D2691E] text-white'
                  : 'bg-transparent text-[#5C4033] hover:bg-[#C8A05C]'
              }
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

