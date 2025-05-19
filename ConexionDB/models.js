const models = [
  `
  CREATE EXTENSION IF NOT EXISTS "pgcrypto";
  `,

  `
  CREATE TABLE IF NOT EXISTS Fechas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    evento VARCHAR(100),
    fecha_creacion DATE NOT NULL DEFAULT CURRENT_DATE,
    fecha_edicion DATE,
    fecha_eliminacion DATE
  );
  `,

  `
  CREATE TABLE IF NOT EXISTS Documentacion (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(250) NOT NULL,
    descripcion VARCHAR(350) NOT NULL,
    evento VARCHAR(150) NOT NULL,
    fecha_creacion DATE NOT NULL DEFAULT CURRENT_DATE,
    fecha_edicion DATE,
    fecha_eliminacion DATE
  );
  `,

  `
  CREATE TABLE IF NOT EXISTS Oferta_Academica (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(150) NOT NULL,
    tipo VARCHAR(150) NOT NULL,
    semestres INTEGER NOT NULL,
    plantel VARCHAR(250) NOT NULL,
    fecha_creacion DATE NOT NULL DEFAULT CURRENT_DATE,
    fecha_edicion DATE,
    fecha_eliminacion DATE
  );
  `,

  `
  CREATE TABLE IF NOT EXISTS Servicios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(150) NOT NULL,
    descripcion VARCHAR(350),
    horario VARCHAR(150) NOT NULL,
    uso VARCHAR(250) NOT NULL,
    plantel VARCHAR(150) NOT NULL,
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_creacion DATE NOT NULL DEFAULT CURRENT_DATE,
    fecha_edicion DATE,
    fecha_eliminacion DATE
  );
  `
];

module.exports = models;
