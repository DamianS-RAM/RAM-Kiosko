import urllib
from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from .config import DATABASE_URL, SECRET_KEY

db = SQLAlchemy()

app = Flask(__name__)
app.config['SESSION_PERMANENT'] = True

def create_app():
    app.config['SECRET_KEY'] = SECRET_KEY
    app.config['SQLALCHEMY_DATABASE_URI'] = f"mssql+pyodbc://?odbc_connect={ urllib.parse.quote_plus(DATABASE_URL) }"
    app.config["CACHE_TYPE"] = "null"

    db.init_app(app)
    
    from .views import views
    from .auth import auth, auth_ram, auth_wmm
    from .models import Users

    app.register_blueprint(views, url_prefix='/')
    # app.register_blueprint(views, name='RAM_views_Handler', url_prefix='/RAM')
    # app.register_blueprint(views, name='WMM_views_Handler', url_prefix='/WMM')
    app.register_blueprint(auth, url_prefix='/')
    app.register_blueprint(auth_ram, url_prefix='/RAM')
    app.register_blueprint(auth_wmm, url_prefix='/WMM')

    login_manager = LoginManager()
    login_manager.login_view = "auth.login"
    login_manager.login_message_category = "login"
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        user = Users.query.filter_by(id=id).first()
        if not user:
            return Users.query.get(id)
            
        return Users.query.get(id)
    

    return app
