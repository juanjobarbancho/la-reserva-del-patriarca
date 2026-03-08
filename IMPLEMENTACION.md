# INSTRUCCIONES DE IMPLEMENTACIÓN

## 1. Configuración de Supabase

1. Ve a https://supabase.com y crea una cuenta (gratuita)
2. Crea un nuevo proyecto
3. Ve al SQL Editor (pestaña "SQL")
4. Copia y pega el contenido de `supabase_schema.sql`
5. Ejecuta el SQL para crear las tablas

## 2. Variables de Entorno

Edita el archivo `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

Para obtener estas credenciales:
- En Supabase, ve a Project Settings > API
- Copia "Project URL" y "anon public"

## 3. Actualizar Datos de Pisos

Los datos de ejemplo están en:
- `lib/supabase.ts` (array `pisosEjemplo`)
- `supabase_schema.sql` (INSERT statements)

Para usar los datos reales del Excel:
1. Actualiza el estado de cada piso en Supabase según el Excel
2. Los pisos con estado "reservado" o "vendido" no aparecerán en la web

## 4. Deploy en Vercel

### Opción A: Desde la terminal
```bash
cd ~/Desktop/la-reserva-arruza-web
npm i -g vercel
vercel
```

### Opción B: Desde GitHub
1. Sube el proyecto a GitHub
2. Ve a https://vercel.com
3. Importa el repositorio
4. Configura las variables de entorno en Vercel
5. Deploy

## 5. Subir Imágenes

Para añadir imágenes reales:
1. Ve a Supabase > Storage
2. Crea un bucket "imagenes"
3. Sube las imágenes de los planos
4. Actualiza la columna `imagenes` en la tabla `pisos` con las URLs

## Estructura de Archivos

```
la-reserva-arruza-web/
├── app/
│   ├── globals.css      # Estilos globales
│   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Página principal
├── components/
│   ├── ContactForm.tsx  # Formulario de contacto
│   ├── Footer.tsx       # Pie de página
│   ├── Hero.tsx         # Sección hero
│   ├── LeadModal.tsx    # Modal captación leads
│   ├── PisoDetail.tsx   # Detalle de piso
│   └── PisosGrid.tsx    # Grid de pisos
├── lib/
│   └── supabase.ts      # Configuración Supabase
├── supabase_schema.sql  # SQL para crear tablas
├── .env.local           # Variables de entorno
└── README.md            # Documentación
```

## Funcionalidades Implementadas

✅ Hero con información del proyecto
✅ Grid de pisos disponibles (filtrado por estado)
✅ Modal de captación de leads (gate de datos)
✅ Detalle completo del piso tras verificación
✅ Formulario de contacto general
✅ Diseño responsive y moderno
✅ Paleta de colores: ámbar/dorado corporativo
✅ Integración con Supabase
✅ RLS (Row Level Security) configurado

## Notas Importantes

- Solo los pisos con estado "disponible" aparecen en la web
- El sistema usa sessionStorage para recordar si un usuario ya introdujo sus datos
- Los leads se guardan en la tabla `leads` con origen "piso" o "contacto"
- El formulario de contacto guarda en la tabla `contactos`
