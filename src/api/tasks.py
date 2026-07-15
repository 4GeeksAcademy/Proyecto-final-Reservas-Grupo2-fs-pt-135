from datetime import datetime

from api.models import db, Reservas


def update_expired_reservations():

    try:
        reservas = Reservas.query.filter_by(status="Activa").all()

        updated = 0
        now_utc = datetime.utcnow()

        for reserva in reservas:

            if reserva.appointment_datetime <= now_utc:
                reserva.status = "Completada"
                updated += 1

        if updated > 0:
            db.session.commit()

            print(
                f"✅ {updated} reserva(s) actualizada(s) a Completada."
            )

        else:
            print("ℹ️ No hay reservas por actualizar.")

    except Exception as error:
        db.session.rollback()

        print(f"❌ Error actualizando reservas: {error}")