-- Aseguramos la tabla de alumnos
CREATE TABLE IF NOT EXISTS alumnos (
    id BIGSERIAL PRIMARY KEY,
    legajo VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    curso VARCHAR(10) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Aseguramos la tabla de asistencias vinculada a alumnos
CREATE TABLE IF NOT EXISTS asistencias (
    id BIGSERIAL PRIMARY KEY,
    alumno_id BIGINT REFERENCES alumnos(id) ON DELETE CASCADE,
    fecha DATE NOT NULL,
    estado VARCHAR(15) CHECK (estado IN ('PRESENTE', 'AUSENTE', 'TARDE')),
    observacion TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(alumno_id, fecha)
);

-- Consultas útiles para el Backend Java o cliente Supabase:
-- CREATE: INSERT INTO alumnos (legajo, nombre, curso) VALUES ('ALU-004', 'Ana Martinez', '1A');
-- READ:   SELECT * FROM alumnos ORDER BY nombre ASC;
-- UPDATE: UPDATE alumnos SET legajo = 'ALU-004', nombre = 'Ana Martinez', curso = '1A' WHERE id = 1;
-- DELETE: DELETE FROM alumnos WHERE id = 1;