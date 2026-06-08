import random
import string
from . import db
from .static.added_funcs import added_funcs
from flask_login import UserMixin
from sqlalchemy import text, cast, func, Integer
from werkzeug.security import generate_password_hash
from datetime import datetime
from dateutil import relativedelta

class Users(db.Model, UserMixin):
    id = db.Column(db.String, primary_key=True)
    password = db.Column(db.String(150))
    full_name = db.Column(db.String(150))
    email = db.Column(db.String(150), unique=True)
    user_level = db.Column(db.Integer, db.ForeignKey('user_level.id_user_level'))
    id_empType = db.Column(db.Integer, db.ForeignKey('emp_type.id_empType'))
    start_date = db.Column(db.String(30))
    company = db.Column(db.String(5), db.ForeignKey('company.company_id'))
    company_info = db.relationship("company")
    empType_name = db.relationship("empType")
    user_lvl = db.relationship("userLevel")


class company(db.Model):
    company_id = db.Column(db.String(5), primary_key=True)
    company_name = db.Column(db.String(50))
    intelisis_no = db.Column(db.String(5))

class docInfo(db.Model):
    id_docInfo = db.Column(db.Integer, primary_key=True, autoincrement=True)
    docNum = db.Column(db.String(15), unique=True)
    directory = db.Column(db.String(150))
    docType = db.Column(db.String(20))
    id_empType = db.Column(db.Integer, db.ForeignKey('emp_type.id_empType'))
    startPeriod = db.Column(db.Integer)
    endPeriod = db.Column(db.Integer)
    company = db.Column(db.String(5), db.ForeignKey('company.company_id'))
    company_info = db.relationship("company")
    empType_name = db.relationship("empType")


class empType(db.Model):
    id_empType = db.Column(db.Integer, primary_key=True, autoincrement=True)
    empType_name = db.Column(db.String(20), unique=True)


class userLevel(db.Model):
    id_user_level = db.Column(db.Integer, primary_key=True, autoincrement=True)
    level_name = db.Column(db.String(30), unique=True)


class vacaciones(db.Model):
    Cuenta = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    Empresa = db.Column(db.String(5))
    Rama = db.Column(db.String(5))
    Saldo = db.Column(db.Integer)


class personal(db.Model):
    Personal = db.Column(db.Integer, primary_key=True)
    Nombre = db.Column(db.String(10))
    ApellidoPaterno = db.Column(db.String(30))
    ApellidoMaterno = db.Column(db.String(30))
    FechaAntiguedad = db.Column(db.String(30))
    Tipo = db.Column(db.String(20))
    Estatus = db.Column(db.String(10))
    eMail = db.Column(db.String(50))
    Empresa = db.Column(db.String(5))


