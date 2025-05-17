const inserts = [
  // Fechas
  `
  INSERT INTO Fechas (id, fecha_inicio, fecha_fin, evento, fecha_edicion, fecha_eliminacion)
  VALUES 
    (gen_random_uuid(), '2024-03-01', '2025-03-01', 
    'Fechas de inscripcion', NULL, NULL),
    (gen_random_uuid(), '2024-01-01', '2024-01-15', 
    'Fechas de convocatoria de nuevo ingreso', NULL, NULL),
    (gen_random_uuid(), '2024-03-15', '2024-03-30', 
    'Fechas de inscripcion a becas', NULL, NULL);
  `,

  // Documentacion
  `
  INSERT INTO Documentacion (id, nombre, descripcion, evento, fecha_edicion, fecha_eliminacion)
  VALUES
    (gen_random_uuid(), 'Acta de Nacimiento', 'Acta de nacimiento Actualizada',
    '', NULL, NULL),
    (gen_random_uuid(), 'Comprobante de Estudios', 
    'Ultimo comprobante de estudios obtenidos', '',NULL, NULL),
    (gen_random_uuid(), 'Comprobante de Domicilio', 
    'El comprobante puede ser de Luz, Telefono o Gas', '', NULL, NULL);
  `,

  // Oferta_Academica
  `
  INSERT INTO Oferta_Academica (id, nombre, tipo, semestres, plantel, fecha_edicion, fecha_eliminacion)
  VALUES
    (gen_random_uuid(), 'Ingenieria en Software', 'carrera', 10, 
    'San Lorenzo Tezonco, Cuautepec', NULL, NULL),
    (gen_random_uuid(), 'Ingenieria Industrial', 'carrera', 10,
     'San Lorenzo Tezonco', NULL, NULL),
    (gen_random_uuid(), 'Maestría en Ciencias Sociales', 'posgrado', 10, 
    'Centro Historico', NULL, NULL);
  `,

  // Servicios
  `
  INSERT INTO Servicios (id, nombre, descripcion, horario, uso, plantel, 
  estado, fecha_edicion, fecha_eliminacion)
  VALUES
    (gen_random_uuid(), 'Comedor', 'Desayuno, Comida y Box Lunch', '9:00 a 17:00 hrs',
     '', 'San Lorenzo Tezonco, Del Valle', TRUE, NULL, NULL),
    (gen_random_uuid(), 'Estacionamiento', 'Estacionamiento para Estudiantes', 
    '07:00 a 22:00 hrs', '', 'San Lorenzo Tezonco', TRUE, NULL, NULL),
    (gen_random_uuid(), 'Internet', 'Internet libre para Estudiantes', 
    '07:00 a 22:00 hrs', '', 'San Lorenzo Tezonco', TRUE, NULL, NULL);
  `
];

module.exports = inserts;
