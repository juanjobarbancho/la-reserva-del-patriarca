-- SQL para crear las tablas de La Reserva de La Arruzafa
-- Ejecutar en el SQL Editor de Supabase

-- Tabla de pisos
CREATE TABLE IF NOT EXISTS pisos (
  id TEXT PRIMARY KEY,
  bloque TEXT NOT NULL,
  portal TEXT NOT NULL,
  planta TEXT NOT NULL,
  tipo TEXT NOT NULL,
  habitaciones INTEGER NOT NULL,
  estado TEXT NOT NULL CHECK (estado IN ('disponible', 'reservado', 'vendido')),
  precio INTEGER NOT NULL,
  superficie INTEGER NOT NULL,
  orientacion TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  imagenes JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de leads (interesados en pisos)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  piso_id TEXT REFERENCES pisos(id) ON DELETE CASCADE,
  origen TEXT NOT NULL CHECK (origen IN ('piso', 'contacto')),
  fecha TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  acepta_terminos BOOLEAN NOT NULL DEFAULT false
);

-- Tabla de contactos generales
CREATE TABLE IF NOT EXISTS contactos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  mensaje TEXT NOT NULL,
  fecha TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  acepta_privacidad BOOLEAN NOT NULL DEFAULT false
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE pisos ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contactos ENABLE ROW LEVEL SECURITY;

-- Políticas para pisos: lectura pública solo para disponibles
CREATE POLICY "Pisos disponibles visibles públicamente"
  ON pisos
  FOR SELECT
  USING (estado = 'disponible');

-- Políticas para leads: inserción pública
CREATE POLICY "Leads pueden ser creados públicamente"
  ON leads
  FOR INSERT
  WITH CHECK (true);

-- Políticas para contactos: inserción pública
CREATE POLICY "Contactos pueden ser creados públicamente"
  ON contactos
  FOR INSERT
  WITH CHECK (true);

-- Crear índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_pisos_estado ON pisos(estado);
CREATE INDEX IF NOT EXISTS idx_pisos_bloque ON pisos(bloque);
CREATE INDEX IF NOT EXISTS idx_leads_piso_id ON leads(piso_id);
CREATE INDEX IF NOT EXISTS idx_leads_origen ON leads(origen);

