const pool = require('../ConexionDB/DAO.js');

const obtenerOfertaAcademica = async () => {
    const query = "SELECT * FROM oferta_academica WHERE fecha_eliminacion_ofer_academica = 'null';";
    const result = await pool.query(query);
    return result.rows;
};

const obtenerCarrerasPorPlantel = async (nom_plantel) => {
    const query = `SELECT * FROM oferta_academica 
        WHERE fecha_eliminacion_ofer_academica = 'null' 
        AND plantel_ofer_academica ILIKE '%' || $1 || '%';`;
    const result = await pool.query(query, [nom_plantel]);
    return result.rows;
};

const eliminarCarrera = async (id_ofer_academica) => {
    const query = `DELETE FROM oferta_academica WHERE id_ofer_academica = $1`;
    const result = await pool.query(query, [id_ofer_academica]);
    return result.rows;
}

const desactivarOfertaAcademica = async(id_ofer_academica, fechaFormateada) =>{
    const query = "UPDATE oferta_academica SET fecha_eliminacion_ofer_academica = $1 WHERE id_ofer_academica = $2;";
    const result = await pool.query(query, [fechaFormateada, id_ofer_academica]);
    return result.rows;
}

const agregarOActualizarOferta = async (id, datos) => {
    const {nombre_ofer_academica,tipo_ofer_academica,semestres_ofer_academica,plantel_ofer_academica,fecha_creacion_ofer_academica,
        fecha_edicion_ofer_academica,fecha_eliminacion_ofer_academica} = datos;
    const verifica = await pool.query('SELECT * FROM oferta_academica WHERE id_ofer_academica = $1', [id]);
    if (verifica.rows.length > 0) {
        await pool.query(`
            UPDATE oferta_academica SET 
                nombre_ofer_academica = $1,
                tipo_ofer_academica = $2,
                semestres_ofer_academica = $3,
                plantel_ofer_academica = $4,
                fecha_creacion_ofer_academica = $5,
                fecha_edicion_ofer_academica = $6,
                fecha_eliminacion_ofer_academica = $7
            WHERE id_ofer_academica = $8`, 
            [nombre_ofer_academica,tipo_ofer_academica,semestres_ofer_academica,plantel_ofer_academica,fecha_creacion_ofer_academica,
            fecha_edicion_ofer_academica, fecha_eliminacion_ofer_academica, id
        ]);
        return { mensaje: 'OFERTA ACADEMICA ACTUALIZADA' };
    } else {
        await pool.query(`
            INSERT INTO oferta_academica (
                id_ofer_academica, 
                nombre_ofer_academica, 
                tipo_ofer_academica, 
                semestres_ofer_academica, 
                plantel_ofer_academica, 
                fecha_creacion_ofer_academica, 
                fecha_edicion_ofer_academica, 
                fecha_eliminacion_ofer_academica
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [id,nombre_ofer_academica,tipo_ofer_academica,semestres_ofer_academica,plantel_ofer_academica,
            fecha_creacion_ofer_academica,fecha_edicion_ofer_academica,fecha_eliminacion_ofer_academica
        ]);
        return { mensaje: 'OFERTA ACADEMICA AGREGADA' };
    }
};

//REQUISITOS
const obtenerDocumentos = async () => {
    const query = "SELECT * FROM documentacion WHERE fecha_eliminacion_doc = 'null';";
    const result = await pool.query(query);
    return result.rows;
};


const agregarOActualizarDocumentos = async(id, datos) => {
    const {nombre_doc, descripcion_doc, evento_doc, fecha_creacion_doc, fecha_edicion_doc, fecha_eliminacion_doc} = datos;
    const verifica = await pool.query('SELECT * FROM Documentacion WHERE id_doc = $1', [id]);
    if (verifica.rows.length > 0){
        await pool.query('UPDATE Documentacion SET nombre_doc = $1, descripcion_doc = $2, evento_doc = $3, fecha_creacion_doc = $4, fecha_edicion_doc = $5, fecha_eliminacion_doc = $6 WHERE id_doc = $7',
            [nombre_doc, descripcion_doc, evento_doc, fecha_creacion_doc, fecha_edicion_doc, fecha_eliminacion_doc
        ]);
        return { mensaje: 'DOCUMENTO ACTUALIZADO' };
    }else{
        await pool.query('INSERT INTO Documentacion (id_doc, nombre_doc, descripcion_doc, evento_doc, fecha_creacion_doc, fecha_edicion_doc, fecha_eliminacion_doc) VALUES ($1,$2,$3,$4,$5,$6,$7)',
                [id_doc, nombre_doc, descripcion_doc, evento_doc, fecha_creacion_doc, fecha_edicion_doc, fecha_eliminacion_doc
        ]);
        return { mensaje: 'DOCUMENTO REGSITRADO'}
    }
};

const descativarDocumentos = async(id_doc, fechaFormateada) => {
    const query = "UPDATE Documentacion SET fecha_eliminacion_doc = $1 WHERE id_doc = $2";
    const result = await pool.query(query,[fechaFormateada, id_doc]);
    return result.rows;
}

//Fechas
const obtenerFechas = async() => {
    const query = "SELECT * FROM Fechas WHERE fecha_eliminacion = 'null';";
    const result = await pool.query(query);
    return result.rows;
};

const obtnerFechaEvento = async(evento) =>{
    const query = "SELECT * FROM Fechas WHERE fecha_eliminacion = 'null' AND evento ILIKE '%' || $1 || '%'";
    const result = await pool.query(query,[evento]);
    return result.rows;
}

const eliminarEvento = async (id_fecha) => {
    const query = "DELETE FROM Fechas WHERE id_fecha = $1;";
    const result = await pool.query(query, [id_fecha]);
    return result.rows;
};

const agregarOActualizarEvent = async(id_fecha, datos) => {
    const {fecha_inicio, fecha_fin, evento, fecha_creacion, fecha_edicion, fecha_eliminacion} = datos;
    const verifica = await pool.query('SELECT * FROM fechas WHERE id_fecha = $1', [id_fecha]);
    if(verifica.rows.length > 0){
        await pool.query('UPDATE fechas set fecha_inicio = $1, fecha_fin = $2, evento = $3, fecha_creacion = $4, fecha_edicion = $5, fecha_eliminacion = $6 WHERE id_fecha = $7',
            [fecha_inicio, fecha_fin, evento, fecha_creacion, fecha_edicion, fecha_eliminacion, id_fecha]
        );
        return { mensaje: 'Nota Actualizada'};
    }else{
        await pool.query('INSERT INTO Fechas (id_fecha, fecha_inicio, fecha_fin, evento, fecha_creacion, fecha_edicion, fecha_eliminacion) VALUES($1,$2,$3,$4,$5,$6,$7)',
            [id_fecha ,fecha_inicio, fecha_fin, evento, fecha_creacion, fecha_edicion, fecha_eliminacion]
        );
        return {mensaje: 'Fecha Registrada'};
    }
}

const desactivarFechas = async(id_fecha, fechaFormateada) =>{
    const query = "UPDATE fechas SET fecha_eliminacion = $1 WHERE id_fecha = $2";
    const result = await pool.query(query, [fechaFormateada, id_fecha]);
    return result.rows;
};
//SERVICIOS 

const obtenerServicios = async() => {
    const query = "SELECT * FROM servicios WHERE estado_servicio = true;";
    const result = await pool.query(query);
    return result.rows;
};

const agregarOActualizarServicios = async(id, datos) => {
    const {nombre_servicio, descripcion_servicio, horario_servicio, uso_servicio, plantel_servicio, estado_servicio, 
        fecha_creacion_servicio, fecha_edicion_servicio, fecha_eliminacion_servicio} =  datos;
    const verifica = await pool.query('SELECT * FROM Servicios WHERE id_servicio = $1', [id]);
    if(verifica.rows.lenght > 0){
        await pool.query('UPDATE Servicios SET nombre_servicio = $1, descripcion_servicio = $2, horario_servicio = $3, uso_servicio = $4, plantel_servicio = $5, estado_servicio = $6, fecha_creacion_servicio = $7, fecha_edicion_servicio = $8, fecha_eliminacion_servicio = $9 WHERE id_servicio = $10',
            [nombre_servicio, descripcion_servicio, horario_servicio, uso_servicio, plantel_servicio, estado_servicio, fecha_creacion_servicio, fecha_edicion_servicio, fecha_eliminacion_servicio, id_servicio]
        );
        res.json({mensaje: 'Servicio Actualizado'});
    }else{
        await pool.query('INSERT INTO Servicios VALUES (id_servicio, nombre_servicio, descripcion_servicio, horario_servicio, uso_servicio, plantel_servicio, estado_servicio, fecha_creacion_servicio, fecha_edicion_servicio, fecha_eliminacion_servicio) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
            [id_servicio, nombre_servicio, descripcion_servicio, horario_servicio, uso_servicio, plantel_servicio, estado_servicio, fecha_creacion_servicio, fecha_edicion_servicio, fecha_eliminacion_servicio]
        );
        res.json({mensaje: 'Servicio Agregado'});
    }
};

const descativarServicios = async(id_doc, fechaFormateada) => {
    const query = "UPDATE SET Servicios fecha_eliminacion_servicio = $1, estado_servicio = false WHERE id_servicio = $2";
    const result = await pool.query(query, [fechaFormateada, id_doc]);
    return result.rows;
}



module.exports = { 
    obtenerOfertaAcademica, 
    obtenerCarrerasPorPlantel, 
    agregarOActualizarOferta,
    eliminarCarrera,
    desactivarOfertaAcademica,
    obtenerDocumentos,
    agregarOActualizarDocumentos,
    descativarDocumentos,
    obtenerFechas,
    obtnerFechaEvento,
    eliminarEvento,
    agregarOActualizarEvent,
    desactivarFechas,
    obtenerServicios,
    agregarOActualizarServicios,
    descativarServicios
};
