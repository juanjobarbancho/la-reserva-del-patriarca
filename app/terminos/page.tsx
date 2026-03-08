export const metadata = {
  title: 'Términos y Condiciones | Reserva del Patriarca',
  description: 'Términos y condiciones de uso de la web de Reserva del Patriarca',
}

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Términos y Condiciones
        </h1>
        
        <div className="prose prose-lg max-w-none text-gray-600">
          <p className="text-sm text-gray-500 mb-6">Última actualización: 9 de marzo de 2026</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Identificación</h2>
            <p>
              En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información 
              y del Comercio Electrónico, le informamos que:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Denominación social:</strong> Cooperativa de Viviendas Reserva del Patriarca</li>
              <li><strong>Nombre comercial:</strong> Reserva del Patriarca</li>
              <li><strong>Domicilio social:</strong> Córdoba, España</li>
              <li><strong>Email:</strong> info@reservadelpatriarca.es</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Objeto</h2>
            <p>
              El presente documento tiene por objeto regular el uso de la página web de Reserva del Patriarca, 
              mediante la cual se facilita información sobre la promoción de viviendas ubicada en Córdoba.
            </p>
            <p className="mt-4">
              La navegación por el sitio web atribuye la condición de usuario del mismo e implica la aceptación 
              plena y sin reservas de todas las disposiciones incluidas en este Aviso Legal.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Propiedad intelectual</h2>
            <p>
              Todos los contenidos de esta web (textos, fotografías, planos, gráficos, logotipos, iconos, 
              software, etc.) son propiedad exclusiva de Reserva del Patriarca o de terceros que han 
              autorizado su inclusión.
            </p>
            <p className="mt-4">
              Queda prohibida la reproducción, distribución, comunicación pública y transformación de estos 
              contenidos sin autorización expresa de Reserva del Patriarca.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Información sobre la promoción</h2>
            <p>
              La información contenida en esta web tiene carácter meramente informativo y no constituye 
              oferta comercial. Las características, superficies, distribuciones y precios pueden variar 
              sin previo aviso.
            </p>
            <p className="mt-4">
              Las imágenes, planos y renders son orientativos y pueden no corresponder exactamente con 
              el producto final. Para información vinculante, consulte la documentación contractual 
              específica.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Protección de datos</h2>
            <p>
              Los datos personales facilitados a través de los formularios de contacto serán tratados 
              conforme a lo establecido en nuestra <a href="/privacidad" className="text-amber-700 hover:underline">Política de Privacidad</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Responsabilidad</h2>
            <p>
              Reserva del Patriarca no se responsabiliza de los errores u omisiones en los contenidos 
              de esta web, ni garantiza que el servicio no se vea interrumpido o afectado por virus 
              informáticos u otros elementos dañinos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Legislación aplicable</h2>
            <p>
              Estos términos se rigen por la legislación española. Para cualquier controversia que pudiera 
              derivarse del acceso o uso de esta web, las partes se someten a los Juzgados y Tribunales 
              de Córdoba, renunciando expresamente a cualquier otro fuero.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contacto</h2>
            <p>
              Para cualquier consulta sobre estos términos, puede contactarnos en:
              <br />
              <strong>Email:</strong> info@reservadelpatriarca.es
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}