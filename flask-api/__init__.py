from posixpath import dirname, join, realpath
from flask import Flask
from flask_cors import CORS, cross_origin


def create_app(test_config=None):
    #Creacion y configuracion de app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='caefb93e545fcb0a',
    )
    CORS(app, support_credentials=True, origins='http://localhost:19006')
    
    
    #Acepta archivos de hasta 5MB, acepta solo archivos con las extensiones detalladas y se definen
    #los directorios donde se almacenan los archivos subidos.
    app.config['MAX_CONTENT_LENGTH'] = 1024 * 1024 * 5
    app.config['UPLOAD_EXTENSIONS'] = ['.jpg', '.png', '.csv', '.xls', '.xlsx', '.txt']
    app.config['UPLOAD_PATH'] = join(dirname(realpath(__file__)), 'static/uploads')
    app.config['PWD_KEY'] = b'mKB6Xd9DnOxCn-yO2AE6CFH0rcguz-RTPnpUKkEsYb4='
    #Se agregan los blueprints
    from . import auth
    app.register_blueprint(auth.bp)

    from . import home
    app.register_blueprint(home.bp)

    from . import doctores
    app.register_blueprint(doctores.bp)   

    from . import pacientes
    app.register_blueprint(pacientes.bp)   

    from . import citas
    app.register_blueprint(citas.bp)   

    #Se agrega endpoint del home ya que el bp no tiene un url_prefix
    app.add_url_rule('/', endpoint='index')
    
    return app
