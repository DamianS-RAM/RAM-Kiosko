import os
import locale
import datetime
import glob
import shutil
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from ..config import EMAIL_ADDRESS, EMAIL_PASSWORD, CURRENT_ENV

locale.setlocale(locale.LC_ALL,'es_US')

class added_funcs():
    
    def getFilesDir(empNo, documents, type):
        try:
            target = os.getcwd() + f'\\website\\static\\current_nom\\{empNo}\\'

            if not os.path.exists(target):
                os.makedirs(target)
            
            files = []
            filenames = []

            dates = added_funcs.getDateRangeFromWeek(documents)
            for document in documents:
                path_new = glob.glob(f"{document.directory}\\{str(empNo)}\\{empNo}*{document.docNum}_1.pdf")

                if path_new:
                    files.append(path_new[0])
                    filenames.append(type + dates[document.id_docInfo])

                
            for i, file in enumerate(files):
                shutil.copy( file, target + filenames[i] + ".pdf" )

            """ dates = {}

            for document in documents:
                week = document.docPeriod.split("-W")
                dates[document.docPeriod] = (date.fromisocalendar(int(week[0]), int(week[1]), 1).strftime("%d %b"), date.fromisocalendar(int(week[0]), int(week[1]), 6).strftime(" al %d %b de %Y")) """

            return filenames
        
        except Exception as e:
            with open('error_logs.txt', 'w') as f:
                f.write(f"Error ocurred while copying the employee files: '{e}'")
    

    def deleteEmpDir(id=None):
        try:
            if not id:
                target = os.getcwd() + f'\\website\\static\\current_nom'
                dir_list = os.listdir(target)

                if len(dir_list) <= 5:
                    return 0
                
                for filename in dir_list:
                    file_path = os.path.join(target, filename)
                    if os.path.isdir(file_path):
                        shutil.rmtree(file_path)

            else:
                target = os.getcwd() + f'\\website\\static\\current_nom\\{id}\\'

                if os.path.exists(target):
                    shutil.rmtree(target)

        except Exception as e:
            print("Error borrando directorios de carpetas.")


    def send_nom(user, nom):
        try:
            attachments = [ os.getcwd() + f"\\website\\static\\current_nom\\{user.id}\\" + nom + ".pdf" ]
            
            body = f"""
                    <i><span style="font-size: 0.8rem;">Mensaje automático, favor de no responder a este correo electrónico.</span></i>
                    <h2>Recibo de Nómina</h2>
                    <p>Estimad@ {user.full_name}, hacemos llegar su recibo: { nom }. </p>
                    <br>
                    Cualquier error favor de reportarlo al área de Recursos Humanos / Nóminas.
                    <br>
                    Saludos.
                """
            
            added_funcs.send_mail(nom, user.email, [], "", attachments, body)

            return f"Correo enviado con éxito a la dirección {user.email}. Puede cambiar el correo en el menú superior.", "success"
        
        except Exception as e:
            return f"Error al enviar correo, favor de tomar evidencia de este error y avisar a departamento de RH: \"{e}\"", "error"
        
    
    def send_question(user, subject, message):
        try:
            if CURRENT_ENV == 'dev':
            # Correos de finanzas para segimiento de dudas de Kioskos
                to_email = 'damian.sevilla@ram-mx.com'
                cc_emails=['']
            else:
                to_email = "darian.lopez@ram-mx.com"
                cc_emails = ["julio.solis@ram-mx.com"]
                
            reply_to = user.email

            body = f"""
                <p><strong>Usuario: </strong>{ user.id + ' - ' + user.full_name }<br>
                <strong>Correo: </strong>{ user.email }<br></p>
                <br>
                <p><strong>Mensaje: </strong><br>
                <span style="background-color: yellow;">{ message }</span><p>
                <br>
                <p>Para responder haga click en "Responder" o "Responder a todos".</p>
                <strong>Kiosko System - RAM</strong>
            """
            added_funcs.send_mail(subject, to_email, cc_emails, reply_to, [], body)

            return f"Duda enviada con exito. Favor de estar atento a tu correo { user.email }, ya que ahí se te dará el seguimiento correspondiente.", "success"

        except Exception as e:
            return f"Error al enviar correo de dudas, favor de tomar evidencia de este error y avisar a departamento de RH: \"{e}\"", "error"

    
    def send_mail(subject, to_email, cc_emails, reply_to, attachments, body):
        SMTP_SERVER = 'smtp-legacy.office365.com'
        SMTP_PORT = 587  # Port for TLS

        msg = MIMEMultipart()
        msg['Subject'] = subject
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = to_email
        msg['CC'] = ", ".join(cc_emails)
        msg['Reply-To'] = reply_to
        msg['Content-Type'] = "text/html; charset=utf-8"

        msg.attach(MIMEText(body, 'html'))

        if attachments:
            for f in attachments:
                with open(f, 'rb') as a_file:
                    basename = os.path.basename(f)
                    part = MIMEApplication(a_file.read(), Name=basename)

                part['Content-Disposition'] = 'attachment; filename="%s"' % basename
                msg.attach(part)
        
        # Connect, authenticate, and send mail
        smtp = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        smtp.starttls()  # Enable TLS encryption
        smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)

        # Send email
        smtp.sendmail(EMAIL_ADDRESS, [to_email]+cc_emails , msg.as_string())

        # Disconnect from the SMTP server
        smtp.quit()
        
    
    def get_announcements():
        announcements_path = os.getcwd() + f'\\website\\static\\images\\Avisos\\'

        if not os.path.exists(announcements_path):
            # Create the folder (including intermediate directories)
            os.makedirs(announcements_path)

        announcements = [ f for f in os.listdir(announcements_path) if os.path.isfile(announcements_path + f) ]

        return announcements
    

    def getDateRangeFromWeek(documents):
        dates = {}

        for document in documents:
            dates[document.id_docInfo] = (datetime.datetime.strptime(document.startPeriod, "%Y-%m-%d").strftime("%d-%b") + datetime.datetime.strptime(document.endPeriod, "%Y-%m-%d").strftime(" al %d-%b de %Y"))

        return dates
    