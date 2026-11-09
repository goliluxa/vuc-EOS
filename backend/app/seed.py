from sqlalchemy.orm import Session
from .models import User, Course, Lesson, Event, Grade

def seed_initial_data(db: Session):
    if db.query(User).count() == 0:
        initial_users = [
            User(id="usr-1", login="smirnov_av", full_name="Смирнов Алексей Владимирович", role="cadet", unit_or_department="Группа 141 (Связь)", password="cadet_pass_141"),
            User(id="usr-2", login="kovalev_ds", full_name="Майор Ковалёв Дмитрий Сергеевич", role="teacher", unit_or_department="Военная подготовка", password="teach_vuc_2024"),
            User(id="usr-3", login="morozov_vn", full_name="Подполковник Морозов Виктор Николаевич", role="officer", unit_or_department="Учебная часть ВУЦ", password="officer_morozov"),
            User(id="usr-5", login="petrova_es", full_name="Петрова Елена Сергеевна", role="methodist", unit_or_department="Учебно-методический отдел", password="methodist_vuc"),
            User(id="usr-6", login="semenov_ip", full_name="Подполковник Семёнов Игорь Павлович", role="deputy", unit_or_department="Учебная часть ВУЦ", password="deputy_semenov"),
            User(id="usr-4", login="goliluha", full_name="Администратор системы", role="admin", unit_or_department="Администрация ИОС ВУЦ", password="P17133p17133"),
        ]
        db.add_all(initial_users)
        db.commit()

    if db.query(Course).count() == 0:
        c1 = Course(
            id="course-ovp",
            code="ОВП-101",
            title="Общая военная подготовка",
            department="Военная подготовка",
            instructor="Майор Ковалёв Д. С.",
            total_hours=72,
            completed_hours=24,
            description="Изучение нормативно-правовых основ военной службы, общевоинских уставов ВС РФ и субординации."
        )
        c2 = Course(
            id="course-ognevaya",
            code="ОГН-201",
            title="Огневая подготовка",
            department="Огневая подготовка",
            instructor="Подполковник Морозов В. Н.",
            total_hours=64,
            completed_hours=16,
            description="Материальная часть стрелкового оружия, баллистика, меры безопасности и практическая стрельба из АК-74М."
        )
        db.add_all([c1, c2])
        db.commit()

        l1 = Lesson(id="ovp-1", course_id="course-ovp", number=1, title="Организационная структура Вооруженных Сил РФ", description="Виды и рода войск ВС РФ, воинские звания и знаки различия.", hours=4, instructor="Майор Ковалёв Д. С.", status="published")
        l2 = Lesson(id="ovp-2", course_id="course-ovp", number=2, title="Общевоинские уставы ВС РФ", description="Устав внутренней службы ВС РФ, обязанности военнослужащих и суточный наряд.", hours=4, instructor="Майор Ковалёв Д. С.", status="scheduled", scheduled_date="14 ноября 2026")
        db.add_all([l1, l2])
        db.commit()

    if db.query(Event).count() == 0:
        evs = [
            Event(id="ev-1", title="Строевой смотр личного состава 1-го курса", type="смотр", date="14 ноября 2026", time="08:30 – 10:00", location="Строевой плац ВУЦ", uniform="Форма № 4 (полевая)", officer="Подполковник Морозов В. Н.", description="Проверка внешнего вида, наличия шевронов и предметов обмундирования."),
            Event(id="ev-2", title="Контрольные стрельбы из АК-74 (1-е упражнение)", type="стрельбы", date="21 ноября 2026", time="09:00 – 14:00", location="Войсковой полигон", uniform="Полевая форма, СИЗ", officer="Майор Ковалёв Д. С.", description="Выполнение норматива начальных стрельб на полигоне."),
        ]
        db.add_all(evs)
        db.commit()
