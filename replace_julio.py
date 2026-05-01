import re

with open('components/poets-compendium.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

new_content = """      case "Julio Pablo El Príncipe Pinareño":
        return (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-[#C8A05C] font-serif">
              Julio Pablo Travieso Martínez: Arquitecto de Versos en Tiempo Presente
            </h4>
            <p>
              Julio Pablo Travieso Martínez, nacido en 1996 bajo el cielo pinareño, transforma el silencio en arquitectura sonora con décimas que construyen puentes entre siglos. Como joven maestro, no preserva tradiciones como reliquias, sino que las respira y expande, fluyendo con el repentismo para honrar su cauce ancestral descubriendo territorios nuevos. Nutriendo su talento desde 2008 en la emblemática Casa de la Décima "Celestino García", cultivó un dominio técnico que cristaliza la improvisación en diez versos octosílabos donde tradición y renovación siempre convergen.
            </p>
            <p>
              Su maestría lo ha llevado a compartir escenario en eventos como Oralitura Habana 2019, dialogando tanto con figuras nacionales como con el puertorriqueño Julio César Sanabria. En febrero de 2025, sostuvo una épica y controvertida batalla poética con Yoniel Perdomo sobre la infancia campesina, prolongada por horas, revelando la resistencia y la agudeza mental que exige el arte oral. Esta capacidad le valió el título de "Mago del Momento", un reconocimiento a esa presencia total y milagrosa que requiere transformar el pensamiento vivo en estrofas memorables, todo sin redención de ensayo ni segundas oportunidades.
            </p>
            <p>
              La espinela encuentra en Julio Pablo un intérprete ideal que comprende su paradoja esencial: la rigidez de una métrica fija que engendra libertad narrativa. Desde la vida campesina y el amor hasta la historia y el divorcio, todo tema se moldea bajo su instinto poético. Junto a jóvenes talentos como Anabeybi Rodríguez, "la princesa pinareña", forma una generación innovadora que aplica formas centenarias a ansiedades contemporáneas, usando redes digitales para documentar y proyectar la riqueza del punto guajiro al futuro.
            </p>
            <p>
              Cada estrofa que improvisa "El Príncipe Pinareño" lleva la marca identitaria de su tierra natal. No actúa como un mero eco, sino como una voz viva que proyecta la experiencia colectiva de Pinar del Río, elevando lo específicamente cubano a una relevancia verdaderamente humana y universal. El repentismo en su voz trasciende la contemplación museográfica para erigirse como una herramienta comunicativa actual, resistiendo la homogeneización cultural con excelencia poética en tiempo real.
            </p>
            <p className="italic font-medium mt-4">
              Magia que ocurre una vez, nunca exactamente igual — porque así es el momento, y así es el arte que lo honra.
            </p>
          </div>
        );"""

pattern = r'      case "Julio Pablo El Príncipe Pinareño":\n        return \([\s\S]*?        \);'

content = re.sub(pattern, new_content, content)

with open('components/poets-compendium.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
