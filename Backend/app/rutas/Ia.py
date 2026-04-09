from flask import Blueprint, request, jsonify
from pydantic import ValidationError
from app.Handlers.AIHandler import AIHandler
from app.Dtos.RequestIaDto import RequestIaDto
from flask import request

ia_bp = Blueprint('ia', __name__, url_prefix='/ia')

@ia_bp.route("/hello_world", methods=["GET"])
def hello_world():
    """
    Endpoint de prueba IA
    ---
    tags:
      - ia
    responses:
      200:
        description: Saludo de prueba
        schema:
          type: object
          properties:
            message:
              type: string
              example: Hello, World!
    """
    return jsonify({"message": "Hello, World!"})

@ia_bp.route("/conversation", methods=["POST"])
def conversation():

   
   """
   Endpoint de conversación IA
    ---
    tags:
      - ia
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          required:
            - prompt
            - number
          properties:
            prompt:
              type: string
              example: "¿Cuál es mi saldo?"
            number:
              type: string
              example: "5512345678"
    responses:
      200:
        description: Respuesta exitosa
      400:
        description: Datos inválidos
   """

   
   try:
        data = RequestIaDto(**request.get_json())
        if data.prompt != None and data.prompt != " ":
            ai_handler = AIHandler()
            response = ai_handler.generate_response(f"{data.prompt} Número de telefono : {data.number}")
            return jsonify({"response": response})
            
        
    
        return jsonify({"ok":"bien"})
   
   except ValidationError as e:
        return {"error": e.errors()}, 400


