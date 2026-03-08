'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Piso } from '@/lib/supabase'
import { X, MapPin, Bed, Maximize, Compass, Home, Check, ChevronLeft, ChevronRight } from 'lucide-react'

interface PisoDetailProps {
  piso: Piso | null
  isOpen: boolean
  onClose: () => void
}

export default function PisoDetail({ piso, isOpen, onClose }: PisoDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!isOpen || !piso) return null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const imagenes = piso.imagenes && piso.imagenes.length > 0 ? piso.imagenes : []
  const currentImage = imagenes[currentImageIndex] || null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imagenes.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imagenes.length) % imagenes.length)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-900 to-amber-700 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">
            {piso.bloque} - {piso.portal}
          </h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1">
          {/* Hero image */}
          <div className="relative h-80 bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center overflow-hidden">
            {currentImage ? (
              <>
                <Image
                  src={currentImage}
                  alt={`${piso.bloque} ${piso.portal}`}
                  fill
                  className="object-cover"
                />
                {imagenes.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-800" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-800" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {imagenes.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <Home className="w-32 h-32 text-amber-200" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-4xl font-bold text-white drop-shadow-lg">
                    {formatPrice(piso.precio)}
                  </span>
                  <p className="text-white/80 mt-1">Precio de venta</p>
                </div>
                <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-amber-800 font-semibold">
                  {piso.tipo}
                </span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Main info */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    {piso.planta} - {piso.tipo}
                  </h4>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>{piso.bloque}, {piso.portal}</span>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <h5 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h5>
                  <p className="text-gray-600 leading-relaxed">
                    {piso.descripcion}. Vivienda situada en {piso.planta.toLowerCase()} 
                    con orientación {piso.orientacion.toLowerCase()}, lo que proporciona 
                    una excelente luminosidad durante todo el día. El edificio cuenta con 
                    zonas comunes ajardinadas, piscina comunitaria y garaje opcional.
                  </p>
                </div>

                {/* Features grid */}
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-4">Características</h5>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <Bed className="w-6 h-6 text-amber-600 mb-2" />
                      <p className="text-sm text-gray-500">Habitaciones</p>
                      <p className="text-lg font-semibold text-gray-900">{piso.habitaciones}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <Maximize className="w-6 h-6 text-amber-600 mb-2" />
                      <p className="text-sm text-gray-500">Superficie</p>
                      <p className="text-lg font-semibold text-gray-900">{piso.superficie} m²</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <Compass className="w-6 h-6 text-amber-600 mb-2" />
                      <p className="text-sm text-gray-500">Orientación</p>
                      <p className="text-lg font-semibold text-gray-900">{piso.orientacion}</p>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-4">Equipamiento</h5>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'Cocina equipada',
                      'Aire acondicionado',
                      'Calefacción',
                      'Ventanas climalit',
                      'Armarios empotrados',
                      'Video portero',
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" />
                        <span className="text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                  <h5 className="font-semibold text-amber-900 mb-4">
                    ¿Te interesa esta vivienda?
                  </h5>
                  <p className="text-sm text-amber-700 mb-4">
                    Contacta con nosotros para concertar una visita o solicitar más información.
                  </p>
                  <button
                    onClick={() => {
                      onClose()
                      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="w-full bg-amber-800 text-white font-semibold py-3 px-4 rounded-lg hover:bg-amber-900 transition-colors"
                  >
                    Solicitar información
                  </button>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h5 className="font-semibold text-gray-900 mb-4">
                    Referencia
                  </h5>
                  <p className="text-2xl font-mono text-gray-600">
                    {piso.id}
                  </p>
                </div>
              </div>
            </div>

            {/* Plano del piso */}
            <div className="mt-8 bg-gray-50 p-6 rounded-2xl">
              <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Home className="w-5 h-5 text-amber-600" />
                Plano de la vivienda
              </h5>
              <div className="relative aspect-[4/3] bg-white rounded-xl overflow-hidden border border-gray-200">
                <Image
                  src={`/images/planos/plano-${piso.id.toLowerCase()}.jpg`}
                  alt={`Plano ${piso.id}`}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    // Si no existe el plano específico, mostrar placeholder
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <Home className="w-16 h-16 mx-auto mb-2" />
                    <p>Plano disponible tras visita</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                * Plano orientativo. Las superficies y distribución pueden variar. 
                Solicita el plano completo y memoria de calidades.
              </p>
            </div>

            {/* Image gallery */}
            {imagenes.length > 0 && (
              <div className="mt-8">
                <h5 className="text-lg font-semibold text-gray-900 mb-4">Imágenes de la promoción</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imagenes.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`aspect-square relative rounded-lg overflow-hidden ${
                        idx === currentImageIndex ? 'ring-2 ring-amber-600' : ''
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Imagen ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  * Haz clic en una imagen para verla en grande
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
