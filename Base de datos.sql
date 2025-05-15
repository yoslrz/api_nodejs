create table Fechas(
	id_fecha integer not null,
	fecha_inicio date not null,
	fecha_fin date not null,
	evento varchar(100),
	fecha_creacion date not null,
	fecha_edicion date,
	fecha_eliminacion date, 	
	primary key (id_fecha)
);

insert into fechas values(1, '2024-03-01', '2025-03-01', 'Fechas de inscripcion', '2025-04-06', null, null);
insert into fechas values(2, '2024-01-01', '2024-01-15', 'Fechas de convocatoria de nuevo ingreso', '2025-04-06', null, null);
insert into fechas values(3, '2024-03-15', '2024-03-30', 'Fechas de inscripcion a becas', '2025-04-06', null, null);	

select * from fechas;

------------------------------------------------------------

create table Documentacion(
	id_doc integer not null,
	nombre_doc varchar(50) not null,
	descripcion_doc varchar(50) not null,
	evento_doc varchar(50) not null,
	fecha_creacion_doc date not null,
	fecha_edicion_doc date,
	fecha_eliminacion_doc date,
	primary key(id_doc)
);

INSERT INTO Documentacion VALUES (1, 'Acta de Nacimiento', 'Acta de nacimiento Actualizada', ' ' , '2025-04-06', null, null);
INSERT INTO Documentacion VALUES (2, 'Comprobante de Estudios', 'Ultimo comprobante de estudios obtenidos', ' ' , '2025-04-06', null, null);
INSERT INTO Documentacion VALUES (3, 'Comprobante de Domicilio', 'El comprobante puede ser de Luz, Telefono o Gas ', ' ' , '2025-04-06', null, null);

SELECT * FROM Documentacion

----------------------------------------------------------------


CREATE TABLE Oferta_Academica(
	id_ofer_academica integer not null,
	nombre_ofer_academica varchar(50) not null,
	tipo_ofer_academica varchar(50) not null,
	semestres_ofer_academica integer not null,
	plantel_ofer_academica varchar(50) not null,
	fecha_creacion_ofer_academica date not null,
	fecha_edicion_ofer_academica date ,
	fecha_eliminacion_ofer_academica date,
	primary key(id_ofer_academica);
);

INSERT INTO Oferta_Academica VALUES(1, 'Ingenieria en Software', '', 10, 'San Lorenzo Tezonco', '2025-04-06', null, null);
INSERT INTO Oferta_Academica VALUES(3, 'Ingenieria en Software', '', 10, 'Centro Historico', '2025-04-06', null, null);
INSERT INTO Oferta_Academica VALUES(2, 'Ingenieria Industrial', '', 10, 'San Lorenzo Tezonco', '2025-04-06', null, null);


SELECT * FROM Oferta_Academica;

-------------------------------------------------------------------

CREATE TABLE Servicios (
	id_servicio integer not null,
	nombre_servicio varchar(50) not null,
	descripcion_servicio varchar(50) not null,
	horario_servicio varchar(50) not null,
	uso_servicio varchar(250) not null,
	plantel_servicio varchar(50) not null,
	estado_servicio bool not null,
	fecha_creacion_servicio date not null,
	fecha_edicion_servicio date ,
	fecha_eliminacion_servicio date,
	primary key(id_servicio)
);

INSERT INTO Servicios VALUES(1, 'Comedor', 'Desayuno, Comida y Box Lunch', '9:00 a 17:00 hrs', '', 'San Lorenzo Tezonco' ,'true', '2025-04-06', null, null); 
INSERT INTO Servicios VALUES(2, 'Estacionamiento', 'Estacionamiento para Estudiantes', '07:00 a 22:00 hrs', '', 'San Lorenzo Tezonco', 'true', '2025-04-06', null, null);
INSERT INTO Servicios VALUES(3, 'Internet', 'Internet libre para Estudiantes', '07:00 a 22:00 hrs', '', 'San Lorenzo Tezonco' ,'true', '2025-04-06', null, null); 

