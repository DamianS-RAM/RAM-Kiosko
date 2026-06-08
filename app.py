from flask import session, redirect, url_for, flash
from datetime import datetime, timedelta, timezone
from website import create_app
from werkzeug.middleware.proxy_fix import ProxyFix
from website.config import CURRENT_ENV

app = create_app()

app.wsgi_app = ProxyFix(
    app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1
)

@app.before_request
def check_session_expiry():
    expire_time = session.get('expire_at')
    if expire_time:
        if datetime.now().replace(tzinfo=timezone(offset=timedelta())) > expire_time:
            del session['expire_at']
            flash("Sesión cerrada, se ha excedido el tiempo de la sesión.", category="success")
            return redirect(url_for('auth.logout'))  # or any session-expired route

@app.after_request 
def add_header(response):
    response.headers["X-UA-Compatible"] = "IE=Edge,chrome=1"
    response.headers.add('Cache-Control', 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, public, max-age=0') 
    return response

if __name__ == '__main__':
    if CURRENT_ENV == "dev":
        app.run(debug=True, port=5550)
    else:
        app.run()
