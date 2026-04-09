from sqlalchemy import create_engine, text
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

engine = create_engine(os.getenv('DATABASE_URL'))

Base = automap_base()
Base.prepare(engine, reflect=True)

Session = sessionmaker(bind=engine)


class UsuarioHelper:

    def phone_exists(self, phone: str) -> bool:
        session = Session()
        try:
            Usuario = Base.classes.usuarios
            u = session.query(Usuario).filter_by(user_phone=phone).first()
            return u is not None
        finally:
            session.close()

    def get_by_phone(self, phone: str) -> dict | None:
        session = Session()
        try:
            Usuario = Base.classes.usuarios
            u = session.query(Usuario).filter_by(user_phone=phone).first()
            if u is None:
                return None
            return {col.key: getattr(u, col.key) for col in Usuario.__table__.columns if col.key != 'password'}
        finally:
            session.close()

    def username_exists(self, user_name: str) -> bool:
        session = Session()
        try:
            Usuario = Base.classes.usuarios
            u = session.query(Usuario).filter_by(user_name=user_name).first()
            return u is not None
        finally:
            session.close()

    def get_by_username(self, user_name: str) -> dict | None:
        session = Session()
        try:
            Usuario = Base.classes.usuarios
            u = session.query(Usuario).filter_by(user_name=user_name).first()
            if u is None:
                return None
            return {col.key: getattr(u, col.key) for col in Usuario.__table__.columns if col.key != 'password'}
        finally:
            session.close()

    def get_financial_context(self, user_id: int) -> dict:
        context = {}
        with engine.connect() as conn:

            # XP y nivel
            xp = conn.execute(text(
                "SELECT xp, current_level FROM user_expirience WHERE user_id = :uid"
            ), {"uid": user_id}).fetchone()
            if xp:
                context["xp"] = xp.xp
                context["nivel"] = xp.current_level

            # Wallet
            wallet = conn.execute(text(
                "SELECT max_range, low_range, cant_rest, monthly_balance, financial_health "
                "FROM wallet_state WHERE user_id = :uid"
            ), {"uid": user_id}).fetchone()
            if wallet:
                context["presupuesto_maximo"] = str(wallet.max_range)
                context["presupuesto_minimo"] = str(wallet.low_range)
                context["dinero_restante"] = str(wallet.cant_rest)
                context["balance_mensual"] = wallet.monthly_balance
                context["salud_financiera"] = str(wallet.financial_health)

            # Últimas 10 transacciones
            transacciones = conn.execute(text(
                "SELECT amount, category, description, timestamp "
                "FROM transacciones WHERE user_id = :uid "
                "ORDER BY timestamp DESC LIMIT 10"
            ), {"uid": user_id}).fetchall()
            if transacciones:
                context["ultimas_transacciones"] = [
                    f"{t.timestamp} | {t.category} | ${t.amount} | {t.description}"
                    for t in transacciones
                ]

            # Misiones activas
            misiones = conn.execute(text(
                "SELECT m.mission_name, m.mision_type, m.xp_drop, a.status "
                "FROM acepted_missions a "
                "JOIN missiones m ON a.mision_id = m.mission_id "
                "WHERE a.user_id = :uid AND a.status = 'activa'"
            ), {"uid": user_id}).fetchall()
            if misiones:
                context["misiones_activas"] = [
                    f"{m.mission_name} ({m.mision_type}) - {m.xp_drop}XP"
                    for m in misiones
                ]

            # Ranking semanal
            ranking = conn.execute(text(
                "SELECT xp_diference, week FROM week_ranking "
                "WHERE user_id = :uid ORDER BY week DESC LIMIT 1"
            ), {"uid": user_id}).fetchone()
            if ranking:
                context["xp_esta_semana"] = ranking.xp_diference

        return context
