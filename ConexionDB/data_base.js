const inserts = [
  // Fechas
  `
  INSERT INTO Fechas (id, fecha_inicio, fecha_fin, evento, fecha_edicion, fecha_eliminacion)
  SELECT gen_random_uuid(), '2024-03-01', '2025-03-01', 'Fechas de inscripcion', NULL, NULL
  WHERE NOT EXISTS (
    SELECT 1 FROM Fechas WHERE evento = 'Fechas de inscripcion'
  );

  INSERT INTO Fechas (id, fecha_inicio, fecha_fin, evento, fecha_edicion, fecha_eliminacion)
  SELECT gen_random_uuid(), '2024-01-01', '2024-01-15', 'Fechas de convocatoria de nuevo ingreso', NULL, NULL
  WHERE NOT EXISTS (
    SELECT 1 FROM Fechas WHERE evento = 'Fechas de convocatoria de nuevo ingreso'
  );

  INSERT INTO Fechas (id, fecha_inicio, fecha_fin, evento, fecha_edicion, fecha_eliminacion)
  SELECT gen_random_uuid(), '2024-03-15', '2024-03-30', 'Fechas de inscripcion a becas', NULL, NULL
  WHERE NOT EXISTS (
    SELECT 1 FROM Fechas WHERE evento = 'Fechas de inscripcion a becas'
  );
  `,

  // Documentacion
  `
  INSERT INTO Documentacion (id, nombre, descripcion, evento, fecha_edicion, fecha_eliminacion)
  SELECT gen_random_uuid(), 'Acta de Nacimiento', 'Acta de nacimiento Actualizada', '', NULL, NULL
  WHERE NOT EXISTS (
    SELECT 1 FROM Documentacion WHERE nombre = 'Acta de Nacimiento'
  );

  INSERT INTO Documentacion (id, nombre, descripcion, evento, fecha_edicion, fecha_eliminacion)
  SELECT gen_random_uuid(), 'Comprobante de Estudios', 'Ultimo comprobante de estudios obtenidos', '', NULL, NULL
  WHERE NOT EXISTS (
    SELECT 1 FROM Documentacion WHERE nombre = 'Comprobante de Estudios'
  );

  INSERT INTO Documentacion (id, nombre, descripcion, evento, fecha_edicion, fecha_eliminacion)
  SELECT gen_random_uuid(), 'Comprobante de Domicilio', 'El comprobante puede ser de Luz, Telefono o Gas', '', NULL, NULL
  WHERE NOT EXISTS (
    SELECT 1 FROM Documentacion WHERE nombre = 'Comprobante de Domicilio'
  );
  `,

  // Oferta_Academica
  `
  INSERT INTO Oferta_Academica (id, nombre, tipo, semestres, plantel, fecha_edicion, fecha_eliminacion)
  SELECT gen_random_uuid(), 'Ingenieria en Software', 'carrera', 10, 'San Lorenzo Tezonco, Cuautepec', NULL, NULL
  WHERE NOT EXISTS (
    SELECT 1 FROM Oferta_Academica WHERE nombre = 'Ingenieria en Software' AND plantel = 'San Lorenzo Tezonco, Cuautepec'
  );

  INSERT INTO Oferta_Academica (id, nombre, tipo, semestres, plantel, fecha_edicion, fecha_eliminacion)
  SELECT gen_random_uuid(), 'Ingenieria Industrial', 'carrera', 10, 'San Lorenzo Tezonco', NULL, NULL
  WHERE NOT EXISTS (
    SELECT 1 FROM Oferta_Academica WHERE nombre = 'Ingenieria Industrial' AND plantel = 'San Lorenzo Tezonco'
  );

  INSERT INTO Oferta_Academica (id, nombre, tipo, semestres, plantel, fecha_edicion, fecha_eliminacion)
  SELECT gen_random_uuid(), 'Maestría en Ciencias Sociales', 'posgrado', 10, 'Centro Historico', NULL, NULL
  WHERE NOT EXISTS (
    SELECT 1 FROM Oferta_Academica WHERE nombre = 'Maestría en Ciencias Sociales' AND plantel = 'Centro Historico'
  );
  `,

  // Servicios
  `
  INSERT INTO Servicios (id, nombre, descripcion, horario, uso, plantel, estado, fecha_edicion, fecha_eliminacion)
  SELECT gen_random_uuid(), 'Comedor', 'Desayuno, Comida y Box Lunch', '9:00 a 17:00 hrs', '', 'San Lorenzo Tezonco, Del Valle', TRUE, NULL, NULL
  WHERE NOT EXISTS (
    SELECT 1 FROM Servicios WHERE nombre = 'Comedor' AND plantel = 'San Lorenzo Tezonco, Del Valle'
  );

  INSERT INTO Servicios (id, nombre, descripcion, horario, uso, plantel, estado, fecha_edicion, fecha_eliminacion)
  SELECT gen_random_uuid(), 'Estacionamiento', 'Estacionamiento para Estudiantes', '07:00 a 22:00 hrs', '', 'San Lorenzo Tezonco', TRUE, NULL, NULL
  WHERE NOT EXISTS (
    SELECT 1 FROM Servicios WHERE nombre = 'Estacionamiento' AND plantel = 'San Lorenzo Tezonco'
  );

  INSERT INTO Servicios (id, nombre, descripcion, horario, uso, plantel, estado, fecha_edicion, fecha_eliminacion)
  SELECT gen_random_uuid(), 'Internet', 'Internet libre para Estudiantes', '07:00 a 22:00 hrs', '', 'San Lorenzo Tezonco', TRUE, NULL, NULL
  WHERE NOT EXISTS (
    SELECT 1 FROM Servicios WHERE nombre = 'Internet' AND plantel = 'San Lorenzo Tezonco'
  );
  `
];

module.exports = inserts;
