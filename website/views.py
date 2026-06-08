from flask import Blueprint, render_template, redirect, url_for, session, request, flash
from .models import Users, docInfo, empType, dbFunctions
from flask_login import login_required, current_user
from . import db
from .static.added_funcs import added_funcs
from .funtions import functionalities

views = Blueprint('views', __name__)


@views.route('/')
@login_required
def home():
    announcements = added_funcs.get_announcements()

    added_funcs.deleteEmpDir(current_user.id)

    documents = db.session.query(docInfo).filter_by(docType="Nomina", id_empType=current_user.id_empType, company=current_user.company).order_by(docInfo.startPeriod.desc()).limit(5).all()
    nom = added_funcs.getFilesDir(current_user.id, documents, "Nomina ")

    last_nom_name = None
    if documents:
        last_nom_name = documents[0].docNum

    user_extras = dbFunctions.getEmpVacationDays(current_user, last_nom_name)

    #print(user_extras["fa"])
    
    documents = db.session.query(docInfo).filter_by(docType="Aguinaldo", id_empType=current_user.id_empType, company=current_user.company).order_by(docInfo.startPeriod.desc()).limit(1).all()
    aguinaldo = added_funcs.getFilesDir(current_user.id, documents, "Aguinaldo ")

    
    #documents = db.session.query(docInfo).order_by(docInfo.docPeriod.desc()).all()


    return render_template('index.html', nom=nom, aguinaldo=aguinaldo, announcements=announcements, current_user=current_user, user_extras = user_extras)


@views.route('/send-nom/<string:nom>')
@login_required
def send_nom(nom):
    user_data = {}
    user_data['last_nom'] = db.session.query(docInfo).filter_by(docType="Nomina", id_empType=current_user.id_empType).order_by(docInfo.startPeriod.desc()).limit(1).first().docNum
    res_message, status = added_funcs.send_nom(current_user, nom)
    flash(res_message, category=status)
    return redirect(url_for("views.home"))


@views.route('/users')
@login_required
def users():
    if not functionalities.check_permissions( ['RH', 'Admin'] ):
        flash("No tiene el permiso necesario para acceder a esta función.", category="error")
        return redirect(url_for("views.home"))
    
    try:
        password = session["password"]
        user_id = session['uid']
        user_fullname = session['ufull_name']
        del session["password"], session["uid"], session["ufull_name"]

    except:
        password = 0
        user_id = 0
        user_fullname = 0

    return render_template("users.html", users=dbFunctions.get_all_users(), levels=dbFunctions.get_user_levels(), current_user=current_user, password=password, user_id=user_id, user_fullname=user_fullname)


@views.route('/add-payroll', methods=['GET', 'POST'])
@login_required
def add_payroll():
    if not functionalities.check_permissions( ['Finance', 'Admin'] ):
        flash("No tiene el permiso necesario para acceder a esta función.", category="error")
        return redirect(url_for("views.home"))
    
    if request.method == 'POST':
        doc_num = request.form.get('doc_num')
        directory = request.form.get('directory')
        docType = request.form.get('doc_type')
        empTypeID = request.form.get('emp_type')
        startPeriod = request.form.get('start_period')
        endPeriod = request.form.get('end_period')
        company = request.form.get('company')

        if not functionalities.check_valid_dir_by_company(directory, company):
            flash(f"La ubicación proporcionada es incorrecta para la compañía { company }. Si la ubicación es correcta, favor de reportar al área de IT.", category="error")
            return redirect(url_for("views.payroll"))


        new_payroll = docInfo(docNum=doc_num, directory=directory, docType=docType, id_empType=empTypeID, startPeriod=startPeriod, endPeriod=endPeriod, company=company)
        db.session.add(new_payroll)
        db.session.commit()
        

        flash("El documento se ha agregado correctamente.", category="success")
        return redirect(url_for("views.payroll"))
    
    empType_list = db.session.query(empType).order_by(empType.id_empType).all()
    return render_template("payroll_control.html", title="Agregar documento", current_user=current_user, empType_list=empType_list)


@views.route('/edit-payroll/<int:doc_id>', methods=['GET', 'POST'])
@login_required
def edit_payroll(doc_id):
    if not functionalities.check_permissions( ['Finance', 'Admin'] ):
        flash("No tiene el permiso necesario para acceder a esta función.", category="error")
        return redirect(url_for("views.home"))
    
    if request.method == 'POST':
        payroll = db.session.query(docInfo).filter_by(id_docInfo=doc_id).first()
        payroll.docNum = request.form.get('doc_num')
        payroll.directory = request.form.get('directory')
        payroll.docType = request.form.get('doc_type')
        payroll.id_empType = request.form.get('emp_type')
        payroll.startPeriod = request.form.get('start_period')
        payroll.endPeriod = request.form.get('end_period')
        payroll.company = request.form.get('company')

        if not functionalities.check_valid_dir_by_company(payroll.directory, payroll.company):
            flash(f"La ubicación proporcionada es incorrecta para la compañía { payroll.company }. Si la ubicación es correcta, favor de reportar al área de IT.", category="error")
            return redirect(url_for("views.payroll"))

        db.session.commit()

        flash("El documento se ha editado correctamente.", category="success")
        return redirect(url_for("views.payroll"))

    empType_list = dbFunctions.getEmpTypes()
    return render_template("payroll_control.html", doc=db.session.query(docInfo).filter_by(id_docInfo=doc_id).first(), title="Editar documento", empType_list=empType_list, current_user=current_user)


@views.route('/delete-payroll/<int:id>')
@login_required
def delete_payroll(id):
    try:
        if not functionalities.check_permissions( ['Finance', 'Admin'] ):
            flash("No tiene el permiso necesario para acceder a esta función.", category="error")
            return redirect(url_for("views.home"))

        doc = docInfo.query.filter_by(id_docInfo=id)
        doc_id = doc.first().docNum
        doc.delete()
        db.session.commit()
        flash(f"Documento: {doc_id} borrado correctamente.", category="success")
    
    except Exception as e:
        flash(f"Ocurrió un error al borrar el documento {doc_id}, error: {e}.", category="error")

    return redirect(url_for("views.payroll"))


@views.route('/payroll')
@login_required
def payroll():
    if not functionalities.check_permissions( ['Finance', 'Admin'] ):
        flash("No tiene el permiso necesario para acceder a esta función.", category="error")
        return redirect(url_for("views.home"))
    
    documents=dbFunctions.get_documents()

    dates = added_funcs.getDateRangeFromWeek(documents)
    
    return render_template("payroll.html", docs=documents, dates=dates, title="Documentos", current_user=current_user)


@views.route('/nom-questions', methods=['POST'])
@login_required
def nom_questions():
    subject = request.form.get('subject')
    body = request.form.get('mailbox')
    res_message, status = added_funcs.send_question(current_user, subject, body)
    flash(res_message, category=status)
    return redirect(url_for("views.home"))