from flask import (
    Blueprint, jsonify, abort, request
)
from .db import *
from .auth import login_required

bp = Blueprint('doctores', __name__, url_prefix='/doctores')


@bp.route('/')
# @login_required
def lista_doctores():
    try:
        doctores = _obtener_doctor()
        return jsonify(doctores), 200
    except Exception as e:
        print(e, flush=True)
        return abort(500)


@bp.route('/<int:id>')
# @login_required
def obtener_doctor(id):
    try:
        doctores = _obtener_doctor(id)
        return jsonify(doctores), 200
    except Exception as e:
        print(e, flush=True)
        return abort(500)


@bp.route('/eliminar/<int:id>')
# @login_required
def eliminar(id):
    try:
        _eliminar_doctor((id,))
        return jsonify(_obtener_doctor(id)), 200
    except Exception as e:
        return abort(400)


@bp.route('/nuevo', methods=('POST',))
# @login_required
def nuevo_doctor():
    try:
        data = request.json
        doc = (data.get('nombre_completo'), data.get('fecha_nac'), 
            data.get('domicilio'), data.get('correo'), data.get('telefono'), data.get('especialidad'),
            data.get('horario'), data.get('contrasenia'))

        if not all(doc):
            return jsonify('Faltan campos requeridos'), 400
        
        doctor = _crear_doctor(doc)
        if doctor:
           return jsonify(_obtener_doctor(doctor)), 200
        return abort(400)
    except Exception as e:
        return abort(400)


@bp.route('/modificar/<int:id>', methods=('POST',))
# @login_required
def modificar_doctor(id):
    try:
        data = request.json
        doc = (data.get('nombre_completo'), data.get('fecha_nac'), 
            data.get('domicilio'), data.get('correo'), data.get('telefono'), data.get('especialidad'),
            data.get('horario'), id)
        if not all(doc):
            return jsonify('Faltan campos requeridos'), 400
        
        _actualizar_doctor(doc)
        return jsonify(_obtener_doctor(id)), 200
    except Exception as e:
        return abort(400)


# Metodos de transaccionalidad con BD
def _obtener_doctor(id = None):
    if id:
        doctor = sql("""select id_doctor, 
                nombre_completo, fecha_nac, domicilio, correo, telefono, especialidad, horario, contraseña 
            from doctores where id_doctor = %s """, (id,), unico=True)
        return doctor
    lista_doctores = sql('''select id_doctor,
                nombre_completo, fecha_nac, domicilio, correo, telefono, especialidad, horario, contraseña 
            from doctores where deshabilitado = 0;''')
    return lista_doctores


def _crear_doctor(doc):
    doctor = insertar_o_actualizar("""insert into 
        doctores(nombre_completo, fecha_nac, domicilio, correo, telefono, especialidad, horario, contraseña)
        values (%s, %s, %s, %s, %s, %s, %s, %s)
    """, doc)
    return doctor


def _actualizar_doctor(doc):
    doctor = insertar_o_actualizar("""update
        doctores set nombre_completo = %s, fecha_nac = %s, domicilio = %s, correo = %s ,
        telefono = %s, especialidad = %s, horario = %s where id_doctor = %s;
    """, doc)
    return doctor


def _eliminar_doctor(id):
    doctor = insertar_o_actualizar("""update
        doctores set deshabilitado = 1 where id_doctor = %s;
    """, id)
    return doctor
