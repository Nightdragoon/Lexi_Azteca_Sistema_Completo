# Handoff Backend (Demo)

Documento para el equipo de backend con lo que ya consume el frontend y ejemplos con datos falsos para demo.

## Objetivo inmediato

- Dejar operativos los endpoints de `misiones` y `wallet` para demo end-to-end.
- Mantener formato JSON estable para que frontend no requiera cambios adicionales.
- Permitir login con `user_id` + token para activar rutas protegidas.

## Endpoints prioritarios (implementar ya)

### Auth / Usuario

- `POST /usuario/login`
  - Debe devolver token (`access_token`, `accessToken`, `token` o `jwt`) y `user_id`.
  - Ejemplo demo:

```json
{
  "access_token": "demo.jwt.token",
  "user": {
    "user_id": 101,
    "user_name": "Ana Demo",
    "user_phone": "5511223344"
  }
}
```

### Misiones

- `GET /misiones/` (catálogo)
- `POST /misiones/aceptar`
- `GET /misiones/activas/{user_id}`
- `POST /misiones/completar`

> Frontend envía `Authorization: Bearer <token>` en estas rutas.

#### Body esperado en frontend

`POST /misiones/aceptar`

```json
{
  "user_id": 101,
  "mission_id": "2"
}
```

`POST /misiones/completar`

```json
{
  "user_id": 101,
  "mission_id": "2"
}
```

#### Respuesta demo sugerida (`GET /misiones/`)

```json
[
  {
    "correct_answer": null,
    "created_at": "2026-04-08 21:22:06.392047",
    "description": "Agrega una transacción de cualquier categoría",
    "mision_type": "completar",
    "mission_id": "2",
    "mission_name": "Registra tu primer gasto",
    "status": "disponible",
    "time_limit_days": "7",
    "xp_drop": "50",
    "category": "wallet",
    "difficulty": "fácil"
  },
  {
    "correct_answer": null,
    "created_at": "2026-04-09 09:10:00.000000",
    "description": "Realiza una transferencia simulada por al menos $200 MXN",
    "mision_type": "completar",
    "mission_id": "3",
    "mission_name": "Primera transferencia",
    "status": "disponible",
    "time_limit_days": "5",
    "xp_drop": "80",
    "category": "transferencias",
    "difficulty": "media"
  },
  {
    "correct_answer": null,
    "created_at": "2026-04-09 09:30:00.000000",
    "description": "Mantén gastos hormiga por debajo de $100 durante 3 días",
    "mision_type": "hábito",
    "mission_id": "4",
    "mission_name": "Control de gastos hormiga",
    "status": "disponible",
    "time_limit_days": "3",
    "xp_drop": "120",
    "category": "disciplina",
    "difficulty": "difícil"
  }
]
```

#### Respuesta demo sugerida (`GET /misiones/activas/{user_id}`)

```json
[
  {
    "correct_answer": null,
    "created_at": "2026-04-08 21:22:06.392047",
    "description": "Agrega una transacción de cualquier categoría",
    "mision_type": "completar",
    "mission_id": "2",
    "mission_name": "Registra tu primer gasto",
    "status": "activa",
    "time_limit_days": "7",
    "xp_drop": "50",
    "progress_percent": 35,
    "category": "wallet",
    "difficulty": "fácil"
  }
]
```

#### Respuesta demo sugerida (`POST /misiones/aceptar`)

```json
{
  "ok": true,
  "message": "Misión aceptada",
  "user_id": 101,
  "mission_id": "2",
  "status": "activa"
}
```

#### Respuesta demo sugerida (`POST /misiones/completar`)

```json
{
  "ok": true,
  "message": "Misión completada",
  "user_id": 101,
  "mission_id": "2",
  "status": "completada",
  "xp_awarded": 50
}
```

### Wallet / Simulador

- `GET /simulador/historial/{user_id}`
- `POST /simulador/transaccion`
- `POST /simulador/wallet/start`
- `GET /simulador/wallet/{user_id}`

#### Body demo (`POST /simulador/transaccion`)

```json
{
  "user_id": 101,
  "category": "Gasto Hormiga",
  "amount": 85.5,
  "description": "Café y snack en campus"
}
```

#### Respuesta demo (`GET /simulador/wallet/{user_id}`)

```json
{
  "user_id": 101,
  "virtual_balance": 4520.5,
  "monthly_virtual_income": 7500,
  "financial_health_score": 78,
  "xp_points": 430,
  "current_level": 2
}
```

## Reglas de compatibilidad (importante)

- Siempre responder JSON (no texto plano).
- En errores enviar al menos uno: `message` o `error`.
- Mantener `mission_id` y `user_id` como valores serializables (`string` o `number`).
- `xp_drop` puede venir string o number (frontend soporta ambos).

Ejemplo error:

```json
{
  "message": "Misión no encontrada",
  "code": "MISSION_NOT_FOUND"
}
```

## Datos fake de demo (seed sugerido)

- Usuario demo:
  - `user_id`: `101`
  - `user_name`: `Ana Demo`
  - `user_phone`: `5511223344`
- Misiones demo: IDs `2`, `3`, `4` (como en ejemplos).
- Wallet demo inicial:
  - `virtual_balance`: `4606.00`
  - `xp_points`: `380`
  - `financial_health_score`: `76`

## Checklist de implementación backend

- [ ] Login devuelve token + `user_id`.
- [ ] Endpoints de `misiones` listados arriba funcionando.
- [ ] Endpoints de `wallet` listados arriba funcionando.
- [ ] CORS habilitado para frontend (o usar proxy con `/api_proxy`).
- [ ] Errores con `message`/`error`.
- [ ] Swagger/OpenAPI actualizado con estos contratos.

## Nota

Cuando pasemos de demo a productivo, este documento se reemplaza por el OpenAPI final como fuente de verdad.

