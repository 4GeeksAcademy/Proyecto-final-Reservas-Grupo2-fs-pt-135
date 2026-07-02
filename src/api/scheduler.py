from apscheduler.schedulers.background import BackgroundScheduler
from api.tasks import update_expired_reservations

scheduler = BackgroundScheduler()


def start_scheduler(app):
    scheduler.add_job(
        func=lambda: run_with_app_context(app),
        trigger="interval",
        minutes=1,
        id="update_reservations",
        replace_existing=True
    )

    scheduler.start()
    print("Scheduler iniciado")


def run_with_app_context(app):
    with app.app_context():
        update_expired_reservations()