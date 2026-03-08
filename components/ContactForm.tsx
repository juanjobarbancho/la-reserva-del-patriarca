'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase, Contacto } from '@/lib/supabase'
import { Phone, Mail, User, MessageSquare, Check, Send } from 'lucide-react'

const contactoSchema = z.object({
  nombre: z.string().min(2, 'Nombre requerido'),
  email: z.string().email('Email inválido'),
  telefono: z.string().min(9, 'Teléfono inválido'),
  mensaje: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  acepta_privacidad: z.boolean().refine(val => val === true, 'Debes aceptar la política de privacidad'),
})

type ContactoFormData = z.infer<typeof contactoSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactoFormData>({
    resolver: zodResolver(contactoSchema),
  })

  const onSubmit = async (data: ContactoFormData) => {
    setIsSubmitting(true)
    
    const contacto: Contacto = {
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      mensaje: data.mensaje,
      acepta_privacidad: data.acepta_privacidad,
    }

    const { error } = await supabase.from('contactos').insert(contacto)

    if (!error) {
      setShowSuccess(true)
      reset()
      setTimeout(() => setShowSuccess(false), 5000)
    }

    setIsSubmitting(false)
  }

  return (
    <section id="contacto" className="bg-gradient-to-br from-gray-900 via-gray-800 to-amber-950 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Info */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Quieres más información?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Déjanos tus datos y nos pondremos en contacto contigo para resolver 
              todas tus dudas sobre La Reserva del Patriarca.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 bg-amber-800/30 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Teléfono</p>
                  <p className="text-lg">+34 957 000 000</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 bg-amber-800/30 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-lg">info@lareservadelpatriarca.es</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            {showSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  ¡Mensaje enviado!
                </h3>
                <p className="text-gray-300">
                  Nos pondremos en contacto contigo en breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register('nombre')}
                      type="text"
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>
                  {errors.nombre && (
                    <p className="mt-1 text-sm text-red-400">{errors.nombre.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Teléfono
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register('telefono')}
                      type="tel"
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                      placeholder="+34 600 000 000"
                    />
                  </div>
                  {errors.telefono && (
                    <p className="mt-1 text-sm text-red-400">{errors.telefono.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Mensaje
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      {...register('mensaje')}
                      rows={4}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-none"
                      placeholder="¿En qué podemos ayudarte?"
                    />
                  </div>
                  {errors.mensaje && (
                    <p className="mt-1 text-sm text-red-400">{errors.mensaje.message}</p>
                  )}
                </div>

                <div className="flex items-start gap-3">
                  <input
                    {...register('acepta_privacidad')}
                    type="checkbox"
                    id="privacidad"
                    className="mt-1 w-4 h-4 text-amber-600 border-gray-500 rounded focus:ring-amber-500 bg-white/10"
                  />
                  <label htmlFor="privacidad" className="text-sm text-gray-400">
                    Acepto la{' '}
                    <a href="#" className="text-amber-400 hover:text-amber-300 underline">
                      política de privacidad
                    </a>
                  </label>
                </div>
                {errors.acepta_privacidad && (
                  <p className="text-sm text-red-400">{errors.acepta_privacidad.message}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-700 to-amber-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-amber-800 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
