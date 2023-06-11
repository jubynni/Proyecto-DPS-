from flask import (
    Blueprint, jsonify, abort, request
)
from .db import *
from .auth import login_required

bp = Blueprint('pacientes', __name__, url_prefix='/pacientes')


@bp.route('/')
# @login_required
def lista_pacientes():
    try:
        pacientes = _obtener_paciente()
        return jsonify(pacientes), 200
    except Exception as e:
        print(e, flush=True)
        return abort(500)


@bp.route('/<int:id>')
# @login_required
def obtener_paciente(id):
    try:
        pacientes = _obtener_paciente(id)
        return jsonify(pacientes), 200
    except Exception as e:
        print(e, flush=True)
        return abort(500)


@bp.route('/nuevo', methods=('POST',))
# @login_required
def nuevo_paciente():
    try:
        data = request.json
        doc = (data.get('nombre_completo'), data.get('fecha_nac'), 
            data.get('domicilio'), data.get('correo'), data.get('telefono'),  data.get('contrasenia'))

        if not all(doc):
            return jsonify('Faltan campos requeridos'), 400
        
        paciente = _crear_paciente(doc)
        if paciente:
           return jsonify(_obtener_paciente(paciente)), 200
        return abort(400)
    except Exception as e:
        return abort(400)


@bp.route('/modificar/<int:id>', methods=('POST',))
# @login_required
def modificar_paciente(id):
    try:
        data = request.json
        doc = (data.get('nombre_completo'), data.get('fecha_nac'), 
            data.get('domicilio'), data.get('correo'), data.get('telefono'), id)
        if not all(doc):
            return jsonify('Faltan campos requeridos'), 400
        
        _actualizar_paciente(doc)
        return jsonify(_obtener_paciente(id)), 200
    except Exception as e:
        return abort(400)


@bp.route('/eliminar/<int:id>')
# @login_required
def eliminar(id):
    try:
        _eliminar_paciente((id,))
        return jsonify(_obtener_paciente(id)), 200
    except Exception as e:
        return abort(400)

# Metodos de transaccionalidad con BD
def _obtener_paciente(id = None):
    if id:
        paciente = sql("""select id_paciente,
                nombre_completo, fecha_nac, domicilio, correo, telefono, contraseña 
            from pacientes where id_paciente = %s """, (id,), unico=True)
        return paciente
    lista_pacientes = sql('''select id_paciente,    
                nombre_completo, fecha_nac, domicilio, correo, telefono, contraseña 
            from pacientes where deshabilitado = 0;''')
    return lista_pacientes


def _crear_paciente(doc):
    paciente = insertar_o_actualizar("""insert into 
        pacientes(nombre_completo, fecha_nac, domicilio, correo, telefono, contraseña)
        values (%s, %s, %s, %s, %s, %s)
    """, doc)
    return paciente


def _actualizar_paciente(doc):
    paciente = insertar_o_actualizar("""update
        pacientes set nombre_completo = %s, fecha_nac = %s, domicilio = %s, correo = %s ,
        telefono = %s where id_paciente = %s;
    """, doc)
    return paciente


def _eliminar_paciente(id):
    paciente = insertar_o_actualizar("""update
        pacientes set deshabilitado = 1 where id_paciente = %s;
    """, id)
    return paciente