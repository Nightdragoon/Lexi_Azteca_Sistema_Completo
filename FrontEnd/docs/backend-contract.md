# Contrato frontend ↔ backend (Lexi App)

Este documento describe qué debe exponer el **backend** para que el frontend Next.js funcione de forma estable. El código del cliente vive en `services/http/*` y `services/endpoints/*`.

## Configuración esperada en el frontend

| Variable | Uso |
|----------|-----|
| `NEXT_PUBLIC_API_URL` | URL base del API **sin** barra final, ej. `https://api.tudominio.com` o `http://localhost:8000`. También puedes usar el proxy de Next: `NEXT_PUBLIC_API_URL=/api_proxy` si `next.config.ts` reescribe hacia tu API. |

## Autenticación

1. **Login** (`POST /usuario/login`) debe ser público (sin `Authorization`).
2. Respuesta recomendada tras login correcto (elige un campo; el frontend acepta cualquiera de estos nombres):
   - `access_token` (preferido), o
   - `accessToken`, o
   - `token`, o
   - `jwt`

   Ejemplo:

   ```json
   {
     "access_token": "<JWT>",
     "user": { "user_id": 1, "user_phone": "...", "user_name": "..." }
   }
   ```

3. El frontend envía en el resto de rutas:

   ```http
   Authorization: Bearer <JWT>
   ```

4. Errores HTTP habituales: `401` no autenticado / credenciales inválidas; `403` sin permiso.

## Formato de errores (recomendado)

Cuerpo JSON con al menos uno de:

- `message`
- `error`

El cliente lee cualquiera de los dos para mostrar el mensaje al usuario.

Ejemplo:

```json
{ "message": "Teléfono ya registrado", "code": "PHONE_EXISTS" }
```

## CORS y entornos

- Si el navegador llama **directamente** al backend desde otro origen, el servidor debe enviar headers CORS adecuados (`Access-Control-Allow-Origin`, métodos, `Authorization`).
- En desarrollo, alternativa: proxy en Next (`rewrites` en `next.config.ts`) y `NEXT_PUBLIC_API_URL=/api_proxy` para que el browser solo hable con el mismo origen.

## Endpoints que el frontend ya invoca

Alinea paths y métodos con lo siguiente (ajusta payloads si tu API usa otros nombres de campo; entonces habría que actualizar `services/endpoints/*`).

### Usuario

| Método | Ruta | Notas |
|--------|------|--------|
| `GET` | `/usuario/` | Lista usuarios |
| `POST` | `/usuario/` | Registro; body incluye `user_name`, `user_phone`, `password`, `onboarding` |
| `POST` | `/usuario/login` | Login; devolver token (ver arriba) |
| `GET` | `/usuario/{id}` | |
| `PUT` | `/usuario/{id}` | |
| `DELETE` | `/usuario/{id}` | |

### IA

| Método | Ruta |
|--------|------|
| `POST` | `/ia/conversation` |
| `GET` | `/ia/hello_world` |

### Misiones

| Método | Ruta |
|--------|------|
| `GET` | `/misiones/` |
| `POST` | `/misiones/` |
| `POST` | `/misiones/aceptar` |
| `GET` | `/misiones/activas/{user_id}` |
| `POST` | `/misiones/completar` |

### Simulador / wallet

| Método | Ruta |
|--------|------|
| `GET` | `/simulador/historial/{user_id}` |
| `POST` | `/simulador/transaccion` |
| `POST` | `/simulador/wallet/start` |
| `GET` | `/simulador/wallet/{user_id}` |

### WhatsApp (si aplica)

| Método | Ruta |
|--------|------|
| `POST` | `/whatsapp/send-template` |
| `POST` | `/whatsapp/send-text` |
| `POST` | `/whatsapp/update-token` |

### Rutas legacy / demo (`lexiApi`)

| Método | Ruta |
|--------|------|
| `GET` | `/users/{phoneNumber}/dashboard` |
| `POST` | `/webhook/whatsapp` |
| `POST` | `/simulation/trigger-mission` |

### Prueba

| Método | Ruta |
|--------|------|
| `GET` | `/prueba/` |

## Lo que conviene que el backend “entregue” al equipo de frontend

1. **OpenAPI (Swagger)** generado o URL pública del spec — fuente de verdad para tipos.
2. **Ejemplo real de respuesta** de login (JSON) con el campo de token definitivo.
3. **Lista de códigos de error** (`code`) si los usan, para mapear mensajes en UI.
4. **Tiempo de vida del JWT** y si hay **refresh token**; si añaden refresh, el frontend necesitará un flujo extra (endpoint + renovación).
5. **Identificador de usuario** estable (`user_id` o UUID) para rutas como `/misiones/activas/{userId}` y `/simulador/wallet/{userId}`.

## Extender el cliente en el repo

- Nuevo dominio: archivo en `services/endpoints/<dominio>.ts` usando `apiRequest` de `services/http/client.ts`.
- Agregar el grupo al objeto `api` en `services/api.ts`.
- Tipos compartidos: `types/index.ts` o `types/<modulo>.ts`.