class dbFunctions():
    def initializeDB():
        try:
            # new_empType = empType(empType_name="Sindicalizado")
            # db.session.add(new_empType)
            # new_empType = empType(empType_name="Confianza")
            # db.session.add(new_empType)
            # db.session.commit()
            new_user = Users(id=2783, password=dbFunctions.generatePwd("Damian10."), full_name="Damian Sevilla Gallardo", email="damian.sevilla@ram-mx.com", user_level=int(3), id_empType=1, start_date="2024-04-15")
            db.session.add(new_user)
            new_user = Users(id=1234, password=dbFunctions.generatePwd("Damian10."), full_name="Admin 0 Test", email="admin0@ram-mx.com", user_level=int(2), id_empType=2, start_date="2024-04-15")
            db.session.add(new_user)
            db.session.commit()
            return "Database initialized successfully.", "success"
        except Exception as e:
            return f"Error initializing DB: {e}.", "error"

    
    def generatePwd(pwd):
        return generate_password_hash(pwd, method='pbkdf2:sha256')
    
    def getEmpTypes():
        return db.session.query(empType).order_by(empType.id_empType).all()
    
    def get_user_levels():
        return db.session.query(userLevel).order_by(userLevel.id_user_level).all()
    
    def get_EmpTypes_UserLevels():
        return db.session.query(empType).order_by(empType.id_empType).all(), db.session.query(userLevel).order_by(userLevel.id_user_level).all()
    
    def get_fondo_and_fonacot(user, last_nom):
        try:
            fondo = float(db.session.execute(text(f"SELECT Importe FROM NominaD WHERE Personal = '{user.id}' AND Concepto = 'Acum FA Empleado D' AND ID = (SELECT ID FROM Nomina WHERE MovID = '{last_nom}' AND (Mov = 'Nomina' OR Mov = 'Fondo Ahorro' OR Mov = 'Aguinaldo')) ORDER BY Concepto")).first()[0])
            fondo_total = '{0:.2f}'.format(fondo*2)
            fondo = '{0:.2f}'.format(fondo)
            
        except Exception as e:
            print(f"Error al obtener datos: {e}")
            fondo = 0
            fondo_total = 0

        try:
            fonacot = float(db.session.execute(text(f"SELECT  SUM(Saldo) FROM Nomina n join NominaD d ON n.ID=d.ID  WHERE Mov='Credito Fonacot' and Estatus='Vigente'  and Activo=1 and Personal = '{user.id}'")).first()[0])
            fonacot = '$ {0:.2f}'.format(fonacot)

        except:
            fonacot = None

        # returns fondo(unitario), fondo(acumulado), fonacot; formatted as string with 2 decimal places
        return fondo, fondo_total, fonacot

    def getEmpVacationDays(user, last_nom):
        user_extras = {}
        user_extras["start_date"] = user.start_date.strftime("%d/%b/%Y")

        try:
            user_extras["vacations"] = int(db.session.execute(text(f"SELECT Saldo FROM vacaciones WHERE Cuenta = '{user.id}' AND Empresa='03' AND Rama='VAC'")).first()[0])
        except:
            user_extras["vacations"] = 0

        
        user_extras["fa"], user_extras["fa_total"], user_extras["fonacot"] = dbFunctions.get_fondo_and_fonacot(user, last_nom)
        
        now = datetime.today()
        diff = relativedelta.relativedelta(now, user.start_date)
        user_extras["seniority_years"] = diff.years
        user_extras["seniority_months"] = diff.months
        user_extras["seniority_days"] = diff.days
        return user_extras
    

    def pwd_generator(size=8, chars=string.ascii_lowercase + string.digits):
        return ''.join(random.choice(chars) for _ in range(size))


    def addUserToKiosko(userID, company, user_level=1):
        try:
            company_no = dbFunctions.get_company(company).intelisis_no

            userIntelisis = personal.query.filter_by(Personal=userID, Empresa = company_no).first()
            if not userIntelisis:
                return f"Error al agregar usuario {userID}: No se encuentra registrado en Intelisis.", "error", "", ""
            
            if userIntelisis.Estatus != 'ALTA':
                return f"Error al agregar usuario {userID}: El estatus del usuario en Intelisis es incorrecto.", "error", "", ""


            name = userIntelisis.Nombre.title() + " " + userIntelisis.ApellidoPaterno.title() + " " + userIntelisis.ApellidoMaterno.title()
            password = dbFunctions.pwd_generator()
            email = userIntelisis.eMail
            type_name = "Confianza" if (userIntelisis.Tipo == "Empleado") else userIntelisis.Tipo
            emp_type = empType.query.filter_by(empType_name=type_name).first()
            start_date = userIntelisis.FechaAntiguedad.strftime("%Y-%m-%d")

            new_user = Users(id=userID, password=dbFunctions.generatePwd(password), full_name=name, email=email, user_level=int(user_level), id_empType=emp_type.id_empType, start_date=start_date, company=company)

            db.session.add(new_user)
            db.session.commit()

            return f"Usuario {userID} se agregó correctamente.", "success", password, new_user
        
        except Exception as e:
            return f"Error al agregar usuario {userID}: {e}", "error", "", ""
        
    
    def get_company( company_id ):
        return company.query.filter_by(company_id=company_id).first()
    
    def change_user_email(user, email):
        try:
            user.email = email
            db.session.commit()
        except:
            return "No se pudo cambiar el correo, favor de contactar a RH.", "error"
        
        try:
            db.session.execute(text("SET XACT_ABORT ON"))
            user_intelisis = personal.query.filter_by(Personal=user.id).first()
            user_intelisis.eMail = email
            db.session.commit()
        except Exception as e:
            print(f"No se pudo actualizar correo, error: {e}.")
            added_funcs.send_mail("Kisko Sys: Error updating mail to Intelisis", "damian.sevilla@ram-mx.com", [], "", [], f"<p>Unexpected error updating user email to Intelisis: {e}.<p><strong>User:</strong> {user.id} <br><strong>Email:</strong> {email}. <br><br><i>Kiosko System <br>Ramos Arizpe Manufacturing</i>")
        finally:
            return "El correo se actualizó.", "success"
        
    
    def get_all_users():
        return db.session.query(Users).order_by(cast(Users.id, Integer).asc()).all()
    

    def get_documents():
        return db.session.query(docInfo).order_by(docInfo.startPeriod.desc(), docInfo.endPeriod.desc()).all()
        # return db.session.query(docInfo).order_by(docInfo.startPeriod.desc(), cast(func.REPLACE(docInfo.docNum, '-', ''), Integer).desc()).all()