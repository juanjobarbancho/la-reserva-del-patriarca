import { ArrowDown, MapPin, Home } from 'lucide-react'
import Image from 'next/image'

const heroImages = [
  '/images/renders/piscina-comunitaria.jpg',
  '/images/renders/jardines-dia.jpg',
  '/images/renders/jardines-atardecer.jpg',
  '/images/renders/vista-aerea.jpg',
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        <Image
          src={heroImages[0]}
          alt="Reserva del Patriarca"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium mb-8 border border-white/20">
          <MapPin className="w-4 h-4" />
          Córdoba
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
          Reserva del
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-100">
            Patriarca
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-md">
          37 viviendas de diseño moderno en una de las zonas más privilegiadas de Córdoba. 
          Piscina, zonas verdes, jardines privativos y las mejores calidades.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="#pisos"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold py-4 px-8 rounded-xl hover:from-amber-700 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5" />
            Ver pisos disponibles
          </a>
          <a
            href="#contacto"
            className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all"
          >
            Contactar
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="text-4xl md:text-5xl font-bold text-amber-300">37</div>
            <div className="text-white/80 mt-1">Viviendas</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="text-4xl md:text-5xl font-bold text-amber-300">2-4</div>
            <div className="text-white/80 mt-1">Dormitorios</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="text-4xl md:text-5xl font-bold text-amber-300">58</div>
            <div className="text-white/80 mt-1">Plazas parking</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#pisos" className="text-white/60 hover:text-amber-300 transition-colors">
          <ArrowDown className="w-8 h-8" />
        </a>
      </div>
    </section>
  )
}