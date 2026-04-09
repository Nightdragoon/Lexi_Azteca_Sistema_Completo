# 🦅 Lexi Azteca

> **Educación financiera gamificada para universitarios mexicanos.**
> Aprende, simula, completa misiones y sube de rango — todo en un solo lugar.

---

## ✨ ¿Qué es Lexi Azteca?

Lexi Azteca es una plataforma web full-stack que combina una **billetera virtual simulada**, un **asistente de IA financiera** y un sistema de **misiones y gamificación** para que estudiantes universitarios en México desarrollen hábitos financieros saludables de forma divertida.

---

## 🗂️ Estructura del repositorio

```
Lexi_Azteca_Sistema_Completo/
├── Backend/          # API REST en Flask + Python
└── FrontEnd/         # App web en Next.js 15 + TypeScript
```

---

## 🖥️ Frontend — Next.js 15

### Stack

| Tecnología | Uso |
|---|---|
| Next.js 15 (App Router) | Framework principal |
| React 19 + TypeScript | UI y tipado estricto |
| Zustand 5 | Estado global persistido |
| TailwindCSS 4 | Estilos utility-first |
| Framer Motion | Animaciones fluidas |
| Recharts | Gráficas financieras |
| Radix UI | Componentes accesibles |

### Páginas principales

- **`/dashboard`** — Resumen financiero, salud del wallet y actividad reciente
- **`/simulador`** — Billetera virtual: registra gastos, visualiza tendencias
- **`/misiones`** — Retos financieros con recompensas de XP
- **`/aprender`** — Contenido educativo sobre finanzas personales
- **`/ranking`** — Tabla de líderes entre usuarios
- **`/integrations`** — Conexión con cuentas bancarias

### Correr en local

```bash
cd FrontEnd
npm install
npm run dev          # http://localhost:3000
```

### Variables de entorno (FrontEnd)

```env
NEXT_PUBLIC_API_URL=https://lexi-azteca2-production.up.railway.app
```

---

## ⚙️ Backend — Flask + Python

### Stack

| Tecnología | Uso |
|---|---|
| Flask | Framework web |
| SQLAlchemy | ORM + migraciones |
| PostgreSQL / SQLite | Base de datos |
| OpenAI API | Asistente financiero con IA |
| ElevenLabs | Síntesis de voz |
| APScheduler | Tareas programadas (misiones, notificaciones) |
| Flasgger | Documentación Swagger automática |
| Gunicorn | Servidor de producción |

### Módulos principales

| Blueprint | Prefijo | Descripción |
|---|---|---|
| `ia_bp` | `/ia` | Chat con asistente financiero IA |
| `usuario_bp` | `/usuario` | Registro, login y perfil |
| `ms_bl` | `/misiones` | CRUD de misiones y progreso |
| `sim_bl` | `/simulador` | Wallet virtual y transacciones |
| `tg_bp` | `/telegram` | Integración con bot de Telegram |
| `ranking_bp` | `/ranking` | Tabla de líderes |

### Correr en local

```bash
cd Backend
pip install -r requirements.txt
python app.py        # http://localhost:5432
```

### Variables de entorno (Backend)

```env
DATABASE_URL=postgresql://user:password@host/dbname
SECRET_KEY=tu-clave-secreta
OPENAI_API_KEY=sk-...
```

### Documentación Swagger

Una vez levantado el backend, visita:

```
http://localhost:5432/apidocs
```

---

## 🎮 Características destacadas

### 🤖 Asistente de IA (Lexi)
Chatbot financiero personalizado que responde preguntas sobre el saldo, gastos y consejos de ahorro. Integrado vía WhatsApp/Telegram además de la app web.

### 💰 Simulador de Wallet
Los usuarios configuran su ingreso mensual y rangos de gasto estimados. El sistema calcula automáticamente el **superávit disponible** y el **índice de salud financiera**.

### 🏆 Gamificación
- Sistema de **XP y niveles**
- **Logros** desbloqueables
- **Misiones** diarias y semanales con recompensas
- **Ranking** global entre estudiantes

### 📊 Visualización
Gráficas de tendencias de gastos por categoría con Recharts, actualizadas en tiempo real.

---

## 🚀 Deploy

| Capa | Plataforma |
|---|---|
| Backend | [Railway](https://railway.app) |
| Frontend | [Vercel](https://vercel.com) |

---

## 🤝 Contribuir

1. Haz fork del repositorio
2. Crea una rama: `git checkout -b feature/mi-feature`
3. Haz commit: `git commit -m "feat: descripción"`
4. Push: `git push origin feature/mi-feature`
5. Abre un Pull Request

---

<div align="center">
  Hecho con ❤️ para universitarios mexicanos
</div>
