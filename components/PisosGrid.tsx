'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Piso } from '@/lib/supabase'
import { MapPin, Bed, Maximize, Compass, ArrowRight, Home, TreePine, Sun } from 'lucide-react'
import LeadModal from './LeadModal'
import PisoDetail from './PisoDetail'

interface PisosGridProps {
  pisos: Piso[]
}

// Función para determinar el tipo de vivienda
function getTipoVivienda(piso: Piso): { label: string; icon: React.ReactNode; color: string } {
  if (piso.planta.toLowerCase().includes('baja')) {
    return { 
      label: 'Bajo con Jardín', 
      icon: <TreePine className="w-4 h-4" />,
      color: 'bg-green-100 text-green-800'
    }
  }
  if (piso.planta.toLowerCase().includes('3ª') || piso.planta.toLowerCase().includes('ático')) {
    return { 
      label: 'Ático Dúplex', 
      icon: <Sun className="w-4 h-4" />,
      color: 'bg-amber-100 text-amber-800'
    }
  }
  return { 
    label: 'Piso', 
    icon: <Home className="w-4 h-4" />,
    color: 'bg-blue-100 text-blue-800'
  }
}

export default function PisosGrid({ pisos }: PisosGridProps) {
  const [selectedPiso, setSelectedPiso] = useState<Piso | null>(null)
  const [leadPisoId, setLeadPisoId] = useState<string | null>(null)
  const [showDetail, setShowDetail] = useState(false)
  const [hasLeadData, setHasLeadData] = useState(false)

  // Calcular precio mínimo
  const precioMinimo = pisos.length > 0 ? Math.min(...pisos.map(p => p.precio)) : 0

  useEffect(() => {
    // Check if user already submitted lead data
    const leadData = sessionStorage.getItem('lead_data')
    setHasLeadData(!!leadData)
  }, [])

  const handleVerMas = (piso: Piso) => {
    if (hasLeadData) {
      // If already has lead data, show detail directly
      setSelectedPiso(piso)
      setShowDetail(true)
    } else {
      // Show lead modal first
      setLeadPisoId(piso.id)
    }
  }

  const handleLeadSuccess = () => {
    setHasLeadData(true)
    setLeadPisoId(null)
    // Show detail for the piso that was just clicked
    const piso = pisos.find(p => p.id === leadPisoId)
    if (piso) {
      setSelectedPiso(piso)
      setShowDetail(true)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <>
      <section id="pisos" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Desde <span className="text-amber-600">{formatPrice(precioMinimo)}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {pisos.length} viviendas disponibles. Desde áticos dúplex con terraza 
              hasta bajos con jardín privado. Encuentra tu hogar ideal.
            </p>
          </div>

          {pisos.length === 0 ? (
            <div className="text-center py-20">
              <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500">
                No hay pisos disponibles en este momento.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pisos.map((piso) => {
                const tipoVivienda = getTipoVivienda(piso)
                return (
                  <div
                    key={piso.id}
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      {piso.imagenes && piso.imagenes.length > 0 ? (
                        <Image
                          src={piso.imagenes[0]}
                          alt={`${piso.bloque} ${piso.portal} ${piso.planta}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center">
                          <Home className="w-20 h-20 text-amber-300" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Badge tipo vivienda */}
                      <div className={`absolute top-4 left-4 ${tipoVivienda.color} backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5`}>
                        {tipoVivienda.icon}
                        <span className="text-sm font-semibold">{tipoVivienda.label}</span>
                      </div>

                      {/* Precio */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-3xl font-bold text-white drop-shadow-lg">
                          {formatPrice(piso.precio)}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{piso.bloque} • {piso.portal}</span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {piso.planta} - Tipo {piso.tipo}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {piso.descripcion}
                      </p>

                      {/* Features */}
                      <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-lg">
                          <Bed className="w-4 h-4 text-amber-600" />
                          <span className="font-medium">{piso.habitaciones} hab</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-lg">
                          <Maximize className="w-4 h-4 text-amber-600" />
                          <span className="font-medium">{piso.superficie} m²</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-lg">
                          <Compass className="w-4 h-4 text-amber-600" />
                          <span className="font-medium">{piso.orientacion}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleVerMas(piso)}
                        className="w-full bg-gradient-to-r from-amber-800 to-amber-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-amber-900 hover:to-amber-700 transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
                      >
                        Ver más detalles
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Lead Modal */}
      <LeadModal
        pisoId={leadPisoId}
        isOpen={!!leadPisoId}
        onClose={() => setLeadPisoId(null)}
        onSuccess={handleLeadSuccess}
      />

      {/* Piso Detail Modal */}
      <PisoDetail
        piso={selectedPiso}
        isOpen={showDetail}
        onClose={() => {
          setShowDetail(false)
          setSelectedPiso(null)
        }}
      />
    </>
  )
}