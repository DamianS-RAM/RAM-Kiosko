from flask import Blueprint, request, flash, redirect, render_template, url_for, session
from flask_login import login_user, login_required, logout_user, current_user
from .models import Users, empType, dbFunctions
from werkzeug.security import check_password_hash
from . import db
from .static.added_funcs import added_funcs
from .funtions import functionalities


auth = Blueprint('auth', __name__)
auth_ram = Blueprint('auth_ram', __name__)
auth_wmm = Blueprint('auth_wmm', __name__)


@auth.route('/login', methods=['GET', 'POST'])
@auth_ram.route('/login', methods=['GET', 'POST'])
@auth_wmm.route('/login', methods=['GET', 'POST'])
def login():
    # message, status = dbFunctions.initializeDB()
    # flash(message, status)
    # return render_template('login.html')
    try:
        current_user.id
        return redirect(url_for("views.home"))
    except:
        # Deletes cookie expire_at (which is created when level='User' logs in)
        if (session.get('expire_at')):
            del session['expire_at']
            

        try:
            company = request.path.split("/")[1]
            company = company if company in ['RAM', 'WMM'] else None
            if request.method == 'POST':
                print("---------------------------------------------")
                print(company)
                print("---------------------------------------------")
                userID = request.form.get('user')
                password = request.form.get('password')
                # user = Users.query.filter_by(id=userID, company=f'{company}').first()
                user = Users.query.filter_by(id=userID).first()
                print(user)
                if user:
                    if check_password_hash(user.password, password):
                        functionalities.set_user_session_time(user)

                        login_user(user, remember=False)
                        return redirect(url_for("views.home"))
                    else:
                        flash("Contraseña incorrecta.", category="error")
                else:
                    flash("Usuario no se encuentra registrado. Si el error persiste favor de contactar a Recursos Humanos.", category="error")
            else:
                added_funcs.deleteEmpDir()
                return render_template('login.html', company=company)
            
            return redirect(url_for(f"auth{('_' + company.lower()) if company else ''}.login"))
        
        except Exception as e:
            return f"Internal Server Error: {e}", 500


@auth.route('/logout')
@login_required
def logout():
    company = current_user.company
    added_funcs.deleteEmpDir(current_user.id)
    logout_user()
    flash("Sesión cerrada.", category="login")
    return redirect(url_for(f'auth_{ company.lower() }.login'))


@auth.route('/change-user-password/<string:id>', methods=['GET', 'POST'])
@login_required
def change_user_password(id):
    if request.method == 'POST':
        if not functionalities.check_permissions( ['RH', 'Admin'] ):
            flash("No tiene el permiso necesario para acceder a esta función.", category="error")
            return redirect(url_for("views.home"))
        
        user = Users.query.filter_by(id=id).first()
        if current_user.user_level < 3 and user.user_level > 1 and current_user.id != user.id:
            flash("No tiene los permisos necesarios para editar un usuario administrador, favor de contactar al área de IT.", category="error")
            return redirect(url_for("views.users"))
        
        password_1 = request.form.get('password1')
        password_2 = request.form.get('password2')
        if password_1 != password_2:
            flash(f"Las contraseñas no coinciden, no se actualizó la contraseña del usuario {id}.", category="error")
            return redirect(url_for("views.users"))
    
        user.password = dbFunctions.generatePwd(password_1)
        db.session.commit()
        flash(f"Contraseña cambiada correctamente para usuario {id}.", category="success")
    
    return redirect(url_for('views.users'))


@auth.route('/change-email', methods=['POST'])
@login_required
def change_email():
    try:
        res_message, status = dbFunctions.change_user_email( current_user, request.form.get('email') )
        flash(res_message, category=status)
    
    except Exception as e:
        flash(f"Error, no se puso cambiar el correo electrónico. Favor de tomar evidencia y mostrar al área correspondiente, error: {e}", category="error")
    
    return redirect(url_for("views.home"))


@auth.route('/add-user', methods=['POST'])
@login_required
def add_user():
    if not functionalities.check_permissions( ['RH', 'Admin'] ):
        flash("No tiene el permiso necesario para acceder a esta función.", category="error")
        return redirect(url_for("views.home"))
    
    if request.method == 'POST':
        id = request.form.get('id')

        if Users.query.filter_by(id=id).first():
            flash(f"El número de empleado {id} ya se encuentra registrado con otro usuario.", category="error")
            return redirect(url_for('views.users'))
        
        user_level = request.form.get('user_level')
        company = request.form.get('company')
        if user_level:
            message, status, password, created_user = dbFunctions.addUserToKiosko(id, company, user_level)
        else:
            message, status, password, created_user = dbFunctions.addUserToKiosko(id, company)

        flash(message, category=status)
        if created_user:
            session['password'] = password
            session['uid'] = created_user.id
            session['ufull_name'] = created_user.full_name

        return redirect(url_for('views.users'))


@auth.route('/edit-user/<string:id>', methods=['GET', 'POST'])
@login_required
def edit_user(id):
    if not functionalities.check_permissions( ['RH', 'Admin'] ):
        flash("No tiene el permiso necesario para acceder a esta función.", category="error")
        return redirect(url_for("views.home"))
    
    if request.method == 'POST':
        user = Users.query.filter_by(id=id).first()
        user.full_name = request.form.get('full_name')
        user.email = request.form.get('email')
        user.id_empType = request.form.get('emp_type')
        user.company = request.form.get('company')
        user_level = request.form.get('user_level')
        if user_level:
            user.user_level = user_level
    
        db.session.commit()
        flash(f"Usuario {id} se editó correctamente.", category="success")
        return redirect(url_for('views.users'))
    
    else:
        user = Users.query.filter_by(id=id).first()
        if not user:
            flash(f"No se encontró al usuario con ID {id}.", category="error")
            return redirect(url_for("views.users"))
        
        if current_user.user_level < 3 and current_user.user_level <= user.user_level:
            flash("No tiene los permisos necesarios para editar un usuario administrador, favor de contactar al área de IT.", category="error")
            return redirect(url_for("views.users"))
    
    empType_list, user_lvl_list = dbFunctions.get_EmpTypes_UserLevels()
    
    return render_template("user_control.html", title="Editar usuario", user=user, current_user=current_user, empType_list=empType_list, user_lvl_list=user_lvl_list)


@auth.route('/delete-user/<string:id>')
@login_required
def delete_user(id):
    try:
        if not functionalities.check_permissions( ['RH', 'Admin'] ):
            flash("No tiene el permiso necesario para acceder a esta función.", category="error")
            return redirect(url_for("views.home"))

        user = Users.query.filter_by(id=id).first()
        if current_user.user_level < 3 and user.user_level > 1:
            flash("No tiene los permisos necesarios para borrar un usuario administrador, favor de contactar al área de IT.", category="error")
            return redirect(url_for("views.users"))

        if user.id == current_user.id:
            flash("No puedes borrar tu usuario, favor de contactar al área de IT.", category="error")
            return redirect(url_for("views.users"))

        Users.query.filter_by(id=id).delete()
        db.session.commit()
        flash(f"Usuario {id} borrado correctamente.", category="success")
    
    except Exception as e:
        flash(f"Ocurrió un error al borrar al usuario {id}, error: {e}.", category="error")

    return redirect(url_for('views.users'))