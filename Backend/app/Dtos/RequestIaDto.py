from pydantic import BaseModel

class RequestIaDto(BaseModel):
    prompt: str
    number: str