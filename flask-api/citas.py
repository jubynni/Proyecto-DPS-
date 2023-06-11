from flask import (
    Blueprint, jsonify, abort, request
)
from .db import *
from .auth import login_required

bp = Blueprint('citas', __name__, url_prefix='/citas')


@bp.route('/')
# @login_required
def lista_citas():
    try:
        citas = _obtener_cita()
        return jsonify(citas), 200
    except Exception as e:
        print(e, flush=True)
        return abort(500)


@bp.route('/<int:id>')
@login_required
def obtener_cita(id):
    try:
        citas = _obtener_cita(id)
        return jsonify(citas), 200
    except Exception as e:
        print(e, flush=True)
        return abort(500)

@bp.route('/eliminar/<int:id>')
# @login_required
def eliminar(id):
    try:
        _eliminar_cita((id,))
        return jsonify(_obtener_cita(id)), 200
    except Exception as e:
        return abort(400)


@bp.route('/nuevo', methods=('POST',))
# @login_required
def nuevo_cita():
    try:
        data = request.json
        doc = (data.get('id_paciente'), data.get('id_doctor'), data.get('fecha'), data.get('hora'))

        if not all(doc):
            return jsonify('Faltan campos requeridos'), 400
        
        cita = _crear_cita(doc)
        if cita:
            cita = _obtener_cita(cita)
            return jsonify(cita), 200
        return abort(400)
    except Exception as e:
        return abort(400)


@bp.route('/modificar/<int:id>', methods=('POST',))
@login_required
def modificar_cita(id):
    try:
        data = request.json
        doc = (data.get('id_paciente'), data.get('id_doctor'), data.get('fecha'), data.get('hora'), id)
        if not all(doc):
            return jsonify('Faltan campos requeridos'), 400
        _actualizar_cita(doc)
        return jsonify(_obtener_cita(id)), 200
    except Exception as e:
        return abort(400)


# Metodos de transaccionalidad con BD
def _obtener_cita(id = None):
    from datetime import timedelta
    
    if id:
        cita = sql("""select 
              id_cita, d.nombre_completo doctor, p.nombre_completo paciente, fecha_cita, hora_cita 
            from citas c 
            inner join doctores d on d.id_doctor = c.id_doctor
            inner join pacientes p on p.id_paciente = c.id_paciente
            where id_cita = %s""", (id,), unico=True)
        for c in cita:
            if isinstance(cita[c], timedelta):
                cita[c] = str(cita[c])
        return cita            
    lista_citas = sql('''select
            id_cita, d.nombre_completo doctor, p.nombre_completo paciente, fecha_cita, hora_cita 
            from citas c 
            inner join doctores d on d.id_doctor = c.id_doctor
            inner join pacientes p on p.id_paciente = c.id_paciente
            where 
                c.deshabilitado = 0
            ''')
    
    for c in lista_citas:
        for v in c:
            if isinstance(c[v], timedelta):
                c[v] = str(c[v])
    return lista_citas


def _crear_cita(doc):
    cita = insertar_o_actualizar("""insert into 
        citas(id_paciente, id_doctor, fecha_cita, hora_cita)
        values (%s, %s, %s, %s)
    """, doc)
    return cita


def _actualizar_cita(doc):
    cita = insertar_o_actualizar("""update
        citas set id_paciente = %s, id_doctor = %s, fecha_cita = %s, hora_cita = %s where id_cita = %s;
    """, doc)
    return cita


def _eliminar_cita(id):
    cita = insertar_o_actualizar("""update
        citas set deshabilitado = 1 where id_cita = %s;
    """, id)
    return cita