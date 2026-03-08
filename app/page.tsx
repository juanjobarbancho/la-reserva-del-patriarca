import Hero from '@/components/Hero'
import Gallery from '@/components/Gallery'
import PisosGrid from '@/components/PisosGrid'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import { supabase, Piso, pisosEjemplo } from '@/lib/supabase'

export const revalidate = 60 // Revalidate every 60 seconds

async function getPisos(): Promise<Piso[]> {
  try {
    const { data, error } = await supabase
      .from('pisos')
      .select('*')
      .eq('estado', 'disponible')
      .order('precio', { ascending: true })

    if (error) {
      console.error('Error fetching pisos:', error)
      return pisosEjemplo
    }

    return data || pisosEjemplo
  } catch (e) {
    console.error('Error:', e)
    return pisosEjemplo
  }
}

export default async function Home() {
  const pisos = await getPisos()

  return (
    <main className="min-h-screen">
      <Hero />
      <Gallery />
      <PisosGrid pisos={pisos} />
      <ContactForm />
      <Footer />
    </main>
  )
}
