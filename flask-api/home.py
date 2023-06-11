from flask import (
    Blueprint, jsonify
)
from .db import *
from .auth import login_required

bp = Blueprint('home', __name__)


@bp.route('/')
# @login_required   
def index():
    #Retorna por defecto index al entrar al sitio
    return jsonify('Bienvenidos'), 200