-- Insertar datos de ejemplo (pisos disponibles)
INSERT INTO pisos (id, bloque, portal, planta, tipo, habitaciones, estado, precio, superficie, orientacion, descripcion, imagenes) VALUES
('B1-P1-DX', 'Bloque 1', 'Portal 1', 'Ático', 'Dúplex', 3, 'disponible', 450000, 120, 'Sur', 'Dúplex de 3 dormitorios con terraza', '["plano-duplex-1.jpg"]'),
('B1-P1-2A', 'Bloque 1', 'Portal 1', 'Segunda', '3D', 3, 'disponible', 320000, 95, 'Sur', 'Piso de 3 dormitorios en segunda planta', '["plano-3d-1.jpg"]'),
('B1-P1-1A', 'Bloque 1', 'Portal 1', 'Primera', '2D', 2, 'disponible', 280000, 85, 'Sur', 'Piso de 2 dormitorios en primera planta', '["plano-2d-1.jpg"]'),
('B1-P1-BA', 'Bloque 1', 'Portal 1', 'Baja', '2D', 2, 'disponible', 260000, 80, 'Sur', 'Piso de 2 dormitorios en planta baja con jardín', '["plano-baja-1.jpg"]'),
('B1-P2-DX', 'Bloque 1', 'Portal 2', 'Ático', 'Dúplex', 3, 'disponible', 450000, 120, 'Sur', 'Dúplex de 3 dormitorios con terraza', '["plano-duplex-2.jpg"]'),
('B1-P2-2A', 'Bloque 1', 'Portal 2', 'Segunda', '4D', 4, 'disponible', 380000, 110, 'Sur', 'Piso de 4 dormitorios en segunda planta', '["plano-4d-1.jpg"]'),
('B1-P2-1A', 'Bloque 1', 'Portal 2', 'Primera', '3D', 3, 'disponible', 320000, 95, 'Sur', 'Piso de 3 dormitorios en primera planta', '["plano-3d-2.jpg"]'),
('B1-P2-BA', 'Bloque 1', 'Portal 2', 'Baja', '3D', 3, 'disponible', 300000, 90, 'Sur', 'Piso de 3 dormitorios en planta baja con jardín', '["plano-baja-2.jpg"]'),
('B2-P3-DX', 'Bloque 2', 'Portal 3', 'Ático', 'Dúplex', 3, 'disponible', 440000, 115, 'Este', 'Dúplex de 3 dormitorios con terraza', '["plano-duplex-3.jpg"]'),
('B2-P3-2A', 'Bloque 2', 'Portal 3', 'Segunda', '3D', 3, 'disponible', 310000, 92, 'Este', 'Piso de 3 dormitorios en segunda planta', '["plano-3d-3.jpg"]'),
('B2-P3-1A', 'Bloque 2', 'Portal 3', 'Primera', '2D', 2, 'disponible', 275000, 82, 'Este', 'Piso de 2 dormitorios en primera planta', '["plano-2d-2.jpg"]'),
('B2-P3-BA', 'Bloque 2', 'Portal 3', 'Baja', '2D', 2, 'disponible', 255000, 78, 'Este', 'Piso de 2 dormitorios en planta baja con jardín', '["plano-baja-3.jpg"]'),
('B2-P4-DX', 'Bloque 2', 'Portal 4', 'Ático', 'Dúplex', 3, 'disponible', 440000, 115, 'Oeste', 'Dúplex de 3 dormitorios con terraza', '["plano-duplex-4.jpg"]'),
('B2-P4-2A', 'Bloque 2', 'Portal 4', 'Segunda', '4D', 4, 'disponible', 375000, 108, 'Oeste', 'Piso de 4 dormitorios en segunda planta', '["plano-4d-2.jpg"]'),
('B2-P4-1A', 'Bloque 2', 'Portal 4', 'Primera', '3D', 3, 'disponible', 315000, 94, 'Oeste', 'Piso de 3 dormitorios en primera planta', '["plano-3d-4.jpg"]'),
('B2-P4-BA', 'Bloque 2', 'Portal 4', 'Baja', '3D', 3, 'disponible', 295000, 88, 'Oeste', 'Piso de 3 dormitorios en planta baja con jardín', '["plano-baja-4.jpg"]'),
('B3-P5-AT', 'Bloque 3', 'Portal 5', 'Ático', 'Ático 3D', 3, 'disponible', 460000, 125, 'Norte', 'Ático de 3 dormitorios con amplia terraza', '["plano-atico-1.jpg"]'),
('B3-P5-DX', 'Bloque 3', 'Portal 5', 'Dúplex', 'Dúplex', 3, 'disponible', 430000, 118, 'Norte', 'Dúplex de 3 dormitorios', '["plano-duplex-5.jpg"]'),
('B3-P5-2A', 'Bloque 3', 'Portal 5', 'Segunda', '3D', 3, 'disponible', 305000, 90, 'Norte', 'Piso de 3 dormitorios en segunda planta', '["plano-3d-5.jpg"]'),
('B3-P5-1A', 'Bloque 3', 'Portal 5', 'Primera', '3D', 3, 'disponible', 295000, 88, 'Norte', 'Piso de 3 dormitorios en primera planta', '["plano-3d-6.jpg"]'),
('B3-P5-BA', 'Bloque 3', 'Portal 5', 'Baja', '3D', 3, 'disponible', 280000, 85, 'Norte', 'Piso de 3 dormitorios en planta baja con jardín y bodega', '["plano-baja-5.jpg"]'),
('B3-P6-DX', 'Bloque 3', 'Portal 6', 'Dúplex', 'Dúplex', 3, 'disponible', 430000, 118, 'Sur', 'Dúplex de 3 dormitorios', '["plano-duplex-6.jpg"]'),
('B3-P6-2A', 'Bloque 3', 'Portal 6', 'Segunda', '4D', 4, 'disponible', 370000, 105, 'Sur', 'Piso de 4 dormitorios en segunda planta', '["plano-4d-3.jpg"]'),
('B3-P6-1A', 'Bloque 3', 'Portal 6', 'Primera', '3D', 3, 'disponible', 300000, 88, 'Sur', 'Piso de 3 dormitorios en primera planta', '["plano-3d-7.jpg"]'),
('B3-P6-BA', 'Bloque 3', 'Portal 6', 'Baja', '3D', 3, 'disponible', 285000, 85, 'Sur', 'Piso de 3 dormitorios en planta baja con jardín y bodega', '["plano-baja-6.jpg"]');
