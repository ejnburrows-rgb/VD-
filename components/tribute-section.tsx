"use client"

export function TributeSection() {
  return (
    <section className="bg-[#120B08] px-4 py-12">
      <div className="container mx-auto grid max-w-5xl gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <h2 className="font-serif text-3xl font-bold leading-tight text-[#F4D58D] md:text-5xl">
          Tributo a Calixto González, el Verdadero Guajiro de Hialeah
        </h2>
        <div className="rounded-3xl border border-[#F4D58D]/25 bg-[#FFF3D6]/8 p-6 shadow-2xl md:p-8">
          <div className="space-y-1 text-center font-serif text-base leading-relaxed text-[#FFF3D6] md:text-lg">
            <p>Hoy que te vas con la muerte</p>
            <p>hacia una casa de cielo,</p>
            <p>la sequía del pañuelo</p>
            <p>en ríos se nos convierte.</p>
            <p>Y aunque no podamos verte</p>
            <p>jamás, en la canturia,</p>
            <p>no existirá un solo día</p>
            <p>que se hable de ejemplo de Hombre</p>
            <p>que no se escuche tu nombre,</p>
            <p className="mt-3 text-xl font-bold text-[#F4D58D] md:text-2xl">Guajiro de Hialeah.</p>
          </div>
          <p className="mt-5 text-right text-sm font-semibold text-[#F4D58D]/85">
            — Juan Antonio Díaz
          </p>
        </div>
      </div>
    </section>
  )
}
