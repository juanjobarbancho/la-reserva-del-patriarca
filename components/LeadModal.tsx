'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase, Lead } from '@/lib/supabase'
import { X, Phone, Mail, User, Check } from 'lucide-react'

const leadSchema = z.object({
  nombre: z.string().min(2, 'Nombre requerido'),
  email: z.string().email('Email inválido'),
  telefono: z.string().min(9, 'Teléfono inválido'),
  acepta_terminos: z.boolean().refine(val => val === true, 'Debes aceptar los términos'),
})

type LeadFormData = z.infer<typeof leadSchema>

interface LeadModalProps {
  pisoId: string | null
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function LeadModal({ pisoId, isOpen, onClose, onSuccess }: LeadModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  })

  const onSubmit = async (data: LeadFormData) => {
    if (!pisoId) return
    
    setIsSubmitting(true)
    
    const lead: Lead = {
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      piso_id: pisoId,
      origen: 'piso',
      acepta_terminos: data.acepta_terminos,
    }

    const { error } = await supabase.from('leads').insert(lead)

    if (!error) {
      setShowSuccess(true)
      // Guardar en sessionStorage para no pedir datos de nuevo
      sessionStorage.setItem('lead_data', JSON.stringify({
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono,
      }))
      setTimeout(() => {
        setShowSuccess(false)
        reset()
        onSuccess()
      }, 2000)
    }

    setIsSubmitting(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-900 to-amber-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">
              Acceder a la información
            </h3>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {showSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                ¡Gracias!
              </h4>
              <p className="text-gray-600">
                Te enviaremos la información detallada a tu email.
              </p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                Introduce tus datos para acceder a toda la información de esta vivienda, 
                incluyendo planos, precio y características detalladas.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register('nombre')}
                      type="text"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>
                  {errors.nombre && (
                    <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register('telefono')}
                      type="tel"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                      placeholder="+34 600 000 000"
                    />
                  </div>
                  {errors.telefono && (
                    <p className="mt-1 text-sm text-red-600">{errors.telefono.message}</p>
                  )}
                </div>

                <div className="flex items-start gap-3">
                  <input
                    {...register('acepta_terminos')}
                    type="checkbox"
                    id="terminos"
                    className="mt-1 w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                  />
                  <label htmlFor="terminos" className="text-sm text-gray-600">
                    Acepto la{' '}
                    <a href="#" className="text-amber-700 hover:text-amber-800 underline">
                      política de privacidad
                    </a>{' '}
                    y los términos y condiciones
                  </label>
                </div>
                {errors.acepta_terminos && (
                  <p className="text-sm text-red-600">{errors.acepta_terminos.message}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-800 to-amber-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-amber-900 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Acceder a la información'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
