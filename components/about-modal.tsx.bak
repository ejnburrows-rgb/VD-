
"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Heart, Globe, Code } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const [showLeonorInfo, setShowLeonorInfo] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl cuban-card border-2 border-[#C8A05C] bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#C8A05C] font-serif flex items-center gap-3">
            🌴 Acerca de El Guajiro de Hialeah
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 text-[#5C4033]">
          {/* Calixto: Tejedor Entre Dos Orillas */}
          <div className="bg-[#F5E6D3] p-5 rounded-lg border-2 border-[#C8A05C]">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-[#D2691E]" />
              <h3 className="text-xl font-bold text-[#C8A05C] font-serif">
                Calixto: Tejedor Entre Dos Orillas
              </h3>
            </div>
            <div className="space-y-4 text-sm leading-relaxed">
              <p>
                Calixto nació donde el cielo toca el agua—<strong>La Coloma</strong>, pueblo de pescadores. 
                Entre barcas y sal, aprendió lo que el mar enseña: esperar es arte. Los pescadores 
                lo saben—tejer redes lleva días, tejer palabras pide lo mismo.
              </p>
              
              <p>
                La décima le palpitaba desde niño. Esa forma de diez versos que cruzó el océano 
                y echó raíces en Cuba. Calixto se hizo trovador—no de rimas fáciles, sino de las 
                que improvisan con el corazón. Creación colectiva, siempre.
              </p>
              
              <p>
                El exilio lo llevó a <strong>Hialeah</strong>. Allá le llamaron <strong>el Guajiro</strong>—campesino 
                de verdad, fuerza tranquila, autenticidad que no se aprende. Exilio que fortalece.
              </p>
              
              <p>
                Su casa se volvió refugio. Abría la puerta, conseguía espacios en las radios, 
                conectaba trovadores dispersos. Su voz baja pero firme les recordaba: la décima 
                cura, guarda lo que no queremos perder.
              </p>
              
              <p className="font-medium text-[#D2691E]">
                <strong>Viajera Digital</strong> nace de ese legado. Preservamos cada décima usando 
                tecnología que siente la pasión del poeta. Honramos la memoria de Calixto González 
                y todos los poetas que mantienen viva esta tradición milenaria.
              </p>
              
              <p>
                Como las redes de La Coloma—pacientes, fuertes—Calixto tejió comunidad que no se 
                deshace. Su casa vive en la memoria como ese lugar donde la décima encontró techo, 
                donde trovadores se reconocieron hermanos.
              </p>
              
              <p>
                En esas redes quedó atrapada, felizmente, una viajera de España que llegó buscando 
                versos y encontró raíces. Cuba no suelta a quien prueba el sabor de sus décimas. 
                Ella quedó tejida en esta red—hebra europea en tapiz caribeño.
              </p>
              
              <p className="font-medium italic text-[#C8A05C]">
                <strong>Viajera Digital</strong> continúa ese tejido. Cada décima preservada es hebra. 
                Cada poeta que aquí encuentra su voz es nudo. Cada generación que accede a este 
                archivo teje hacia adelante. La tecnología sirve a la tradición.
              </p>
              
              <p className="text-center font-bold text-[#D2691E] mt-4 text-base">
                Para que la décima nunca sea arrancada del verde imán de nuestro suelo.
              </p>
            </div>
          </div>

          {/* Closing Tribute */}
          <div className="text-center bg-[#FDF8F0] border-2 border-[#D2691E] p-4 rounded-lg">
            <p className="font-medium italic text-[#5C4033] leading-relaxed">
              🌴 "A todos los poetas que han dedicado sus vidas a mantener viva la décima: 
              su voz sigue cantando en cada verso que procesamos aquí."
            </p>
          </div>

          {/* Credits Section */}
          <div className="border-t-2 border-[#C8A05C] pt-4">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-4 h-4 text-[#D2691E]" />
                  <strong className="text-[#D2691E]">Desarrollo</strong>
                </div>
                <p>Creada por: <strong>Emilio José Novo</strong></p>
                <p className="text-[#5C4033]">Versión: 2.0 Pro</p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-[#C8A05C]" />
                  <strong className="text-[#C8A05C]">Recursos Web</strong>
                </div>
                <p className="mb-1">
                  Web: <a 
                    href="https://juanantoniodiaz.com/acerca-de/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-bold text-[#D2691E] hover:text-[#C8A05C] underline transition-colors duration-200"
                  >
                    Juanantoniodiaz.com
                  </a>
                </p>
                <p className="mb-2">
                  Canal: <a 
                    href="https://youtube.com/@juanantoniodiaz9034" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-bold text-[#D2691E] hover:text-[#C8A05C] underline transition-colors duration-200"
                  >
                    @juanantoniodiaz9034
                  </a>
                </p>
                <p className="text-[#5C4033] text-sm">
                  Licencia: Creative Commons (Uso libre con atribución)
                </p>
              </div>
            </div>
          </div>

          {/* Acknowledgments Section */}
          <div className="border-t-2 border-[#C8A05C] pt-4">
            <div className="text-sm">
              <p className="font-medium text-[#D2691E] mb-2">
                Agradecimientos por la creación a:
              </p>
              <p>
                <strong>Leonor Lopetegui</strong>
                <button
                  onClick={() => setShowLeonorInfo(!showLeonorInfo)}
                  className="ml-1 text-[#D2691E] hover:text-[#C8A05C] transition-colors duration-200 font-bold text-lg"
                  aria-label="Ver más información sobre Leonor Lopetegui"
                >
                  *
                </button>
              </p>
              
              {showLeonorInfo && (
                <div className="mt-4 p-4 bg-[#F5E6D3] border-2 border-[#C8A05C] rounded-lg space-y-3 text-sm leading-relaxed animate-in fade-in duration-300">
                  <p>
                    Leonor Lopetegui ha sido mi maestra de español, consejera y una abuela más que la vida me regaló desde mis cinco años de edad, cuando ella junto a su esposo, mi tío Armando González, me trajo de Cuba junto a mis padres. Al igual que a tantos otros de nuestra familia, nos ayudaron a comenzar una nueva vida en Miami, una experiencia que marcó profundamente mi formación y mi corazón.
                  </p>
                  
                  <p>
                    Con casi cincuenta años dedicados a la enseñanza del español, la Sra. Lopetegui no solo dominó el arte de enseñar con pasión y devoción en las Escuelas Públicas del Condado de Miami-Dade, sino que tocó innumerables vidas con su generosidad y amor incondicional. Su legado está marcado por reconocimientos extraordinarios como el Premio Cervantes de la Universidad Nova Southeastern por hacer una diferencia en la educación hispana, y por ser nombrada Maestra del Año en la Escuela Primaria James H. Bright durante el año escolar 2001-2002.
                  </p>
                  
                  <p>
                    También fue seleccionada Educadora Bilingüe del Año por la Asociación Bilingüe de la Florida, un testimonio de su liderazgo excepcional en la educación bilingüe. Durante más de diez años, lideró la División de Educación Bilingüe e Idiomas del Mundo para las Escuelas Públicas del Condado de Miami-Dade, dejando una huella imborrable en el perfeccionamiento del español entre niños y adultos. Ha escrito libros educativos para niños y ha compartido su sabiduría en importantes eventos educativos nacionales e internacionales, incluyendo la Asociación Nacional de Educación Bilingüe y la Asociación Bilingüe de la Florida.
                  </p>
                  
                  <p>
                    En reconocimiento a esta labor monumental, la Ciudad de Sweetwater proclamó el 6 de junio de 2014 como el "Día de la Sra. Leonor Lopetegui". Para mí y para tantos otros, ella representa mucho más que todos estos honores: es un ejemplo vivo de generosidad, sabiduría y amor que trasciende las aulas y perdura para siempre en nuestros corazones.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Technical Info */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="outline" className="text-[#5C4033] border-[#C8A05C]">
              IA Claude Sonnet
            </Badge>
            <Badge variant="outline" className="text-[#5C4033] border-[#C8A05C]">
              NextJS 14
            </Badge>
            <Badge variant="outline" className="text-[#5C4033] border-[#C8A05C]">
              Transcripción de Audio
            </Badge>
            <Badge variant="outline" className="text-[#5C4033] border-[#C8A05C]">
              Análisis Académico
            </Badge>
            <Badge variant="outline" className="text-[#5C4033] border-[#C8A05C]">
              Patrimonio UNESCO
            </Badge>
          </div>

          {/* Footer Note */}
          <div className="text-xs text-[#5C4033] text-center italic">
            "Un algoritmo que siente la pasión del poeta, rescata del olvido cada improvisación, 
            preserva intacta la lírica del corazón, y eterniza el arte vivo de la décima completa."
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
