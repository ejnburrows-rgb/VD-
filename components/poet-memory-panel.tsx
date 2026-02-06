"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, MapPin, Calendar, Heart } from "lucide-react";

interface Poet {
  id: string;
  name: string;
  birthYear: string;
  birthPlace: string;
  legacy: string;
  image: string;
  color: string;
}

const CUBAN_POETS: Poet[] = [
  {
    id: "1",
    name: "Calixto González (El Guajiro de Hialeah)",
    birthYear: "1936-2025",
    birthPlace: "Cuba → Hialeah, Florida",
    legacy: "Preservó la décima cubana en el exilio. Mentor de generaciones.",
    image: "🇨🇺",
    color: "bg-gradient-to-br from-[#C8A05C] to-[#D2691E]"
  },
  {
    id: "2",
    name: "Juan Antonio Díaz Hernández",
    birthYear: "1954",
    birthPlace: "Pinar del Río, Cuba",
    legacy: "Maestro del punto guajiro y la décima campesina.",
    image: "🎸",
    color: "bg-gradient-to-br from-[#8B4513] to-[#5C4033]"
  },
  {
    id: "3",
    name: "Indio Naborí (Jesús Orta Ruiz)",
    birthYear: "1922-2005",
    birthPlace: "Camagüey, Cuba",
    legacy: "Poeta nacional de Cuba. Defensor de la tradición oral.",
    image: "✍️",
    color: "bg-gradient-to-br from-[#D4AF37] to-[#B8860B]"
  }
];

export default function PoetMemoryPanel() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#C8A05C] mb-4 font-serif">
          Memoria Poética Cubana
        </h2>
        <p className="text-[#5C4033]/80 max-w-2xl mx-auto">
          Honrando a los guardianes de la décima espinela que mantienen viva nuestra tradición literaria.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CUBAN_POETS.map((poet) => (
          <Card
            key={poet.id}
            className="cuban-card p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className={`${poet.color} text-white rounded-lg p-4 mb-4 text-center`}>
              <div className="text-6xl mb-2">{poet.image}</div>
              <h3 className="text-xl font-bold font-serif">{poet.name}</h3>
            </div>

            <div className="space-y-3 text-sm text-[#5C4033]">
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 mt-1 text-[#D2691E] flex-shrink-0" />
                <span><strong>Años:</strong> {poet.birthYear}</span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 text-[#D2691E] flex-shrink-0" />
                <span><strong>Origen:</strong> {poet.birthPlace}</span>
              </div>

              <div className="flex items-start gap-2">
                <Heart className="w-4 h-4 mt-1 text-[#D2691E] flex-shrink-0" />
                <span className="leading-relaxed">{poet.legacy}</span>
              </div>
            </div>

            <Badge className="mt-4 w-full justify-center bg-[#C8A05C] text-white hover:bg-[#D2691E]">
              <BookOpen className="w-3 h-3 mr-1" />
              Maestro de la Décima
            </Badge>
          </Card>
        ))}
      </div>

      <Card className="cuban-card p-6 text-center bg-gradient-to-r from-[#F5E6D3] to-[#E6D7C1]">
        <p className="decima-text text-lg italic text-[#5C4033] leading-relaxed">
          &quot;La décima no muere mientras haya quien la cante,<br />
          quien la escriba con el alma y la guarde en el semblante.&quot;
        </p>
        <p className="text-sm text-[#5C4033]/70 mt-2">— Tradición oral cubana</p>
      </Card>
    </div>
  );
}
