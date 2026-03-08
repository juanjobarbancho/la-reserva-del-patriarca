import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Piso = {
  id: string
  bloque: string
  portal: string
  planta: string
  tipo: string
  habitaciones: number
  estado: 'disponible' | 'reservado' | 'vendido'
  precio: number
  superficie: number
  orientacion: string
  descripcion: string
  imagenes: string[]
  created_at?: string
}

export type Lead = {
  id?: string
  nombre: string
  email: string
  telefono: string
  piso_id: string
  origen: 'piso' | 'contacto'
  fecha?: string
  acepta_terminos: boolean
}

export type Contacto = {
  id?: string
  nombre: string
  email: string
  telefono: string
  mensaje: string
  fecha?: string
  acepta_privacidad: boolean
}

// Datos de ejemplo para cuando no hay conexión a Supabase
export const pisosEjemplo: Piso[] = [
  {
    id: 'B1-P1-DX',
    bloque: 'Bloque 1',
    portal: 'Portal 1',
    planta: 'Ático',
    tipo: 'Dúplex',
    habitaciones: 3,
    estado: 'disponible',
    precio: 450000,
    superficie: 120,
    orientacion: 'Sur',
    descripcion: 'Dúplex de 3 dormitorios con terraza',
    imagenes: []
  },
  {
    id: 'B1-P1-2A',
    bloque: 'Bloque 1',
    portal: 'Portal 1',
    planta: 'Segunda',
    tipo: '3D',
    habitaciones: 3,
    estado: 'disponible',
    precio: 320000,
    superficie: 95,
    orientacion: 'Sur',
    descripcion: 'Piso de 3 dormitorios en segunda planta',
    imagenes: []
  },
  {
    id: 'B1-P1-1A',
    bloque: 'Bloque 1',
    portal: 'Portal 1',
    planta: 'Primera',
    tipo: '2D',
    habitaciones: 2,
    estado: 'disponible',
    precio: 280000,
    superficie: 85,
    orientacion: 'Sur',
    descripcion: 'Piso de 2 dormitorios en primera planta',
    imagenes: []
  },
  {
    id: 'B1-P2-DX',
    bloque: 'Bloque 1',
    portal: 'Portal 2',
    planta: 'Ático',
    tipo: 'Dúplex',
    habitaciones: 3,
    estado: 'disponible',
    precio: 450000,
    superficie: 120,
    orientacion: 'Sur',
    descripcion: 'Dúplex de 3 dormitorios con terraza',
    imagenes: []
  },
  {
    id: 'B2-P3-DX',
    bloque: 'Bloque 2',
    portal: 'Portal 3',
    planta: 'Ático',
    tipo: 'Dúplex',
    habitaciones: 3,
    estado: 'disponible',
    precio: 440000,
    superficie: 115,
    orientacion: 'Este',
    descripcion: 'Dúplex de 3 dormitorios con terraza',
    imagenes: []
  },
  {
    id: 'B3-P5-AT',
    bloque: 'Bloque 3',
    portal: 'Portal 5',
    planta: 'Ático',
    tipo: 'Ático 3D',
    habitaciones: 3,
    estado: 'disponible',
    precio: 460000,
    superficie: 125,
    orientacion: 'Norte',
    descripcion: 'Ático de 3 dormitorios con amplia terraza',
    imagenes: []
  }
]
