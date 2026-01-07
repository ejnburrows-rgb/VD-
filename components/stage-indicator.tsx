
"use client";

import { Loader2, CheckCircle, Circle, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

export type StageStatus = 'pending' | 'active' | 'completed' | 'error';

export interface Stage {
  id: string;
  name: string;
  description: string;
  status: StageStatus;
  error?: string;
}

interface StageIndicatorProps {
  stages: Stage[];
}

export default function StageIndicator({ stages }: StageIndicatorProps) {
  const getStatusIcon = (status: StageStatus) => {
    switch (status) {
      case 'pending':
        return <Circle className="w-5 h-5 text-[#5C4033]/30" />;
      case 'active':
        return <Loader2 className="w-5 h-5 text-[#D2691E] animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusColor = (status: StageStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-[#5C4033]/10 border-[#5C4033]/20';
      case 'active':
        return 'bg-[#D2691E]/10 border-[#D2691E] border-2';
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
    }
  };

  const getStatusText = (status: StageStatus) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'active':
        return 'En proceso...';
      case 'completed':
        return 'Completado';
      case 'error':
        return 'Error';
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-[#C8A05C] font-serif mb-4">
        📊 Pipeline de Procesamiento
      </h3>
      
      <div className="space-y-3">
        {stages.map((stage, index) => (
          <Card
            key={stage.id}
            className={`p-4 transition-all duration-300 ${getStatusColor(stage.status)}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getStatusIcon(stage.status)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-[#5C4033]">
                    Etapa {index + 1}: {stage.name}
                  </h4>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    stage.status === 'completed' ? 'bg-green-100 text-green-800' :
                    stage.status === 'active' ? 'bg-[#D2691E]/20 text-[#D2691E]' :
                    stage.status === 'error' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {getStatusText(stage.status)}
                  </span>
                </div>
                
                <p className="text-sm text-[#5C4033]/80">
                  {stage.description}
                </p>
                
                {stage.error && (
                  <div className="mt-2 p-2 bg-red-100 border border-red-200 rounded text-sm text-red-800">
                    <strong>Error:</strong> {stage.error}
                  </div>
                )}
              </div>
            </div>
            
            {/* Progress connector line */}
            {index < stages.length - 1 && (
              <div className="ml-[10px] mt-2 mb-0 h-6 w-0.5 bg-[#C8A05C]/30" />
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
