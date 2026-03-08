'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const galleryImages = [
  {
    src: '/images/renders/piscina-comunitaria.jpg',
    title: 'Piscina Comunitaria',
    description: 'Disfruta de nuestra piscina con zona de hamacas y jardín'
  },
  {
    src: '/images/renders/jardines-dia.jpg',
    title: 'Jardines',
    description: 'Amplias zonas verdes con paseos arbolados'
  },
  {
    src: '/images/renders/jardines-atardecer.jpg',
    title: 'Vista Nocturna',
    description: 'Iluminación ambiental en zonas comunes'
  },
  {
    src: '/images/renders/terraza-jardin.jpg',
    title: 'Terrazas y Jardines',
    description: 'Espacios privados para cada vivienda'
  },
  {
    src: '/images/renders/atico-piscina.jpg',
    title: 'Áticos con Piscina',
    description: 'Viviendas exclusivas con piscina privada'
  },
  {
    src: '/images/renders/atico-terraza.jpg',
    title: 'Terrazas Ático',
    description: 'Amplias terrazas con vistas panorámicas'
  },
  {
    src: '/images/renders/jardin-privado.jpg',
    title: 'Jardín Privado',
    description: 'Jardines privativos en planta baja'
  },
  {
    src: '/images/renders/vista-aerea.jpg',
    title: 'Vista Aérea',
    description: 'Vista general de la promoción'
  },
  {
    src: '/images/renders/plano-general.jpg',
    title: 'Plano General',
    description: 'Distribución de la promoción'
  },
  {
    src: '/images/renders/piscina-exterior.jpg',
    title: 'Zona de Piscina',
    description: 'Piscina con vistas al paisaje cordobés'
  }
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1)
    }
  }

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1)
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Galería de <span className="text-amber-700">Imágenes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre todos los detalles de La Reserva del Patriarca. 
            Una promoción diseñada para disfrutar de la vida al aire libre.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`relative group cursor-pointer overflow-hidden rounded-xl ${
                index === 0 || index === 5 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onClick={() => openLightbox(index)}
            >
              <div className={`relative ${index === 0 || index === 5 ? 'h-64 md:h-full' : 'h-48'} w-full`}>
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-semibold text-lg">{image.title}</h3>
                  <p className="text-sm text-white/80">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={goToPrevious}
            className="absolute left-4 text-white/80 hover:text-white p-2"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 text-white/80 hover:text-white p-2"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="max-w-5xl max-h-[80vh] w-full px-4">
            <div className="relative aspect-video">
              <Image
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].title}
                fill
                className="object-contain"
              />
            </div>
            <div className="text-center text-white mt-4">
              <h3 className="text-2xl font-semibold">{galleryImages[selectedImage].title}</h3>
              <p className="text-white/70">{galleryImages[selectedImage].description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}