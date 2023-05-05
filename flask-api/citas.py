from flask import (
    Blueprint, jsonify, abort, request
)
from .db import *
from .auth import login_required

bp = Blueprint('citas', __name__, url_prefix='/citas')


@bp.route('/')
@login_required
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


@bp.route('/nuevo', methods=('POST',))
@login_required
def nuevo_cita():
    try:
        data = request.json
        doc = (data.get('id_paciente'), data.get('id_doctor'), data.get('fecha'), data.get('hora'))

        if not all(doc):
            return jsonify('Faltan campos requeridos'), 400
        
        cita = _crear_cita(doc)
        if cita:
           return jsonify(_obtener_cita(cita)), 200
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
    if id:
        cita = sql("""select 
              id_cita,  id_paciente, id_doctor, fecha_cita, hora_cita 
            from citas where id_cita = %s""", (id,), unico=True)
        return cita
    lista_citas = sql('''select 
              id_cita,  id_paciente, id_doctor, fecha_cita, hora_cita
            from citas;''')
    return lista_citas


def _crear_cita(doc):
    cita = insertar_o_actualizar("""insert into 
        citas(id_paciente, id_doctor, fecha_cita, hora_cita)
        values (%s, %s, %s, %s, %s, %s, %s, %s)
    """, doc)
    return cita


def _actualizar_cita(doc):
    cita = insertar_o_actualizar("""update
        citas set id_paciente = %s, id_doctor = %s, fecha_cita = %s, hora_cita = %s where id_cita = %s;
    """, doc)
    return cita
