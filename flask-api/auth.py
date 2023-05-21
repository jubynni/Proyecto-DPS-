import functools

from flask import (
    Blueprint, jsonify, request, session, current_app as app, abort
)
from .db import *
from cryptography.fernet import Fernet


bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/login-admin', methods=('POST',))
def login_admin():
    #Método login para administradores, valida que el usuario exista y que la contraseña sea correcta para 
    #crear la sesion.
    try:
        data = request.json
        correo = data.get('correo')
        consulta = """select id_admin, contraseña from admin where correo = %s """
        usuario = sql(consulta, (correo,), unico=True)
        
        if usuario and decrypt_pwd(usuario.get('contraseña')) == data.get('password'):
            session.clear()
            session['id'] = usuario.get('id_admin')
            return jsonify({'id': usuario['id_admin']}), 200
        return jsonify('Usuario o contraseña incorrecta'), 401
    except Exception as e:
        print('Error al iniciar sesión: {}'.format(str(e)), flush=True)
        return jsonify(f"Ocurrio un error al iniciar sesión: {e}"), 400


@bp.route('/logout')
def logout():
    #Limpia la sesion y redirecciona a login
    session.clear()
    return jsonify(True), 200


def encrypt_pwd(password):
    fernet = Fernet(app.config['PWD_KEY'])
    return fernet.encrypt(password.encode()).decode()


def decrypt_pwd(password):
    fernet = Fernet(app.config['PWD_KEY'])
    return fernet.decrypt(password.encode()).decode()


def login_required(view):
    #Crea un decorador para que se validen todas aquellas rutas
    #que requieran un usuario logeado. En caso que no haya usuario redirecciona al login
    #sino carga la vista correspondiente.
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if not session.get('id'):
            return abort(401)
        return view(**kwargs)
    return wrapped_view
