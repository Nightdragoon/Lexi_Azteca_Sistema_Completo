# Requerimientos de Datos para el Backend (Arquitectura de Información)

## Entidades / Tablas de Base de Datos Necesarias:

**1. Usuario (`users`)**

- `user_id` (UUID - Identificador único)
- `phone_number` (String - Único, el identificador que viene de WhatsApp)
- `name` / `alias` (String)
- `onboarding_completed` (Boolean - Para saber si ya se le hizo la entrevista inicial)
- `created_at` (Timestamp)

**2. Estado del Simulador (El "Bolsillo Virtual" - `wallet_state`)**

- `user_id` (Relación)
- `virtual_balance` (Decimal/Float - El dinero virtual disponible)
- `monthly_virtual_income` (Decimal - Ingreso recurrente simulado)
- `financial_health_score` (Integer - Del 0 al 100, la métrica principal del dashboard)
- `xp_points` (Integer - Puntos de experiencia)
- `current_level` (Integer - Nivel del usuario, ej: Nivel 1 "Novato", Nivel 2 "Ahorrador")

**3. Historial de Decisiones / Transacciones (`transactions`)**

- `transaction_id` (UUID)
- `user_id` (Relación)
- `amount` (Decimal - Positivo o negativo)
- `category` (String - Ahorro, Gasto Hormiga, Inversión, Emergencia)
- `description` (String - Ej: "Compró 3 cafés de Starbucks", "Rendimiento CETES")
- `timestamp` (Date/Time - Para graficar en el Dashboard web)

**4. Misiones Activas (`missions`)**

- `user_id` (Relación)
- `mission_type` (String - Ej: "Temptation", "Investment_Opportunity")
- `status` (String - Pending, Resolved, Ignored)
- `resolution` (String - Lo que el usuario decidió hacer)

**5. Historial de Conversación para la IA (`chat_messages`) - _Si no usan el historial automático de la API de OpenAI_**

- `message_id` (UUID)
- `user_id` (Relación)
- `role` (String - "user", "assistant", "system")
- `content` (String - El texto procesado del mensaje)
- `timestamp` (Date/Time - Importante para darle solo los últimos N mensajes al prompt del LLM)

## Webhooks y Endpoints Esenciales (API):

- **`POST /webhook/whatsapp`**
  - **Qué hace:** Recibe los datos de Twilio/Meta cuando el usuario envía un mensaje de WhatsApp.
  - **Datos que recibe:** `From` (Número), `Body` (Texto) o URL del audio, y `MessageSid`.
- **`GET /api/users/{phone_number}/dashboard`**
  - **Qué hace:** Alimenta el Dashboard Web (PWA) en tiempo real.
  - **Datos que devuelve:** Nivel actual, XP, Distribución del balance virtual (Ahorro, Deuda, Disponible), Score de Salud Financiera y las últimas 5 decisiones tomadas para graficar el avance.
- **`POST /api/simulation/trigger-mission` (Uso interno / Cronjob)**
  - **Qué hace:** Dispara proactivamente un escenario al usuario de WhatsApp (ej. un viernes por la noche: _"Te invitan a un concierto, la entrada es el 40% de tu saldo disponible de la quincena, ¿qué haces?"_).
