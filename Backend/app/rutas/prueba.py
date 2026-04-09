from flask import Blueprint

prueba_bp = Blueprint('prueba', __name__, url_prefix='/prueba')

@prueba_bp.route('/')
def hello_world():
    """
    Endpoint de prueba
    ---
    tags:
      - prueba
    responses:
      200:
        description: Saludo de prueba
        schema:
          type: string
          example: Hello World!
    """
    return 'Hello World!'
