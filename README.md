# La Reserva de La Arruzafa - Web Inmobiliaria

## Descripción

Web profesional para la promoción inmobiliaria "La Reserva de La Arruzafa" en Córdoba. 
Incluye catálogo de pisos disponibles, sistema de captación de leads y formulario de contacto.

## Tecnologías

- **Framework:** Next.js 14+ (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Base de datos:** Supabase (PostgreSQL)
- **Formularios:** React Hook Form + Zod
- **Iconos:** Lucide React

## Estructura de la Base de Datos (Supabase)

### Tabla: `pisos`
- `id` (text, primary key)
- `bloque` (text)
- `portal` (text)
- `planta` (text)
- `tipo` (text)
- `habitaciones` (integer)
- `estado` (text: disponible/reservado/vendido)
- `precio` (integer)
- `superficie` (integer)
- `orientacion` (text)
- `descripcion` (text)
- `imagenes` (jsonb)
- `created_at` (timestamp)

### Tabla: `leads`
- `id` (uuid, primary key)
- `nombre` (text)
- `email` (text)
- `telefono` (text)
- `piso_id` (text, foreign key)
- `origen` (text: piso/contacto)
- `fecha` (timestamp)
- `acepta_terminos` (boolean)

### Tabla: `contactos`
- `id` (uuid, primary key)
- `nombre` (text)
- `email` (text)
- `telefono` (text)
- `mensaje` (text)
- `fecha` (timestamp)
- `acepta_privacidad` (boolean)

## Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone <repo-url>
   cd la-reserva-arruza-web
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env.local
   ```
   Edita `.env.local` con tus credenciales de Supabase.

4. **Configurar Supabase:**
   - Crea un proyecto en [Supabase](https://supabase.com)
   - Ejecuta el SQL en `supabase_schema.sql` en el SQL Editor
   - Copia las crediciales a `.env.local`

5. **Desarrollo:**
   ```bash
   npm run dev
   ```

6. **Build para producción:**
   ```bash
   npm run build
   ```

## Deploy en Vercel

1. Sube el código a GitHub
2. Conecta el repositorio en [Vercel](https://vercel.com)
3. Configura las variables de entorno:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

## Características

- ✅ Hero con información del proyecto
- ✅ Grid de pisos disponibles (solo se muestran los disponibles)
- ✅ Modal de captación de leads (gate de datos)
- ✅ Detalle completo del piso tras verificación
- ✅ Formulario de contacto general
- ✅ Diseño responsive y moderno
- ✅ Paleta de colores: ámbar/dorado corporativo
- ✅ Animaciones suaves
- ✅ Integración con Supabase

## Notas

- Los pisos marcados como "reservado" o "vendido" en el Excel no aparecen en la web
- El sistema de leads guarda los datos en Supabase
- Se usa sessionStorage para recordar si un usuario ya introdujo sus datos
